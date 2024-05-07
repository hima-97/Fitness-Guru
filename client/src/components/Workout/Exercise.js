// The Exercise.js file in the Fitness Guru application defines components for managing and displaying exercise information, providing detailed and interactive modals.

// **Imports**
// It imports several modules:
// - **React Hooks (useState, useEffect):** For managing component state and side effects.
// - **axios:** HTTP client for backend interaction.
// - **React-Bootstrap Components:** UI components for modals and forms.

// **ExerciseModalNoEdit Component**
// A functional component that displays exercise information in read-only mode.
// - **Props:**
//   - `show`: Boolean that controls modal visibility.
//   - `handleClose`: Function to close the modal.
//   - `e`: Object containing exercise information (title, description, notes).
// - **Structure:**
//   - **Header:** Displays exercise title (`e.name`) in an H5 tag.
//   - **Body:** Shows exercise description (`e.description`) and notes (`e.notes`) if available.
//   - **Footer:** Contains a "Close" button to trigger `handleClose`.

// **ExerciseModal Component**
// A functional component similar to ExerciseModalNoEdit but with editing capabilities.
// - **Props:**
//   - `show`, `handleClose`, `e`, `workout`: As described above.
//   - `setAddingExercises`, `addingExercises`, `editExercises`: For managing exercise state.
// - **State Management:**
//   - `update`: Toggles between view and edit modes.
//   - `exerciseDetails`: Holds exercise title, description, and notes for editing.
// - **Event Handlers:**
//   - `handleEditExercise`: Enables edit mode by setting `update` to true.
//   - `handleSaveEdits`: Saves edited exercise information via API calls or state updates.
//   - `updateWorkout`: Updates exercise data in `workout` state and backend database.
// - **Structure:**
//   - **Header:** Displays exercise title in an H5 tag or textarea (for editing).
//   - **Body:** Contains editable text areas for exercise description and notes.
//   - **Footer:** Includes "Save", "Edit", and "Close" buttons for managing edits and modal visibility.

// **Exercise Component**
// The primary functional component that represents each exercise card.
// - **State Management:**
//   - `showModal`, `showModalNoEdit`: Toggles visibility of ExerciseModal and ExerciseModalNoEdit.
// - **Event Handlers:**
//   - `handleDeleteExercise`: Deletes an exercise via API call.
//   - `handleToggleModal`: Toggles between edit and view modes.
// - **Return Statement:**
//   - **Card Layout:** Represents each exercise visually.
//   - **Exercise Modals:** Displays ExerciseModal or ExerciseModalNoEdit based on user role and context.

// **Summary**
// - **Exercise Display Workflow:**
//   - **Main Exercise Component:** Represents each exercise using a card layout.
//   - **ExerciseModal/ExerciseModalNoEdit:** Detailed exercise views with or without editing capability.
// - **State Management and API Integration:**
//   - **State Hooks:** Manage modal visibility, editing state, and workout data.
//   - **axios:** Updates exercise information and synchronizes with backend database.
// - **Component Features:**
//   - **ExerciseModalNoEdit:** Displays exercise information in read-only mode.
//   - **ExerciseModal:** Allows editing, saving, and logging of exercise details.
//   - **Deletion Feature:** Removes exercises from workout routines.



import React from "react"; // React library import
import { useState } from "react"; // Importing hooks from React
import "./Exercise.css"; // Import styles for Exercise component
import Card from "react-bootstrap/Card"; // Import Card component from react-bootstrap
import Modal from "react-bootstrap/Modal"; // Import Modal component from react-bootstrap
import Button from "react-bootstrap/Button"; // Import Button component from react-bootstrap
import ReactHtmlParser from 'react-html-parser'; // Library to parse HTML strings
import axios from "axios"; // Axios for making API requests
import getUser from "../../utils/get-user"; // Import utility function to get user information

// Functional component for displaying exercise information without editing capabilities
const ExerciseModalNoEdit = ({ show, handleClose, e }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title id="exerciseTitle">{e.name}</Modal.Title> {/* Display exercise name */}
            </Modal.Header>
            <Modal.Body id="exerciseBody">
                {e.description && (
                    <div id="descArea">
                        <h5>Description</h5>
                        <div id="exerciseDesc">{ReactHtmlParser(e.description)}</div> {/* Parse and display description */}
                    </div>
                )}
                <br /><br />
                {e.notes && (
                    <div id="notesArea">
                        <h5>Notes</h5>
                        <div id="exerciseNotes">{e.notes}</div> {/* Display exercise notes */}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button> {/* Close modal */}
            </Modal.Footer>
        </Modal>
    )
}

// Functional component for displaying and editing exercise information in a modal
const ExerciseModal = ({ setAddingExercises, addingExercises, editExercises, show, handleClose, e, workout }) => {
    const [update, setUpdate] = useState(false); // State to manage whether the exercise is being edited

    // Function to enable editing by replacing text fields with textareas
    const handleEditExercise = () => {
        setUpdate(true);

        let title = document.querySelector('#exerciseTitle');
        title.outerHTML = `<textarea id="updateTitle">` + title.innerText + '</textarea>'; // Replace exercise name with a textarea

        let desc = document.querySelector('#exerciseDesc');
        desc.outerHTML = `<textarea id="updateDesc">` + desc.innerText + '</textarea>'; // Replace exercise description with a textarea

        let notes = document.querySelector('#exerciseNotes');
        notes.outerHTML = `<textarea id="updateNotes">` + notes.innerText + '</textarea>'; // Replace exercise notes with a textarea
    }

    // Function to update exercise information in a workout
    async function updateWorkout() {
        let exerciseIndex = workout.exercises.findIndex((exx) => exx._id == e._id); // Find the index of the exercise in the workout
        workout.exercises[exerciseIndex].name = document.getElementById("updateTitle").value; // Update exercise name
        workout.exercises[exerciseIndex].description = document.getElementById("updateDesc").value; // Update exercise description
        workout.exercises[exerciseIndex].notes = document.getElementById("updateNotes").value; // Update exercise notes
        editExercises(workout.exercises); // Edit exercises in the parent component
        axios.post("/workouts/put/" + workout._id, { exercises: workout.exercises }) // Update workout in the backend
            .catch(err => console.log(err))
    }

    // Function to save edits to the exercise information
    const handleSaveEdits = () => {
        if (addingExercises) {
            let newAddingExercises = addingExercises;
            let exerciseIndex = newAddingExercises.findIndex((exx) => exx._id == e._id); // Find the index of the exercise in the adding exercises
            newAddingExercises[exerciseIndex].name = document.getElementById("updateTitle").value; // Update exercise name
            newAddingExercises[exerciseIndex].description = document.getElementById("updateDesc").value; // Update exercise description
            newAddingExercises[exerciseIndex].notes = document.getElementById("updateNotes").value; // Update exercise notes
            setAddingExercises(newAddingExercises); // Update state with edited exercises
        } else {
            updateWorkout(); // Update exercise in the workout
        }
        axios.post("/exercises/put/" + e._id, { name: document.getElementById("updateTitle").value, notes: document.getElementById("updateDesc").value }) // Update exercise in the backend
            .catch((err) => console.log(err))

        setUpdate(false); // Disable editing mode
        handleClose(); // Close modal
    }

    // Function to get today's date in the format MM/DD/YYYY
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="exerciseTitle">{e.name}</Modal.Title> {/* Display exercise name */}
                </Modal.Header>
                <Modal.Body id="exerciseBody">
                    <div id="descArea">
                        <h5>Description</h5>
                        <div id="exerciseDesc">{ReactHtmlParser(e.description)}</div> {/* Parse and display description */}
                    </div>
                    <br /><br />
                    <div id="notesArea">
                        <h5>Notes</h5>
                        <div id="exerciseNotes">{e.notes}</div> {/* Display exercise notes */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* Show Edit button if not in update mode, otherwise show Save button */}
                    {!update && <Button variant="primary" onClick={handleEditExercise}>Edit</Button>}
                    {update && <Button variant="primary" onClick={handleSaveEdits}>Save</Button>}
                    {/* Log button is displayed only if not in update mode */}
                    {!update && <Button
                        variant="primary"
                        data-toggle="modal"
                        data-target={"#logExercise" + e._id}
                        onClick={handleClose}
                    >
                        Log
                    </Button>}
                    <Button variant="secondary" onClick={handleClose}>Close</Button> {/* Close modal */}
                </Modal.Footer>
            </Modal>

            {/* Modal for logging exercise repetitions and weight */}
            <div
                class="modal fade"
                id={"logExercise" + e._id}
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Log Exercise</h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form
                            action={"/weight/log/" + e.name}
                            method="POST"
                            class="mb-4"
                        >
                            <div class="modal-body">
                                {/* Hidden inputs for Google user ID and today's date */}
                                <div class="form-group">
                                    <input type="hidden" name="googleId" value={e.googleId} class="form-control" />
                                </div>
                                <div class="form-group">
                                    <input type="hidden" name="date" value={today} class="form-control" />
                                </div>
                                <br />
                                {/* Input for repetitions */}
                                <div class="form-group">
                                    <label for="Repetitions">Repetitions</label>
                                    <input type="number" name="Repetitions" class="form-control" />
                                </div>
                                <br />
                                {/* Input for weight */}
                                <div class="form-group">
                                    <label for="Weight">Weight</label>
                                    <input type="number" name="Weight" class="form-control" />
                                </div>
                                <br />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <input type="submit" value="Log Exercise" class="btn btn-primary btn-block" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Component to display an exercise card with editing and deletion capabilities
const Exercise = ({ creating, setAddingExercises, addingExercises, inSplit, removeExercise, editExercises, e, workout }) => {
    const actualUser = getUser(); // Get the current user information

    const [show, setShow] = useState(false); // State to manage modal visibility

    const handleClose = () => setShow(false); // Function to close the modal
    const handleOpen = (event) => {
        event.preventDefault();
        setShow(true); // Function to open the modal
    }

    // Function to remove an exercise
    const handleDelete = () => {
        removeExercise(e); // Call removeExercise function passed as a prop
    }

    return (
        <div id="exercise">
            <div id="cardAndDelete">
                {/* Button to open the modal, displays the exercise name in a card */}
                <button className="exerciseBody" onClick={handleOpen}>
                    <Card.Body>
                        <div id="exxBody">
                            <h id="exxName">{e.name}</h>
                        </div>
                    </Card.Body>
                </button>
                {/* Display delete button if the exercise belongs to the current user and is not being created */}
                {e.googleId === actualUser.id && !creating ? (
                    <div id="delExx">
                        <button class="btn btn-danger btn-block" id="deleteExercise" onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/1999/xhtml" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z" fill="#F06362" />
                            </svg>
                        </button>
                        <div id="underline"></div>
                    </div>
                ) : <div />}
            </div>

            {/* Conditionally render the appropriate modal based on creation and split status */}
            {!inSplit && !creating && (
                <ExerciseModal
                    setAddingExercises={setAddingExercises}
                    addingExercises={addingExercises}
                    id="exerciseModal"
                    editExercises={editExercises}
                    show={show}
                    handleClose={handleClose}
                    e={e}
                    workout={workout}
                />
            )}
            {(inSplit || creating) && (
                <ExerciseModalNoEdit
                    id="exerciseModal"
                    editExercises={editExercises}
                    show={show}
                    handleClose={handleClose}
                    e={e}
                />
            )}
        </div>
    );
}

export default Exercise;
