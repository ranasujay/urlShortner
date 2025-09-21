import { Button } from "@/Components/ui/button"
import { saveToken, saveUser } from "@/redux/Slices/userSlice";
import apiConnector from "@/service/apiConnector";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";

interface LoginForm {
    email:string;
    password:string;
}


const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [formdata,setformdata] = useState<LoginForm>({email:"",password:""})
    const [message,setmessage] = useState('');
    const [loading,setloading] = useState(false);

    const changehandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
         setformdata((prevData) => {return {...prevData,[name]:value}})
    }

    const submithandler = async () => {
        setloading(true);
        try {
            const form = new FormData();
            form.append('email',formdata.email)
            form.append('password',formdata.password)
            const response = await apiConnector('POST', `${import.meta.env.VITE_BASE_URL}/login`, form);

            if(response && (response.data.needSIgnup ?? false)){
                setmessage('Account with this Email do not exist..Create one')
                return;
            }

            if(response && (response.data.password ?? false)){
                setmessage('Password do not match!!!')
                return;
            }
            
            if (response && response.data.success) { 
                setformdata({email:"",password:""});
                localStorage.setItem('userData',JSON.stringify(response.data.data)) ;
                localStorage.setItem('token', response.data.token); 
                console.log("Login successful!");
                dispatch(saveUser(response.data.data));
                dispatch(saveToken(response.data.token));

                if(location.state?.InputUrl){
                    navigate('/',{state:{InputUrl:location.state.InputUrl, showModal:true}});
                }

                else{
                    navigate('/');
                }
            }

        } catch (error) {
            console.error('Login error:', error); 
        }finally{
            setloading(false)
        }
    };

     
  return (
    <motion.div 
      className="w-full max-w-md mx-auto bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 md:p-8 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-3 mb-6">
        <h1 className="font-bold text-2xl md:text-3xl text-white">Sign In</h1>
        <p className="text-slate-400 text-sm md:text-base">
          Welcome back! Please sign in to your account
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
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
            placeholder="Enter your password" 
            onChange={changehandler} 
            value={formdata.password}
          />
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
            Signing in...
          </div>
        ) : (
          'Sign In'
        )}
      </Button>

      {message && (
        <motion.div 
          className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-red-400 text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default LoginForm