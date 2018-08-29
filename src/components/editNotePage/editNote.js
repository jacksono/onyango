import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const EditNote = (props) => {
  const {
    noteEdit, handleChange, updateNote, handleCancel,
  } = props;
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
        onClick={updateNote}
        label="Update Note"
        primary
        style={{ marginRight: '10px' }}
      />
      <RaisedButton
        onClick={handleCancel}
        label="Cancel"
      />
    </div>
  );
};

EditNote.propTypes = {
  handleChange: PropTypes.func.isRequired,
  noteEdit: PropTypes.object.isRequired,
  updateNote: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default EditNote;
