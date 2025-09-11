import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import apiConnector from "@/service/apiConnector";

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
    <div className="w-[30%] border border-slate-600 rounded-lg h-fit flex flex-col gap-4 items-start p-5 px-7 justify-center">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl">Signup</h1>
        <h3 className="text-slate-400">
          Create your account to experience magic of Trimmr
        </h3>
      </div>

      <div className="flex flex-col gap-2 mt-6 w-full">
        <input
          type="text"
          name="name"
          className="bg-transparent border border-slate-600 focus-within:outline-none px-3 rounded-md py-2"
          placeholder="Enter Name"
          onChange={changehandler}
          value={formdata.name}
        />
        <input
          type="email"
          name="email"
          className="bg-transparent border border-slate-600 focus-within:outline-none px-3 rounded-md py-2"
          placeholder="Enter Email"
          onChange={changehandler}
          value={formdata.email}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="bg-transparent border border-slate-600 focus-within:outline-none px-3 rounded-md py-2"
          placeholder="Enter Password"
          onChange={changehandler}
          value={formdata.password}
        />

        <div className="bg-transparent  border border-slate-600 focus-within:outline-none px-3 rounded-md py-2 h-40">
          {previewImage ? (
            <img
              src={previewImage}
              className="object-contain
            h-full w-full"
            />
          ) : (
            <div
              {...getRootProps()}
              className="flex flex-col gap-2 justify-center items-center h-full"
            >
              <FiUploadCloud size={24} className="text-yellow-500" />

              <input {...getInputProps()} type="file" name="file" id="file" />
              {isDragActive ? (
                <span className="text-yellow-600 text-xs">
                  Drop the files here ...
                </span>
              ) : (
                <span className="text-yellow-600 text-xs">
                  Drag 'n' drop profile picture here, or click to select it
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <Button
        className="mt-6 text-black bg-white hover:bg-slate-100 hover:scale-95 transition-all duration-200"
        onClick={submithandler}
      >
        {loading ? <div className="custom-loader"></div> : 'Signup'}
      </Button>

      {
        message && <span className="self-center text-green-600 font-medium mt-1">{message}</span>
      }
    </div>
  );
};

export default SignupForm;
