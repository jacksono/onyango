import React from 'react';
import axios from 'axios';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class AddNote extends React.Component {
  state = {
    title: '',
    content: '',
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('id'),
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  createNote =() => {
    const { history } = this.props;
    const {
      title, content, token, userId,
    } = this.state;
    const Exp = /^([0-9]+[\s]*|[a-z]+[\s]*)+([0-9a-z]+)$/i;
    if (!title.match(Exp)) {
      toastr.error('Title can only contain letters and numbers');
      return;
    }
    if (!(title && content)) {
      toastr.error('Please fill in both fields');
      return;
    }
    const payload = { title, content, userId };
    axios.post('/api/notes', payload, { headers: { authorization: `Bearer ${token}` } })
      .then(() => {
        toastr.success('Note Added Succesfully');
        history.push('/notes');
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toastr.error(error.response.data.message);
        } else {
          toastr.error('Internal Server Error');
        }
      });
  }

  render() {
    const { title, content } = this.state;
    const { history } = this.props;
    return (
      <div className="page">
        <h1> Add Note </h1>
        <Divider />
        <TextField
          floatingLabelText="Title"
          id="title"
          name="title"
          value={title}
          fullWidth
          onChange={this.handleChange}
          style={{ display: 'block' }}
        />

        <TextField
          floatingLabelText="Content"
          id="content"
          name="content"
          value={content}
          multiLine
          rows={3}
          fullWidth
          onChange={this.handleChange}
          style={{ display: 'block', border: '1px solid whitesmoke', borderBottom: 'none' }}
        />

        <RaisedButton
          onClick={this.createNote}
          label="Add Note"
          primary
          style={{ marginRight: '10px' }}
        />
        <RaisedButton
          onClick={() => history.push('/notes')}
          label="Cancel"
        />
      </div>
    );
  }
}

AddNote.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AddNote;
