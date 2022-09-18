import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logowhite from "../images/logowhite.png";

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div id="navbar">
      {/* {user && <p>Hello {user.fullName}, {user.profession}</p> } */}
      <ul>
      <img src={logowhite} alt="Iron Co-Workers logo"/>
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/main">Main</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/manage-requests">Manage requests</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/manage-projects">Manage projects</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to={`/user/${user._id}`}>User details</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/edit-profile">Edit profile</NavLink></li>}
        {isLoggedIn && <li><button onClick={() => navigate(-1)}>{String.fromCharCode(8592)} Go back</button></li>}
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
      </ul>
    </div>
  )
}
