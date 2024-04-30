// This code imports several modules such as react, jquery, react-bootstrap, axios, react-html-parser, and a custom css file 'CreateExercise.css' which is used to style the component.
// ExxCategory is a functional component which takes in categories, title, category, user, workoutID and handleAddExercise as props. 
// It uses the useState hook to set the state of exercises to an empty array and loading to true.
// It contains a function handleCreateExerciseObject used to create an object and set its properties to the inputted value of the user, and post it to the server using the axios post method.
// The component makes use of the useEffect hook which is used to fetch data from an external API https://wger.de/api/v2/exercise/ based on the category passed in as props. 
// It sets the state of exercises to the data received and loading to false.
// It returns a dropdown button and an empty div which is used to hold the exercises. 
// The div will contain a spinner icon when the data is loading and the exercises once the data has been received.
// Exx is a functional component which takes in e, user, workoutID and handleAddExercise as props. 
// It uses the useState hook to set the state of show to false and exxID to the value returned by the objectID() function.
// It contains a function handleAddExx which is used to create an object and set its properties to the inputted value of the user, and post it to the server using the axios post method.
// It returns a button that when clicked shows a modal which allows the user to input notes, and add the exercise to the list of exercises.
// objectID() is a function which returns a unique ID of the exercise.
// The component makes use of the useEffect hook which is used to set the state of exxID to the value returned by the objectID() function.

// The CreateExercise.js component in the Fitness Guru application is a complex React component that manages the creation and addition of exercises to user-defined workout routines. 
// It includes functionality to fetch pre-defined exercise categories from an external API and allows users to define custom exercises. 
// The component utilizes React hooks for state management, React-Bootstrap for modal dialogs and forms, and axios for HTTP requests to interact with the backend. 
// It also features a unique ID generation for new exercises, ensuring data integrity and traceability.

import React from "react";
import { useState, useEffect } from "react";
import $ from "jquery";
import 'bootstrap';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import "./CreateExercise.css";
import Loader from 'react-loader-spinner';

// Function to generate a unique object ID using a combination of current timestamp and random values
function objectID() {
    const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
    return (ObjectId);
}

// Component for selecting exercises from a category, loads data from API or given categories
const ExxCategory = ({ categories, title, category, user, workoutID, handleAddExercise }) => {

    const [exercises, setExercises] = useState();
    const [loading, setLoading] = useState(true);

    // Fetches exercises for a category from an API
    useEffect(() => {
        if (categories) {
            setExercises(categories[category - 8]);
            setLoading(false);
        }
        if (!exercises) {
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
                {!loading && 
                <div id="exercises-dropdown">
                    {exercises && exercises.map(exercise => <Exx e={exercise} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise}/>)}
                </div>}
            </DropdownButton>
        </div>
    )
}

// Component for displaying and handling exercise selection via modal
const Exx = ({ e, user, workoutID, handleAddExercise }) => {

    let exercise = {};
    const [show, setShow] = useState(false);
    const [exxID, setExxID] = useState(objectID())

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Handles adding a new exercise
    const handleAddExx = () => {
        exercise.name = e.name;
        exercise.description = e.description;
        exercise.notes = document.getElementById("notesArea").value;
        exercise.googleId = user.id;
        exercise._id = exxID;
        axios.post("/exercises", exercise)
            .catch((err) => console.log(err))

        if (!workoutID) {
            window.location.reload();
        }

        if (handleAddExercise)
            handleAddExercise(exercise)
        handleClose();
    }

    return (
        <div className="exercise">
            <Button variant="primary" onClick={handleShow}>
                {e.name}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{e.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="exerciseDesc">
                        <h5>Description</h5>
                        {ReactHtmlParser(e.description)}
                    </div>
                    <div id="exerciseNotes">
                        <h5>Notes</h5>
                        <textarea id="notesArea" />
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
    let exercise = {};
    const [custom, setCustom] = useState(false);
    const [exxID, setExxID] = useState(objectID())

    // Handles creating an exercise object for custom inputs
    const handleCreateExerciseObject = () => {
        setCustom(false);
        exercise.workout = workoutID;
        exercise._id = ex
        exercise._id = exxID;
        exercise.googleId = user.id;
        exercise.name = document.getElementById("exerciseName").value;
        exercise.description = document.getElementById("exerciseDescription").value;
        exercise.notes = document.getElementById("exerciseNotes").value;

        // Post the new exercise to the server; reload the page if not part of a split or categories are undefined
        if (!inSplit) {
            axios.post("/exercises", exercise)
                .catch((err) => console.log(err));
        }
        if (!categories) {
            window.location.reload();
        }
        if (handleAddExercise)
            handleAddExercise(exercise);
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
                <Button class="btn btn-success" onClick={() => setCustom(true)}>Custom</Button>
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
