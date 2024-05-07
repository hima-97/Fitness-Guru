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


import React from "react";
import { useState } from "react";
import $ from "jquery";
import "bootstrap";
import CreateWorkout from "./CreateWorkout";
import ListWorkouts from "./ListWorkouts";
import "./CreateSplit.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

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

const CreateSplit = ({ handleAddSplit, closePrompt, user }) => {
    let split = {};
    const [workouts, setWorkouts] = useState([]);
    const [showAddWorkout, setShowAddWorkout] = useState(false);
    const [showAddWorkout1, setShowAddWorkout1] = useState(true);
    const [splitID, setSplitID] = useState(objectID());

    const closeWorkoutModal = () => {
        $("#createWorkout").hide();
        $("#createSplit").show();
    };

    const openWorkoutModal = () => {
        $("#createWorkout").show();
        //$('#addSplit').hide();
    };

    const closeSplitModal = () => {
        closePrompt();
        //$('.modal-backdrop').remove()
        setWorkouts([]);
        document.getElementById("name").value = "";
        document.getElementById("notesInp").value = "";
    };

    const handleSetShowAddWorkout = (e) => {
        e.preventDefault();
        setShowAddWorkout1(false);
        return setShowAddWorkout(true);
    };

    const handleAddWorkout = (workout) => {
        console.log("OLD");
        console.log(workouts);
        console.log("NEW");
        let newWorkouts = workouts.concat(workout);
        console.log(newWorkouts);
        setWorkouts(newWorkouts);
        console.log("WORKOUTS");
        console.log(workouts);
        setShowAddWorkout1(true);
        return setShowAddWorkout(false);
    };

    const handleCreateSplitObject = () => {
        if(!document.getElementById("name").value){
            document.getElementById("name").style.borderColor="red";
            document.getElementById("name").style.borderWidth = "4px";
            return;
        }
        split.name = document.getElementById("name").value;
        split.notes = document.getElementById("notesInp").value;
        split.workouts = workouts;
        split._id = splitID;
        split.googleId = user.id;
        handleAddSplit(split);
        closeSplitModal();
    };

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
