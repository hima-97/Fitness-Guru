// The Private.js file in the Fitness Guru application defines a functional React component that serves as a gatekeeper for pages that are only accessible to authenticated users. It provides clear feedback to unauthenticated users that they need to log in to view the content.

// **Imports**
// It imports:
// - **React:** Main library for building the user interface.
// - **Container:** From 'react-bootstrap', used for responsive and centered content layout.
// - **getUser:** Utility function from '../utils/get-user', to check the current user's login status.
// - **Layout:** Component from '../components/Layout', which provides consistent navigation and structural design across the application.

// **Private Component**
// A functional component that:
// - Calls 'getUser' to determine if the user is logged in.
// - Renders the 'Layout' component, passing the user object as a prop if the user is authenticated.
// - Inside the 'Layout', it displays a 'Container' which centrally aligns the content.
// - Renders an 'H1' element with the text "This page is private!" and a 'div' with additional text "(meaning you have to login to view the page)", clearly communicating that the page is restricted to logged-in users.

// **Key Features and Functionality**
// - **User Authentication Feedback:**
//   - Informs users that the page they are attempting to access is private and requires authentication. This helps in maintaining security and privacy for sensitive user data.
// - **Integration with User Management:**
//   - Utilizes 'getUser' to verify the user's authentication status, ensuring that only authenticated users can view the content. If the user is not logged in, the component effectively communicates the need to log in.

// **Return Statement:**
// - The component returns JSX that includes the 'Layout' component wrapping a 'Container'. Inside the container, an 'H1' element and a 'div' clearly inform the user about the private nature of the page.

// **CSS Styling:**
// - Likely utilizes CSS from 'react-bootstrap' to ensure that the message is not only visible but also aesthetically aligned with the overall design of the application. Additional styling may be applied to enhance the visibility and impact of the message.

// **Example Usage:**

// <Private />



// Importing React for building the component and using JSX.
import React from "react";
// Importing the Container component from react-bootstrap for layout purposes.
import Container from "react-bootstrap/Container";

// Importing the getUser function which is used to retrieve user data from local storage or a session.
import getUser from "../utils/get-user";
// Importing the Layout component which wraps around the page content and includes shared elements like navigation bars and footers.
import Layout from "../components/Layout";

// Declaring a functional component named 'Login' for handling private routes.
export default function Login() {
    // Calling the getUser function to determine if a user is currently logged in. This function returns user details if logged in, or null otherwise.
    const user = getUser();

    // Rendering the component using JSX.
    return (
        // Using the Layout component to wrap the page content. This ensures consistency across different parts of the application.
        <Layout user={user}>
            {/* The Container component is used here to handle the layout. This component helps in aligning and padding content within a "container". */}
            <Container>
                {/* Displaying a heading to indicate the page is private. */}
                <h1>This page is private!</h1>
                {/* Additional descriptive text to explain that the user must be logged in to view the page. */}
                <div>(meaning you have to login to view the page)</div>
                {/* A line break for better visual spacing. */}
                <br />
            </Container>
        </Layout>
    );
}

