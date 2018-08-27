import React from 'react';
import axios from 'axios';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import EditNote from '../../components/editNotePage/editNote'

class User extends React.Component {
  state = {
    notes: [],
    isEditing: false,
    noteEdit: '',
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
    if (name === 'titleEdit') {
      const edit = Object.assign({}, this.state.noteEdit, { title: value });
      this.setState({
        noteEdit: edit,
      });
    } else if (name === 'contentEdit') {
      const edit = Object.assign({}, this.state.noteEdit, { content: value });
      this.setState({
        noteEdit: edit,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  editNote = (note) => {
    const index = this.state.notes.indexOf(note)
    this.setState({
      noteEdit: note,
      isEditing: true,
      indexEdit: index,
    });
  }

  updateNote = () => {
    const { notes, noteEdit, indexEdit } = this.state;
    const payload = { title: noteEdit.title, content: noteEdit.content };
    notes.splice(indexEdit, 1, noteEdit);
    axios.put(`api/notes/${noteEdit.id}`, payload)
      .then(() => {
        this.setState({
          notes,
          isEditing: false,
        });
      });
  }

  render() {
    const { notes, noteEdit, isEditing } = this.state;
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
        { isEditing
          ? (
            <EditNote
              noteEdit={noteEdit}
              handleChange={this.handleChange}
              updateNote={this.updateNote}
            />
          )
          : (
            <ul>
              {notes.map(note => (
                <li key={note.id}>
                  <span>{`Title: ${note.title} `}</span>

                  <div style={{ float: 'right' }}>
                    <button
                      type="button"
                      onClick={() => this.editNote(note)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => this.deleteNote(note.id)}
                      style={{ marginLeft: '10px' }}
                    >
                      Delete
                    </button>
                  </div>
                  <p>{note.content}</p>
                  <Divider style={{ marginBottom: '10px' }} />

                </li>
              ))}
            </ul>
          )
          }
      </div>
    );
  }
}

export default User;
