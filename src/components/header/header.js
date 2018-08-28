import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Header = ({ history }) => {
  return (
    <div className="header">
      <h1>Notes Manager</h1>
      { !history.location.pathname.includes('auth')
      && (
        <div>
          { history.location.pathname === '/'
            ? (
              <nav>
                <p><Link to="/auth/signIn">Sign In</Link></p>
                <p style={{ marginLeft: '10px' }}><Link to="/auth/register">Register</Link></p>
              </nav>
            )
            : (
              <nav>
                <p><Link to="/home">Home</Link></p>
                <p style={{ marginLeft: '10px' }}><Link to="/notes">My Notes</Link></p>
              </nav>
            )}
        </div>
      )}
    </div>
  );
};
export default withRouter(Header);
