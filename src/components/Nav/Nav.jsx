import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">MovEase</h2>
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        <Link className="navLink" to="/catalog">
          Catalog
        </Link>
        <Link className="navLink" to="/datalog">
          Datalog
        </Link>

        <Link className="navLink" to="/movie">
          Movie
        </Link>

        {/* <Link className="navLink" to="/edit">
          Edit
        </Link> */}

        <Link className="navLink" to="/form">
          Form
        </Link>

        <Link className="navLink" to="/search">
          Search
        </Link>

        <Link className="navLink" to="/dashboard">
          Dashboard
        </Link>

        <Link className="navLink" to="/imageupload">
          Image Upload
        </Link>

        <Link className="navLink" to="/about">
          About
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

      </div>
    </div>
  );
}

export default Nav;
