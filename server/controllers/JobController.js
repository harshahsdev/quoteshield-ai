import { json } from 'stream/consumers';
import Job from '../models/job.js';
import { Quotation } from '../models/Quotation.js';
import { analyzeQuotation, compareQuotationsAI } from '../services/geminiService.js';
import fs from 'fs';
import pdf from "pdf-parse";

export const createjob = async (req, res) => {
    try {
        const { jobName, description } = req.body;

        const job = await Job.create({
            jobName,
            description,
            status: 'pending',
            createdBy: req.user._id,
            userId: req.user.id
        });
        res.status(201).json({ success: true, job });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job found", job });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const uploadQuotation = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "NO PDF uploaded"
            });
        }
        // read pdf
        const pdfBuffer = fs.readFileSync(req.file.path);

        // console.log("Original Name:", req.file.originalname);
        // console.log("File Size:", req.file.size);
        // console.log("Buffer Length:", pdfBuffer.length);
        // console.log("File Path:", req.file.path);

        // extract text
        const pdfdata = await pdf(pdfBuffer);

        const quotationText = pdfdata.text;

        const aiResponse = await analyzeQuotation(quotationText);


        console.log(aiResponse);


        const analysis = JSON.parse(aiResponse);

        //save to mongoDB
        const quotation = await Quotation.create({
            userId: req.user.id,
            jobId: req.params.jobId,
            supplierName: req.body.supplierName,
            fileName: req.file.originalname,
            fileUrl: req.file.path,
            aiAnalysis: analysis,
            extractedText: quotationText
        });

        await Job.findByIdAndUpdate(req.params.jobId, { status: 'completed' });

        res.status(201).json({
            success: true,
            message: "Quotation uploaded and analyzed successfully",
            quotation: {
                _id: quotation._id,
                supplierName: quotation.supplierName,
                fileName: quotation.fileName,
                aiAnalysis: quotation.aiAnalysis,
                createdAt: quotation.createdAt
            }
        });


    } catch (err) {
        res.status(500).json({ message: err.message });

    }
};
export const getJobQuotations = async (req, res) => {
    try {
        const quotation = await Quotation.find({
            jobId: req.params.jobId
        });
        res.status(200).json(quotation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getDashboardStats = async (req, res) => {
    try {

        const userId = req.user.id;

        const totalJobs = await Job.countDocuments({ userId });
        const completedJobs = await Job.countDocuments({
            userId,
            status: 'completed'
        });
        const pendingJobs = await Job.countDocuments({
            userId,
            status: 'pending'
        });

        res.status(200).json({
            success: true,
            stats: {
                totalJobs,
                pendingJobs,
                completedJobs
            },
        });
    } catch (err) {
        console.error("Dashboard stats error:", err);

        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics"
        });
    }
};
export const recentJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const jobs = await Job.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5);
        res.status(200).json({
            success: true,
            jobs

        });

    } catch (e) {
        console.error("Recent jobs error:", e);
        res.status(500).json({
            success: false,
            message: "Failed to fetch recent jobs"
        });
    }
};
export const CompareQuotations = async (req, res) => {
    try {
        const { jobId } = req.params;

        const quotations = await Quotation.find({ jobId });

        if (!quotations || quotations.length < 2) {
            return res.status(400).json({
                success: false,
                message: "At least two quotations are required to comparision."
            });
        }
        const quotationData = quotations.map((q) => ({
            supplierName: q.supplierName,
            vendorName: q.aiAnalysis.vendorName,
            totalAmount: q.aiAnalysis.totalAmount,
            gst: q.aiAnalysis.gst,
            currency: q.aiAnalysis.currency,
            paymentTerms: q.aiAnalysis.paymentTerms,
            deliveryTime: q.aiAnalysis.deliveryTime,
            warranty: q.aiAnalysis.warranty,
            missingInformation: q.aiAnalysis.missingInformation,
            riskScore: q.aiAnalysis.riskScore
        }));
        console.log("Quotation Data:");
        console.log(JSON.stringify(quotationData, null, 2));

        const aiResponse = await compareQuotationsAI(quotationData);


        console.log(aiResponse);


        const recommendation = JSON.parse(aiResponse);

        res.status(200).json({
            success: true,
            quotations: quotationData,
            recommendation
        });

    } catch (e) {
        console.error("compare quotation error", e);

        res.status(500).json({
            success: false,
            message: e.message
        });

    }
};
export const deleteJob = async (req, res) => {
    try{
        const { jobId } = req.params;

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
        if(job.userId.toString() !== req.user.id){
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }
        await Quotation.deleteMany({ jobId });

        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
                success: false,
                message: "job deleted Successfully"
            });

    }catch (e){
        console.error("Delete Job Error:", e);

        res.status(500).json({
            success: false,
            message: "Failed to delete job"
        });
    }
}