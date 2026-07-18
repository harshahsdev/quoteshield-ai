import { useAuth } from "../context/AuthContext";
import { FiUser, FiMail, FiCalendar, FiLogOut } from "react-icons/fi";

const Profile = () => {
    const { user, logout } = useAuth();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-32"></div>
                <div className="px-8 pb-8">
                    <div className="-mt-14 flex flex-col items-center">
                        <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-bold text-slate-800">
                            {user?.name}
                        </h2>

                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-10">
                        <div className="flex items-center gap-4 p-4 rounded-lg border">
                            <FiUser size={22} className="text-blue-600" />
                            <div>
                                <p className="text-sm text-slate-500">Full Name</p>
                                <p className="font-semibold">{user?.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-lg border">
                            <FiMail size={22} className="text-blue-600" />
                            <div>
                                <p className="text-sm text-slate-500">Email</p>
                                <p className="font-semibold">{user?.email}</p>
                            </div>
                        </div>
                        <div className="mt-10 flex justify-end">
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                <FiLogOut />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;