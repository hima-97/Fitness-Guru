// The NavBar.js file in the Fitness Guru application defines the NavBar component, which acts as the primary navigation interface across the web application, ensuring user-friendly and responsive navigation.

// **Imports**
// It imports:
// - **React-Bootstrap Components:** Navbar, Nav, NavDropdown for building the navigation structure.
// - **Images:** An image of a dumbbell from './img/dumbbell.png' to enhance visual branding.
// - **React:** Main library for building user interfaces.

// **NavBar Component**
// A functional component that:
// - Receives `user` as a prop to access the user's authentication status and related data.
// - Utilizes React-Bootstrap components to create a responsive and aesthetically pleasing navigation bar.
// - **Return Statement:**
//   - Renders a `Navbar` with className "color-nav", which includes properties like `expand` for responsive behavior and `sticky` for fixed positioning at the top.
//   - Inside the `Navbar`, a `Container` holds the navigation elements:
//     - **Navbar.Brand:** A link to the homepage featuring the dumbbell image, symbolizing the fitness theme.
//     - **Navbar.Toggle:** Controls the visibility of the navigation links on smaller screens.
//     - **Navbar.Collapse:** Contains the navigation links organized into two groups:
//       - **First Group:** Links accessible only when the user is authenticated (e.g., Profile, Exercises, Workouts, Splits, Weights, Progress).
//       - **Second Group:** A `NavDropdown` that includes the user's name and profile picture when logged in, and a logout option that triggers the `signOut` function from the user object.

// **Key Features and Functionality**
// - **Responsive and User-Specific Navigation:**
//   - Adapts to various screen sizes and conditions, ensuring accessibility across devices.
//   - Displays different sets of links based on the user's login status, enhancing user experience and security.
// - **Integration with User Data:**
//   - Shows user-specific elements like name and profile picture in the navigation bar when the user is authenticated.
//   - Incorporates a logout functionality within a dropdown, allowing users to easily sign out.

// **CSS Styling:**
// - Uses the className "color-nav" to apply specific styles, potentially defined in an external CSS file, to customize the appearance of the navigation bar.

// Example Usage:

// <NavBar user={currentUser} />


import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import dumbbell from './img/dumbbell.png';  // Imports an image to be used as the logo.

// Define a functional component called NavBar that receives 'props' as an argument.
export default function NavBar(props) {
    // Extract 'user' from props for conditional rendering based on user state.
    const user = props.user;

    return (
        // Create a responsive navigation bar that sticks to the top of the viewport.
        <Navbar className="color-nav" expand="lg" sticky="top">
            // Use a Container to align the Navbar contents properly within a responsive grid.
            <Container>
                // Navbar.Brand defines the brand logo and name, linking back to the homepage.
                <Navbar.Brand href="/">
                    <img src={dumbbell} width="30" height="30" class="d-inline-block align-top" style={{marginRight: '5px'}} alt=""></img>
                    Fitness Guru
                </Navbar.Brand>
                // Navbar.Toggle is used for collapsible behavior in small screens.
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                // Navbar.Collapse contains all the navigation links that collapse based on the toggle.
                <Navbar.Collapse id="basic-navbar-nav">
                    // Nav component holds individual navigation links aligned to the left (mr-auto).
                    <Nav className="mr-auto">
                        // Conditional rendering to display links only if 'user' is available.
                        {user && <Nav.Link href="/profile">Profile</Nav.Link>}
                        {user && <Nav.Link href="/myexercises">My Exercises</Nav.Link>}
                        {user && <Nav.Link href="/myworkouts">My Workouts</Nav.Link>}
                        {user && <Nav.Link href="/mysplits">My Splits</Nav.Link>}
                        {user && <Nav.Link href="/publicsplits">Public Splits</Nav.Link>}
                        {user && <Nav.Link href="/myweights">My Weights</Nav.Link>}
                        {user && <Nav.Link href="/progress">My Progress</Nav.Link>}
                    </Nav>
                    // Another Nav component, this one for authentication-dependent elements.
                    <Nav>
                        // If 'user' is not present, render a placeholder where a login button could go.
                        {!user ? (
                            <div id="login-button" />
                        ) : (
                            // NavDropdown for user-specific actions such as logging out.
                            <NavDropdown
                                title={
                                    <span>
                                        Hello, {user.fullName} // Display user's full name.
                                        <img
                                            src={user.imageUrl} // Display user's profile image.
                                            alt="profile"
                                            style={{ width: "24px", height: "24px" }}
                                        />
                                    </span>
                                }
                                id="basic-nav-dropdown"
                            >
                                // Dropdown item to trigger user sign out.
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

