import { useContext } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import icon404 from "../images/icon404.png";

export default function ErrorPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="backgroundcolor">
      {isLoggedIn && <Navbar />}
      <div id="error-page-view" className={!isLoggedIn && "not-login"}>
        <div>
          <img src={icon404} alt="404 logo" />
          <p>Sorry, check that URL have not typing mistakes</p>
          {!isLoggedIn && (
            <button className="btn-common" onClick={() => navigate(`/`)}>
              {String.fromCharCode(8592)} Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
