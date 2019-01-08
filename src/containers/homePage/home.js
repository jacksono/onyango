import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import moment from 'moment';
import Divider from 'material-ui/Divider';


class Home extends React.Component {
  state = {
    notes: [],
    token: localStorage.getItem('token'),
  };

  componentDidMount() {
    if (process.env.NODE_ENV !== 'test') {
      this.fetchdata();
    }
  }

  fetchdata = () => {
    const { token } = this.state;
    const { history } = this.props;
    axios
      .get('/api/notes?q=all', { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        this.setState({
          notes: res.data,
        });
      })
      .catch(() => {
        toastr.error('Invalid Token, Please sign in to access this page');
        this.setState({
        });
        history.push('/');
      });
  };

  render() {
    const { notes } = this.state;
    return (
      <div className="page">
        <h1>Note Titles By Others</h1>
        <Divider style={{ marginBottom: '10px' }} />
        {notes.length === 0
          && (
            <span>
              There are no notes yet.
              <Link to="/new"> Click here </Link>
              to add the first one.
            </span>
          )}
        <div>
          {notes.map(note => (
            <span key={note.id}>
              <span
                role="presentation"
              >
                {note.title}
              </span>
              <span style={{ float: 'right' }}>
                {`Written on ${moment(note.created_at).format('LL')} `}
              </span>
              <br />
              <br />
              <Divider style={{ marginBottom: '10px' }} />
            </span>
          ))}
        </div>
      </div>
    );
  }
}
Home.defaultProps = {
  history: null,
};

Home.propTypes = {
  history: PropTypes.object,
};

export default Home;
