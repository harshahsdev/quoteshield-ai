import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    supplierName: {
      type: String,
      required: true
    },

    fileName: {
      type: String,
      required: true
    },

    fileUrl: {
      type: String,
      required: true
    },

    extractedText: {
      type: String,
      required: true
    },

    aiAnalysis: {
      vendorName: String,
      totalAmount: String,
      gst: String,
      currency: String,
      paymentTerms: String,
      deliveryTime: String,
      warranty: String,
      missingInformation: [String],
      riskScore: Number
    }
  },
  {
    timestamps: true
  }
);

export const Quotation = mongoose.model("Quotation", quotationSchema);