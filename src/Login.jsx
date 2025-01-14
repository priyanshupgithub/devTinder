import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("mukesh@mail.com");
  const [password, setPassword] = useState("Mukesh@123");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
    const res = await axios.post();
  };

  return (
    <div className="flex justify-center my-10">
      <div class="card bg-base-100 w-96 shadow-xl">
        <div class="card-body">
          <h2 class="card-title justify-center">Login</h2>
          <div>
            <label class="form-control w-full max-w-xs my-2">
              <div class="label">
                <span class="label-text">Email ID : {emailId}</span>
              </div>
              <input
                type="text"
                value={emailId}
                class="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label class="form-control w-full max-w-xs my-2">
              <div class="label">
                <span class="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                class="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div class="card-actions justify-center ">
            <button class="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
