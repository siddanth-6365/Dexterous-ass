import { Router } from 'express';
import materialRoutes from './materials';

const router = Router();

router.use('/materials', materialRoutes);

export default router;