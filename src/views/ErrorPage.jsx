import { useContext } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ErrorPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <p>404 - Page not found</p>
      {!isLoggedIn && (
        <button className="btn-style3" onClick={() => navigate(`/`)}>
          {String.fromCharCode(8592)} Back
        </button>
      )}
    </div>
  );
}
