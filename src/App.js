import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './components/header/header';
import Home from './components/homePage/home';
import Users from './containers/usersPage/users';
import Notes from './containers/notesPage/notes';
import AddNote from './components/addNotePage/addNote';
import ViewNote from './containers/viewNotePage/viewNote';

const App = () => {
  return (
    <MuiThemeProvider>
      <Router>
        <div>
          <Header />
          <Route path="/home" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/notes" component={Notes} />
          <Route path="/new" component={AddNote} />
          <Route path="/view/:title" component={ViewNote} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
