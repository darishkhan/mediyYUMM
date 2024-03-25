import { Link } from "react-router-dom"


export const SignupComponent = ()=>{
    return(
        <div className="flex justify-center min-h-screen items-center">
            <div>
            <div>
            <div className="text-3xl font-bold text-center">Create an account</div>
            <div className="text-center">Already have an account? <Link to="/login"><u>Sign up</u></Link></div>
            </div>
            <div className="mt-5">
                <div className="my-1">
                    <div className="my-1 font-semibold"><label>
                        Name
                    </label></div>
                    <div><input className="border border-gray-400 rounded-md px-2 w-full py-1 placeholder:text-sm" placeholder="John Doe">
                    </input>
                    </div>
                </div>
                <div className="my-1">
                    <div className="my-1 font-semibold"><label>
                        Email
                    </label></div>
                    <div><input className="border border-gray-400 rounded-md px-2 w-full py-1 placeholder:text-sm" placeholder="johndoe@gmail.com">
                    </input>
                    </div>
                </div>
                <div className="my-1">
                    <div className="my-1 font-semibold"><label>
                        Password
                    </label></div>
                    <div><input className="border border-gray-400 rounded-md px-2 w-full py-1 placeholder:text-sm" placeholder="********">
                    </input>
                    </div>
                </div>
                <div className="my-5">
                    <button className="w-full px-auto py-2 bg-black text-white font-semibold rounded-md">Sign up</button>
                </div>
            </div>
            
            </div>
        </div>
    )
}