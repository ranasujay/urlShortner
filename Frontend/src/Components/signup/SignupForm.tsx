import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { FiUploadCloud, FiUser, FiMail, FiLock, FiLoader } from "react-icons/fi";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import apiConnector from "@/service/apiConnector";
import { motion } from "framer-motion";

interface signForm {
  name: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const [formdata, setformdata] = useState<signForm>({
    name: "",
    email: "",
    password: "",
  });
  const [profileImage, setprofileImage] = useState<File | null>(null);
  const [previewImage, setpreviewImage] = useState<string>("");
  const [loading,setloading] = useState<boolean>(false);
  const [message,setmessage] = useState<string>("");

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformdata((prevData) => {
      return { ...prevData, [name]: value };
    });
    console.log(formdata);
  };

  const submithandler = async () => {
    setloading(true);
    const form = new FormData();
    form.append("name", formdata.name);
    form.append("email", formdata.email);
    form.append("password", formdata.password);
    if (profileImage) {
      form.append("image", profileImage);
    }

    try {
      const API_URL = import.meta.env.VITE_BASE_URL || "";
      const response = await apiConnector(
        "POST",
        `${API_URL}/signup`,
        form
      );
      if(response && response.data.success){
        setmessage('signup successfull..🥳..Proceed to Login to use the product🤗')
        setformdata({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally{
       setloading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setprofileImage(file);
    setpreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <motion.div 
      className="w-full max-w-md mx-auto bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 md:p-8 "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-3 mb-6">
        <h1 className="font-bold text-2xl md:text-3xl text-white">Create Account</h1>
        <p className="text-slate-400 text-sm md:text-base">
          Join URLShortener and start managing your links
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            name="name"
            className="bg-slate-700/30 border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 pl-11 pr-4 py-3 rounded-xl w-full text-white placeholder-slate-400 transition-all duration-300"
            placeholder="Enter your full name"
            onChange={changehandler}
            value={formdata.name}
          />
        </div>
        
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="email"
            name="email"
            className="bg-slate-700/30 border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 pl-11 pr-4 py-3 rounded-xl w-full text-white placeholder-slate-400 transition-all duration-300"
            placeholder="Enter your email"
            onChange={changehandler}
            value={formdata.email}
          />
        </div>
        
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="password"
            name="password"
            className="bg-slate-700/30 border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 pl-11 pr-4 py-3 rounded-xl w-full text-white placeholder-slate-400 transition-all duration-300"
            placeholder="Create a password"
            onChange={changehandler}
            value={formdata.password}
          />
        </div>

        {/* Profile Image Upload */}
        <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4 h-32 md:h-40 transition-all duration-300 hover:border-slate-500/70">
          {previewImage ? (
            <div className="relative h-full w-full group">
              <img
                src={previewImage}
                className="object-cover h-full w-full rounded-lg"
                alt="Profile preview"
              />
              <div 
                {...getRootProps()}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg cursor-pointer flex items-center justify-center"
              >
                <span className="text-white text-sm font-medium">Click to change</span>
                <input {...getInputProps()} />
              </div>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className="flex flex-col gap-2 justify-center items-center h-full cursor-pointer hover:bg-slate-600/20 transition-colors duration-300 rounded-lg"
            >
              <FiUploadCloud size={24} className="text-green-400" />
              <input {...getInputProps()} type="file" name="file" id="file" />
              {isDragActive ? (
                <span className="text-green-400 text-xs text-center">
                  Drop your photo here...
                </span>
              ) : (
                <span className="text-slate-400 text-xs text-center px-2">
                  Drag & drop your profile photo here, or click to select
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <Button
        className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        onClick={submithandler}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <FiLoader className="w-4 h-4 animate-spin" />
            Creating account...
          </div>
        ) : (
          'Create Account'
        )}
      </Button>

      {message && (
        <motion.div 
          className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-green-400 text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SignupForm;
