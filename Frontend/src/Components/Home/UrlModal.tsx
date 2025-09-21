import { Button } from "@/Components/ui/button";
import { useRef, useState } from "react";
import apiConnector from "@/service/apiConnector";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { RootState } from "@/main";
import { motion, AnimatePresence } from "framer-motion";
import { FiLink, FiType, FiLoader } from "react-icons/fi";

interface UrlModalProps {
    url: string;
    setshowModal: (value: boolean) => void;
  }

const UrlModal:React.FC<UrlModalProps> = ({ url,setshowModal }) => {
  const [urlName, seturlName] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const refObj = useRef<HTMLDivElement | null>(null);
  const {userData} = useSelector((state:RootState) => state.User)

  const submitHandler = async () => {
    setloading(true);
    try {
      const response = await apiConnector(
        "POST",
        `${import.meta.env.VITE_BASE_URL}/saveurl`,{
            userEmail:userData?.email,
            name:urlName,
            url:url
        }
      );

      if(!response.data.success){
         console.log('url submission failed');
      }
      else{
           navigate(`/link/${response.data.data.unqId}`)
      }
    } catch (err) {
      if (err instanceof Error) {
        console.group(err.message);
      } else {
        console.log("an unknown error occured");
      }
    } finally {
      setloading(false);
    }
  };

  const closeModal = () => {
    setshowModal(false);
  }

  const clickhandler = (e:React.MouseEvent<HTMLDivElement>) => {
       if(refObj.current === e.target){
        closeModal();
       }
  }


  return (
    <AnimatePresence>
      <motion.div 
        ref={refObj} 
        onClick={clickhandler} 
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-50 cursor-pointer p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="flex flex-col gap-6 items-start p-8 w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-800/90 backdrop-blur-sm text-white shadow-2xl cursor-default"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <FiLink className="w-6 h-6 text-green-400" />
              </div>
              <h1 className="font-bold text-2xl">Create Short Link</h1>
            </div>
            <button 
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-300" 
              onClick={closeModal}
            >
              <RxCross2 size={24} className="text-slate-400 hover:text-white transition-colors duration-300" />
            </button>
          </div>

          {/* QR Code Image */}
          <div className="w-full flex justify-center">
            <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
              <img src="./qr.png" alt="QR Code" className="w-32 h-32 object-contain" />
            </div>
          </div>

          {/* Form Inputs */}
          <div className="w-full space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <FiType className="w-4 h-4" />
                Link Name
              </label>
              <input
                type="text"
                className="bg-slate-700/30 border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 px-4 py-3 rounded-xl w-full text-white placeholder-slate-400 transition-all duration-300"
                placeholder="Enter a memorable name for your link"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  seturlName(e.target.value)
                }
                value={urlName}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <FiLink className="w-4 h-4" />
                Original URL
              </label>
              <input
                type="text"
                className="bg-slate-700/30 border border-slate-600/50 px-4 py-3 rounded-xl w-full text-slate-400 cursor-not-allowed"
                readOnly
                value={url}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            disabled={loading || !urlName.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={submitHandler}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <FiLoader className="w-4 h-4 animate-spin" />
                Creating Link...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FiLink className="w-4 h-4" />
                Create Short Link
              </div>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UrlModal;
