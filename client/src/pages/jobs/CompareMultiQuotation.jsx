import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowDownLeft } from "react-icons/fi";
import { compareQuotation } from "../../services/jobService";


const CompareQuotation = () => {
    const { jobId } = useParams();

    const navigate = useNavigate();

    const [quotations, setQuotations] = useState([]);
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {

        const fetchComparison = async () => {
            try {
                const res = await compareQuotation(jobId);

                setQuotations(res.quotations);
                setRecommendation(res.recommendation);
            } catch (e) {
                console.log(e);
            } finally {
                setloading(false);
            }
        };
        fetchComparison();
    }, [jobId]);

    if (loading) {
        return (
            <h2 className="text-center mt-10">
                Loading comparison...
            </h2>
        )
    }
    return (
        <div className="max-w-7xl mx-auto p-6">
            <button onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-600 mb-6">
                Back
            </button>

            <h1 className="text-3xl font-bold mb-2">
                Quotation Comparison
            </h1>
            <p className="text-slate-500 mb-8">
                Compare vendor quotations and view AI recommendations.
            </p>

            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <table className="w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-4 text-left">Vendor</th>
                            <th className="p-4 text-left">Anount</th>
                            <th className="p-4 text-left">GST</th>
                            <th className="p-4 text-left">Delivery</th>
                            <th className="p-4 text-left">Warranty</th>
                            <th className="p-4 text-left">Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotations.map((quote, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-4">{quote.supplierName}</td>
                                <td className="p-4">{quote.totalAmount || "Not Mentioned"}</td>
                                <td className="p-4">{quote.gst || "Not Mentioned"}</td>
                                <td className="p-4">{quote.deliveryTime || "Not Mentioned"}</td>
                                <td className="p-4">{quote.warranty || "Not Mentioned"}</td>
                                <td className="p-4"><span 
                                    className={`px-3 py-1 rounded-full text-sm font-semibold
                                ${
                                    quote.riskScore <= 20
                                    ? "bg-green-100 text-green-700"
                                    : quote.riskScore <= 40
                                    ? "bg-lime-100 text-lime-700"
                                    : quote.riskScore <= 60
                                    ? "bg-yellow-100 text-yellow-700"
                                    : quote.riskScore <= 80
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                                >
                                    {quote.riskScore}/100
                                    </span>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-green-50 border border-green-300 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                    🏆 AI Recommendation
                </h2>
                <p className="mb-2">
                    <strong>Best Vendor: </strong>{" "}
                    {recommendation?.bestVendor}
                </p>
                <p className="text-slate-700">
                    {recommendation?.reason}
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
    {quotations.map((quote, index) => (
        <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6"
        >
            <h2 className="text-xl font-bold mb-4">
                {quote.supplierName}
            </h2>

            <div className="space-y-2">
                <p>
                    <strong>Total Amount:</strong> {quote.totalAmount || "Not Mentioned"}
                </p>

                <p>
                    <strong>GST:</strong> {quote.gst || "Not Mentioned"}
                </p>

                <p>
                    <strong>Delivery:</strong> {quote.deliveryTime || "Not Mentioned"}
                </p>

                <p>
                    <strong>Warranty:</strong> {quote.warranty || "Not Mentioned"}
                </p>

                <p>
                    <strong>Payment Terms:</strong> {quote.paymentTerms || "Not Mentioned"}
                </p>

                <p>
                    <strong>Risk Score:</strong> {quote.riskScore}
                </p>
                <p>
                    <strong>Risk Level:</strong>{" "}
                    {quote.riskScore <= 20
                    ? "🟢 Very Low"
                    : quote.riskScore <= 40
                    ? "🟢 Low"
                    : quote.riskScore <= 60
                    ? "🟡 Medium"
                    : quote.riskScore <= 80
                    ? "🟠 High"
                    : "🔴 Critical"
                    }
                </p>
                
            </div>
        </div>
    ))}

            </div>
        </div>
    )

}
export default CompareQuotation;