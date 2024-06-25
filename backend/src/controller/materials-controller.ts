import { Request, Response } from "express";
import Material from "../models/materials"; // Assuming your Material model is in ../models/materials

// Interface for Material properties (optional, for type safety)
interface MaterialProps {
  name: string;
  technology: string;
  colors: string;
  pricePerGram: number;
  imageUrl: string;
}

class MaterialController {
  // Fetch all materials
  public async getMaterials(req: Request, res: Response) {
    try {
      const materials = await Material.find({});
      res.status(200).json(materials);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching materials" });
    }
  }

  // Fetch a material by ID
  public async getMaterialById(req: Request, res: Response) {
    try {
      const material = await Material.findById(req.params.id);
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
      res.status(200).json(material);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching material" });
    }
  }

  // Add a new material
  public async addMaterial(req: Request, res: Response) {
    try {
      console.log(req.body);
      const { name, technology, colors, pricePerGram, finalImgName } = req.body;
      const Arraycolors = colors
        .split(",")
        .map((color: string) => color.trim());
      console.log(Arraycolors);
      if (!req.file) {
        return res.status(400).json({ message: "Error: No image uploaded" });
      }
      // const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";
      // const imageUrl = `${BACKEND_URL}/dist/uploads/${finalImgName}`;
      const imageUrl = finalImgName;

      const newMaterial = new Material({
        name,
        technology,
        colors: Arraycolors,
        pricePerGram,
        imageUrl,
      });
      await newMaterial.save();
      res.status(201).json(newMaterial);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // Update a material
  public async updateMaterial(req: Request, res: Response) {
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
      console.error(err);
      res.status(500).json({ error: "Error updating material" });
    }
  }

  // Delete a material
  public async deleteMaterial(req: Request, res: Response) {
    try {
      const material = await Material.findByIdAndDelete(req.params.id);
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
      res.status(200).json({ message: "Material deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error deleting material" });
    }
  }
}

const materialController = new MaterialController();

export default materialController;
