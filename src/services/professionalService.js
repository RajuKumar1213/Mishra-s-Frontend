import api from "../utils/api.js";

export class ProfessionalService {
  async sendProfMail(email) {
    console.log(email, "email in service");
    try {
      const response = await api.post("/professional/send-mail", email);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: sending professional mail::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to send otp to your mail.";
    }
  }

  async verifyProfOtp(payload) {
    try {
      const response = await api.post("/professional/verify-otp", {
        email: payload.email,
        otp: payload.otp,
      });
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: verifying professional mail::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to verify professional mail.";
    }
  }

  async fillProfDetails(data) {
    console.log(data);
    try {
      const formData = new FormData();

      // Check and append avatar file
      if (data.avatar && data.avatar[0]) {
        formData.append("avatar", data.avatar[0]);
      } else {
        throw new Error("Profile picture (avatar) is required.");
      }

      // Check and append Aadhaar card file
      if (data.addharCard && data.addharCard[0]) {
        formData.append("addharCard", data.addharCard[0]);
      } else {
        throw new Error("Aadhaar card is required.");
      }

      // Check and append PAN card file
      if (data.panCard && data.panCard[0]) {
        formData.append("panCard", data.panCard[0]);
      } else {
        throw new Error("PAN card is required.");
      }

      // Append other fields
      Object.keys(data).forEach((key) => {
        if (key !== "avatar" && key !== "addharCard" && key !== "panCard") {
          formData.append(key, data[key]);
        }
      });

      const response = await api.patch("/professional/fill-details", formData);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: filling professional details::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to fill professional details.";
    }
  }

  async getProfDetails() {
    try {
      const response = await api.get("/professional/fetch-details");
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: getting professional details::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to get professional details.";
    }
  }

  async profLogout() {
    try {
      const response = await api.get("/professional/logout");
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: logging out professional::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to logout professional.";
    }
  }
}

const professionalService = new ProfessionalService();
export default professionalService;
