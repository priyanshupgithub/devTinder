import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  console.log(requests);
  const dispatch = useDispatch();
  const [showButtons, setShowButtons] = useState(true);

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {
          /* empty because it is a post call i dont have to send the data */
        },
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {}
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {}
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return;
  }
  if (requests.length === 0) {
    return <h1 className="flex justify-center my-10">No Connections Found</h1>;
  }
  return (
    <div className="text-center my-10">
      <h1 className="text-bold font-bold text-4xl">Requests</h1>
      {requests.map((requests) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          requests.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div className="w-100">
              <img
                className="w-25 h-25 rounded-full"
                src={photoUrl}
                alt="photo"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-2xl">{`${firstName} ${lastName}`}</h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary m-2"
                onClick={() => reviewRequest("rejected", requests._id)}
              >
                Rejected
              </button>
              <button
                className="btn btn-primary m-2"
                onClick={() => reviewRequest("accepted", requests._id)}
              >
                Accepted
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
