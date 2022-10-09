import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './index.css'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className='mb-3'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <div>
            <Navbar.Brand ><Link className='display-1 brand' to="/">SO-PAL</Link></Navbar.Brand>
            <p className='brand'>SOCIAL-PALS-REACT</p>
          </div>
          <Nav className="me-auto">
            {Auth.loggedIn() ? (
              <div className="d-flex h5 pb-2 mb-4 text-danger border-bottom border-danger">
                <Nav.Link>
                  <Link className='link roboto h5' to="/me">
                    {Auth.getProfile().data.username}'s Profile
                  </Link>
                </Nav.Link>
                <button className="btn btn-outline-light" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Nav.Link >
                  <Link className='link roboto h5' to="/login">
                    Login
                  </Link>
                </Nav.Link>
                <Nav.Link >
                  <Link className='link roboto h5' to="/signup">
                    Signup
                  </Link>
                </Nav.Link>
              </>
            )
            }
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
