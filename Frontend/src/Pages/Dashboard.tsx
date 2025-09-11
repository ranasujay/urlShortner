import { RootState } from "@/main";
import apiConnector from "@/service/apiConnector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/Components/Home/Navbar";

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
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (!populateduserData) {
    return <div className="text-white text-center mt-10">No data found</div>;
  }

  return (
    <div>
      <Navbar />
      
    <div className="bg-slate-900 w-screen h-full p-10">
      <motion.div
        className="max-w-4xl mx-auto bg-slate-800 p-6 rounded-lg shadow-lg text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <h2 className="text-2xl font-semibold mb-4">
          User: {populateduserData.userName}
        </h2>
        <h3 className="text-xl font-semibold mb-4">
          Email: {populateduserData.email}
        </h3>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Links</h2>
          {populateduserData.links.length > 0 ? (
            <motion.ul
              className="space-y-4 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2 }}
            >
              {populateduserData.links.map((link: any) => (
                <Link to={`/link/${link.unqId}`}>
                <motion.li
                  key={link._id}
                  className="mt-4 bg-slate-700 p-4 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-lg font-semibold">Name: {link.name}</p>
                  <p className="text-sm">
                    Created At: {new Date(link.created).toLocaleString()}
                  </p>
                </motion.li>
                </Link>
              ))}
            </motion.ul>
          ) : (
            <p>No links found</p>
          )}
        </div>
      </motion.div>
    </div>
    </div>
  );
};

export default Dashboard;