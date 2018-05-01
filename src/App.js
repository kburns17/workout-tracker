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
import InfoPage from './components/InfoPage/InfoPage';
import AddWorkout from './components/AddWorkout/AddWorkout';
import PastWorkouts from './components/PastWorkouts/PastWorkouts';

import './styles/main.css';
import NewExercise from './components/NewExercise/NewExercise';

const App = () => (
  <div>
    <Header title="Workout Tracker" />
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
);

export default App;
