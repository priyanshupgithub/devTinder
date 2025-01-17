import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getfeed = async () => {
    if (feed && feed.length > 0) {
      return; // Skip fetching if feed already has data
    }
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (error) {
      //todo
      console.log(error.message);
    }
  };

  useEffect(() => {
    getfeed();
  }, []); // Empty dependency ensures it runs once on mount

  // Conditional rendering: Show a loading state or an error message if feed is empty
  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center my-10 font-bold">
        No new Users are availabel on the fed.
      </div>
    ); // Show "Loading" while fetching or if no data is available
  }

  return (
    <div className="flex justify-center p-10 bg-slate-800">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
