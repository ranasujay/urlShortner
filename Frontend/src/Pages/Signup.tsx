import LoginForm from "@/Components/signup/LoginForm";
import SignupForm from "@/Components/signup/SignupForm";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

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
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen flex flex-col justify-center items-center gap-4 text-white px-4">
      {/* Back Button */}
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300">
        <FiArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </Link>

      {/* Logo and Branding */}
      <motion.div 
        className="flex flex-col items-center gap-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src="/logo.svg" className="w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-lg" alt="Trimrr Logo" />
        <h1 className="font-bold text-4xl md:text-5xl text-center font-poppins bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Welcome to Trimrr
        </h1>
        <p className="text-slate-300 text-lg text-center max-w-md">
          {isLogin ? "Welcome back! Sign in to manage your links." : "Join thousands of users who trust us with their links."}
        </p>
      </motion.div>

      {/* Tab Switcher */}
      <motion.div 
        className="flex justify-between items-center p-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 relative w-full max-w-sm rounded-xl font-semibold text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div 
          ref={ButtonRef} 
          className="w-[50%] px-6 py-3 z-10 cursor-pointer transition-colors duration-300 rounded-lg" 
          onClick={clickHandler} 
          id="login"
        >
          Sign In
        </div>
        <div 
          className="w-[50%] px-6 py-3 z-10 cursor-pointer transition-colors duration-300 rounded-lg" 
          onClick={clickHandler} 
          id="signup"
        >
          Sign Up
        </div>
        <motion.div
          className="absolute bg-gradient-to-r from-green-600 to-green-700 w-[48%] h-11 rounded-lg z-0 shadow-lg"
          animate={{ 
            x: position,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </motion.div>

      {/* Form Container */}
      <motion.div
        className="w-full max-w-md "
        key={isLogin ? 'login' : 'signup'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {isLogin ? <LoginForm/> : <SignupForm/>}
      </motion.div>

      {/* Footer */}
        <motion.div 
          className="text-center text-slate-400 text-sm "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p className="text-center text-slate-400 text-sm mb-8">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-400 hover:text-green-300 transition-colors duration-300 font-medium"
          >
            {isLogin ? "Sign up here" : "Sign in here"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
