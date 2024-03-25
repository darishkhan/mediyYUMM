import { SigninInput } from "@darishkhan/mediyyumm-common/dist";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const URL = "https://backend.mediyyumm.workers.dev";

export const LoginComponent = () => {
    const navigate = useNavigate();
  const [signinInput, setSigninInput] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninInput({ ...signinInput, [e.target?.name]: e.target?.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${URL}/api/v1/user/signin`,
        signinInput
      );
      if(response.status === 200)
      {
        localStorage.setItem('token', "Bearer "+response.data.token);
        console.log(response);
        navigate('/blogs');
      }
    } catch (error) {}
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div>
        <div>
          <div className="text-3xl font-bold text-center">Login</div>
          <div className="text-center">
            Don't have an account?{" "}
            <Link to="/signup">
              <u>Sign Up</u>
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <div className="my-1">
            <div className="my-1 font-semibold">
              <label>Email</label>
            </div>
            <div>
              <input
                className="border border-gray-400 rounded-md px-2 w-full py-1 placeholder:text-sm"
                placeholder="johndoe@gmail.com"
                onChange={handleChange}
                name="email"
                value={signinInput.email}
              ></input>
            </div>
          </div>
          <div className="my-1">
            <div className="my-1 font-semibold">
              <label>Password</label>
            </div>
            <div>
              <input
                className="border border-gray-400 rounded-md px-2 w-full py-1 placeholder:text-sm"
                placeholder="********"
                onChange={handleChange}
                name="password"
                value={signinInput.password}
              ></input>
            </div>
          </div>
          <div className="my-5">
            <button
              className="w-full px-auto py-2 bg-black text-white font-semibold rounded-md"
              onClick={handleSubmit}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
