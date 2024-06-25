import { Router } from "express";
import materialController from "../../controller/materials-controller";
import { upload } from "../../middlewares/multer";

const router = Router();

router.get("/", materialController.getMaterials);

router.get("/:id", materialController.getMaterialById);

router.post("/", upload.single("image"), materialController.addMaterial);

router.put("/:id", upload.single("image"), materialController.updateMaterial);

router.delete("/:id", materialController.deleteMaterial);

export default router;
