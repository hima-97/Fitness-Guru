import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import dumbbell from './img/dumbbell.png';

export default function NavBar(props) {
    const user = props.user;

    return (
        <Navbar className="color-nav" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/"><img src= {dumbbell} width="30" height="30" class="d-inline-block align-top" style={{marginRight: '5px'}} alt=""></img>Fitness Guru</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {user && <Nav.Link href="/profile">Profile</Nav.Link>}
                        {user && (
                            <Nav.Link href="/myexercises">
                                My Exercises
                            </Nav.Link>
                        )}
                        {user && (
                            <Nav.Link href="/myworkouts">My Workouts</Nav.Link>
                        )}
                        {user && (
                            <Nav.Link href="/mysplits">My Splits</Nav.Link>
                        )}
                        {user && (
                            <Nav.Link href="/publicsplits">Public Splits</Nav.Link>
                        )}
                        {user && (
                            <Nav.Link href="/myweights">My Weights</Nav.Link>
                        )}
                        {user && (
                            <Nav.Link href="/progress">My Progress</Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {!user ? (
                            <div id="login-button" />
                        ) : (
                            <NavDropdown
                                title={
                                    <span>
                                        Hello, {user.fullName}{" "}
                                        <img
                                            src={user.imageUrl}
                                            alt="profile"
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                            }}
                                        />{" "}
                                    </span>
                                }
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item onClick={user.signOut}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
