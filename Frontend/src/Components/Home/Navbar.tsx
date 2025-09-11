import { Button } from "@/Components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { RootState } from "@/main";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { FiLogOut } from "react-icons/fi";
import { FaLink } from "react-icons/fa";
import { saveToken, saveUser } from "@/redux/Slices/userSlice";

const Navbar = () => {
  const { userData } = useSelector((state: RootState) => state.User);
  const dispatch = useDispatch()

  const LogoutHandler = () => {
     dispatch(saveToken(null))
     dispatch(saveUser(null))
     
  }

  return (
    <div className="flex w-11/12 mx-auto justify-between items-center py-2 shadow-md">
      <Link to={"/"}>
        <img src="/logo.png" className="w-16"></img>
      </Link>
      <div className="flex gap-3 items-center">
        {userData ? (
          <div className="flex items-center gap-2 text-white font-semibold ">
            <h1>👋 {userData?.userName.split(" ")[0]}</h1>
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src={userData?.image} />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="px-0 w-fit mr-2 border border-slate-600 bg-slate-900 text-white">
                <p className="text-center px-4 font-semibold">{userData.userName}</p>
                <hr className="mt-2 text-slate-600" />
                <Link to={'/dashboard'}><div className="flex gap-3 items-center px-4 mt-2 hover:bg-slate-700 py-2 cursor-pointer"><FaLink/><span>My Links</span></div></Link>
                <Link to={'/'}><div className="flex gap-3 items-center px-4  hover:bg-slate-700 py-2 cursor-pointer" onClick={LogoutHandler}><FiLogOut/><span>Logout</span></div></Link>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
        <Link to={'/signup'}><Button className="bg-white text-black font-semibold hover:bg-slate-100 hover:scale-95">
        Login
      </Button></Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
