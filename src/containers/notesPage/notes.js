import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

class User extends React.Component {
  state = {
    notes: [],
  };

  componentDidMount() {
    this.fetchdata();
  }

  fetchdata = () => {
    axios
      .get('/api/notes')
      .then((res) => {
        this.setState({
          notes: res.data,
        });
      })
      .catch(error => console.error('Error:', error));
  };

  deleteNote = (id) => {
    axios.delete(`api/notes/${id}`)
      .then(() => {
        const  newNotes = this.state.notes.filter(note => note.id !== id)
        this.setState({
          notes: newNotes,
        })
      })
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { notes } = this.state;
    return (
      <div style={{ textAlign: 'left', backgroundColor: 'white', padding: '1rem' }}>
        <ul>
          {notes.map(note => (
            <li key={note.id}>
              <p>{`Title: ${note.title} `}</p>
              <p>{note.content}</p>
              <button type="button" onClick={this.deleteNote(note.id)}> Delete </button>
            </li>
          ))}
        </ul>
        <Divider />
      </div>
    );
  }
}

export default User;
