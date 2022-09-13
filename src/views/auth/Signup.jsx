import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function Signup() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    profileImage: "",
    profession: "",
    location: "",
    headLine: "",
    about: "",
    contactInfo: "",
  });
  const [enumValues, setEnumValues] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordControl, setPasswordControl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
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
        `${process.env.REACT_APP_API_URL}/auth/signupupload`,
        uploadData
      );
      setUser((prev) => {
        return {
          ...prev,
          profileImage: response.data.fileUrl,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match");
    } else {
      setErrorMessage(undefined);
    }
    // eslint-disable-next-line
  }, [passwordControl]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/enumvalues`
        );
        setEnumValues(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        email: user.email,
        password,
        fullName: user.fullName,
        profileImage: user.profileImage,
        profession: user.profession,
        location: user.location,
        headLine: user.headLine,
        about: user.about,
        contactInfo: user.contactInfo,
      });
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div id="signup">
      <h2>Create a new account</h2>
      <form onSubmit={handleSubmit}>
        <label>Full name</label>
        <input
          required
          type="text"
          name="fullName"
          value={user.fullName}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          required
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          required
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Repeat the password</label>
        <input
          required
          type="password"
          name="passwordControl"
          value={passwordControl}
          onChange={(e) => setPasswordControl(e.target.value)}
        />
        <label>Profile picture</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        <label>Profession</label>
        <select
          value={user.profession}
          name="profession"
          onChange={handleChange}
        >
          {enumValues &&
            enumValues.profession.map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
        </select>
        <label>Location</label>
        <select value={user.location} name="location" onChange={handleChange}>
          {enumValues &&
            enumValues.location.map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
        </select>
        <label>Headline</label>
        <input
          required
          type="text"
          name="headLine"
          value={user.headLine}
          onChange={handleChange}
        />
        <label>About</label>
        <textarea
          required
          rows="8"
          cols="50"
          name="about"
          value={user.about}
          onChange={handleChange}
        ></textarea>
        <label>Social Media Links</label>
        <input
          required
          type="text"
          name="contactInfo"
          value={user.contactInfo}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
