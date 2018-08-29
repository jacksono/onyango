/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import EditNote from './editNote';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const div = document.createElement('div');
ReactDOM.render(
  <MuiThemeProvider>
    <EditNote
      noteEdit={{}}
      handleChange={() => {}}
      handleCancel={() => {}}
      updateNote={() => {}}
    />
  </MuiThemeProvider>,
  div,
);

describe('Smoke test', () => {
  it('Renders Edit note page without crashing', () => {
    ReactDOM.unmountComponentAtNode(div);
  });
});
