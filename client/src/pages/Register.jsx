import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";


const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await registerUser(formData);
            toast.success("Registration successful!");

            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Register failed");
            toast.error(err.response?.data?.message || "Register failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-800">
                        QuoteShieldAI
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Create your account.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Name
                        </label>
                        <input type="text"
                            name="name"
                            placeholder="Enter Your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-lg px-4 py-2 pr-16 outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 text-sm"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>
                <p className="text-center text-sm text-slate-600 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-600 hover:underline font-medium"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
};
export default Register;