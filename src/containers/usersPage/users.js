import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

class User extends React.Component {
  state = {
    msg: '',
    users: [],
    first: {},
    name: '',
    newUser: '',
  };

  componentDidMount() {
    if (process.env.NODE_ENV !== 'test') {
      axios
        .get('/api/')
        .then((res) => {
          this.setState({
            msg: res.data.message,
          });
        })
        .catch(error => console.error('Error:', error));
      this.fetchdata();
    }
  }

  fetchdata = () => {
    axios
      .get('/api/users')
      .then((res) => {
        this.setState({
          users: res.data,
        });
      })
      .then(() => {
        this.fetchFirst();
      })
      .catch(error => console.error('Error:', error));
  };

  fetchFirst = () => {
    const { users } = this.state;
    axios
      .get(`/api/users/${users.slice(-1)[0].id}`)
      .then((res) => {
        this.setState({
          first: res.data,
        });
      })
      .catch(error => console.error('Error:', error));
  };

  createUser = () => {
    const { newUser } = this.state;
    axios
      .post(
        '/api/users',
        { name: newUser, title: 'Sir' },
        { headers: { 'x-head': 'header' } },
      )
      .then(() => {
        this.fetchdata();
      })
      .catch(error => console.error('Error:', error));
  };

  update = () => {
    const { users, name } = this.state;
    axios
      .patch(`/api/users/${users[0].id}`, {
        name,
      })
      .then(() => {
        this.fetchdata();
      })
      .catch(error => console.error('Error:', error));
  };

  deleteLast = () => {
    const { users } = this.state;
    axios
      .delete(`/api/users/${users[0].id}`)
      .then(() => {
        this.fetchdata();
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
    const {
      first,
      msg,
      newUser,
      name,
      users,
    } = this.state;
    return (
      <div style={{ textAlign: 'left', backgroundColor: 'white', padding: '1rem' }}>
        {`API status: ${msg}`}
        <Divider />
        <p>
          {`The first user is ${first.name}`}
        </p>
        <TextField
          id="newUser"
          hintText="New User"
          name="newUser"
          value={newUser}
          onChange={this.handleChange}
          style={{ display: 'block' }}
        />
        <RaisedButton onClick={this.createUser} label="Add User" primary />
        <br />
        <br />

        <TextField
          id="name"
          name="name"
          hintText="Update Last User"
          value={name}
          onChange={this.handleChange}
          style={{ display: 'block' }}
        />

        <RaisedButton onClick={this.update} label="Update Last User" primary />
        <br />
        <br />
        <br />
        <RaisedButton
          onClick={this.deleteLast}
          label="Delete Last User"
          secondary
        />
        <br />
        <br />
        <Divider />
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {`ID:${user.id} ${user.name}`}

            </li>
          ))}
        </ul>
        <Divider />
      </div>
    );
  }
}

export default User;
