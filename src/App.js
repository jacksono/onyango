import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './components/header/header';
import Home from './components/homePage/home';
import Users from './containers/usersPage/users';
import Notes from './containers/notesPage/notes';

const App = () => {
  return (
    <MuiThemeProvider>
      <Router>
        <div>
          <Header />
          <Route path="/home" component={Home} />
          <Route path="/users/" component={Users} />
          <Route path="/notes/" component={Notes} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
