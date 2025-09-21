
import apiConnector from "@/service/apiConnector";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import { FaLink, FaCopy, FaDownload, FaTrash } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import { StatsCharts } from "@/Components/StatsCharts";
import toast from "react-hot-toast";
import Navbar from "@/Components/Home/Navbar";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiExternalLink, FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";

const LinkDetails = () => {
  const { id } = useParams();
  const [urlData, seturlData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUrlData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiConnector(
        "GET",
        `${import.meta.env.VITE_BASE_URL}/url/${id}`
      );

      if (!response) {
        throw new Error("Could not get response");
      } else {
        seturlData(response.data.urlData);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrlData();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(urlData.shortUrl);
    toast.success("Short URL copied to clipboard!");
  };

  const handleDownload = () => {
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${urlData.name}_QRCode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDelete = async () => {
    try {
      const response = await apiConnector(
        "DELETE",
        `${import.meta.env.VITE_BASE_URL}/deleteUrl/${id}`
      );
      if (response.data.success) {
        toast.success("URL deleted successfully!");
        window.history.back();
      } else {
        toast.error("Failed to delete URL");
      }
    } catch (error) {
      console.error("Error deleting URL:", error);
      toast.error("Error deleting URL");
    }
  };

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
            <FiLoader className="w-16 h-16 text-green-400 mx-auto mb-4 animate-spin" />
            <p className="text-white text-lg">Loading link details...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
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
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <p className="text-red-400 text-xl mb-4">{error}</p>
            <Link to="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700">
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!urlData) {
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
            <div className="text-slate-400 text-6xl mb-4">📋</div>
            <p className="text-white text-xl mb-4">No data found</p>
            <Link to="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700">
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300 mb-6">
          <FiArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Column - Link Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <motion.div 
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                {urlData.name}
              </h1>
              
              <div className="space-y-4">
                {/* Short URL */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="text-slate-300 font-medium min-w-fit">Short URL:</span>
                  <div className="flex items-center gap-3 flex-1">
                    <a
                      href={urlData.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 transition-colors duration-300 font-mono bg-slate-700/30 px-3 py-2 rounded-lg flex-1 truncate"
                    >
                      {urlData.shortUrl}
                    </a>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 shrink-0"
                      onClick={handleCopy}
                    >
                      <FaCopy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Original URL */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="text-slate-300 font-medium min-w-fit">Original URL:</span>
                  <a
                    href={urlData.originalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-mono bg-slate-700/30 px-3 py-2 rounded-lg flex-1 truncate flex items-center gap-2"
                  >
                    <FaLink className="w-4 h-4 shrink-0" />
                    {urlData.originalLink}
                    <FiExternalLink className="w-4 h-4 shrink-0" />
                  </a>
                </div>

                {/* Created Date */}
                <div className="flex items-center gap-3">
                  <span className="text-slate-300 font-medium">Created:</span>
                  <div className="flex items-center gap-2 text-slate-400">
                    <FiCalendar className="w-4 h-4" />
                    {new Date(urlData.created).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions Card */}
            <motion.div 
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                  onClick={handleCopy}
                >
                  <FaCopy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105"
                  onClick={handleDownload}
                >
                  <FaDownload className="w-4 h-4 mr-2" />
                  Download QR
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-105"
                  onClick={handleDelete}
                >
                  <FaTrash className="w-4 h-4 mr-2" />
                  Delete Link
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - QR Code */}
          <motion.div 
            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">QR Code</h2>
            <div className="flex justify-center bg-white p-4 rounded-xl">
              <QRCodeCanvas
                id="qr-code"
                value={urlData.shortUrl}
                size={240}
                bgColor="#ffffff"
                fgColor="#000000"
                level="Q"
              />
            </div>
            <p className="text-slate-400 text-sm text-center mt-3">
              Scan to open the shortened link
            </p>
          </motion.div>
        </motion.div>

        {/* Analytics Section */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <StatsCharts clickCount={urlData.clickCount} locations={urlData.locations} devices={urlData.devices} />
        </motion.div>
      </div>
    </div>
  );
};

export default LinkDetails;