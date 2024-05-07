// The CreateSplit.js component in the Fitness Guru application is a comprehensive React component for creating workout splits, managing workouts, and ensuring data integrity.

// **Imports**
// It imports several modules:
// - **React:** Main library for building user interfaces.
// - **useState, $:** Hooks and jQuery for state management and modal handling.
// - **Bootstrap, CreateWorkout, ListWorkouts:** UI components and utilities for workout management.
// - **Button, Form, axios:** React-Bootstrap components and HTTP client for backend interaction.
// - **Custom CSS:** 'CreateSplit.css' for component styling.

// **objectID Function**
// Generates a unique ID for each split.

// **CreateSplit Component**
// CreateSplit is a functional component that receives `handleAddSplit`, `closePrompt`, and `user` (Google ID) as props.
// - **State Management:**
//   - `workouts`: Stores the workouts included in the split.
//   - `showAddWorkout`: Toggles visibility of the "Create Workout" modal.
//   - `showAddWorkout1`: Toggles visibility of the "Add Workout" button.
//   - `splitID`: Stores the unique ID of the split being created.
// - **Event Handlers:**
//   - `closeWorkoutModal`: Closes the "Create Workout" modal.
//   - `openWorkoutModal`: Opens the "Create Workout" modal.
//   - `closeSplitModal`: Closes the "Create Split" modal and resets the form.
//   - `handleSetShowAddWorkout`: Toggles visibility of workout-related modals.
//   - `handleAddWorkout`: Adds a workout to the split.
//   - `handleCreateSplitObject`: Validates input fields, creates a new split object, assigns properties (including `workouts` and `splitID`), and calls `handleAddSplit` to pass the split object to the parent component.
// - **Return Statement:**
//   - **Form:** Includes input fields for the split name, notes, and buttons for managing workouts.
//   - **ListWorkouts Component:** Displays the workouts added to the split.

// **Summary**
// - **Split Creation:** Enables users to create workout splits with a name, notes, and included workouts.
// - **Workout Management:** Integrates CreateWorkout and ListWorkouts for adding and viewing workouts.
// - **Form Management and Validation:** Ensures required fields are not empty, particularly the split name.
// - **State and Modal Management:** Utilizes jQuery and React hooks for state and modal management.
// - **Unique ID Generation:** Maintains data integrity through unique identifiers for each split.


import React from "react"; // React library import
import { useState } from "react"; // Importing hooks from React
import $ from "jquery"; // Importing jQuery for DOM manipulation
import "bootstrap"; // Importing Bootstrap for styling and modals
import CreateWorkout from "./CreateWorkout"; // Importing the CreateWorkout component
import ListWorkouts from "./ListWorkouts"; // Importing the ListWorkouts component
import "./CreateSplit.css"; // Importing styles for CreateSplit
import Button from "react-bootstrap/Button"; // Importing Button component from react-bootstrap
import Form from "react-bootstrap/Form"; // Importing Form component from react-bootstrap
import axios from "axios"; // Axios for making API requests

// Utility function to generate a unique identifier (similar to MongoDB ObjectId)
function objectID() {
    const ObjectId = (
        m = Math,
        d = Date,
        h = 16,
        s = (s) => m.floor(s).toString(h),
    ) =>
        s(d.now() / 1000) +
        " ".repeat(h).replace(/./g, () => s(m.random() * h));
    return ObjectId;
}

// Main CreateSplit component definition
const CreateSplit = ({ handleAddSplit, closePrompt, user }) => {
    let split = {}; // Initialize an empty split object

    // State variables to manage workouts, visibility of Add Workout form, and split ID
    const [workouts, setWorkouts] = useState([]);
    const [showAddWorkout, setShowAddWorkout] = useState(false);
    const [showAddWorkout1, setShowAddWorkout1] = useState(true);
    const [splitID, setSplitID] = useState(objectID());

    // Function to close the CreateWorkout modal and reopen CreateSplit modal
    const closeWorkoutModal = () => {
        $("#createWorkout").hide(); // Hide CreateWorkout modal
        $("#createSplit").show(); // Show CreateSplit modal
    };

    // Function to open the CreateWorkout modal
    const openWorkoutModal = () => {
        $("#createWorkout").show(); // Show CreateWorkout modal
        // $('#addSplit').hide();
    };

    // Function to close the CreateSplit modal and reset form inputs
    const closeSplitModal = () => {
        closePrompt(); // Close the split modal
        setWorkouts([]); // Clear workouts
        document.getElementById("name").value = ""; // Clear split name input
        document.getElementById("notesInp").value = ""; // Clear notes input
    };

    // Function to show the Add Workout form
    const handleSetShowAddWorkout = (e) => {
        e.preventDefault();
        setShowAddWorkout1(false); // Hide Add Workout button
        return setShowAddWorkout(true); // Show Add Workout form
    };

    // Function to add a workout to the split
    const handleAddWorkout = (workout) => {
        let newWorkouts = workouts.concat(workout); // Add the new workout to the list
        setWorkouts(newWorkouts); // Update state
        setShowAddWorkout1(true); // Show Add Workout button
        return setShowAddWorkout(false); // Close Add Workout form
    };

    // Function to validate and create a new split object
    const handleCreateSplitObject = () => {
        // Check if the split name is not empty
        if (!document.getElementById("name").value) {
            document.getElementById("name").style.borderColor = "red"; // Highlight empty input
            document.getElementById("name").style.borderWidth = "4px";
            return; // Exit function
        }
        split.name = document.getElementById("name").value; // Set split name
        split.notes = document.getElementById("notesInp").value; // Set split notes
        split.workouts = workouts; // Assign workouts to the split
        split._id = splitID; // Set split ID
        split.googleId = user.id; // Assign Google user ID
        handleAddSplit(split); // Add split to parent component
        closeSplitModal(); // Close the split modal
    };

    // JSX return statement for rendering the split creation form
    return (
        <Form className="splitForm">
            <Form.Group className="mb-3" controlId="formBasicExercise">
                <Form.Label className="label">Split Name</Form.Label>
                <input type="text" id="name" name="name" class="form-control" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNotes">
                <Form.Label className="label">Notes</Form.Label>
                <div id="notesInput">
                    <input
                        type="text"
                        id="notesInp"
                        name="notes"
                        class="form-control"
                    />
                </div>
            </Form.Group>

            <div className="showWorkouts">
                <div className="addingWorkout">
                    <Button className="addWorkout" onClick={openWorkoutModal}>
                        Add Workout
                    </Button>
                    <br />
                    <div className="workoutList">
                        <ListWorkouts creating={1} workouts={workouts} />
                    </div>
                </div>
            </div>
            <div
                class="modal"
                id="createWorkout"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <CreateWorkout
                    closeModal={closeWorkoutModal}
                    splitID={splitID}
                    handleAddWorkout={handleAddWorkout}
                    user={user}
                />
            </div>

            <Button
                variant="primary"
                id="addSplit"
                type="button"
                onClick={handleCreateSplitObject}
            >
                Create Split
            </Button>
        </Form>
    );
};

export default CreateSplit;

