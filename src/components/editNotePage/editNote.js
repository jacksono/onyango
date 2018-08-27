import React from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const EditNote = (props) => {
  const { noteEdit, handleChange } = props;
  return (
    <div>

      <TextField
        floatingLabelText="Title"
        id="titleEdit"
        name="titleEdit"
        value={noteEdit.title}
        onChange={handleChange}
        fullWidth
        style={{ display: 'block' }}
      />

      <TextField
        floatingLabelText="Content"
        id="contentEdit"
        name="contentEdit"
        value={noteEdit.content}
        multiLine
        rows={3}
        fullWidth
        onChange={handleChange}
        style={{ display: 'block', border: '1px solid whitesmoke', borderBottom: 'none' }}
      />

      <RaisedButton
        onClick={props.updateNote}
        label="Update Note"
        primary
        style={{ marginRight: '10px' }}
      />
      <RaisedButton
        onClick={props.handleCancel}
        label="Cancel"
      />
    </div>
  );
};

export default EditNote;
