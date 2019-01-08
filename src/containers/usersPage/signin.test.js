import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SignIn from './signin';
/* eslint no-undef:0 */
test('Sign in page renders correctly', () => {
  const tree = renderer
    .create(
      <MuiThemeProvider>
        <Router>
          <SignIn history={{}} />
        </Router>
      </MuiThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
