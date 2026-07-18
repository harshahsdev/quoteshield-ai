import api from "../api/api";

export const getDashboardStats = async () => {
    const res = await api.get("/job/dashboard");
    return res.data;
};

export const getRecentJobs = async () => {
    const res = await api.get("/job/recent");
    return res.data;
};
export const createJob = async (jobdata) => {
    const res = await api.post("/job/createjob", jobdata);
    return res.data;
};
export const uploadQuotation = async (jobId, formData) => {
    const res = await api.post(`/job/${jobId}/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};
export const getJobQuotation = async (jobId) => {
    const res = await api.get(`/job/${jobId}/quotation`);
    return res.data;
}
export const compareQuotation = async (jobId) => {
    const res = await api.get(`/job/${jobId}/compare`);
    return res.data;
}
export const deleteJob = async (jobId) => {
    const res = await api.delete(`/job/${jobId}`);
    return res.data;
};
