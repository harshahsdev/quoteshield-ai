import express from 'express';
import { createjob, getJobById, getJobQuotations, uploadQuotation, getDashboardStats, recentJobs, CompareQuotations, deleteJob } from '../controllers/JobController.js';
import { verifyAuth } from '../middleware/authMiddleware.js';
import { upload } from '../uploads/multerConfig.js';



const router = express.Router();

router.post('/createjob', verifyAuth,createjob);
router.get("/:jobId/compare", verifyAuth, CompareQuotations);
router.get("/dashboard", verifyAuth, getDashboardStats);
router.get("/recent", verifyAuth, recentJobs);
router.get('/:id', verifyAuth, getJobById);
router.post("/:jobId/upload", verifyAuth, upload.single("quotation"), uploadQuotation);
router.get("/:jobId/quotation", verifyAuth, getJobQuotations);
router.delete("/:jobId", verifyAuth, deleteJob);



export default router;
