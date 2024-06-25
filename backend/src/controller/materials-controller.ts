import { Request, Response } from "express";
import Material from "../models/materials";
import { getSignedImgUrl } from "../utilis";

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

      const promises = materials.map(async (material) => {
        const imageUrl = material.imageUrl;
        const signedUrlPromise = await getSignedImgUrl(imageUrl);
        material.imageUrl = signedUrlPromise || "";

        return material;
      });

      const materialsWithUrls = await Promise.allSettled(promises);

      const materialsData = materialsWithUrls.map((result: any) => {
        if (result.status === "fulfilled") {
          return result.value;
        } else {
          console.error(
            "Error generating signed URL for material:",
            result.value._id
          );
          return result.value;
        }
      });

      res.status(200).json(materialsData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching materials" });
    }
  }

  public async getMaterialById(req: Request, res: Response) {
    try {
      const material: any = await Material.findById(req.params.id);
      material.imageUrl = await getSignedImgUrl(material.imageUrl);
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

  public async updateMaterial(req: Request, res: Response) {
    try {
      const material = await Material.findById(req.params.id);
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }

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
