import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaLock, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Input from "../components/Input";
import Button from "../components/Button";
import extractErrorMessage from "../utils/extractErrorMessage";
import companyService from "../services/companyService";
import { useForm } from "react-hook-form";
import spinner from "/spinner.svg";

const CompanyLogin = () => {
  const navigate = useNavigate();
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

  const handleSendMail = (data) => {
    setLoading(true);
    setError("");
    setEmail(data.email);

    companyService
      .sendCompanyMail(data)
      .then((response) => {
        if (response.statusCode === 200) {
          setOtpSent(true);
          toast.success("OTP sent successfully! Your otp is " + response.data);
          setStartCountdown(true);
          setResendCountdown(30);
        }
      })
      .catch((error) => {
        const message = extractErrorMessage(error);
        setError(message);
        toast.error(message);
        setStartCountdown(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleVerifyOtp = (data) => {
    setLoading(true);

    const payload = {
      email: email,
      otp: data.otp,
    };

    companyService
      .verifyCompanyOtp(payload)
      .then((response) => {
        if (response.statusCode === 200) {
          const { accessToken, refreshToken } = response.data;

          // Store tokens and role
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("role", "Company");

          toast.success("OTP verified successfully!");

          // Check if company details are complete
          return companyService.getCompanyProfile();
        }
      })
      .then((response) => {
        if (response && response.statusCode === 200) {
          const { company } = response.data;
          if (company.phone !== "" && company.address !== "") {
            // Navigate to the dashboard if details are complete
            navigate("/company/dashboard");
          } else {
            // Navigate to the fill details page if not complete
            navigate("fill-company-details");
          }
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

  const handleResendOtp = () => {
    if (resendCountdown > 0) return;
    setLoading(true);
    setError("");

    companyService
      .sendCompanyMail({ email })
      .then((response) => {
        if (response.statusCode === 200) {
          toast.success(
            "OTP resent successfully! Your otp is " + response.data
          );
          setResendCountdown(30);
          setStartCountdown(true);
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
    if (startCountdown && resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    } else if (resendCountdown === 0) {
      setStartCountdown(false);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown, startCountdown]);

  return (
    <div className="bg-[#FEFCE8] min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-[#10B981]/20">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-[#FF6F00]/10 p-4 rounded-full">
              <FaBuilding className="text-3xl text-[#FF6F00]" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#374151] font-poppins drop-shadow-md">
            Company Portal
          </h2>
          <p className="text-[#374151] mt-2 font-inter">
            {otpSent
              ? "Verify your email address with OTP"
              : "Enter your company email"}
          </p>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <form
          onSubmit={handleSubmit(otpSent ? handleVerifyOtp : handleSendMail)}
          className="space-y-6"
        >
          <div className="space-y-4">
            {!otpSent && (
              <>
                <Input
                  label="Company Email"
                  name="email"
                  type="email"
                  icon={<FaEnvelope className="text-[#FF6F00]" />}
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your company email"
                  required
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </>
            )}

            {otpSent && (
              <>
                <div className="mb-4">
                  <p className="text-gray-600 font-medium mb-1">Email</p>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <FaEnvelope className="text-[#FF6F00] mr-2" />
                    <span>{email}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    <Input
                      label="OTP Verification"
                      name="otp"
                      type="text"
                      icon={<FaLock className="text-[#FF6F00]" />}
                      placeholder="Enter 6-digit OTP"
                      {...register("otp", {
                        required: "OTP is required",
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: "OTP should be 6 digits",
                        },
                      })}
                    />
                  </div>
                  <button
                    type="button"
                    className={`text-sm ${
                      resendCountdown > 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-500 hover:underline"
                    } ml-2 whitespace-nowrap mt-6`}
                    onClick={handleResendOtp}
                    disabled={resendCountdown > 0 || loading}
                  >
                    {resendCountdown > 0
                      ? `Resend OTP in ${resendCountdown}s`
                      : "Resend OTP"}
                  </button>
                </div>
                {errors.otp && (
                  <span className="text-red-500 text-sm">
                    {errors.otp.message}
                  </span>
                )}
              </>
            )}
          </div>

          <Button
            type="submit"
            className="w-full flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <img src={spinner} alt="Loading" className="w-5 h-5 mr-2" />
            ) : otpSent ? (
              <>
                <FaCheckCircle className="mr-2" />
                Verify OTP
              </>
            ) : (
              <>Send OTP</>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Secure login with OTP verification</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
