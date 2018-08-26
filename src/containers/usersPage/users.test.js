/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import User from './users';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

test('User renders correctly', () => {
  const tree = renderer
    .create(
      <MuiThemeProvider>
        <User />
      </MuiThemeProvider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
