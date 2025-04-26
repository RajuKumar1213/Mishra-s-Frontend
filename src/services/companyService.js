import api from "../utils/api.js";

export class CompanyService {
  async sendCompanyMail(email) {
    try {
      const response = await api.post("/company/send-mail", email);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: sending company mail::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to send company mail.";
    }
  }

  async verifyCompanyOtp(email, otp) {
    try {
      const response = await api.post("/company/verify-otp", email, otp);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: verifying company mail::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to verify company mail.";
    }
  }

  async fillCompanyDetails(data) {
    try {
      const response = await api.patch("/company/fill-details", data);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: filling company details::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to fill company details.";
    }
  }

  async getCompanyDetails() {
    try {
      const response = await api.get("/company/fetch-details");
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: getting company details::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to get company details.";
    }
  }

  async getAllProfessionals() {
    try {
      const response = await api.get("/company/fetch-all-professionals");
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: getting company details::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to get company details.";
    }
  }

  async getAllTasksAfterAssigned() {
    try {
      const response = await api.get("/company/fetch-all-assigned-tasks");
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: fetchig all assigned tasks ::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to get company details.";
    }
  }
}

const companyService = new CompanyService();
export default companyService;
