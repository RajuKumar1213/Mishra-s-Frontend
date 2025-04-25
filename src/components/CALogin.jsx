import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import spinner from "/spinner.svg";
import extractErrorMessage from "../utils/extractErrorMessage";
import { useForm } from "react-hook-form";
import professionalService from "../services/professionalService";

const CALogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(null);
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

    try {
      const response = await professionalService.sendProfMail(data);
      if (response.statusCode === 200) {
        setOtpSent(true);
        setOtp(response.data);
        toast.success("OTP sent successfully. Your OTP is " + response.data);
        setStartCountdown(true);
        setResendCountdown(30); // Initialize countdown when first OTP is sent
      }
    } catch (error) {
      const message = extractErrorMessage(error);
      setError(message);
      toast.error(message);
      setStartCountdown(false);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (data) => {
    setLoading(true);

    const payload = {
      email: email,
      otp: data.otp,
    };

    professionalService
      .verifyProfOtp(payload)
      .then((response) => {
        console.log(response);
        if (response.statusCode === 200) {
          const { accessToken, refreshToken } = response.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("role", "Professional");

          document.cookie = `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; path=/;`;

          toast.success("OTP verified successfully.");

          professionalService.getProfDetails().then((response) => {
            if (response.statusCode === 200) {
              const { professional } = response.data;
              if (
                professional.phone &&
                professional.address &&
                professional.addharCard
              ) {
                navigate("/professional-panel");
              } else {
                navigate("/professional-fill-details", {
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

    try {
      const response = await professionalService.sendProfMail({ email });
      if (response.statusCode === 200) {
        setOtp(response.data);
        toast.success("OTP resent successfully. Your OTP is " + response.data);
        setResendCountdown(30);
      }
    } catch (error) {
      const message = extractErrorMessage(error);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-orange-200">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="text-2xl font-bold text-orange-600">
              Tax<span className="text-orange-400">Pro</span>
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 font-poppins">
            Professional Portal
          </h2>
          <p className="text-gray-600 mt-2">
            {otpSent
              ? "Verify your email address with OTP"
              : "Enter your registered email"}
          </p>
          {error && (
            <p className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit(otpSent ? handleVerifyOtp : handleSendMail)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div>
              <Input
                label="Email Address"
                name="email"
                type="email"
                {...register("email", {
                  required: "Email address is required",
                })}
                placeholder="your@email.com"
                required
                className="border-orange-300 focus:ring-orange-500 focus:border-orange-500"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {otpSent && (
              <div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Input
                      label="OTP Verification"
                      name="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      {...register("otp", {
                        required: "OTP is required",
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: "OTP should be 6 digits",
                        },
                      })}
                      className="border-orange-300 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <button
                    type="button"
                    className={`text-sm px-3 py-2 rounded ${
                      resendCountdown > 0
                        ? "text-gray-500 bg-gray-100"
                        : "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                    } transition-colors`}
                    onClick={handleResendOtp}
                    disabled={resendCountdown > 0 || loading}
                  >
                    {resendCountdown > 0
                      ? `Resend (${resendCountdown}s)`
                      : "Resend OTP"}
                  </button>
                </div>
                {errors.otp && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.otp.message}
                  </span>
                )}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            disabled={loading}
          >
            {loading ? (
              <>
                <img
                  src={spinner}
                  alt="Loading"
                  className="w-5 h-5 mr-2 animate-spin"
                />
                Processing...
              </>
            ) : otpSent ? (
              "Verify OTP"
            ) : (
              "Send OTP"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            By continuing, you agree to our{" "}
            <a href="#" className="text-orange-600 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-orange-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CALogin;
