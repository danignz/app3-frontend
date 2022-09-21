import axios from "axios";
import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logogrey from "../images/logogrey.png";

export default function Home() {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        user
      );
      toast.success("Welcome back!", {duration: 2800});
      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/main");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div id="home-view" className="backgroundcolor">
      <div>
        <div>
          <img src={logogrey} alt="Iron Co-Workers logo" />
          <h2>
            Iron Co-Workers helps you improve your portfolio and connect with
            amazing professionals
          </h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
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
              value={user.password}
              onChange={handleChange}
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button type="submit">Log in </button>
          </form>
          <hr />
          <button onClick={() => navigate(`/signup`)}>Sign up</button>
        </div>
      </div>
    </div>
  );
}
