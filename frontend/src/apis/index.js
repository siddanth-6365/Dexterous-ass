const BASE_URL = "http://localhost:3000/api"; // Change this to your backend URL

export const getMaterials = async () => {
  const response = await fetch(`${BASE_URL}/materials`);
  return response.json();
};

export const getMaterialById = async (id) => {
  const response = await fetch(`${BASE_URL}/materials/${id}`);
  return response.json();
};

export const createMaterial = async (material) => {
  const response = await fetch(`${BASE_URL}/materials`, {
    method: "POST",
    body: material,
  });
  return response.json();
};

export const updateMaterial = async (id, material) => {
  const response = await fetch(`${BASE_URL}/materials/${id}`, {
    method: "PUT",
    body: material,
  });
  return response.json();
};

export const deleteMaterial = async (id) => {
  await fetch(`${BASE_URL}/materials/${id}`, {
    method: "DELETE",
  });
};
