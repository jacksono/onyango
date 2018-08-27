import React from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const EditNote = (props) => {
  const { noteEdit, handleChange } = props;
  return (
    <div>
      <Divider />
      <TextField
        id="titleEdit"
        name="titleEdit"
        value={noteEdit.title}
        onChange={handleChange}
        style={{ display: 'block' }}
      />

      <TextField
        id="contentEdit"
        name="contentEdit"
        value={noteEdit.content}
        multiLine
        rows={3}
        onChange={handleChange}
        style={{ display: 'block', border: '1px solid whitesmoke', borderBottom: 'none' }}
      />

      <RaisedButton onClick={props.updateNote} label="Update Note" primary />
    </div>
  );
};

export default EditNote;
