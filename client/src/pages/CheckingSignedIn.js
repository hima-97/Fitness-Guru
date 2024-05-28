// The CheckingSignedIn.js file in the Fitness Guru application defines a functional component called 'CheckingSignedIn', which provides visual feedback during user authentication status checks. This component helps enhance user experience by visually indicating that the system is processing their login status.

// **Imports**
// It imports:
// - **React:** Main library for building the user interface.
// - **Spinner:** From "react-bootstrap" to show a loading animation.
// - **styled:** From "styled-components" for CSS-in-JS styling.
// - **Navbar, Container:** From "react-bootstrap" for layout and navigation components.

// **CheckingSignedIn Component**
// A functional component that:
// - Uses 'styled-components' to create a 'CheckingSignedInWrapper' div which is styled to center its content horizontally and vertically, with a light gray background.
// - Renders a 'Navbar' at the top with the brand name 'Fitness Guru' and a link to the homepage, maintaining application branding and providing navigation.
// - Includes a 'Spinner' inside the 'CheckingSignedInWrapper' to visually represent the ongoing check for user sign-in status. The spinner uses a 'border' animation style to indicate activity.

// **Visual Feedback During Authentication Checks:**
// - Displays a loading spinner when checking if the user is signed in, which provides immediate feedback to the user that their status is being processed.

// **Styling and Layout:**
// - The 'CheckingSignedInWrapper' styled div ensures the spinner is centered and visible, making the interface intuitive and focused.
// - Uses CSS-in-JS through 'styled-components', allowing for dynamic styling scoped directly to the component without affecting other parts of the application.

// **Integration with Navigation:**
// - The navigation bar keeps the user oriented within the app, offering a familiar element of the user interface and a way to navigate back to the home page if necessary.

// **Return Statement:**
// - Renders a structured layout with a navigation bar and a centered spinner inside the styled 'CheckingSignedInWrapper', providing a clear indication of ongoing processes.

// **CSS Styling:**
// - The CSS for 'CheckingSignedInWrapper' is defined using 'styled-components', ensuring the spinner is aesthetically pleasing and effectively communicates the loading state.

// **Key Features and Functionality**
// - **Visual Feedback During Authentication Checks:** Enhances user experience by clearly showing that the system is active.
// - **Styling and Layout:** Focuses on user comfort and interface clarity.
// - **Integration with Navigation:** Maintains usability and accessibility during the sign-in process.

// Example Usage:

// <CheckingSignedIn />



// Importing necessary React and React-Bootstrap components
import React from "react";
import Spinner from "react-bootstrap/Spinner";  // Spinner component for loading indicator
import styled from "styled-components";  // Import styled-components for custom component styling

// Importing Navbar and Container components from react-bootstrap for layout and UI structuring
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

// Defining a styled div that covers the entire viewport and centers its content both vertically and horizontally
// The background is semi-transparent (rgba(0, 0, 0, 0.1)), creating a dimming effect that focuses attention on the spinner
const CheckingSignedInWrapper = styled.div`
    height: 100vh;  // 100% of the viewport height
    width: 100vw;   // 100% of the viewport width
    display: flex;  // Using Flexbox for layout
    justify-content: center;  // Centers content horizontally
    align-items: center;  // Centers content vertically
    background-color: rgba(0, 0, 0, 0.1);  // Semi-transparent black background
`;

// Functional component that renders the sign-in checking UI
export default function CheckingSignedIn() {
    return (
        // React fragment to return multiple elements without adding extra nodes to the DOM
        <>
            <Navbar bg="light" expand="lg">  // Light-themed Navbar that expands at 'lg' (large) breakpoint
                <Container>
                    <Navbar.Brand href="/">Fitness Guru</Navbar.Brand>  // Branding link that leads to the home page
                </Container>
            </Navbar>
            <CheckingSignedInWrapper>
                <Spinner animation="border" role="status" />  // Spinner for loading indication with 'border' animation
                // 'role="status"' makes it accessible, indicating that this is a status message (loading)
            </CheckingSignedInWrapper>
        </>
    );
}
