import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {}
  };
  return (
    <div className="card bg-slate-900 w-[16rem] my-4 shadow-xl text-white">
      <figure>
        <img className="w-full max-h-72" src={photoUrl} alt="Photo" />
      </figure>
      <div className="card-body p-3 text-center">
        <h2 className="card-title text-center">{firstName + " " + lastName}</h2>
        <p className="text-center">
          {age ? `${age} years old` : ""}
          {age && gender ? ", " : ""}
          {gender ? gender : ""}
        </p>
        <p className="text-xs text-center">{about}</p>
        <div className="card-actions justify-center my-5">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
