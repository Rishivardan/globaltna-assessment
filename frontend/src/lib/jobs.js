import apiClient from "./apiClient";

export const fetchJobs = async (params = {}) => {
  const response = await apiClient.get("/api/jobs", { params });
  return response.data;
};

export const fetchJobById = async (id) => {
  const response = await apiClient.get(`/api/jobs/${id}`);
  return response.data;
};

export const createJob = async (payload) => {
  const response = await apiClient.post("/api/jobs", payload);
  return response.data;
};

export const updateJobStatus = async (id, payload) => {
  const response = await apiClient.patch(`/api/jobs/${id}`, payload);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await apiClient.delete(`/api/jobs/${id}`);
  return response.data;
};
