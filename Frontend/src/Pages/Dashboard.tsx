import { RootState } from "@/main";
import apiConnector from "@/service/apiConnector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/Components/Home/Navbar";
import { FiExternalLink, FiBarChart, FiCalendar, FiTrendingUp, FiLink, FiPlus } from "react-icons/fi";
import { Button } from "@/Components/ui/button";

const Dashboard = () => {
  const [populateduserData, setpopulateduserData] = useState<any>(null);
  const [loading, setloading] = useState(false);

  const { userData } = useSelector((state: RootState) => state.User);

  const fetchuserdata = async () => {
    setloading(true);
    try {
      const response = await apiConnector(
        "POST",
        `${import.meta.env.VITE_BASE_URL}/getuser`,
        { email: userData?.email }
      );

      if (response.data.success) {
        setpopulateduserData(response.data.data);
      } else {
        throw new Error("error occured while fetching user data");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred");
      }
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (userData && userData.email) {
      fetchuserdata();
    }
  }, [userData]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading your dashboard...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!populateduserData) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FiLink className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-white text-xl mb-2">No data found</p>
            <p className="text-slate-400">Start by creating your first short link!</p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700">
              <FiPlus className="w-4 h-4 mr-2" />
              Create Link
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Welcome back, <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">{populateduserData.userName.split(" ")[0]}</span>! 👋
          </h1>
          <p className="text-slate-400 text-lg">{populateduserData.email}</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {[
            {
              title: "Total Links",
              value: populateduserData.links.length,
              icon: <FiLink className="w-6 h-6" />,
              color: "from-blue-500 to-blue-600",
              bgColor: "bg-blue-500/10"
            },
            {
              title: "This Month",
              value: populateduserData.links.filter((link: any) => {
                const linkDate = new Date(link.created);
                const now = new Date();
                return linkDate.getMonth() === now.getMonth() && linkDate.getFullYear() === now.getFullYear();
              }).length,
              icon: <FiCalendar className="w-6 h-6" />,
              color: "from-purple-500 to-purple-600",
              bgColor: "bg-purple-500/10"
            },
            {
              title: "Performance",
              value: populateduserData.links.length > 0 ? "Good" : "New",
              icon: <FiBarChart className="w-6 h-6" />,
              color: "from-orange-500 to-orange-600",
              bgColor: "bg-orange-500/10"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl hover:bg-slate-800/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor} text-white`}>
                  {stat.icon}
                </div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
              </div>
              <h3 className="text-slate-400 font-medium">{stat.title}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Links Section */}
        <motion.div
          className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FiLink className="w-6 h-6" />
              Your Links
            </h2>
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
              <FiPlus className="w-4 h-4 mr-2" />
              New Link
            </Button>
          </div>

          {populateduserData.links.length > 0 ? (
            <div className="space-y-4">
              {populateduserData.links.map((link: any, index: number) => (
                <Link key={link._id} to={`/link/${link.unqId}`}>
                  <motion.div
                    className="bg-slate-700/30 border border-slate-600/50 p-4 rounded-lg hover:bg-slate-700/50 hover:border-slate-500/70 transition-all duration-300 group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-green-400 transition-colors">
                          {link.name}
                        </h3>
                        <p className="text-slate-400 text-sm flex items-center gap-2">
                          <FiCalendar className="w-4 h-4" />
                          Created: {new Date(link.created).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-green-400 font-semibold">Active</p>
                          <p className="text-slate-400 text-sm">Status</p>
                        </div>
                        <FiExternalLink className="w-5 h-5 text-slate-400 group-hover:text-green-400 transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <FiLink className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-white text-xl mb-2">No links created yet</h3>
              <p className="text-slate-400 mb-6">Start by creating your first short link to see it here!</p>
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                <FiPlus className="w-4 h-4 mr-2" />
                Create Your First Link
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;