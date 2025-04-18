import React from "react";

function PhoneOpt({
  otpSent,
  handleSendOtp,
  handleVerifyOtp,
  formData,
  setFormData,
}) {
  return (
    <form
      onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
      className="grid gap-4"
    >
      <Input label="Enter your phone number" />
      {otpSent && (
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={handleChange}
          className="input"
          required
        />
      )}
      <button
        type="submit"
        className="w-full bg-[#FF6F00] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#e65c00] transition-all"
      >
        {otpSent ? "Verify OTP" : "Send OTP"}
      </button>
    </form>
  );
}

export default PhoneOpt;
