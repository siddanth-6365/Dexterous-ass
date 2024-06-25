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
                src={`${material.imageUrl}?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCmV1LW5vcnRoLTEiRzBFAiEAv%2F6oIyxzKJQS7S91HAa9%2FGaCAa%2FbPyVzUEIuVYOnUDQCIB9JBUNtS%2FAM5fkI9ztqYksRz%2FSPke7h0M6D8pnQWOh%2BKu0CCLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMMzk5MTg2NzkzNzQ3IgxauLoSH8QxDKwdHMoqwQL7kKZ6HK7bFujRtSwZfJF%2F2Sga%2BWvullWdvQ%2FQTLBgMKnh1sjXyJnFEYvyDuV2dB9l%2BhPpJFIDKmFMMbkx2lbfuXfh%2Bg9oIpumx2MR%2FvSHjYOPYn8HEBO7an0S4FXVUp5CglqNiRvj5VIU9Unp%2FEV1%2BUCPMG9EJHmCcprSvWZ9%2FPuOY%2FWSUCWG1xVxoYM751%2BgfFw6ZJRIO5eWq4wMizULBlz3GWVvofPBURY8%2Bl0%2BbLW%2BTgqWkn%2F4K6AKi8BrQhcdbW2tWOkIRSb8VAh%2BfLjp%2BX4hO29fa%2F1WrSt%2FJcxncBjNThxtyMdZrafNUyr8HgM%2F6XhFgoe%2BZ2AFfCMZdj13JQaOkoU5GTm4zvTAUJFkguwSFMFaJAoNViBAMykbrJyZqlM8BShMU8JlV2oQYAdYKxUWSRmj1J62omjnFHW7XPUw%2B7vqswY6swLW3mM%2BsdNWtSQ4P9mze%2FiktSfy1veeDdiYBr98lXz5xMOwwBew2po4ZFG1wABADWF%2BGEGUv%2B0F2t8TysMZE4eBMIrO8ddro5w5gRmAyJh8twP7br2f8tUhs8O39SmPuZRjiUPuJKIBEIZX7JSRtcCEtEUUsJ23uZNkF7NbcP%2B1%2FoKZ18iWLk9OXZMmQFk636LRxQofH6aH9peASdle0mhcWUvOBRg32x%2F2hmaE7Yu0WeWJZ3FBOYgvzZHfi3QTt7OfXURrb2aFWVnYLKvHt8%2BIq3v5jxU1V8lBXLhMtyaKemVheeOz2Rp0GlXYs2iAozzCTIpOcZT8%2BGyHLJbrfRZiUSyBmE8vaITtnDLhMlcgur7D5uwOlzljNWWIKKrQ5tg4cG9nRYJPgDREyvWXd4Xf9piK&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240625T113521Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAVZ4LDCUJSBPIBXX2%2F20240625%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=61cb155e506488c3e871e404ed593f8f7db7561574001e0a5f7d5de7c2eb439f`}
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
