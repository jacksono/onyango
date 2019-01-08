/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import AddNote from './addNote';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const div = document.createElement('div');
ReactDOM.render(
  <MuiThemeProvider>
    <AddNote history={{}} />
  </MuiThemeProvider>,
  div,
);

describe('Smoke test', () => {
  it('Renders add note page without crashing', () => {
    ReactDOM.unmountComponentAtNode(div);
  });
});
