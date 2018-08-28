import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import EditNote from '../../components/editNotePage/editNote';

class User extends React.Component {
  state = {
    notes: [],
    isEditing: false,
    noteEdit: '',
    error: true,
    token: localStorage.getItem('token'),
  };

  componentDidMount() {
    this.fetchdata();
  }

  fetchdata = () => {
    const { token } = this.state;
    axios
      .get('/api/notes', { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        this.setState({
          notes: res.data,
          error: false,
        });
      })
      .catch(() => {
        toastr.error('Invalid Token, Please sign in to access this page');
        this.setState({
          error: true,
        });
        this.props.history.push('/');
      });
  };

  isAuthorized = (note) => {
    if (note.userId.toString() === localStorage.getItem('id')) {
      return true;
    }
    return false;
  }

  deleteNote = (note) => {
    const { notes, token } = this.state;
    const newNotes = notes.filter(noteItem => noteItem.id !== note.id);
    if (!this.isAuthorized(note)) {
      return toastr.error('Permission Denied');
    }
    axios.delete(`api/notes/${note.id}`, { headers: { authorization: `Bearer ${token}` } })
      .then(() => {
        this.setState({
          notes: newNotes,
        });
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toastr.error(error.response.data.message);
        }
        console.error(error.response)
      });
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { noteEdit } = this.state;
    if (name === 'titleEdit') {
      const edit = Object.assign({}, noteEdit, { title: value });
      this.setState({
        noteEdit: edit,
      });
    } else if (name === 'contentEdit') {
      const edit = Object.assign({}, noteEdit, { content: value });
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
    const { notes } = this.state;
    const index = notes.indexOf(note);
    if (!this.isAuthorized(note)) {
      toastr.error('Permission Denied');
      return;
    }
    this.setState({
      noteEdit: note,
      isEditing: true,
      indexEdit: index,
    });
  }

  updateNote = () => {
    const { notes, noteEdit, indexEdit, token } = this.state;
    const payload = { title: noteEdit.title, content: noteEdit.content };
    notes.splice(indexEdit, 1, noteEdit);
    axios.patch(`api/notes/${noteEdit.id}`, payload, { headers: { authorization: `Bearer ${token}` } })
      .then(() => {
        this.setState({
          notes,
          isEditing: false,
        });
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toastr.error(error.response.data.message);
        }
        console.error(error.response);
      });
  }

  handleCancel = () => {
    this.setState({
      isEditing: false,
    });
  }

  handleView = (note) => {
    if (!this.isAuthorized(note)) {
      return toastr.error('Permission Denied');
    }
    this.props.history.push(`/view/${note.id}`);
  }

  render() {
    const { notes, noteEdit, isEditing, error } = this.state;
    return (
      <div className="page">
        <h1>My Notes</h1>
        <FloatingActionButton
          mini
          secondary
          style={{ float: 'right', marginTop: '-60px' }}
          onClick={() => this.props.history.push('/new')}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Divider style={{ marginBottom: '10px' }} />
        {notes.length === 0
          && (
            <span>
              You have no notes yet.
              <Link to="/new"> Click here </Link>
              to add your first one.
            </span>
          )}
        { isEditing
          ? (
            <EditNote
              noteEdit={noteEdit}
              handleChange={this.handleChange}
              updateNote={this.updateNote}
              handleCancel={this.handleCancel}
            />
          )
          : (
            <div>
              {notes.map(note => (
                <span key={note.id}>
                  <span
                    role="presentation"
                    onClick={() => this.handleView(note)}
                    className="title"
                  >
                    {note.title}
                  </span>

                  <div style={{ float: 'right' }}>
                    <button
                      type="button"
                      onClick={() => this.editNote(note)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => this.deleteNote(note)}
                      style={{ marginLeft: '10px' }}
                    >
                      Delete
                    </button>
                  </div>
                  <br />
                  <br />
                  <Divider style={{ marginBottom: '10px' }} />

                </span>
              ))}
            </div>
          )
          }
      </div>
    );
  }
}

export default User;
