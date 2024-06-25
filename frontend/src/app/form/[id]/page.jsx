"use client";
import React, { useState } from "react";
import { updateMaterial } from "@/apis/index";

const MaterialForm = ({ params }) => {
  const [formData, setFormData] = useState({
    name: "",
    technology: "",
    colors: "",
    pricePerGram: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = params;

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
    if (file) {
      formData.image = file;
    }
    setIsLoading(true);
    try {
      const response = await updateMaterial(id,formData);

      setUploadMessage("Material updated successfully!");
      console.log("Material updated:", response.data);
    } catch (error) {
      console.error("Error updating material:", error);
      setUploadMessage("Error updating material");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white text-black rounded shadow-md max-w-lg mx-auto mt-8 "
      encType="multipart/form-data"
    >
      <h1 className="text-center text-3xl">update Material Form</h1>
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
          className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading ? "disabled opacity-50 cursor-not-allowed" : ""
          }`} 
        >
          {isLoading ? "Adding..." : "Add Material"}
        </button>
      </div>
      {uploadMessage && <p className="text-center">{uploadMessage}</p>}
    </form>
  );
};

export default MaterialForm;
