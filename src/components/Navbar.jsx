import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      {user && <p>Hello {user.fullName}, {user.profession}</p> }
      <ul>
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/edit-profile">Edit profile</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/main">Main</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/manage-requests">Manage requests</NavLink></li>} 
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to={`/user/${user._id}`}>User details</NavLink></li>}
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
        {isLoggedIn && <li><button onClick={() => navigate(-1)}>Go back</button></li>}
      </ul>
    </div>
  )
}
