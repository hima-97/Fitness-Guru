// The NavBar.js file is used to create the navigation bar that appears at the top of the web page
// It is a functional component which receives the user object as a prop and uses it to conditionally render certain elements of the navigation bar
// It starts by importing several components from the 'react-bootstrap' library, such as Navbar, Nav, and NavDropdown, which are used to create the structure and layout of the navigation bar
// It also imports an image of a dumbbell from the './img/dumbbell.png' file
// The component starts by defining a constant variable 'user' which is equal to the user prop passed to the component
// Then it returns a Navbar element, with className "color-nav" and expand and sticky properties
// Inside the Navbar, there is a Container element which contains a Navbar.Brand element, which is a link to the homepage, and displays the dumbbell image
// Then there is a Navbar.Toggle element that controls the visibility of the navigation links, and a Navbar.Collapse element which contains the navigation links
// The navigation links are divided into two groups:
// -    the first group contains links that are only displayed if the user object is not null
//      the first group contains links to the user's profile, the exercises, the workouts, the splits, the weights, and the progress page
// -    the second group contains a NavDropdown element which displays a dropdown menu with a logout button
//      the second group contains the user's name and profile picture, which are displayed when the user is logged in
// When the user clicks the logout button, the signOut function from the user object is called


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
