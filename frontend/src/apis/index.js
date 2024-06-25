import axios from "axios";

const BASE_URL = "https://dexterous-ass.onrender.com/api"; 
// const BASE_URL = "http://localhost:8000/api"; 


export const getMaterials = async () => {
  const response = await axios.get(`${BASE_URL}/materials`);
  return response;
};

export const getMaterialById = async (id) => {
  const response = await axios.get(`${BASE_URL}/materials/${id}`);
  return response;
};

export const createMaterial = async (formData) => {
  const response = await axios.post(`${BASE_URL}/materials`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const updateMaterial = async (id, material) => {
  const response = await axios.put(`${BASE_URL}/materials/${id}`, material);
  return response;
};

export const deleteMaterial = async (id) => {
  await axios.delete(`${BASE_URL}/materials/${id}`);
};
