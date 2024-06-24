"use client";
import React, { useState } from "react";
import { createMaterial } from "@/apis/index";
import axios from "axios";

const MaterialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    technology: "",
    colors: "",
    pricePerGram: "",
    imageUrl: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Cloudinary and get the URL
    if (file) {
      try {
        const imageUrl = await handleUpload(file);
        formData.imageUrl = imageUrl;
      } catch (error) {
        console.error("Failed to upload image:", error);
        return;
      }
    }

    await createMaterial(formData);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData)

    try {
      const response = await axios.post("/api/imgUpload", {formData});

      const data = await response.json();
      setImageUrl(data.url); // Set the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Error uploading image");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white text-black rounded shadow-md max-w-lg mx-auto mt-8 "
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="technology"
          className="block text-sm font-medium text-gray-700"
        >
          Technology
        </label>
        <input
          type="text"
          name="technology"
          id="technology"
          value={formData.technology}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="colors"
          className="block text-sm font-medium text-gray-700"
        >
          Colors (comma separated)
        </label>
        <input
          type="text"
          name="colors"
          id="colors"
          value={formData.colors}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="pricePerGram"
          className="block text-sm font-medium text-gray-700"
        >
          Price per Gram
        </label>
        <input
          type="number"
          name="pricePerGram"
          id="pricePerGram"
          value={formData.pricePerGram}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleFileChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Material
        </button>
      </div>
    </form>
  );
};

export default MaterialForm;
