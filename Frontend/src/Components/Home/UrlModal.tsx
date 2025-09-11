import { Button } from "@/Components/ui/button";
import { useRef, useState } from "react";
import apiConnector from "@/service/apiConnector";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { RootState } from "@/main";

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
    <div ref={refObj} onClick={clickhandler} className="absolute inset-0 bg-slate-800 bg-opacity-85 flex justify-center items-center h-screen w-screen cursor-pointer">
      <div className="flex flex-col gap-5 items-start px-6 py-5 w-[30%] rounded-lg border-slate-600 border bg-slate-900 text-white">
        <div className="flex justify-between items-center w-full">
        <h1 className="font-semibold text-3xl">Create New</h1>
        <RxCross2 size={27} className="cursor-pointer" onClick={closeModal} />
        </div>
        <img src="./qr.png" alt="" className="w-[60%]" />
        <input
          type="text"
          className="bg-transparent border border-slate-600 focus-within:outline-none px-3 rounded-md py-2 w-full"
          placeholder="Enter URL Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            seturlName(e.target.value)
          }
          value={urlName}
        />
        <input
          type="text"
          className="bg-transparent border border-slate-600 focus-within:outline-none px-3 rounded-md py-2 w-full text-slate-300"
          placeholder="Enter Password"
          readOnly
          value={url}
        />
        <Button
          disabled={loading ? true : false}
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={submitHandler}
        >
          {loading ? <div className="custom-loader"></div> : "Create"}
        </Button>
      </div>
    </div>
  );
};

export default UrlModal;
