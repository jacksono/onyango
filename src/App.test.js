/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const div = document.createElement('div');
ReactDOM.render(<App />, div);

describe('Smoke test', () => {
  it('Renders component without crashing', () => {
    ReactDOM.unmountComponentAtNode(div);
  });
})
