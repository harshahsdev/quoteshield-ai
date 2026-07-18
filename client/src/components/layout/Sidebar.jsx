import { NavLink } from "react-router-dom";
import {
    FiHome,
    FiBriefcase,
    FiFileText,
    FiUpload,
    FiCpu,
    FiUser,
    FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
    const { logout } = useAuth();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FiHome size={20} />,
        },
        // {
        //     name: "Add Business",
        //     path: "/businesses/create",
        //     icon: <FiBriefcase size={22} />,
        // },
        {
            name: "Create Job",
            path: "/jobs/create",
            icon: <FiFileText size={22} />,
        },
        // {
        //     name: "Upload Quote",
        //     path:"/upload",
        //     icon: <FiUpload size={20} />,
        // },
        // {
        //     name: "AI Analysis",
        //     path:"/analysis",
        //     icon: <FiCpu size={20} />,
        // },
        {
            name: "Profile",
            path: "/profile",
            icon: <FiUser size={20} />
        },
    ];

    return (
        <aside className="w-60 bg-slate-900 text-white flex flex-col">
            <div className="h-16 flex items-center justify-center border-b border-slate-700">
                <h1 className="text-2xl font-bold text-blue-400">
                    QuoteShieldAI
                </h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800 text-slate-300"
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-700">
                <button
                    onClick={logout}
                    className="w-full flex-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition"
                >
                    <FiLogOut size={20} />
                    Logout
                </button>
            </div>

        </aside>
    );
};
export default Sidebar;