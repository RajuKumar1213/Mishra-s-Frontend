import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaLock, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Input from "../components/Input";
import Button from "../components/Button";
import extractErrorMessage from "../utils/extractErrorMessage";
import companyService, { CompanyService } from "../services/companyService";
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

    companyService.verifyCompanyOtp(payload).then((response) => {
      if (response.statusCode === 200) {
        const { accessToken, refreshToken } = response.data;

        // Store tokens and role
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", "Company");

        toast.success("OTP verified successfully!");

        // Check if company details are complete
        companyService
          .getCompanyDetails()
          .then((response) => {
            if (response.statusCode === 200) {
              const { company } = response.data;
              if (company.address && company.phone) {
                navigate("/company/dashboard");
              } else {
                navigate("/company-fill-details", {
                  state: { email: email },
                });
              }
            }
          })
          .catch((error) => {
            const message = extractErrorMessage(error);
            setError(message);
            toast.error(message);
          });
      }
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
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-orange-200">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-100 p-3 rounded-full">
              <FaBuilding className="text-2xl text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-orange-600">
              Company<span className="text-orange-400">Portal</span>
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 font-poppins">
            Company Login
          </h2>
          <p className="text-gray-600 mt-2">
            {otpSent
              ? "Verify your email address with OTP"
              : "Enter your company email"}
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
            {!otpSent && (
              <div>
                <Input
                  label="Company Email"
                  name="email"
                  type="email"
                  icon={<FaEnvelope className="text-orange-500" />}
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="your@company.com"
                  required
                  className="border-orange-300 focus:ring-orange-500 focus:border-orange-500"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>
            )}

            {otpSent && (
              <>
                <div className="mb-4">
                  <p className="text-gray-600 font-medium mb-1">Email</p>
                  <div className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <FaEnvelope className="text-orange-500 mr-2" />
                    <span>{email}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Input
                        label="OTP Verification"
                        name="otp"
                        type="text"
                        icon={<FaLock className="text-orange-500" />}
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
              </>
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
              <>
                <FaCheckCircle className="mr-2" />
                Verify OTP
              </>
            ) : (
              "Send OTP"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Secure company portal access with OTP verification</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
