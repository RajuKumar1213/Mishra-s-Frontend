import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import spinner from "/spinner.svg";
import extractErrorMessage from "../utils/extractErrorMessage";
import { useForm } from "react-hook-form";
import customerService from "../services/customerService";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [startCountdown, setStartCountdown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSendMail = async (data) => {
    setLoading(true);
    setError("");
    setEmail(data.email);

    customerService
      .sendCustomerMail(data)
      .then((response) => {
        if (response.statusCode === 200) {
          setOtp(response.data); // Save OTP for local verification (for now)
          toast.success("OTP sent successfully. Your OTP is " + response.data); // dev only
          setOtpSent(true);
          setStartCountdown(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        const message = extractErrorMessage(error);
        setError(message);
        toast.error(message);
        setLoading(false);
        setStartCountdown(false);
      });
  };

  const handleVerifyOtp = async (data) => {
    setLoading(true);

    const payload = {
      email: email,
      otp: data.otp,
    };

    customerService
      .verifyCustomerOtp(payload)
      .then((response) => {
        if (response.statusCode === 200) {
          const { accessToken, refreshToken } = response.data;

          // Store accessToken
          localStorage.setItem("accessToken", accessToken);
          // Store role (important for routing and service selection)
          localStorage.setItem("role", "Customer");

          document.cookie = `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; path=/;`;

          toast.success("OTP verified successfully.");

          // Check if customer details are already filled
          customerService.getCustomerDetails().then((response) => {
            if (response.statusCode === 200) {
              const { customer } = response.data;
              if (
                customer.phone &&
                customer.address &&
                customer.profilePicture
              ) {
                navigate("/customer-profile");
              } else {
                navigate("/customer-fill-details", {
                  state: { email: email },
                });
              }
            }
          });
        } else {
          toast.error("Invalid OTP. Please try again.");
        }
      })
      .catch((error) => {
        const message = extractErrorMessage(error);
        setError(message);
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0) return;
    setLoading(true);
    setError("");
    setStartCountdown(true); // Reset countdown

    customerService
      .sendCustomerMail({ email })
      .then((response) => {
        if (response.statusCode === 200) {
          setOtp(response.data); // Save OTP for local verification (for now)
          toast.success(
            "OTP resent successfully. Your OTP is " + response.data
          ); // dev only
          setResendCountdown(30); // Set countdown to 30 seconds
          setStartCountdown(true); // Start countdown for resend
        }
      })
      .catch((error) => {
        const message = extractErrorMessage(error);
        setError(message);
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown, startCountdown]);

  return (
    <div className="bg-[#FEFCE8] min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-[#10B981]/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#374151] font-poppins drop-shadow-md">
            Customer Login
          </h2>

          <p className="text-[#374151] mt-2 font-inter">
            {otpSent
              ? "Verify your email address with OTP"
              : "Enter your email address"}
          </p>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <form
          onSubmit={handleSubmit(otpSent ? handleVerifyOtp : handleSendMail)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <Input
              label="Email Address"
              name="email"
              type="email"
              {...register("email", {
                required: "Email address is required",
              })}
              placeholder="Enter your email address"
              required
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}

            {otpSent && (
              <div className="flex items-center justify-between">
                <Input
                  label="OTP Verification"
                  name="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  {...register("otp", {
                    required: "OTP is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "Otp should be 6 digits",
                    },
                  })}
                />
                <button
                  type="button"
                  className="text-sm text-blue-500 hover:underline"
                  onClick={handleResendOtp}
                  disabled={resendCountdown > 0}
                >
                  {resendCountdown > 0
                    ? `Resend OTP in ${resendCountdown}s`
                    : "Resend OTP"}
                </button>
              </div>
            )}
            {errors.otp && (
              <span className="text-red-500 text-sm">{errors.otp.message}</span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full flex items-center justify-center"
          >
            {loading && <img src={spinner} alt="" className="w-6 mr-4" />}
            {otpSent
              ? "Verify OTP"
              : startCountdown
              ? "Resending..."
              : "Send OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
