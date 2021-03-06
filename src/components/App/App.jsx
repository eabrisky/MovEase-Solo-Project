import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Menu from '../Menu/Menu';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Catalog from '../Catalog/Catalog';
import Movie from '../Movie/Movie';
import Edit from '../Edit/Edit';
import Form from '../Form/Form';
import Search from '../Search/Search';
import Dashboard from '../Dashboard/Dashboard';
import Tags from '../Tags/Tags';

import ImageUpload from '../ImageUpload/ImageUpload';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);0

  return (
    <Router>
      <div>
        <Menu />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/catalog"
          >
            <Catalog />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/edit"
            component={Edit}
          >
            <Edit />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/movie/:id"
            component={Movie}
          >
            <Movie />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/form"
          >
            <Form />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/search"
          >
            <Search />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/dashboard"
          >
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/imageupload"
          >
            <ImageUpload />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/tags"
          >
            <Tags />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/catalog"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/user"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/catalog"
            authRedirect="/catalog"
          >
            <LandingPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
