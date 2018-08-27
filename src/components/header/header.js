import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <h1>Notes Manager</h1>
      <nav className="clearfix">
        <p><Link to="/home">Home</Link></p>
        <p style={{ marginLeft: '10px' }}><Link to="/notes">My Notes</Link></p>
      </nav>
    </div>
  );
};
export default Header;
