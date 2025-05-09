import api from "../utils/api.js";

export class TaskService {
  async createTask(data) {
    try {
      const response = await api.post("/task/new", data);
      return response.data;
    } catch (error) {
      this._handleError("creating task", error);
    }
  }

  async getCustomerTaskById(taskId) {
    try {
      const response = await api.get(`/task/customer/${taskId}`);
      return response.data;
    } catch (error) {
      this._handleError("getting customer tasks", error);
    }
  }

  async getCustomerAllTasks() {
    try {
      const response = await api.get(`/task/customer`);
      return response.data;
    } catch (error) {
      this._handleError("getting customer tasks", error);
    }
  }

  async getTaskDetails(taskId) {
    try {
      const response = await api.get(`/task/details/${taskId}`);
      return response.data;
    } catch (error) {
      this._handleError("getting task details", error);
    }
  }

  async addTaskUpdate(taskId, updateData) {
    try {
      const response = await api.post(`/task/${taskId}/update`, updateData);
      return response.data;
    } catch (error) {
      this._handleError("adding task update", error);
    }
  }

  async getCompanyTasks() {
    try {
      const response = await api.get("/task/company");
      return response.data;
    } catch (error) {
      this._handleError("getting company tasks", error);
    }
  }

  async getProfessionalTasks() {
    try {
      const response = await api.get("/task/professional");
      return response.data;
    } catch (error) {
      this._handleError("getting professional tasks", error);
    }
  }

  async companyAssignTaskToProfessional(
    taskId,
    professionalId,
    message = "Do the task as before as you can."
  ) {
    try {
      console.log(taskId, professionalId, message);
      const response = await api.post(`/task/company/${taskId}/assign`, {
        professionalId,
        message,
      });
      return response.data;
    } catch (error) {
      this._handleError("assigning task to professional", error);
    }
  }

  async getProfessionalTaskById(taskId) {
    try {
      const response = await api.get(`/task/professional/${taskId}`);
      return response.data;
    } catch (error) {
      this._handleError("getting professional task by id", error);
    }
  }

  async professionalUpdateTask(taskId, newStatus) {
    try {
      const response = await api.post(`/task/professional/${taskId}/updates`, {
        newStatus,
      });
      return response.data;
    } catch (error) {
      this._handleError("professional updating task", error);
    }
  }

  async companyUploadDocuments(taskId, formData) {
    try {
      const response = await api.post(
        `/task/${taskId}/company-upload`,
        formData
      );
      return response.data;
    } catch (error) {
      this._handleError("company uploading documents", error);
    }
  }

  async professionalUploadFinalDocuments(taskId, formData) {
    try {
      const response = await api.post(
        `/task/professional/${taskId}/upload-document`,
        formData
      );
      return response.data;
    } catch (error) {
      this._handleError("professional uploading final documents", error);
    }
  }

  async deleteDocument(taskId) {
    try {
      const response = await api.delete(`/task/professional/${taskId}/delete`);
      return response.data;
    } catch (error) {
      this._handleError("professional uploading final documents", error);
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

const taskService = new TaskService();
export default taskService;
