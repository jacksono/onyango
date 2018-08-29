import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css';

toastr.options = {
  closeButton: true,
  progressBar: true,
};

class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
  };

  signIn = () => {
    const { username, password } = this.state;
    const { history } = this.props;
    const Exp = /^([0-9]|[a-z])+([0-9a-z]+)$/i;
    if (!username.match(Exp)) {
      toastr.error('Username can only contain numbers and letters');
      return;
    }
    if (username.trim() && password.trim()) {
      axios
        .post(
          '/api/auth/signIn',
          { username, password },
        )
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('id', response.data.id);
          history.push('/notes');
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toastr.error(error.response.data.message);
          } else {
            toastr.error('Internal Server Error');
          }
        });
    } else {
      toastr.error('Please fill in both fields');
    }
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { username, password } = this.state;
    const { history } = this.props;
    return (
      <div className="page">
        <h1> Sign In </h1>
        <Divider />

        <TextField
          id="username"
          floatingLabelText="Username"
          hintText="Enter Username"
          name="username"
          value={username}
          onChange={this.handleChange}
          style={{ display: 'block' }}
        />

        <TextField
          id="password"
          floatingLabelText="Password"
          name="password"
          type="password"
          hintText="Enter password"
          value={password}
          onChange={this.handleChange}
          style={{ display: 'block' }}
        />

        <RaisedButton
          onClick={this.signIn}
          label="Sign In"
          primary
          style={{ marginRight: '10px' }}
        />

        <RaisedButton
          onClick={() => history.push('/')}
          label="Cancel"
        />
      </div>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignIn;
