// This code defines a React functional component named CreateSplit. 
// This component is used to create a new split, which is a collection of workouts. 
// The component receives a prop named handleAddSplit and another prop named closePrompt, both of which are passed down from the parent component. 
// It also receives a prop named user which is the user's googleId.
// The component starts by importing several modules that are needed for it to function properly.
// These modules include: React, useState and $ from the react package, bootstrap, CreateWorkout and ListWorkouts from the ./ directory, Button, Form, and axios from the react-bootstrap package and ./CreateSplit.css from the ./ directory.
// The component then defines a function named objectID which creates a new object ID. This function is used to generate a unique ID for the split that is being created.
// The component then defines a constant CreateSplit which is a React functional component that returns JSX. 
// This component receives the handleAddSplit and closePrompt props from the parent component and the user prop, which is the user's googleId.
// The component starts by defining several state variables: workouts, showAddWorkout, showAddWorkout1, and splitID. 
// The workouts state variable is used to store the workouts that belong to the split, the showAddWorkout state variable is used to toggle 
// the visibility of the "Create Workout" modal, the showAddWorkout1 state variable is used to toggle the visibility of the "Add Workout" button, 
// and the splitID state variable is used to store the unique ID of the split being created.
// The component then defines several event handlers: closeWorkoutModal, openWorkoutModal, closeSplitModal, handleSetShowAddWorkout, handleAddWorkout, and handleCreateSplitObject. 
// These event handlers are used to perform various actions such as closing and opening modals, toggling the visibility of elements, and handling the creation of a new split.
// The handleCreateSplitObject event handler is called when the user submits the form to create a new split. It starts by checking if the input field for the split name is empty. 
// If it is, the border of the input field turns red and the function returns. 
// If the input field is not empty, the function proceeds to create a new split object and assigns the values of the input fields to its properties. 
// It also assigns the value of the workouts state variable to the workouts property of the split object and the splitID state variable to the _id property of the split object. 
// The handleAddSplit callback function is then called and passed the split object as an argument. The closeSplitModal function is also called to close the modal and reset the form.
// The component then renders a form that contains several input fields and buttons for the user to interact with. 
// The form includes an input field for the split name, an input field for notes, and a button that opens the "Create Workout" modal. 
// The component also renders the ListWorkouts component, which displays the workouts that have been added to the split.

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
