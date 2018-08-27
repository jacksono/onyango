import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
    const { notes } = this.state;
    const newNotes = notes.filter(note => note.id !== id);
    axios.delete(`api/notes/${id}`)
      .then(() => {
        this.setState({
          notes: newNotes,
        });
      });
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
      <div className="page">
        <h1>Notes</h1>
        <FloatingActionButton
          mini
          secondary
          style={{ float: 'right', marginTop: '-3rem' }}
          onClick={() => this.props.history.push('/new')}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Divider />
        <ul>
          {notes.map(note => (
            <li key={note.id}>
              <p>{`Title: ${note.title} `}</p>
              <p>{note.content}</p>
              <button type="button" onClick={() => this.deleteNote(note.id)}> Delete </button>
            </li>
          ))}
        </ul>
        <Divider />
      </div>
    );
  }
}

export default User;
