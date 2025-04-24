import api from "../utils/api.js";

export class ServiceCatalogService {
  async getAllCategories() {
    try {
      const response = await api.get("/services/all-categories");
      return response.data;
    } catch (error) {
      this._handleError("getting all categories", error);
    }
  }

  async getAllServices() {
    try {
      const response = await api.get("/services/all-services");
      return response.data;
    } catch (error) {
      this._handleError("getting all services", error);
    }
  }

  async getServicesOfCategory(categoryId) {
    try {
      const response = await api.get(`/services/category/${categoryId}`);
      return response.data;
    } catch (error) {
      this._handleError("getting services of category", error);
    }
  }

  async getServiceById(serviceId) {
    try {
      const response = await api.get(`/services/${serviceId}`);
      return response.data;
    } catch (error) {
      this._handleError("getting service by ID", error);
    }
  }

  _handleError(context, error) {
    console.error(
      `ERROR :: ${context} ::`,
      error.response?.data || error.message
    );
    throw error.response?.data || `Failed ${context}`;
  }
}

const serviceCatalogService = new ServiceCatalogService();
export default serviceCatalogService;
