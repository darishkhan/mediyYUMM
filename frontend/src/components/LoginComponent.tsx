import { SigninInput } from "@darishkhan/mediyyumm-common/dist";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const URL = "https://backend.mediyyumm.workers.dev"


export const LoginComponent = ()=>{

    const [loginData, setLoginData] = useState<SigninInput>({
        email:"",
        password:""
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setLoginData({...loginData, [e.target?.name]:e.target?.value});
    }

    useEffect(()=>{
        console.log(loginData);
    }, [loginData])
        

    const loginRequest = async ()=>{
        try {
            const response = await axios.get(`${URL}/login`, loginData);

        } catch (error) {
            
        }
    }


    return(
        <div className="flex justify-center min-h-screen items-center">
            <div>
            <div>
            <div className="text-3xl font-bold text-center">Login</div>
            <div className="text-center">Don't have an account? <Link to="/signup"><u>Sign Up</u></Link></div>
            </div>
            <div className="mt-5">
                <div className="my-1">
                    <div className="my-1 font-semibold"><label>
                        Email
                    </label></div>
                    <div><input className="border border-gray-400 rounded-md px-2 w-full py-1 placeholder:text-sm" placeholder="johndoe@gmail.com" onChange={handleChange}>
                    </input>
                    </div>
                </div>
                <div className="my-1">
                    <div className="my-1 font-semibold"><label>
                        Password
                    </label></div>
                    <div><input className="border border-gray-400 rounded-md px-2 w-full py-1 placeholder:text-sm" placeholder="********" onChange={handleChange}>
                    </input>
                    </div>
                </div>
                <div className="my-5">
                    <button className="w-full px-auto py-2 bg-black text-white font-semibold rounded-md">Log In</button>
                </div>
            </div>
            
            </div>
        </div>
    )
}