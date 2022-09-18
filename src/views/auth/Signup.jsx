import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function Signup() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    profileImage: "",
    profession: "Web Developer",
    location: "Amsterdam",
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
        `${process.env.REACT_APP_API_URL}/auth/signup-upload`,
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
          `${process.env.REACT_APP_API_URL}/users/enum-values`
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
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div id="signup">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <label>Full name</label>
        <input
          required
          type="text"
          name="fullName"
          value={user.fullName}
          onChange={handleChange}
          placeholder="e.g.: John Doe"
        />
        <label>Email</label>
        <input
          required
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="mail@example.com"
        />
        <label>Password</label>
        <input
          required
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="MySecurePassword1234"
        />
        <label>Repeat the password</label>
        <input
          required
          type="password"
          name="passwordControl"
          value={passwordControl}
          onChange={(e) => setPasswordControl(e.target.value)}
          placeholder="MySecurePassword1234"
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
          placeholder="e.g.: Frontend and Mobile developer"
        />
        <label>About</label>
        <textarea
          required
          rows="8"
          cols="50"
          name="about"
          value={user.about}
          onChange={handleChange}
          placeholder="e.g.: I am a Front End Developer with experience building and maintaining websites in the E-commerce industry..."
        ></textarea>
        <label>Social Media Links (maximum 3)</label>
        <input
          type="text"
          name="contactInfo"
          value={user.contactInfo}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/example,https://twitter.com/example"
        />
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button onClick={() => navigate(`/`)}>
        {String.fromCharCode(8592)} Back
      </button>
    </div>
  );
}
