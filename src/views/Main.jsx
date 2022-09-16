import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Main() {
  return (
    <div>
      <Navbar />
      <h3>Main</h3>
      <button><Link to="/main/projects-recruiting">See projects recruiting</Link></button>
      <button><Link to="/main/projects-finished">See projects finished</Link></button>
      <Outlet />
    </div>
  )
}