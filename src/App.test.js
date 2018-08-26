/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const div = document.createElement('div');
ReactDOM.render(<App />, div);

describe('tests here', () => {
  it('has a header', () => {
    expect(div.getElementsByTagName('h1').length).toEqual(1);
  });
  it('has a header text', () => {
    expect(div.getElementsByTagName('h1')[0].innerHTML).toEqual("Welcome to My World");
  });
  it('renders without crashing', () => {
    ReactDOM.unmountComponentAtNode(div);
  });
})
