import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const CALogin = () => {
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

  const [step, setStep] = useState(1); // Step 1: OTP Verification, Step 2: Details Form
  const [otpSent, setOtpSent] = useState(true);

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
      // Simulate OTP sent (you can integrate with an actual OTP service here)
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (formData.otp === "1234") {
      // Simulate OTP verification
      console.log("OTP Verified");
      setStep(2);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted CA/CS Details Form:", formData);
    // You can send this to backend here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4 py-10 ">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-[#1A237E] mb-6 text-center">
          CA/CS Registration Portal
        </h2>

        {step === 1 && (
          <form
            onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
            className="grid gap-4"
          >
            <Input label="Enter your phone number" />
            {otpSent && (
              // TODO: change this input use chadcn opt box
              <Input placeholder="Enter OTP" />
            )}

            <Button onClick={() => setStep(2)}>
              {otpSent ? "Verify OTP" : "Send OTP"}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 ">
            <div className="md:col-span-2 text-gray-500 text-sm bg-gray-100 p-3 rounded-xl border border-gray-300">
              Mobile Number: {formData.phone}
            </div>
            <Input placeholder="Enter you name" label="Name" p={2} />
            <Input placeholder="Enter you Email" label="Email" p={2} />
            <Input placeholder="Enter you State" label="State" p={2} />

            <Input
              placeholder="Enter you Qualifications"
              label="Qualifications"
              p={2}
              onChange={handleChange}
              name="qualifications"
            />
            <Input
              placeholder={"Enter you Experience"}
              type="number"
              label="Years of Experience"
              p={2}
            />

            <div className="md:col-span-2 ">
              <h2 className="text-2xl text-gray-400 py-3">
                Upload your Documents
              </h2>
              <Input
                label="Upload your Aadhaar"
                p={2}
                type="file"
                className="mb-4"
              />
              <Input label="Upload you Pan" p={2} type="file" />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#FF6F00] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#e65c00] transition-all"
              >
                Submit & Verify
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CALogin;
