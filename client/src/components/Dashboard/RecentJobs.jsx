import { useState, useEffect } from "react";
import { getJobQuotation, getRecentJobs, compareQuotation, deleteJob } from "../../services/jobService";
import { useNavigate } from "react-router-dom";

const RecentJobs = () => {
    const navigate = useNavigate();



    const [jobs, setJobs] = useState([]);

    const handleJobClick = async (jobId) => {
        const res = await getJobQuotation(jobId);
        console.log(res);

        if (res.length > 2) {
            navigate(`/jobs/compare/${jobId}`);
        } else if (res.length === 1 ) {
            navigate(`/jobs/quotation/${jobId}`);
        }
    }
    const handleDelete = async (e, jobId) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
        await deleteJob(jobId);

        setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
        console.log(err);
        alert("Failed to delete job.");
    }
};

    useEffect(() => {
        const fetchRecentJobs = async () => {
            try {
                const res = await getRecentJobs();
                setJobs(res.jobs);
            } catch (e) {
                console.log(e);
            }
        }
        fetchRecentJobs();


    }, []);

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Recent Jobs
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="py-3">Company</th>
                            <th className="py-3">Status</th>
                            <th className="py-3">Action</th>
                            <th className="py-3">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {jobs.map((job) => {
                            return (
                                <tr key={job._id}
                                    onClick={() => {
                                
                                        handleJobClick(job._id)}}
                                    className="cursor-pointer hover:bg-slate-50">
                                    <td className="py-3">
                                        {job.jobName}
                                    </td>
                                    <td className="py-3">
                                        {job.status}
                                    </td>
                                    <td className="py-3">
                                        <button onClick={(e) => handleDelete(e, job._id)}
                                            className="text-red-600 hover:text-red-800">
                                            🗑 Delete{}
                                        </button>
                                    </td>
                                    <td className="py-3">
                                        {new Date(job.createdAt).toLocaleDateString()}

                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>

        </div>
    );

};
export default RecentJobs;