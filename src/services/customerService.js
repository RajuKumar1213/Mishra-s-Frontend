import api from "../utils/api.js";

export class CustomerService {
  async sendCustomerMail(email) {
    try {
      const response = await api.post("/customer/send-otp", email);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: sending customer mail::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to send customer mail.";
    }
  }

  async verifyCustomerOtp(email, otp) {
    try {
      const response = await api.post("/customer/verify-otp", email, otp);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: verifying customer mail::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to verify customer mail.";
    }
  }

  async fillCustomerDetails(data) {
    try {
      const formData = new FormData();

      // Append avatar file
      formData.append("customerAvatar", data.customerAvatar[0]);

      // Append other fields
      Object.keys(data).forEach((key) => {
        if (key !== "customerAvatar") {
          formData.append(key, data[key]);
        }
      });

      const response = await api.patch("/customer/fill-details", formData);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: filling customer details::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to fill customer details.";
    }
  }

  async getCustomerDetails() {
    try {
      const response = await api.get("/customer/get-details");
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: getting customer details::",
        error.response?.data || error.message
      );
      throw error.response?.data || "Failed to get customer details.";
    }
  }
}

const customerService = new CustomerService();
export default customerService;
