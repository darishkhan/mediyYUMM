import { SignupInput } from "@darishkhan/mediyyumm-common/dist";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const URL = "https://backend.mediyyumm.workers.dev";

export const SignupComponent = () => {
  const navigate = useNavigate();

  const [signupInput, setSignupInput] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupInput({ ...signupInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${URL}/api/v1/user/signup`,
        signupInput
      );
      if(response.status===200)
      {
          console.log(response);
          localStorage.setItem('token', "Bearer "+response.data.token);
          navigate("/blogs");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div>
        <div>
          <div className="text-3xl font-bold text-center">
            Create an account
          </div>
          <div className="text-center">
            Already have an account?{" "}
            <Link to="/login">
              <u>Sign up</u>
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <div className="my-1">
            <div className="my-1 font-semibold">
              <label>Name</label>
            </div>
            <div>
              <input
                className="border border-gray-400 rounded-md px-2 w-full py-1 placeholder:text-sm"
                placeholder="John Doe"
                name="name"
                value={signupInput.name}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="my-1">
            <div className="my-1 font-semibold">
              <label>Email</label>
            </div>
            <div>
              <input
                className="border border-gray-400 rounded-md px-2 w-full py-1 placeholder:text-sm"
                placeholder="johndoe@gmail.com"
                name="email"
                value={signupInput.email}
                onChange={handleChange}
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
                name="password"
                value={signupInput.password}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="my-5">
            <button
              className="w-full px-auto py-2 bg-black text-white font-semibold rounded-md"
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
