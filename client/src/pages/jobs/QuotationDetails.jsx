import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobQuotation } from "../../services/jobService";
import { FiArrowLeft } from "react-icons/fi";

const QuotationDetails = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const [quotation, setQuotation ] = useState(null);
    const [loading, setloading ] = useState(true);

    useEffect(() => {
        const fetchQuotation = async () => {
            try{
                const res = await getJobQuotation(jobId);
                console.log(res);
                setQuotation(res[0]);
            }catch(e){
                console.log(e);
            }finally {
                setloading(false);
            }
        };
        fetchQuotation();
    }, [jobId]);

    if(loading){
        return <h2 className="text-center mt-10">Loading...</h2>
    }
    if(!quotation){
        return (
            <h2 className="text-center mt-10 text-red-600">
                No quotation found.
            </h2>
        )
    }
    const ai = quotation.aiAnalysis;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <button 
                    onClick={() => navigate(`/jobs/upload/${jobId}`)}
                    className="mb-6 px-4 py-2 bg-slate-200  font-bold text-black-800 rounded-lg border border-slate-300 hover:bg-slate-300"
                >
                    Back
                    
                </button>
            <div className="bg-white shadow rounded-xl p-6">
                <h1 className="text-3xl font-bold mb-6">
                                    AI-Powered Quotation Analysis
                </h1>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <p><strong>Supplier Name:</strong> {quotation.supplierName}</p>
                        <p><strong>File Name:</strong> {quotation.fileName}</p>
                        <p><strong>Currency:</strong> {quotation.Currency}</p>
                        <p><strong>Risk Score:</strong>{" "} 
                        <span className="text-blue-600 font-semibold">
                            {ai.riskScore}
                            </span></p>
                    </div>
                    <div>
                        <p>
                            <strong>Vendor Name:</strong>{" "}
                            {ai.vendorName || "Not Available"}
                        </p>
                        <p>
                            <strong>Total Amount:</strong>{" "}
                            {ai.totalAmount || "Not Available"}
                        </p>
                        <p>
                            <strong>GST:</strong>{" "}
                            {ai.gst  || "Not Available"}
                        </p>
                        <p>
                            <strong>Delivery:</strong>{" "}
                            {ai.deliveryTime }
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Payment terms 
                </h2>
                <p>{ai.paymentTerms }</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Waranty
                </h2>
                <p>{ai.warranty}</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Missing Information 
                </h2>
                <ul className="list-disc list-inside space-y-2">
                    {ai.missingInformation.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Etracted Text
                </h2>
                <div className="bg-slate-100 rounded-lg p-4 max-h-80 overflow-y-auto whitespace-pre-wrap">
                    {quotation.extractedText}
                </div>
            </div>
        </div>
    );

};
export default QuotationDetails;