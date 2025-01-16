import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("mukesh@mail.com");
  const [password, setPassword] = useState("Mukesh@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",  //backend url
        {
          emailId,
          password,
        },
        {
          withCredentials: true, } // Required for sending cookies
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");

    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
        // console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID : {emailId}</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center ">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
