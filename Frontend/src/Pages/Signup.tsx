import LoginForm from "@/Components/signup/LoginForm";
import SignupForm from "@/Components/signup/SignupForm";
import { useRef, useState } from "react";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const ButtonRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(0); // Representing left position as percentage  

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
     if(ButtonRef.current){
      if (target.id === 'login') {
        setIsLogin(true);
        setPosition(ButtonRef.current.getBoundingClientRect().x - target.getBoundingClientRect().x); // Position the slider to the start
      } else {
        setIsLogin(false);
        setPosition(target.getBoundingClientRect().x - ButtonRef.current.getBoundingClientRect().x); // Move the slider halfway (50%) for "Signup"
      }
     }
  };

  return (
    <div className="bg-slate-900 flex flex-col justify-center items-center w-screen h-screen gap-3 text-white">
      <h1 className="font-bold text-4xl text-white font-poppins">Hold up! Let's Login First...</h1>

      <div className="flex justify-between items-center p-1 bg-slate-800 relative w-[30%] rounded-md  font-semibold text-center">
        <div ref={ButtonRef} className="w-[50%] px-4 py-2 z-10 cursor-pointer" onClick={clickHandler} id="login">
          Login
        </div>
        <div className="w-[50%] px-4 py-2 z-10 cursor-pointer" onClick={clickHandler} id="signup">
          Signup
        </div>
        <div
          className="absolute bg-slate-900 w-[49%] h-10 rounded-lg z-0 transition-all duration-300"
          style={{ transform: `translateX(${position}px)` }}
        ></div>
      </div>

      {
        isLogin ? (<LoginForm/>) : (<SignupForm/>)
      }
    </div>
  );
};

export default Signup;
