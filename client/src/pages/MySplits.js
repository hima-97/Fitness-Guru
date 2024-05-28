// The MySplits.js file in the Fitness Guru application defines the MySplits component, which facilitates the management and creation of workout splits for users. This component integrates several key functionalities and user interface elements to enhance the user experience in managing their workout routines.

// **Imports**
// It imports:
// - **React and Hooks:** For building the component and managing state.
// - **axios and jquery:** For making HTTP requests and DOM manipulations, respectively.
// - **Bootstrap and react-bootstrap/Container:** For responsive layout and modal functionalities.
// - **getUser:** Utility function to fetch the current user's data.
// - **ListSplits and CreateSplit Components:** For listing existing workout splits and adding new ones.

// **MySplits Component**
// A functional component that:
// - Uses state variables such as 'showCreateSplit' and 'showAddSplit' to toggle the visibility of UI elements.
// - Includes a button labeled "Add Split" that, when clicked, sets 'showCreateSplit' to true, allowing the user to access the CreateSplit component to add new workout splits.
// - After a split is added, the ListSplits component is rendered, displaying a list of the user's existing workout splits fetched from the backend, thus providing dynamic content based on user interaction.
// - Manages modals for creating workouts and splits, leveraging Bootstrap for modal functionality.

// **Key Features and Functionality**
// - **Dynamic Split Management:**
//   - Allows users to create new workout splits via the CreateSplit component and toggle its visibility based on user actions such as button clicks.
//   - Automatically updates the list of workout splits by re-rendering the ListSplits component upon the addition of a new split.
// - **Integration with User-Specific Data:**
//   - Fetches and displays workout splits specific to the logged-in user using the getUser function, ensuring personalized user experience.
// - **Interactive User Interface:**
//   - Employs buttons and Bootstrap modals to interactively manage workout splits and enhance user engagement.

// **Return Statement:**
// - Renders a Layout wrapper that contains a Container for structuring the page's content.
// - Conditionally displays the "Add Split" button and the CreateSplit component based on the state controlled by button clicks.
// - Consistently renders the ListSplits component to show existing workout splits.

// **CSS Styling:**
// - Uses Bootstrap for styling the modals and buttons, ensuring that the interface is not only functional but also aesthetically pleasing and consistent with the overall design of the application.

// **Example Usage:**

// <MySplits />



import React from "react";
import { useState } from "react";
import $ from "jquery"; // Import jQuery for DOM manipulation
import 'bootstrap'; // Import Bootstrap for styling and layout
import Container from "react-bootstrap/Container"; // Bootstrap container for layout
import axios from 'axios'; // Import axios for making HTTP requests
import getUser from "../utils/get-user"; // Utility to fetch current user information
import Layout from "../components/Layout"; // Layout wrapper component
import ListSplits from "../components/Workout/ListSplits"; // Component to list all splits
import CreateWorkout from "../components/Workout/CreateWorkout"; // Component to create a new workout
import objectID from "../utils/objectID"; // Utility to generate unique object IDs
import CreateSplit from "../components/Workout/CreateSplit"; // Component to create a new split

// Define the MySplits component
export default function MySplits() {
    const user = getUser(); // Get the current user

    // State for managing split ID, and modal visibility
    const [splitID, setSplitID] = useState(objectID()); // Generate an initial unique ID for splits
    const [showCreateSplit, setShowCreateSplit] = useState(false); // Control visibility of the create split modal
    const [showAddSplit, setShowAddSplit] = useState(true); // Control initial visibility of the add split button
    
    // Function to close the workout modal and show the create split modal
    const closeWorkoutModal = () => {
        $('#createWorkout').hide();
        $('#createSplit').show();
    }
    
    // Function to show the workout modal and hide the add split button
    const openWorkoutModal = () => {
        $('#createWorkout').show();
        $('#addSplit').hide();
    }
    
    // Function to close the create split modal and show the add split button
    const closeSplitModal = () => {
        setShowCreateSplit(false);
        setShowAddSplit(true);
    }
    
    // Function to show the add split modal
    const openSplitModal = () => {
        $('#addSplit').show();
    }

    // Function to toggle the visibility of the create split modal
    const handleShowCreateSplit = () => {
        setShowCreateSplit(true);
        setShowAddSplit(false);
    }

    // Function to add a new split by posting to the server and then reloading the page
    const handleAddSplit = (split) => {
        axios.post('/splits', split)
            .then(window.location.reload())
            .catch(console.log("Couldn't post split"));
    }

    return (
        <Layout user={user}>
            <Container>
                {/* Show add split button if applicable */}
                {showAddSplit && <button type="button" class="btn btn-primary btn-block" onClick={handleShowCreateSplit}>
                    Add Split
                </button>}
                
                {/* Show create split modal if applicable */}
                {showCreateSplit && <CreateSplit handleAddSplit={handleAddSplit} closePrompt={closeSplitModal} user={user} id={"createSplit"}/>}
                <div class="modal" id="createWorkout" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <CreateWorkout closeModal={closeWorkoutModal} splitID={splitID} user={user}/>
                </div> <br/>
                <h2>My Splits</h2>
                {/* List all splits associated with the user */}
                <ListSplits user={user} />
            </Container>
        </Layout>
    );
}
