import React from "react";
import './navbar-view.scss';
import { Navbar, Container, Nav, Button, Offcanvas, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

export function NavbarView({ user }) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }

    const isAuth = () => {
        let accessToken = localStorage.getItem('token');
        if (accessToken) {
            return accessToken;
        } else {
            return false;
        }
    };

    return (
        <Container>
            <Navbar bg="light" expand="lg">
                <Container className="navbar-container">
                    <Navbar.Brand as={Link} to={"/"} href="#home">ApiFlix</Navbar.Brand>

                    <Nav className="me-auto navbar-elements__style">

                        {isAuth() && (
                            <Nav.Link as={Link} to={`/`}>Movies</Nav.Link>
                        )}

                        {isAuth() && (
                            <Nav.Link as={Link} to={`/users/${user}`}>Profile</Nav.Link>
                        )}

                        {isAuth() && (
                            <Nav.Link onClick={() => onLoggedOut()}>Logout</Nav.Link>
                        )}

                        {!isAuth() && (
                            <Nav.Link as={Link} to={`/`}>Login</Nav.Link>
                        )}

                        {!isAuth() && (
                            <Nav.Link as={Link} to={`/register`}>Sign Up</Nav.Link>
                        )}


                    </Nav>

                </Container>
            </Navbar>
        </Container>

    )
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, {})(NavbarView);