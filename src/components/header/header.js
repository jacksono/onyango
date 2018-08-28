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
                <span><Link to="/auth/signIn">Sign In</Link></span>
                <span style={{ marginLeft: '10px' }}><Link to="/auth/register">Register</Link></span>
              </nav>
            )
            : (
              <div>
                <span style={{ float: 'right', marginTop: '-30px' }}>{`Signed in as ${localStorage.getItem('username')}`}</span>
                <nav>
                  <span style={{ marginLeft: '10px' }}><Link to="/notes">My Notes</Link></span>
                  <span><Link to="/home" style={{ float: 'right'}}>Sign Out</Link></span>
                </nav>
              </div>
            )}
        </div>
      )}
    </div>
  );
};
export default withRouter(Header);
