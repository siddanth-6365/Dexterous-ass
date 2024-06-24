import { Request, Response } from "express";
import Material from "../models/materials";

// Fetch all materials
const getMaterials = async (req: Request, res: Response) => {
  try {
    const materials = await Material.find({}, "-imageUrl");
    res.status(200).json(materials);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Fetch a material by ID
const getMaterialById = async (req: Request, res: Response) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }
    res.status(200).json(material);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Add a new material
const addMaterial = async (req: Request, res: Response) => {
  try {
    const { name, technology, colors, pricePerGram } = req.body;
    const imageUrl = req.file?.path || "";
    const newMaterial = new Material({
      name,
      technology,
      colors,
      pricePerGram,
      imageUrl,
    });
    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Update a material
const updateMaterial = async (req: Request, res: Response) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }

    const { name, technology, colors, pricePerGram } = req.body;
    const imageUrl = req.file?.path || material.imageUrl;

    material.name = name || material.name;
    material.technology = technology || material.technology;
    material.colors = colors || material.colors;
    material.pricePerGram = pricePerGram || material.pricePerGram;
    material.imageUrl = imageUrl;

    await material.save();
    res.status(200).json(material);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Delete a material
const deleteMaterial = async (req: Request, res: Response) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }
    res.status(200).json({ message: "Material deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const materialController = {
  getMaterials,
  getMaterialById,
  addMaterial,
  updateMaterial,
  deleteMaterial,
};

export default materialController;
