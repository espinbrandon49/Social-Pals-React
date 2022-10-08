import React from 'react';
import { Link } from 'react-router-dom'
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }
  return (
    <div>
        <Link to="/">
          <h1>So Pals Can React</h1>
        </Link>
      <div>
        {Auth.loggedIn() ? (
          <>
            <Link to="/me">                {Auth.getProfile().data.username}'s profile</Link>
            <button onClick={logout}> Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login </Link>
            <Link to="/signup"> Signup</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header