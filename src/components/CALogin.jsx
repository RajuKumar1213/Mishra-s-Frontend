import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const CALogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    name: "",
    email: "",
    state: "",
    region: "",
    qualifications: "",
    experience: "",
    aadhaar: null,
    pan: null,
  });

  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "aadhaar" || name === "pan") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (formData.phone) {
      console.log("Sending OTP to:", formData.phone);
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (formData.otp === "1234") {
      console.log("OTP Verified");
      setStep(2);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted CA/CS Details Form:", formData);
  };

  return (
    <div className="bg-[#FEFCE8] min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-10">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-[#10B981]/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#374151] text-center font-poppins drop-shadow-md">
            CA/CS Registration
          </h2>
          <p className="text-[#374151] mt-2 font-inter">
            {step === 1
              ? "Verify your mobile number"
              : "Complete your professional profile"}
          </p>
        </div>

        {step === 1 && (
          <form
            onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
            className="space-y-6"
          >
            <div className="space-y-4">
              <Input
                label="Mobile Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Enter 10-digit mobile number"
                required
              />

              {otpSent && (
                <Input
                  label="OTP Verification"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  required
                />
              )}
            </div>

            <Button type="submit" className="w-full ">
              {otpSent ? "Verify OTP" : "Send OTP"}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="bg-white/50 backdrop-blur-md p-4 rounded-lg border border-[#10B981]/20">
              <p className="text-[#374151] font-medium font-inter">
                Verified Mobile:{" "}
                <span className="text-[#10B981]">{formData.phone}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state"
                required
              />
              <Input
                label="Region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="Enter your region"
              />
              <Input
                label="Qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="CA/CS, etc."
                required
              />
              <Input
                label="Years of Experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter years"
                required
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#374151] border-b pb-2 font-poppins">
                Document Upload
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#374151]">
                    Aadhaar Card
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="file"
                        name="aadhaar"
                        onChange={handleChange}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                      <div className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-[#374151]">
                          {formData.aadhaar
                            ? formData.aadhaar.name
                            : "Choose file"}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#374151]">
                    PAN Card
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="file"
                        name="pan"
                        onChange={handleChange}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                      <div className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-[#374151]">
                          {formData.pan ? formData.pan.name : "Choose file"}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full border border-[#10B981] text-[#374151] py-3 px-8 rounded-xl hover:bg-[#10B981] hover:text-white transition-all font-poppins hover:shadow-md"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#10B981] to-[#F97316] hover:from-[#0d8f6b] hover:to-[#e66914] text-white py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 font-poppins border border-[#F97316]/50"
                onClick={() => navigate("/professional/rajiv")}
              >
                Submit & Verify
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CALogin;
