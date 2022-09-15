import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function UserDetailsCard({ userData }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div>
      <img
        height={200}
        src={userData.profileImage}
        alt={`Pic of ${userData.fullName}`}
      />
      <br />
      <h4>{userData.fullName}</h4>
      <br />
      <p>{userData.headLine}</p>
      <br />
      <p>
        Graduate: {userData.profession} in {userData.location}
      </p>
      <br />
      <p>{userData.about}</p>
      <br />
      {userData.contactInfo &&
        userData.contactInfo.split(",").map((link, index) => {
          return (
            <Link key={index} to={`/${link}`}>
              {link}
              <br />
            </Link>
          );
        })}
      <br />
      {user._id === userData._id && (
        <button
          className="btn-style3"
          onClick={() => navigate(`/edit-profile`)}
        >
          EDIT
        </button>
      )}
    </div>
  );
}
