import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        jobName: {
            type: String,
            required: true
        },
        description: String,
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending'
        },
    },
    { timestamps: true }
);
const Job = mongoose.model("Job", jobSchema);

export default Job;