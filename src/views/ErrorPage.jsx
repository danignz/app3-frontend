import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <p>404 - Page not found</p>
      <button className="btn-style3" onClick={() => navigate(`/`)}>
        {String.fromCharCode(8592)} Back
      </button>
    </div>
  );
}
