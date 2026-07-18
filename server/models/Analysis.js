import mongoose from 'mongoose';

const analysisSchema = mongoose.Schema({
    quotationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Quotation'
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    riskScore: {
        type: Number,
        required: true
    },
    hiddenCharges: {
        type: Boolean,
        required: true
    },
    paymentTerms: {
        type: String,
        required: true
    },
    deliveryTerms: {
        type: String,
        required: true
    },
    recommendation: {
        type: String,
        required: true
    },
    bestSupplier: String,
    comparisonSummary: String,
});
export const Analysis = mongoose.model("Analysis", analysisSchema);