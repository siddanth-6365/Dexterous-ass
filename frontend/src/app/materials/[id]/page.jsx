"use client";
import React, { useState, useEffect } from "react";
import { getMaterialById } from "@/apis/index";

const MaterialDetails = ({ params }) => {
  const [material, setMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getMaterialById(id);
        setMaterial(response.data);
      } catch (error) {
        console.error("Error fetching material:", error);
        setError("Error loading material details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">Loading material details...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!material) {
    return <p className="text-center text-gray-500">Material not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2>{material.name}</h2>
      <p className="text-gray-500">Technology: {material.technology}</p>
      <p className="text-gray-500">Colors: {material.colors.join(", ")}</p>
      <p className="text-gray-500">Price per Gram: ${material.pricePerGram}</p>
      <img
        src={material.imageUrl}
        alt={material.name}
        className="w-full h-auto object-cover rounded mb-4"
      />
    </div>
  );
};

export default MaterialDetails;
