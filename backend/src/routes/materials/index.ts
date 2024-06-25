import { Router } from "express";
import materialController from "../../controller/materials-controller";
import multer from "multer";
const path = require("path");

const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const finalImgName = uniqueSuffix + ext;
    req.body.finalImgName = finalImgName;
    cb(null, finalImgName);
  },
});

const upload = multer({ storage });

router.get("/", materialController.getMaterials);

router.get("/:id", materialController.getMaterialById);

router.post("/", upload.single("image"), materialController.addMaterial);

router.put("/:id", upload.single("image"), materialController.updateMaterial);

router.delete("/:id", materialController.deleteMaterial);

export default router;
