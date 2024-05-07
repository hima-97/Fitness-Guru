// The CreateExercise.js component in the Fitness Guru application is a comprehensive React component for creating and adding exercises to user-defined workout routines.

// **Imports**
// It imports several modules:
// - **React:** Main library for building user interfaces.
// - **jQuery, react-bootstrap, axios, react-html-parser:** Various libraries for UI components, HTTP requests, and HTML parsing.
// - **Custom CSS:** 'CreateExercise.css' for styling the component.

// **ExxCategory Component**
// ExxCategory is a functional component that receives `categories`, `title`, `category`, `user`, `workoutID`, and `handleAddExercise` as props. 
// - **State Management:**
//   - `exercises` (initially an empty array).
//   - `loading` (initially true).
// - **Functionality:**
//   - `handleCreateExerciseObject`: Creates an exercise object based on user input and posts it to the server using `axios.post`.
//   - **useEffect Hook:** Fetches data from the external API `https://wger.de/api/v2/exercise/` based on the `category` prop, 
//                         updates `exercises` with the received data, and sets `loading` to false.
// - **Return Statement:**
//   - **Dropdown Button**: Allows category selection.
//   - **Exercise Container (div):** Displays exercises or a loading spinner.

// **Exx Component**
// Exx is a functional component that takes `e`, `user`, `workoutID`, and `handleAddExercise` as props.
// - **State Management:**
//   - `show` (initially false).
//   - `exxID` (unique ID generated by `objectID()`).
// - **Functionality:**
//   - `handleAddExx`: Creates an exercise object based on user input and posts it to the server using `axios.post`.
// - **useEffect Hook:** Updates `exxID` with a unique value generated by `objectID()`.
// - **Return Statement:**
//   - **Button**: Opens a modal dialog for exercise creation.
//   - **Modal Dialog:** Allows the user to input notes and add exercises.

// **objectID Function**
// Generates a unique ID for each exercise.

// **Summary**
// - **React Hooks:** Utilized for state management (`useState`) and side effects (`useEffect`).
// - **HTTP Requests:** Handled with `axios` for interaction with the backend.
// - **Modal Dialogs and Forms:** Managed via `React-Bootstrap` for user-friendly exercise creation.
// - **Unique ID Generation:** Ensures data integrity and traceability.


import React from "react"; // React library import
import { useState, useEffect } from "react"; // Importing hooks from React
import $ from "jquery"; // jQuery for DOM manipulation
import 'bootstrap'; // Bootstrap for styling and modals
import Form from "react-bootstrap/Form"; // Form components from react-bootstrap
import Modal from "react-bootstrap/Modal"; // Modal component from react-bootstrap
import Button from "react-bootstrap/Button"; // Button component from react-bootstrap
import DropdownButton from "react-bootstrap/DropdownButton"; // DropdownButton component from react-bootstrap
import axios from "axios"; // Axios for making API requests
import ReactHtmlParser from 'react-html-parser'; // Library to parse HTML strings
import "./CreateExercise.css"; // Import styles for CreateExercise
import Loader from 'react-loader-spinner'; // Loading spinner component

// Utility function to generate a unique object ID using a combination of current timestamp and random values
function objectID() {
    const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
    return (ObjectId);
}

// Component for selecting exercises from a category, loads data from API or given categories
const ExxCategory = ({ categories, title, category, user, workoutID, handleAddExercise }) => {
    const [exercises, setExercises] = useState(); // State to hold exercises in a category
    const [loading, setLoading] = useState(true); // State to manage loading indicator

    // Fetches exercises for a category from an API
    useEffect(() => {
        if (categories) {
            // Load exercises from given categories
            setExercises(categories[category - 8]);
            setLoading(false);
        }
        if (!exercises) {
            // Fetch exercises from external API if not found in given categories
            axios.get(`https://wger.de/api/v2/exercise/?limit=100&offset=0&language=2&category=${category}`)
                .then((res) => setExercises(res.data.results))
                .then(() => setLoading(false))
                .catch((error) => console.log(error))
        }
    }, [categories, category, exercises])

    return (
        <div className="dropdown">
            <DropdownButton id="dropdown-item-button" title={title}>
                {loading && <Loader id="loadingIcon" type="TailSpin" color="black" height={50} width={50} />}
                {!loading && (
                    <div id="exercises-dropdown">
                        {exercises && exercises.map(exercise => <Exx e={exercise} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise} />)}
                    </div>
                )}
            </DropdownButton>
        </div>
    )
}

// Component for displaying and handling exercise selection via modal
const Exx = ({ e, user, workoutID, handleAddExercise }) => {
    let exercise = {}; // Initialize an empty exercise object
    const [show, setShow] = useState(false); // State to manage modal visibility
    const [exxID, setExxID] = useState(objectID()); // Generate unique exercise ID

    // Modal control functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Handles adding a new exercise
    const handleAddExx = () => {
        exercise.name = e.name; // Set exercise name
        exercise.description = e.description; // Set exercise description
        exercise.notes = document.getElementById("notesArea").value; // Get notes from input
        exercise.googleId = user.id; // Set Google user ID
        exercise._id = exxID; // Set unique exercise ID

        // Post the new exercise to the server
        axios.post("/exercises", exercise)
            .catch((err) => console.log(err))

        // Reload the page if workout ID is not available
        if (!workoutID) {
            window.location.reload();
        }

        if (handleAddExercise)
            handleAddExercise(exercise); // Add exercise to the workout
        handleClose(); // Close the modal
    }

    return (
        <div className="exercise">
            <Button variant="primary" onClick={handleShow}>
                {e.name} {/* Display exercise name */}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{e.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="exerciseDesc">
                        <h5>Description</h5>
                        {ReactHtmlParser(e.description)} {/* Parse and display HTML description */}
                    </div>
                    <div id="exerciseNotes">
                        <h5>Notes</h5>
                        <textarea id="notesArea" /> {/* Input for additional notes */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAddExx}>
                        Add Exercise
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

// Main component for creating exercises, includes options for category selection and custom exercise entry
const CreateExercise = ({ inSplit, workout, categories, workoutID, handleAddExercise, user }) => {
    let exercise = {}; // Initialize an empty exercise object
    const [custom, setCustom] = useState(false); // State to manage custom exercise form visibility
    const [exxID, setExxID] = useState(objectID()); // Generate unique exercise ID

    // Handles creating an exercise object for custom inputs
    const handleCreateExerciseObject = () => {
        setCustom(false); // Hide custom exercise form
        exercise.workout = workoutID; // Set workout ID
        exercise._id = exxID; // Set unique exercise ID
        exercise.googleId = user.id; // Set Google user ID
        exercise.name = document.getElementById("exerciseName").value; // Get exercise name
        exercise.description = document.getElementById("exerciseDescription").value; // Get exercise description
        exercise.notes = document.getElementById("exerciseNotes").value; // Get exercise notes

        // Post the new exercise to the server; reload the page if not part of a split or categories are undefined
        if (!inSplit) {
            axios.post("/exercises", exercise)
                .catch((err) => console.log(err));
        }
        if (!categories) {
            window.location.reload();
        }
        if (handleAddExercise)
            handleAddExercise(exercise); // Add exercise to the workout
    };

    return (
        <>
            {/* Section for category selection, displays buttons for each muscle group */}
            <div id="selectExerciseCategory">
                <ExxCategory categories={categories} className="category" title={"Arms"} category={8} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise} />
                <ExxCategory categories={categories} className="category" title={"Legs"} category={9} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise} />
                <ExxCategory categories={categories} className="category" title={"Abs"} category={10} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise} />
                <ExxCategory categories={categories} className="category" title={"Chest"} category={11} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise} />
                <ExxCategory categories={categories} className="category" title={"Back"} category={12} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise} />
                <ExxCategory categories={categories} className="category" title={"Shoulders"} category={13} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise} />
                <ExxCategory categories={categories} className="category" title={"Calves"} category={14} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise} />
                <Button class="btn btn-success" onClick={() => setCustom(true)}>Custom</Button> {/* Button for adding custom exercises */}
            </div>

            {/* Form section for adding custom exercises */}
            <div id="form">
                <br />
                {custom && (
                    <>
                        <Form className="formBodyExercise">
                            <Form.Group className="mb-3" controlId="formBasicExercise" name="name">
                                <Form.Label>Exercise Name</Form.Label>
                                <input className="formInput" type="text" placeholder="Enter exercise" id="exerciseName" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicSets">
                                <Form.Label>Description</Form.Label>
                                <input type="textarea" className="formInput" placeholder="Description" id="exerciseDescription" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicNotes">
                                <Form.Label>Notes</Form.Label>
                                <input type="textarea" className="formInput" placeholder="Exercise Notes" id="exerciseNotes" />
                            </Form.Group>
                        </Form>
                        <Button
                            variant="primary"
                            id="addExercise"
                            type="button"
                            onClick={handleCreateExerciseObject}
                        >
                            Add Exercise
                        </Button>
                    </>
                )}
            </div>
        </>
    );
};

export default CreateExercise;

