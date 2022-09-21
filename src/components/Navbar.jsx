import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logowhite from "../images/logowhite.png";
import projectsicon from "../images/projectsicon.png";
import homeicon from "../images/homeicon.png";
import requestsicon from "../images/requestsicon.png";
import portfolioicon from "../images/portfolio.png";
import logoout from "../images/logout.png";

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div id="navbar">
      <ul>
        <img src={logowhite} alt="Iron Co-Workers logo" />

        {isLoggedIn && (
          <li>
            <NavLink
              className={(element) =>
                element.isActive ? "selected change-color" : ""
              }
              to="/main"
            >
              <div className="iconcontainer">
                <img src={homeicon} alt="Home icon" />
                <p>HOME</p>
              </div>
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink
              className={(element) =>
                element.isActive ? "selected change-color" : ""
              }
              to="/manage-requests"
            >
              <div className="iconcontainer">
                <img src={requestsicon} alt="Home icon" />
                <p>REQUESTS</p>
              </div>
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink
              className={(element) =>
                element.isActive ? "selected change-color" : ""
              }
              to="/manage-projects"
            >
              <div className="iconcontainer">
                <img src={projectsicon} alt="Projects icon" />
                <p>PROJECTS</p>
              </div>
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink
              className={(element) =>
                element.isActive ? "selected change-color" : ""
              }
              to={`/portfolio/${user._id}`}
            >
              <div className="iconcontainer">
                <img src={portfolioicon} alt="Home icon" />
                <p>PORTFOLIO</p>
              </div>
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink
              className={(element) => (element.isActive ? "selected" : "")}
              to={`/user/${user._id}`}
            >
              <div className="iconcontainer avatar">
                <img src={user.profileImage} alt="Home icon" />
                <p>ME</p>
              </div>
            </NavLink>
          </li>
        )}
        {/* {isLoggedIn && <li><button onClick={() => navigate(-1)}>{String.fromCharCode(8592)} Go back</button></li>} */}
        {isLoggedIn && (
          <li>
            <button className="iconcontainer" onClick={() => logOutUser()}>
              <img src={logoout} alt="Home icon" />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
