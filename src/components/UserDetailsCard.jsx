import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import socialmediaicon from "../images/social-media.png";

export default function UserDetailsCard({ userData }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div id="user-details-card">
      <div>
        <div id="avatar-image">
          <img
            src={userData.profileImage}
            alt={`Pic of ${userData.fullName}`}
          />
        </div>
        <div id="avatar-info">
          <br />
          <h2>{userData.fullName}</h2>
          <br />
          <p>{userData.headLine}</p>
          <br />
          <p>
            {userData.profession} in {userData.location}
          </p>
          <br />
        </div>
      </div>
      <div id="card-data">
        {userData.about.split("\n").map((sentence, index) => (
          <p key={index}>{sentence}</p>
        ))}
        <br />
        <img src={socialmediaicon} alt="Social Media icon" />
        {userData.contactInfo &&
          userData.contactInfo.split(",").map((link, index) => {
            return (
              <a key={index} href={`${link}`} target="_blank" rel="noreferrer">
                {link}
                <br />
              </a>
            );
          })}
        <br />
        {user._id === userData._id && (
          <button
            className="btn-common"
            onClick={() => navigate(`/edit-profile`)}
          >
            Edit
          </button>
        )}
        <button
          className="btn-common"
          onClick={() => navigate(`/portfolio/${userData._id}`)}
        >
          Check Portfolio
        </button>
      </div>
    </div>
  );
}
