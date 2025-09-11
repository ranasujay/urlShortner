
import apiConnector from "@/service/apiConnector";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import { FaLink, FaCopy, FaDownload, FaTrash } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import { StatsCharts } from "@/Components/StatsCharts";
import toast from "react-hot-toast";
import Navbar from "@/Components/Home/Navbar";

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
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!urlData) {
    return <div className="text-white text-center mt-10">No data found</div>;
  }

  return (
    <div>
      <Navbar />

      <div className="bg-slate-900 w-screen h-full p-10">
        <div className="w-screen h-auto flex justify-center items-center">
          {loading ? (
            <div className="custom-loader"></div>
          ) : (
            urlData && (
              <div className="w-11/12 flex gap-5">
                {/* left div */}
                <div className="flex flex-col gap-4 items-start bg-slate-800 p-6 rounded-lg shadow-lg text-white">
                  <h1 className="text-4xl font-bold">{urlData.name}</h1>

                  {/* Short link */}
                  <p className="text-xl">
                    <strong>Short URL:</strong>{" "}
                    <a
                      href={urlData.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {urlData.shortUrl}
                    </a>
                  </p>

                  {/* Original link with an link icon */}
                  <p>
                    <strong>Original Link:</strong>{" "}
                    <a
                      href={urlData.originalLink}
                      className="text-blue-400 hover:underline flex items-center"
                    >
                      <FaLink className="mr-2" />
                      {urlData.originalLink}
                    </a>
                  </p>

                  {/* Date and time the link is created */}
                  <p>
                    <strong>Created At: </strong>{" "}
                    {new Date(urlData.created).toLocaleString()}
                  </p>

                  {/* QR code with copy, download, and delete functionality */}
                  <div className="flex  gap-4">
                    <QRCodeCanvas
                      id="qr-code"
                      value={urlData.shortUrl}
                      size={368}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="Q"

                    />
                    <div className="flex flex-col justify-start gap-4">
                      <Button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-95 font-semibold flex justify-start items-center"
                        onClick={handleCopy}
                      >
                        <FaCopy className="mr-2" />
                        Copy
                      </Button>
                      <Button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 hover:scale-95 font-semibold flex justify-start items-center"
                        onClick={handleDownload}
                      >
                        <FaDownload className="mr-2" />
                        Download
                      </Button>
                      <Button
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 hover:scale-95 font-semibold flex justify-start items-center"
                        onClick={handleDelete}
                      >
                        <FaTrash className="mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>

                {/* right div */}
                <StatsCharts clickCount={urlData.clickCount} locations={urlData.locations} devices={urlData.devices} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkDetails;