import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ViewNote from './viewNote';
/* eslint no-undef:0 */
test('View note page renders correctly', () => {
  const tree = renderer
    .create(
      <MuiThemeProvider>
        <Router>
          <ViewNote history={{}} match={{ params: {} }} />
        </Router>
      </MuiThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
