import React from 'react';
import axios from 'axios';

import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class AddNote extends React.Component {
  state = {
    title: '',
    content: '',
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  createNote =() => {
    const { title, content } = this.state;
    const payload = { title, content };
    axios.post('/', payload)
      .then(() => {
        console.log('Note Added Succesfully');
        this.props.history.push('/notes')
      })
      .catch(error => console.error(error));
  }

  render() {
    const { title } = this.state;
    return (
      <div className="page">
        <h1> Add Note </h1>
        <Divider />
        <TextField
          id="newNote"
          hintText="Title"
          name=""
          value={title}
          onChange={this.handleChange}
          style={{ display: 'block' }}
        />

        <TextField
          floatingLabelText="Content"
          multiLine
          rows={3}
          style={{ display: 'block', border: '1px solid whitesmoke', borderBottom: 'none' }}
        />

        <RaisedButton onClick={this.createNote} label="Add Note" primary />
      </div>
    );
  }
}

export default AddNote;
