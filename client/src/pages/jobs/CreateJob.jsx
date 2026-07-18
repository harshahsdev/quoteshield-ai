import { useState } from "react";
import { createJob } from "../../services/jobService";
import { useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
const CreateJob = () => {
const navigate = useNavigate();

const [jobData, setJobData] = useState({
    jobName: "",
    description: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleChange = (e) => {
    setJobData({
        ...jobData,
        [e.target.name] : e.target.value,
    });
};
const handleSubmit = async (e) => {
    e.preventDefault();

    if(!jobData.jobName.trim()){
        setError("Job name is required");
        return;
    }

    try{
        setLoading(true);
        setError("");

        const res = await createJob(jobData);

        toast.success("Job created successfully!");
        navigate(`/jobs/upload/${res.job._id}`);
    } catch (e){
        setError(e.response?.data?.message || "Failed to create job");
    }finally{
        setLoading(false);
    }
};

return (
    <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Create Job
            </h1>
            <p className="text-slate-500 mb-8">
                Fill in the details below to create a new quotation Job.
            </p>
            {
                error && (
                    <div className="mb-6 rounded-lg bg-red-100 border border-red-300 text-red-700 p-3">
                        {error}
                    </div>
                )
            }
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                        Job Name 
                    </label>
                    <input 
                        type="text"
                        name="jobName"
                        value={jobData.jobName}
                        onChange={handleChange}
                        className="bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter job name"
                    />

                </div>
                <div>
                    <label className="blcok text-sm font-medium text-slate-700 mb-2">
                        Description
                    </label>
                    <textarea
              rows="5"
              name="description"
              value={jobData.description}
              onChange={handleChange}
              placeholder="Enter job description..."
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-4">
                <button 
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-100 transition">
                    Cancel
                </button>

                <button 
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50">
                    {loading ? "Creating...": "Create Job"}
                </button>
            </div>

                </div>
            </form>

        </div>

    </div>
);
};
export default CreateJob;

