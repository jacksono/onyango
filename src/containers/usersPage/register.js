import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

class User extends React.Component {
  state = {
    username: '',
    password: '',
  };

  createUser = () => {
    const { username, password } = this.state;
    axios
      .post(
        '/api/auth/register',
        { username, password },
      )
      .then(() => {
        this.props.history.push('/auth/signIn');
        alert("Registered Successfully, You may now Sign in")
      })
      .catch(error => console.error('Error:', error));
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
          onClick={this.handleCancel}
          label="Cancel"
        />
      </div>
    );
  }
}

export default User;
