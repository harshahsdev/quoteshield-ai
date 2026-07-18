import { useState }  from "react";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login=()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const {login, loading} = useAuth();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");

        try{
            await login({email, password});

            toast.success("Login successful!");

            navigate("/dashboard");
        }catch(err){
            setError(err.response?.data?.message || "Login failed");
        }
    }


return(
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-800">
                    QuoteShieldAI
                </h1>
                <p className="text-slate-500 mt-2">
                    Welcome back! Please login to continue.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                        Email
                    </label>
                    <input type="email"
                    placeholder="Enter your email"
                    className="w-full border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
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
                    placeholder="Enter your password"
                    className="w-full border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    />
                    <button 
                    type="button"
                    onClick={()=> setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-600 hover:text-indigo-800">
                        {showPassword ? "Hind" : "show"}
                    </button>
                    </div>
                </div>
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}
                <button 
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                    {loading ? "Logging in..":"Login"}
                </button>

            </form>
            <p className="mt-6 text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <Link 
                to="/register"
                className="text-indigo-600 font-medium hover:underline">
                    Register
                </Link>
            </p>
        </div>
    </div>
)
};
export default Login;