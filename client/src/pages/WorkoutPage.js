// The WorkoutPage.js file in the Fitness Guru application defines a React component that serves as a hub for managing and displaying workout splits. This component is essential for users to organize their workout routines effectively and dynamically add new workout elements.

// **Imports**
// It imports:
// - **React and useState Hook:** For building the component and managing state.
// - **Layout:** Component from '../components/Layout' to ensure consistent navigation and structural design across the application.
// - **CreateSplit and ListWorkouts Components:** From '../components', used to add new workout splits and display existing ones, respectively.

// **WorkoutPage Component**
// A functional component that:
// - Initializes state variables:
//   - `splits`: An array to store all the workout splits associated with the user.
//   - `showAddSplit`: A boolean that controls the visibility of the "Add Split" button.
//   - `showAdd`: A boolean initially set to true to control the visibility of the "Add split" button.
// - Defines functions to handle UI interactions:
//   - `handleCreateSplit`: Manages actions related to creating new splits. It prevents default form submission behavior and toggles the visibility of UI elements to show the CreateSplit component.
//   - `handleAddSplit`: Could be a function intended to manage adding new splits to the 'splits' state array, updating the list dynamically as users interact with the component.
// - Utilizes conditional rendering to show or hide the CreateSplit component based on the state controlled by `showAddSplit`.

// **Key Features and Functionality**
// - **Dynamic Split Management:**
//   - Allows users to dynamically add new workout splits through interactive UI elements, enhancing user engagement and flexibility.
// - **List Existing Splits:**
//   - Utilizes the ListWorkouts component to display all current workout splits, providing users with a clear overview of their workout routines.
// - **Interactive User Interface:**
//   - Employs conditional rendering and state management to offer a responsive and intuitive interface for adding and managing workout splits.

// **Return Statement:**
// - The component returns JSX that includes the 'Layout' component wrapping the main content, ensuring consistent UI across the application.
// - Inside the 'Layout', a conditional display of the 'Add Split' button or the CreateSplit component based on the 'showAdd' and 'showAddSplit' state.

// **CSS Styling:**
// - Likely uses CSS from 'react-bootstrap' and custom styles defined in an external CSS file to ensure that the page is not only functional but also visually appealing and aligns with the application's design standards.

// **Example Usage:**

// <WorkoutPage />




import React, { useState } from "react";
import Layout from "../components/Layout"; // Imports the Layout component to maintain a consistent structure across pages
import getUser from "../utils/get-user"; // Utility to fetch the currently logged-in user's information
import Container from "react-bootstrap/Container"; // Bootstrap container for responsive layout
import CreateSplit from "../components/Workout/CreateSplit"; // Component to create a new workout split
import ListWorkouts from "../components/Workout/ListWorkouts"; // Component to list all workouts

const WorkoutPage = () => {
    const user = getUser(); // Retrieves user data to use in the component

    // State to store the list of splits. Initialized as an empty array.
    const [splits, setSplits] = useState([]);
    // State to control the visibility of the add split button. Initially true to show the button.
    const [showAddSplit, setShowAddSplit] = useState(false);
    // State to control the display of the CreateSplit component. Initially set to not show.
    const [showAdd, setShowAdd] = useState(true);

    // Handles click event for creating a new split, prevents default form submit behavior.
    const handleCreateSplit = (e) => {
        e.preventDefault();
        setShowAdd(false); // Hides the "Add Split" button
        return setShowAddSplit(true); // Shows the CreateSplit component
    };

    // Function to handle adding a new split to the list of splits.
    const handleAddSplit = (split) => {
        const newSplits = splits.concat(split); // Adds the new split to the current list of splits
        setShowAddSplit(false); // Hides the CreateSplit component
        setShowAdd(true); // Shows the "Add Split" button again
        return setSplits(newSplits); // Updates the state with the new list of splits
    };

    // Component structure using Layout for consistent page design
    return (
        <Layout user={user}>
            <Container>
                <h1>Workout!</h1>
                {/* Conditional rendering to show/hide the "Add Split" button based on showAdd state */}
                {showAdd && (
                    <button
                        id="addSplit"
                        type="button"
                        onClick={handleCreateSplit}
                    >
                        Add Split
                    </button>
                )}
                {/* Conditional rendering to show/hide the CreateSplit component based on showAddSplit state */}
                {showAddSplit && (
                    <CreateSplit handleAddSplit={handleAddSplit} />
                )}
                <h2>My Splits:</h2>
                {/* Passes the current list of splits to ListWorkouts for display */}
                <ListWorkouts splits={splits} />
            </Container>
        </Layout>
    );
};

export default WorkoutPage; // Exports the component for use in other parts of the application
