// The MyWeights.js file in the Fitness Guru application defines the MyWeights component, which acts as a dedicated page for users to manage and track weights associated with their exercises. This component integrates essential elements to ensure a seamless user experience and functional display of relevant workout information.

// **Imports**
// It imports:
// - **React:** Main library for building the user interface.
// - **Container:** From 'react-bootstrap', used for responsive and centered content layout.
// - **getUser:** Utility function from '../utils/get-user', to fetch the current user's information.
// - **Layout:** Component from '../components/Layout', ensuring consistent layout across the application.
// - **TrackedExercises:** Component from '../components/TrackedExercises', displaying the user's tracked exercises and allowing interaction such as adding weights and viewing progress.

// **MyWeights Component**
// A functional component that:
// - Utilizes the 'Layout' component to provide consistent navigation and structural design across the application.
// - Renders a 'Container' to center and neatly organize the content on the page.
// - Includes the 'TrackedExercises' component, which lists the exercises the user is tracking, providing functionalities to manage weights and monitor progress.

// **Key Features and Functionality**
// - **Integration with User-Specific Data:**
//   - Uses the 'getUser' function to ensure that the information displayed, such as exercises and weights, is personalized and relevant to the logged-in user.
// - **Use of the TrackedExercises Component:**
//   - Employs the 'TrackedExercises' component to dynamically list and manage exercises that the user is tracking. This component allows users to add new weights and view detailed repetitions for each exercise.
// - **Simple and Clean UI:**
//   - The user interface is designed to be minimalistic yet functional, focusing on delivering content efficiently without overwhelming the user. The layout and components are selected to provide a clear and uninterrupted experience.

// **Return Statement:**
// - The component returns JSX that includes the 'Layout' wrapping a 'Container', which then encapsulates the 'TrackedExercises' component. This structured approach maintains a neat and organized presentation of content.

// **CSS Styling:**
// - Likely utilizes CSS from 'react-bootstrap' and possibly custom styles defined in an external CSS file to ensure the visual elements are appealing and align with the application's overall design aesthetic.

// **Example Usage:**

// <MyWeights />



// Importing the React library to enable the use of JSX and React hooks, functionalities, etc.
import React from "react";

// Importing Container from react-bootstrap, which is used to align and wrap the page content neatly.
import Container from "react-bootstrap/Container";

// Importing the getUser function from the utilities, which is used to fetch the current user's data.
import getUser from "../utils/get-user";

// Importing the Layout component, which is a wrapper component for the consistent layout across different pages.
import Layout from "../components/Layout";

// Importing the TrackedExercises component, which is used to display exercises that the user is tracking.
import TrackedExercises from "../components/TrackedExercises";

// Defining the MyWeights component as a functional component.
export default function MyWeights() {
    // Calling getUser to retrieve the current user's information and store it in the 'user' variable.
    const user = getUser();

    // The component returns JSX.
    return (
        // Using the Layout component to wrap the page content, passing the user data as a prop to possibly use in the Layout for displaying user-specific info.
        <Layout user={user}>
            {/* Container component from Bootstrap used here to provide a responsive fixed width container */}
            <Container>
                {/* The TrackedExercises component is included here, which will fetch and display the list of exercises the user is tracking */}
                <TrackedExercises />
            </Container>
        </Layout>
    );
}

