// The MyExercises.js file in the Fitness Guru application defines the MyExercises component, which serves as a dedicated page for users to manage and add exercises that they have created. This component combines functional React programming patterns with hooks to provide a dynamic and responsive user experience.

// **Imports**
// It imports:
// - **React and useState Hook:** For building the component and managing state.
// - **getUser:** Utility function to fetch the current user's data.
// - **Layout, Container:** From 'react-bootstrap' for consistent page layout and content centering.
// - **CreateExercise, Exercise:** Components that allow for the creation of new exercises and the display of existing exercises, respectively.
// - **axios:** For making HTTP requests to fetch and update exercise data.

// **MyExercises Component**
// A functional component that:
// - Retrieves the current user information using the `getUser` function and stores it in the 'user' variable.
// - Uses the `useState` hook to manage visibility state of the CreateExercise component with a 'show' state variable initialized to false.
// - Contains a Layout component that wraps the content and receives the 'user' as a prop to maintain consistent navigation and styling.
// - Renders a Container component to center the content on the page.
// - Uses a ternary operator to conditionally render a 'Add Exercise' button, which toggles the 'show' state, and consequently, the visibility of the CreateExercise component.
// - Displays the Exercise component, which lists all exercises associated with the user.

// **Key Features and Functionality**
// - **Dynamic Exercise Management:**
//   - Allows users to toggle the visibility of the CreateExercise component to add new exercises.
//   - Displays existing exercises using the Exercise component, providing an interactive table format.
// - **User-Centric Design:**
//   - Utilizes the `getUser` function to ensure the data displayed is personalized and relevant to the logged-in user.
// - **Responsive User Interface:**
//   - Implements conditional rendering based on user interaction, enhancing usability and responsiveness. This approach helps keep the UI clean and functional, only showing elements when necessary.

// **Return Statement:**
// - The component returns JSX that includes the Layout, which wraps a Container. Inside the Container, it conditionally renders the 'Add Exercise' button and the CreateExercise component based on the 'show' state.
// - It consistently renders the Exercise component to display the user's current exercises.

// **CSS Styling:**
// - Likely uses CSS from 'react-bootstrap' and potentially custom styles defined in an external CSS file to ensure the page is visually appealing and aligns with the application's design standards.

// Example Usage:

// <MyExercises />




// Importing necessary React library and hooks
import React from "react";
import { useState } from "react";
// Importing Container from Bootstrap for layout management
import Container from "react-bootstrap/Container";

// Importing utility function to fetch user details
import getUser from "../utils/get-user";
// Importing Layout component for consistent page structure across the app
import Layout from "../components/Layout";
// Importing Exercise component which displays existing exercises
import Exercise from "../components/Exercise";
// Importing CreateExercise component to enable adding new exercises
import CreateExercise from "../components/Workout/CreateExercise";
// Importing Button component from Bootstrap for user interaction
import Button from "react-bootstrap/Button";
// Importing CSS for styling specific to this page
import "./MyExercises.css";

// Defining the MyExercises functional component
export default function MyExercises() {
  // Retrieving user data to provide personalized experience
  const user = getUser();
  // Using useState to manage the visibility state of the CreateExercise component
  const [show, setShow] = useState(false);

  return (
    // Wrapping the content with Layout to ensure navigation and footer are included
    <Layout user={user}>
      // Using a Bootstrap container to manage the layout
      <Container>
        {/* Conditionally rendering the "Add Exercise" button only if 'show' is false */}
        {!show && <Button onClick={() => setShow(true)}>Add Exercise</Button>}
        {/* When 'show' is true, rendering the CreateExercise component to allow user to add new exercises */}
        {show && <CreateExercise user={user}/>}
        {/* Always displaying the Exercise component to show existing exercises */}
        <Exercise />    
      </Container>
    </Layout>
  );
}
