import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
    otp: "",
  });

  const [step, setStep] = useState(1); // Step 1: Enter Details, Step 2: OTP Verification
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (formData.phone && formData.name && formData.email) {
      console.log("Sending OTP to:", formData.phone);
      setOtpSent(true);
      setStep(2);
    } else {
      alert("Please fill in all the fields.");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (formData.otp === "1234") {
      console.log("OTP Verified");
      navigate("/services");
      window.scrollTo(0, 0);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="bg-[#FEFCE8] min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-10">
      {/* Subtle Background Pattern */}

      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#10B981]/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#374151]  text-center font-poppins drop-shadow-md">
            Customer Login
          </h2>
          <p className="text-[#374151] mt-2 font-inter">
            {step === 1 ? "Enter your details" : "Verify your phone number"}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="space-y-4">
              <Input
                type="text"
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="tel"
                name="phone"
                label="Phone Number"
                placeholder="Enter 10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Send OTP
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="bg-white/50 backdrop-blur-md p-4 rounded-lg border border-[#10B981]/20">
              <p className="text-[#374151] font-medium font-inter">
                Verification sent to:{" "}
                <span className="text-[#10B981]">{formData.phone}</span>
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                name="otp"
                label="OTP Verification"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button type="submit" className="w-full ">
                Verify OTP
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export { CustomerLogin };
