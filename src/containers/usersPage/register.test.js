import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Register from './register';
/* eslint no-undef:0 */
test('Register page renders correctly', () => {
  const tree = renderer
    .create(
      <MuiThemeProvider>
        <Router>
          <Register history={{}} />
        </Router>
      </MuiThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
