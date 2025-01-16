import React from 'react'

const UserCard = ({ user }) => {
  const {firstName, lastName, age, gender, about, photoUrl} = user;
  return (
    <div className="card bg-slate-900 w-[19rem] my-4 shadow-xl text-white">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " +  lastName}</h2>
    <p>
    {age ? `${age} years old` : ""} 
    {age && gender ? ", " : ""} 
    {gender ? gender : ""}
    </p>
    <p>{about }</p>
    <div className="card-actions justify-center my-5">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard;