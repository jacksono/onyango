import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './components/header/header';
import Home from './containers/homePage/home';
import Users from './containers/usersPage/users';
import Notes from './containers/notesPage/notes';
import AddNote from './containers/addNotePage/addNote';
import ViewNote from './containers/viewNotePage/viewNote';
import Register from './containers/usersPage/register';
import SignIn from './containers/usersPage/signin';

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
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/signIn" component={SignIn} />
          <Route path="/view/:id" component={ViewNote} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
