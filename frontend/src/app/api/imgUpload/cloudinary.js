"use server";
import * as cloudinary from "cloudinary";
import axios from "axios";

const API_KEY = "395529726693156";
const API_Secret = "VEiUqUqyEaoPM6-OoMXd82UjKmw";

const cloudinaryConfig = {
  cloud_name: "test",
  api_key: API_KEY,
  api_secret: API_Secret,
};

cloudinary.v2.config(cloudinaryConfig);

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "your_upload_preset");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Basic ${Buffer.from(
            `${cloudinaryConfig.api_key}:${cloudinaryConfig.api_secret}`
          ).toString("base64")}`,
        },
      }
    );

    return response.data.secure_url; // Extract the secure URL
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw error for handling in the component
  }
};
