import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Input from "./Input";
import Button from "./Button";

function OtpLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const generateRecaptcha = () => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
          },
          auth
        );
      }
    } catch (error) {
      console.error("Error generating reCAPTCHA:", error.message);
    }
  };

  useEffect(() => {
    console.log("auth", auth);
    generateRecaptcha();
  }, []);

  const sendOTP = async () => {
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      setConfirmationResult(result);
      alert("OTP sent!");
    } catch (error) {
      console.error("Error sending OTP:", error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
      alert("Phone verified!");
    } catch (error) {
      console.error("OTP verification failed:", error.message);
    }
  };

  return (
    <div>
      <Input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+919876543210"
      />
      <Button onClick={sendOTP}>Send OTP</Button>

      <Input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <Button onClick={verifyOTP}>Verify OTP</Button>

      <div id="recaptcha-container"></div>
    </div>
  );
}

export default OtpLogin;
