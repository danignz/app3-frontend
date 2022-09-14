import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Main() {
  return (
    <div>
      <h3>Main</h3>
      <button><Link to="/main/projects-recruiting">See projects recruiting</Link></button>
      <button><Link to="/main/projects-finished">See projects finished</Link></button>
      <Outlet />
    </div>
  )
}