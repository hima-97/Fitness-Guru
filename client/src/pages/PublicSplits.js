// The PublicSplits.js file in the Fitness Guru application defines a component that renders a page for displaying publicly available workout splits. This component is part of the client/src/pages directory and plays a crucial role in enabling users to explore various workout routines shared by others.

// **Imports**
// It imports:
// - **React:** Main library for building the user interface.
// - **getUser:** Utility function from '../utils/get-user', used to fetch the current user's data.
// - **Layout:** Component from '../components/Layout', which provides a consistent structural framework across the application.
// - **Container:** From 'react-bootstrap', used for responsive and centered content layout.
// - **PublicSplits Component:** From '../components/PublicSplits', responsible for fetching and displaying the list of public workout splits.

// **PublicSplits Component (Page)**
// A functional component that:
// - Retrieves the current user's data using 'getUser' and passes this data as a prop to the 'Layout' component, ensuring that user-specific elements can be dynamically rendered.
// - Wraps the main content within the 'Layout' component to maintain consistency with the rest of the application, including navigation and footer.
// - Utilizes a 'Container' to neatly organize and center the content, providing a clean layout for displaying the public workout splits.
// - Renders the 'PublicSplits' component inside the 'Container', which handles the logic for fetching and displaying publicly available workout splits.

// **Key Features and Functionality**
// - **User Context:** Fetches and utilizes the logged-in user's data to potentially customize the displayed content or for authentication checks within the 'PublicSplits' component.
// - **Layout Integration:** Uses the 'Layout' component to ensure that the UI remains consistent with other pages in the app, featuring common elements like navigation bars and footers.
// - **Public Splits Display:** The 'PublicSplits' component is dedicated to fetching public splits from the backend and displaying them in an accessible and user-friendly format.

// **Return Statement:**
// - The component returns JSX that includes the 'Layout' wrapper with the 'user' prop. Inside the 'Layout', a 'Container' is used to hold the 'PublicSplits' component, which displays the public workout splits.

// **CSS Styling:**
// - Likely uses CSS from 'react-bootstrap' and custom styles defined in external CSS files to ensure that the page is not only functional but also visually appealing and consistent with the application's design.

// **Example Usage:**

// <PublicSplits />



// Importing React library for building user interfaces
import React from "react";
// Importing Container component from React Bootstrap for consistent spacing and responsive layout
import Container from "react-bootstrap/Container";

// Importing getUser utility function to fetch data about the currently logged-in user
import getUser from "../utils/get-user";
// Importing Layout component which includes common UI elements like header and footer
import Layout from "../components/Layout";
// Importing PublicSplits component that handles displaying all public workout splits
import PublicSplits from "../components/PublicSplits";

// Defining the MyWeights function component
// Note: Based on the usage, the function name "MyWeights" should likely be renamed to reflect its purpose better, e.g., "PublicSplitsPage"
export default function MyWeights() {
    // Fetching the current user's data
    const user = getUser();

    // Rendering the component wrapped in the Layout component to ensure consistent appearance across the app
    return (
        // Layout component takes a user object to possibly render user-specific content or features
        <Layout user={user}>
            // Container component is used here to provide a responsive fixed-width container
            <Container>
                // PublicSplits component is included here to display all public workout splits
                <PublicSplits />
            </Container>
        </Layout>
    );
}
