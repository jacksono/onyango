import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css';

toastr.options = {
  closeButton: true,
  progressBar: true,
};

class Register extends React.Component {
  state = {
    username: '',
    password: '',
  };

  createUser = () => {
    const { username, password } = this.state;
    if (!(username.trim() && password.trim())) {
      toastr.error('Please fill in both fields');
      return;
    }
    axios
      .post(
        '/api/auth/register',
        { username, password },
      )
      .then(() => {
        toastr.success('Registered Succesfully, You can now sign in');
        this.props.history.push('/auth/signIn');
      })
      .catch((error) => {
        toastr.error('Internal Server Error');
        console.error('Error:', error);
      });
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
    return (
      <div className="page">
        <h1> Register </h1>
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
          onClick={this.createUser}
          label="Register"
          primary
          style={{ marginRight: '10px' }}
        />

        <RaisedButton
          onClick={() => this.props.history.push('/')}
          label="Cancel"
        />
      </div>
    );
  }
}

export default Register;
