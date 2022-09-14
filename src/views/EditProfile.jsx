import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditProfile() {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");
  const { user, logOutUser } = useContext(AuthContext);
  const [enumValues, setEnumValues] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const [userData, setUserData] = useState({
    email: user.email,
    fullName: user.fullName,
    profileImage: user.profileImage,
    profession: user.profession,
    location: user.location,
    headLine: "",
    about: "",
    contactInfo: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/logged-in-user`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setUserData((prev) => {
          return {
            ...prev,
            headLine: response.data.data.headLine,
            about: response.data.data.about,
            contactInfo: response.data.data.contactInfo,
          };
        });
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/enum-values`
        );
        setEnumValues(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleFileUpload = async (e) => {
    const uploadData = new FormData();
    uploadData.append("profileImage", e.target.files[0]);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/edit-upload`,
        uploadData,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      setUserData((prev) => {
        return {
          ...prev,
          profileImage: response.data.fileUrl,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/users/edit`, userData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      toast.success("User edited successfully. Please log in again.");
      logOutUser();
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div id="edit-profile">
      <h2>Editing {userData.fullName}'s profile</h2>
      <img src={user.profileImage} alt={`${user.fullName}'s pic`} width={100} />
      <form onSubmit={handleSubmit}>
        <label>Full name</label>
        <input
          required
          type="text"
          name="fullName"
          value={userData.fullName}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          required
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <label>Profile picture</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        <label>Profession</label>
        <select
          value={userData.profession}
          name="profession"
          onChange={handleChange}
        >
          {enumValues &&
            enumValues.profession.map((element) => (
              <option key={element} value={element} selected={user.profession}>
                {element}
              </option>
            ))}
        </select>
        <label>Location</label>
        <select
          value={userData.location}
          name="location"
          onChange={handleChange}
        >
          {enumValues &&
            enumValues.location.map((element) => (
              <option key={element} value={element} selected={user.location}>
                {element}
              </option>
            ))}
        </select>
        <label>Headline</label>
        <input
          required
          type="text"
          name="headLine"
          value={userData.headLine}
          onChange={handleChange}
        />
        <label>About</label>
        <textarea
          required
          rows="8"
          cols="50"
          name="about"
          value={userData.about}
          onChange={handleChange}
        ></textarea>
        <label>Social Media Links (maximum 3)</label>
        <input
          type="text"
          name="contactInfo"
          value={userData.contactInfo}
          onChange={handleChange}
        />
        <button type="submit">Save changes and log out</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
