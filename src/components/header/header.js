import React from 'react';
import PropTypes from 'prop-types';
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
                  <span
                    style={{ marginLeft: '10px' }}
                  >
                    <Link to="/home">
                      Home
                    </Link>
                  </span>

                  <span
                    style={{ marginLeft: '10px' }}
                  >
                    <Link to="/notes">
                      My Notes
                    </Link>
                  </span>

                  <span>
                    <Link
                      to="/"
                      style={{ float: 'right' }}
                      onClick={() => localStorage.clear()}
                    >
                      Sign Out
                    </Link>
                  </span>
                </nav>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  history: PropTypes.object.isRequired,
};


export default withRouter(Header);
