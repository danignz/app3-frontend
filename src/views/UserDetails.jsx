import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserDetailsCard from "../components/UserDetailsCard";
import Navbar from "../components/Navbar";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/${id}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );

        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="backgroundcolor">
      <Navbar />
      <div id="user-details">
        <h2>User details</h2>
        {user && <UserDetailsCard userData={user} />}
        {!user && <p>User not found</p>}
      </div>
    </div>
  );
}
