import { useAuth } from "../context/AuthContext";
import StatCard from '../components/Dashboard/StatCard';
import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/jobService";
import {
  FiHome,
  FiBriefcase,
  FiFileText,
  FiUpload,
  FiCpu,
  FiUser,
  FiLogOut,
  FiClock,
} from "react-icons/fi";
import QuickAction from "../components/Dashboard/QuickActions";
import RecentJobs from "../components/Dashboard/RecentJobs";

const Dashboard = () => {
  const { user} = useAuth();

  const [stats, setStats ] = useState({
    totalJobs : 0,
    pendingJobs : 0,
    completedJobs : 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try{
        const res = await getDashboardStats();
        console.log(res);
        setStats(res.stats);
      }catch(err){
        console.log(err);
      }
    };
    fetchStats();
  }, [] );

  

  return (
    <div className="space-y-8">
      <div >
        <h1 className="text-3xl font-bold text-slate-800">
        Welcome back, {user?.name}
        </h1>

        <p className="text-slate-500 mt-2">
          Here's what's happening today.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* <StatCard
        title="Businesses"
        value={0}
        icon={<FiBriefcase size={28}/>}
        /> */}
        <StatCard
        title="Jobs"
        value={stats.totalJobs}
        icon={<FiFileText  size={28}/>}
        />
        {/* <StatCard
        title="AI Analysis"
        value={stats.completedJobs}
        icon={<FiCpu  size={28}/>}
        /> */}
        <StatCard
        title="Pending Quotes"
        value={stats.pendingJobs}
        icon={<FiClock  size={28}/>}
        />
        

      </div>
      <QuickAction />
      <RecentJobs/>
    </div>
  );
};

export default Dashboard;