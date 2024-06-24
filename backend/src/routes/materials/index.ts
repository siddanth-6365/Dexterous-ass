import { Router } from 'express';
import materialController from "../../controller/materials-controller";
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', materialController.getMaterials);

// Fetch a specific material by ID
router.get('/:id', materialController.getMaterialById);

// Add a new material
router.post('/', upload.single('image'), materialController.addMaterial);

// Update a material
router.put('/:id', upload.single('image'), materialController.updateMaterial);

// Delete a material
router.delete('/:id', materialController.deleteMaterial);


export default router;