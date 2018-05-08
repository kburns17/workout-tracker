import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
// import InfoPage from './components/InfoPage/InfoPage';
import AddWorkout from './components/AddWorkout/AddWorkout';
import PastWorkouts from './components/PastWorkouts/PastWorkouts';
import NewExercise from './components/NewExercise/NewExercise';
import './styles/main.css';
// Styling imports below
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import brown from 'material-ui/colors/brown';
import blue from  'material-ui/colors/blue';

  const theme = createMuiTheme({
    palette: {
      primary: blue, 
      secondary: brown
    }
  });

const App = () => (
  <MuiThemeProvider theme={theme}>
  <div>
    <Header title="Personal Workout Tracker" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        {/* <Route
          path="/info"
          component={InfoPage}
        /> */}
        <Route
          path="/display"
          component={PastWorkouts}
        />
        <Route
         path="/add"
         component={AddWorkout}
       />
        <Route
         path="/newExercise"
         component={NewExercise}
       />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </Router>
  </div>
  </MuiThemeProvider>
);

export default App;
