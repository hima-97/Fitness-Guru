// The Home.js file in the Fitness Guru application defines the Home component, which acts as the main landing page of the application. This component serves as a welcoming interface that provides initial guidance and information to both registered and unregistered users.

// **Imports**
// It imports:
// - **React:** Main library for building user interfaces.
// - **Layout:** Component from '../components/Layout' to ensure consistent navigation and footer across the application.
// - **Container:** From 'react-bootstrap', used for centering content horizontally in a responsive manner.
// - **styled-components:** For defining custom styled components that enhance the UI.

// **Home Component**
// A functional component that:
// - Uses the 'Layout' component to wrap the entire content, passing the current user data as a prop to maintain a consistent layout.
// - Renders a 'Container' to hold the content, providing a responsive and centered layout for text and other elements.
// - Displays a heading that dynamically adjusts its greeting based on the user's login status using a ternary operator:
//   - If the user is logged in, it shows a personalized welcome message with the user's first name.
//   - If the user is not logged in, it displays a general welcome message.
// - Utilizes a styled component 'TextWrapper' to manage text presentation, setting its width to 700px and max-width to 100% for optimal readability across different devices.
// - Renders additional text content that also changes based on the user's login status:
//   - For logged-in users, encourages creating custom workouts and tracking progress.
//   - For visitors, prompts to log in to start using the app features.

// **Key Features and Functionality**
// - **User Greeting and Instruction:**
//   - Provides a dynamic and personalized greeting that adjusts based on user authentication status, enhancing user engagement.
// - **Consistent Layout Utilization:**
//   - Employs the 'Layout' component to maintain uniform navigation and footer, reinforcing the cohesive design and user experience across the application.
// - **Styled Components for Responsive Design:**
//   - Uses styled-components to ensure that text and content are displayed attractively and are responsive to different screen sizes.

// **Return Statement:**
// - The component returns JSX that includes the 'Layout', 'Container', and dynamic text content wrapped in 'TextWrapper', ensuring the page is visually appealing and functionally rich.

// **CSS Styling:**
// - Likely utilizes CSS for styling within the 'TextWrapper' and other elements to ensure they align with the application's aesthetic standards.

// Example Usage:

// <Home user={currentUser} />


// Importing necessary modules from React and other libraries
import React from "react"; // React library to build the component
import Container from "react-bootstrap/Container"; // Container component from Bootstrap for responsive layout
import styled from "styled-components"; // Module to use styled components for CSS-in-JS styling

// Importing utility functions and components from local files
import getUser from "../utils/get-user"; // Utility function to fetch the currently logged-in user's data
import Layout from "../components/Layout"; // Layout component that includes the navbar and footer

// Styled component for text formatting within the home page
const TextWrapper = styled.div`
    width: 700px; // Fixed width for the text container
    max-width: 100%; // Ensures that the text container does not exceed the width of the viewport
`;

// Definition of the Home functional component
export default function Home() {
    const user = getUser(); // Retrieving user data using the getUser function

    // The component returns JSX code that structures the home page
    return (
        <Layout user={user}> // Layout component that wraps around the content, providing consistent navigation and footer
            <Container> // Bootstrap container that provides padding and centering
                <h1> // Header element that displays the welcome message
                    {user != null ? "Hello " + user.givenName + ", " : ""} // Conditional rendering to personalize greeting if the user is logged in
                    Welcome to Fitness Guru! // Generic welcome message for all visitors
                </h1>
                <TextWrapper> // Styled div that contains additional text
                    {user != null
                        ? "You can now create custom workouts and track your progress!" // Message for logged-in users
                        : "Please log in to start using the app!"} // Prompt for visitors to log in
                </TextWrapper>
            </Container>
        </Layout>
    );
}
