import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './home';
/* eslint no-undef:0 */
test('Home page renders correctly', () => {
  const tree = renderer
    .create(
      <MuiThemeProvider>
        <Router>
          <Home />
        </Router>
      </MuiThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
