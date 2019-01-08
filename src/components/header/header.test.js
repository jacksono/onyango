import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './header';
/* eslint no-undef:0 */
test('Header renders correctly', () => {
  const tree = renderer
    .create(
      <MuiThemeProvider>
        <Router>
          <Header />
        </Router>
      </MuiThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
