import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <h1>Welcome to My World</h1>
      <nav className="clearfix">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/users/1">Users</Link></li>
          <li><Link to="/notes">Notes</Link></li>
        </ul>
      </nav>
    </div>
  );
};
export default Header;
