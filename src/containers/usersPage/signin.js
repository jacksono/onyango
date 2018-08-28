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

class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
  };

  signIn = () => {
    const { username, password } = this.state;
    axios
      .post(
        '/api/auth/signIn',
        { username, password },
      )
      .then((response) => {
        this.props.history.push('/notes');
        localStorage.setItem('token', response.data.token);
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
          onClick={() => this.props.history.push('/')}
          label="Cancel"
        />
      </div>
    );
  }
}

export default SignIn;
