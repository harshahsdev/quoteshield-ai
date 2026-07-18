import { Link } from "react-router-dom";
import { FiBriefcase, FiFileText, FiUpload } from "react-icons/fi";


const QuickAction = () =>{
    const action = [
        // {
        //     title:"Add Business",
        //     path:"/jobs/businesses",
        //     icon:<FiBriefcase size={22} />
        // },
         {
            title:"Single Quotation Analysis",
            path:"/jobs/create",
            icon:<FiFileText size={22} />
        },
         {
            title:"Quotation Comparison Ananlysis",
            path:"/jobs/create",
            icon:<FiFileText size={22} />
        },
    ];
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Quick Actions
            </h2>

            <div className="justify-between grid grid-cols-1 md:grid-cols-3 gap-4">
                {action.map((action) =>(
                <Link
                    key={action.title}
                    to={action.path}
                    className="flex items-center  gap-3 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-500 transition"
                    >
                        <div className="text-blue-600">
                            {action.icon} 
                        </div>
                        <span className="font-medium text-slate-700">
                            {action.title}
                        </span>
                    </Link>
                    ))}
            </div>
        </div>
    );
};
export default QuickAction;