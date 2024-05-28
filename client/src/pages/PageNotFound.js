// The PageNotFound.js file in the Fitness Guru application defines a functional React component that serves as an error page for handling 404 not found errors. This component ensures users are informed in a user-friendly manner when they navigate to a URL that doesn't correspond to any active routes within the application.

// **Imports**
// It imports:
// - **React:** Main library for building user interfaces.
// - **Container:** From 'react-bootstrap', used for responsive layout and alignment of content.
// - **Layout:** Component from '../components/Layout', which provides consistent navigation and footer elements across the application.

// **PageNotFound Component**
// A functional component that:
// - Is wrapped by the 'Layout' component to maintain consistency with the rest of the application in terms of navigation and styling.
// - Utilizes a 'Container' to center the content and ensure the error message is prominently displayed.
// - Includes an 'h1' heading inside the 'Container' that displays the message "This page was not found :(", clearly indicating to the user that the page they are looking for does not exist.

// **Key Features and Functionality**
// - **Error Handling:**
//   - Provides a clear and friendly error message, enhancing the user experience by reducing confusion and frustration when a page is not found.
// - **Use of Layout Component:**
//   - Ensures that the error message is presented within the standard layout of the application, keeping the user interface consistent and familiar, even in error scenarios.

// **Return Statement:**
// - The component returns JSX that includes the 'Layout' wrapping a 'Container'. Inside the container, the 'h1' element displays the error message, making it clear and noticeable to the user.

// **CSS Styling:**
// - Likely uses CSS from 'react-bootstrap' and potentially additional custom styles defined in an external CSS file to ensure that the error message is not only visible but also aesthetically aligned with the overall design of the application.

// **Example Usage:**

// <PageNotFound />


// Importing Container from react-bootstrap for styling and layout consistency.
import Container from "react-bootstrap/Container";
// Importing the Layout component, which typically includes the navbar, footer, and any other consistent UI elements across the application.
import Layout from "../components/Layout";

// Defining the PageNotFound component as a functional component. This component is exported as the default export of this module.
export default function PageNotFound() {
    // Returning JSX to render the page content.
    return (
        // Using the Layout component to wrap the page content, ensuring that it includes the common elements like headers or footers defined in the Layout.
        <Layout>
            // Using the Container component to provide consistent styling and spacing. The Container component helps in aligning content within a fixed or fluid "container".
            <Container>
                // Displaying a heading (h1) with the text to inform users that the requested page was not found. This helps in providing clear feedback to users navigating to a non-existing route.
                <h1>This page was not found :(</h1>
            </Container>
        </Layout>
    );
}
