import { Button } from "@/Components/ui/button"
import { saveToken, saveUser } from "@/redux/Slices/userSlice";
import apiConnector from "@/service/apiConnector";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div className="w-[30%] border border-slate-600 rounded-lg h-[50%] flex flex-col gap-4 items-start p-5 px-7 justify-center">
           <div className="flex flex-col gap-2">
           <h1 className="font-bold text-3xl">Login</h1>
           <h3 className="text-slate-400">into your account if you have already one</h3>
           </div>

           <div className="flex flex-col gap-2 mt-6 w-full">
            <input type="email" name="email" className="bg-transparent border border-slate-600 focus-within:outline-none px-3 rounded-md py-2" placeholder="Enter Email" onChange={changehandler} value={formdata.email} />
            <input type="password" name="password" id="password" className="bg-transparent border border-slate-600 focus-within:outline-none px-3 rounded-md py-2" placeholder="Enter Password" onChange={changehandler} value={formdata.password}/>
           </div>

           <Button className="mt-6 text-black bg-white hover:bg-slate-100 hover:scale-95 transition-all duration-200" onClick={submithandler}>{loading ? <div className="custom-loader"></div> : 'Login'}</Button>

   
            {
                message && <span className="text-red-600 self-center">{message}</span>
            }
         
    </div>
  )
}

export default LoginForm