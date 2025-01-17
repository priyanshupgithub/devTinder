import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      //handle the error
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return;
  }
  if (connections.length === 0) {
    return <h1>No Connections Found</h1>;
  }
  return (
    <div className="text-center mt-6 mb-[125px]">
      <h1 className="text-bold font-bold text-4xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-[75%] mx-auto"
          >
            <div className="w-100 flex justify-center items-center">
              <img
                className="rounded-full w-full h-full object-contain"
                src={photoUrl}
                alt="photo"
              />
            </div>
            <div className="flex flex-col justify-center text-left mx-4 max-w-[50%]">
              <h2 className="font-bold text-2xl">{`${firstName} ${lastName}`}</h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p className="text-xs">{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
