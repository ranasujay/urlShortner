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
    <div className="flex w-11/12 max-w-7xl mx-auto justify-between items-center py-4 backdrop-blur-sm bg-slate-900/50 rounded-xl mt-4 px-4 md:px-6 border border-slate-700/50">
      <Link to={"/"} className="flex items-center gap-2 md:gap-3 hover:scale-105 transition-transform duration-300">
        <img src="/logo.svg" className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-lg" alt="Trimrr Logo"></img>
        <span className="text-white font-bold text-lg md:text-xl hidden sm:block">Trimrr</span>
      </Link>
      <div className="flex gap-2 md:gap-3 items-center">
        {userData ? (
          <div className="flex items-center gap-2 md:gap-4 text-white font-semibold">
            <span className="hidden lg:block text-slate-300 text-sm md:text-base">
              Welcome, <span className="text-green-400">{userData?.userName.split(" ")[0]}</span>! 👋
            </span>
            <Popover>
              <PopoverTrigger className="hover:scale-105 transition-transform duration-300">
                <Avatar className="w-8 h-8 md:w-10 md:h-10 border-2 border-slate-600 hover:border-green-400 transition-colors duration-300">
                  <AvatarImage src={userData?.image} />
                  <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold text-sm md:text-base">
                    {userData?.userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="px-0 w-fit mr-2 border border-slate-600 bg-slate-900/95 backdrop-blur-sm text-white rounded-xl shadow-xl">
                <div className="px-4 py-3 border-b border-slate-700">
                  <p className="font-semibold text-base md:text-lg">{userData.userName}</p>
                  <p className="text-slate-400 text-xs md:text-sm">{userData.email}</p>
                </div>
                <Link to={'/dashboard'}>
                  <div className="flex gap-3 items-center px-4 py-3 hover:bg-slate-800/50 cursor-pointer transition-colors duration-300 group">
                    <FaLink className="text-green-400 group-hover:scale-110 transition-transform duration-300 w-4 h-4"/>
                    <span className="group-hover:text-green-400 transition-colors duration-300 text-sm md:text-base">My Links</span>
                  </div>
                </Link>
                <Link to={'/'}>
                  <div className="flex gap-3 items-center px-4 py-3 hover:bg-slate-800/50 cursor-pointer transition-colors duration-300 group" onClick={LogoutHandler}>
                    <FiLogOut className="text-red-400 group-hover:scale-110 transition-transform duration-300 w-4 h-4"/>
                    <span className="group-hover:text-red-400 transition-colors duration-300 text-sm md:text-base">Logout</span>
                  </div>
                </Link>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
        <Link to={'/signup'}>
          <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25 px-4 py-2 md:px-6 md:py-2 text-sm md:text-base">
            Get Started
          </Button>
        </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
