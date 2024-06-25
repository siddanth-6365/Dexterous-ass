"use client";
import React, { useState, useEffect } from "react";
import { getMaterials } from "@/apis/index";

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getMaterials();
        console.log("response", response);
        setMaterials(response.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
        setError("Error loading materials");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading materials...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => (
            <li key={material._id} className="rounded shadow-md mb-4">
              <img
                src={material.imageUrl}
                alt={material.name}
                className="rounded-t-md w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-300">
                  {material.name}
                </h3>
                <p className="text-gray-400">id : {material._id}</p>
                <p className="text-gray-400">
                  Technology: {material.technology}
                </p>
                <p className="text-gray-400">
                  Colors: {material.colors.join(", ")}
                </p>
                <p className="text-gray-400">
                  Price per Gram: ${material.pricePerGram}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MaterialList;
