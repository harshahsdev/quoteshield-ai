import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadQuotation } from "../../services/jobService";
import toast from "react-hot-toast";
import { compareQuotation } from "../../services/jobService";

const UploadQuotation = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [supplierName, setSupplierName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mode, setMode] = useState("");
    const [vendors, setVendors] = useState([
        {
            supplierName: "",
            file: null,
        },
    ]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const addVendor = () => {
        setVendors([
            ...vendors,
            {
                supplierName: "",
                file: null,
            }
        ])
    }
    const handleVendorChange = (index, value) => {
        const update = [...vendors];
        update[index].supplierName = value;
        setVendors(update);
    }
    const handleVendorFile = (index, file) => {
        const updated = [...vendors];
        updated[index].file = file;
        setVendors(updated);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!supplierName.trim()) {
            setError("Supplier name is required");
            return;
        }
        if (!file) {
            setError("Please select a file to upload");
            return;
        }
        try {
            setLoading(true);
            setError("");

            const formData = new FormData();
            formData.append("supplierName", supplierName);
            formData.append("quotation", file);

            await uploadQuotation(jobId, formData);

            toast.success("Quotation uploaded successfully");
            navigate(`/jobs/quotation/${jobId}`);

        } catch (e) {
            setError(e.response?.data?.message || "Failed to upload quotation. Please try again.");
            setLoading(false);
        }
    }
    const handleCompare = async (e) => {
        e.preventDefault();

        for (const vendor of vendors) {
            if (!vendor.supplierName.trim()) {
                toast.error("Please enter all supplier names.");
                return;
            }

            if (!vendor.file) {
                toast.error("Please upload all quotation files.");
                return;
            }
        }
        try {
            for (const vendor of vendors) {

                const formData = new FormData();

                formData.append("supplierName", vendor.supplierName);
                formData.append("quotation", vendor.file);

                console.log(vendor.supplierName);
                console.log(vendor.file);
                console.log(vendor.file.name);
                console.log(vendor.file.size);

                await uploadQuotation(jobId, formData);
            }
            toast.success("Quotations uploaded successfully");


            navigate(`/jobs/compare/${jobId}`);


        } catch (e) {
            console.log(e.response.data);
            toast.error(
                e.response?.data?.message ||
                "Failed to upload quotations."
            );
        }


    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8">
                {mode === "" && (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div onClick={() => setMode("single")}
                            className="cursor-pointer rounded-xl border-2 border-blue-500 p-6 hover:bg-blue-50 transition">
                            <h2 className="text-xl font-semibold mb-2">
                                📄 Single Analysis
                            </h2>
                            <p className="text-slate-600">
                                Upload one vendor quotation and get AI analysis.
                            </p>
                        </div>
                        <div
                            onClick={() => setMode("compare")}
                            className="cursor-pointer rounded-xl border-2 border-green-500 p-6 hover:bg-green-50 transition"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                📊 Compare Quotations
                            </h2>
                            <p className="text-slate-600">
                                Upload multiple vendor quotations and receive an AI recommendation.
                            </p>
                        </div>
                    </div>
                )}
                {mode === "single" && (
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <p className="mb-4 text-sm text-red-600">{error}</p>
                        )}
                        <div>
                            <button
                                onClick={() => setMode("")}
                                className="mb-6 text-blue-600">
                                ← Back
                            </button>
                            <h1 className="text-3xl font-bold mb-2">
                                Analyze the Quotation
                            </h1>
                            <p className="text-slate-500 mb-8">
                                Upload quotation from a vendors.
                            </p>
                            <label className="block mb-2 font-medium">
                                Supplier Name
                            </label>
                            <input
                                type="text"
                                value={supplierName}
                                onChange={(e) => setSupplierName(e.target.value)}
                                className="border border-slate-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter supplier name"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium mt-4">
                                Select Quotation File
                            </label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {file && (
                            <p className="text-sm  text-slate-500 ">
                                Selected file: <strong>{file.name}</strong>
                            </p>
                        )}

                        <div className="flex justify-end mt-6 ">

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                {loading ? "Uploading..." : "Upload Quotation"}
                            </button>
                        </div>
                    </form>
                )}
                {mode === "compare" && (

                    <div>
                        <button
                            onClick={() => setMode("")}
                            className="mb-6 text-blue-600">
                            ← Back
                        </button>
                        <h1 className="text-3xl font-bold mb-2">
                            Compare Multiple Quotations
                        </h1>
                        <p className="text-slate-500 mb-8">
                            Upload quotations from multiple vendors.
                        </p>
                        {vendors.map((vendor, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-5 mb-5">
                                <h2 className="font-semibold mb-4">
                                    Vendor {index + 1}
                                </h2>
                                <input type="text"
                                    placeholder="Supplier Name"
                                    value={vendors.supplierName}
                                    onChange={(e) => handleVendorChange(index, e.target.value)}
                                    className="w-full border rounded-lg p-3 mb-4" />
                                <input type="file"
                                    onChange={(e) => handleVendorFile(index, e.target.files[0])}
                                    className="w-full border rounded-lg p-3" />
                            </div>
                        ))}
                        <div className="flex gap-4">
                            <button type="button"
                                onClick={addVendor}
                                className="bg-green-600 text-white px-5 py-3 rounded-lg">
                                + Add Another Vendor
                            </button>
                            <button
                                type="button"
                                onClick={handleCompare}
                                disabled={loading}
                                className="bg-blue-600 text-white px-5 py-3 rounded-lg">
                                {loading ? "Uploading.." : "Compare Quotations"}
                            </button>
                        </div>
                    </div>

                )}


            </div>
        </div >
    );
};
export default UploadQuotation;
{/* <h1 className="text-3xl font-bold text-slate-800 mb-2">
                    Upload Quotation

                    </h1>
                    <p className="text-slate-500 mb-8">
                        Upload the Quotation document for AI analysis.
                    </p> */}