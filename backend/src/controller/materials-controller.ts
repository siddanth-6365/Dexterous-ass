import { Request, Response } from "express";
import Material from "../models/materials";

interface MaterialProps {
  name: string;
  technology: string;
  colors: string;
  pricePerGram: number;
  imageUrl: string;
}

class MaterialController {
  public async getMaterials(req: Request, res: Response) {
    try {
      const materials = await Material.find({});
      res.status(200).json(materials);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching materials" });
    }
  }

  public async getMaterialById(req: Request, res: Response) {
    try {
      console.log(req.params.id);
      const material = await Material.findById(req.params.id);
      console.log(material);
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
      res.status(200).json(material);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching material" });
    }
  }

  public async addMaterial(req: Request, res: Response) {
    try {
      const { name, technology, colors, pricePerGram, finalImgName } = req.body;
      const Arraycolors = colors
        .split(",")
        .map((color: string) => color.trim());

      const imageUrl = req.file ? (req.file as any).location : finalImgName;

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

  public async updateMaterial(req: Request, res: Response) {
    try {
      const material = await Material.findById(req.params.id);
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
      console.log(req.body);

      const { name, technology, colors, pricePerGram, finalImgName } = req.body;
      const imageUrl = finalImgName;

      material.name = name || material.name;
      material.technology = technology || material.technology;
      material.colors = colors || material.colors;
      material.pricePerGram = pricePerGram || material.pricePerGram;
      material.imageUrl = imageUrl || material.imageUrl;

      await material.save();
      res.status(200).json(material);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error updating material" });
    }
  }

  public async deleteMaterial(req: Request, res: Response) {
    try {
      const material = await Material.findByIdAndDelete(req.params.id);
      console.log(material);
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
