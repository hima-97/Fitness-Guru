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

import React from "react";
import {useState, useEffect} from "react";
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

function objectID() {
    const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
    return(ObjectId);
}

const ExxCategory = ({categories, title, category, user, workoutID, handleAddExercise}) => {

    const [exercises, setExercises] = useState();
    const [loading, setLoading] = useState(true);

    const handleCreateExerciseObject = () => {
        setCustom(false);
        exercise.workout = workoutID;
        exercise._id = exxID;
        exercise.googleID = user.id;
        exercise.name = document.getElementById("exerciseName").value;
        exercise.description = document.getElementById("exerciseNotes").value;
        axios.post("/exercises", exercise)
            .catch((err) => console.log(err))
        if(handleAddExercise)
            handleAddExercise(exercise);
    };
    
    useEffect(() => {
        if(categories){
            setExercises(categories[category-8]);
            setLoading(false);
        }
        if(!exercises){
            axios.get(`https://wger.de/api/v2/exercise/?limit=100&offset=0&language=2&category=${category}`)
                    .then((res) => setExercises(res.data.results))
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
        }
    }, [])

    return(
    <div className="dropdown">
        <DropdownButton id="dropdown-item-button" title={title}>
            {loading && <Loader id="loadingIcon" type="TailSpin" color="black" height={50} width={50}/>}
            {!loading && 
            <div id="exercises-dropdown">
                {exercises && exercises.map(exercise => <Exx e={exercise} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise}/>)}
            </div>}
        </DropdownButton>
    </div>
    )
}

const Exx = ({e, user, workoutID, handleAddExercise}) => {

    let exercise = {};
    const [show, setShow] = useState(false);
    const [exxID, setExxID] = useState(objectID())

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddExx = () => {
        exercise.name = e.name;
        exercise.description = e.description;
        exercise.notes = document.getElementById("notesArea").value;
        //exercise.workout = workoutID;
        exercise.googleId = user.id;
        exercise._id = exxID;
        axios.post("/exercises", exercise)
            .catch((err) => console.log(err))

        if(!workoutID){
            window.location.reload();
        }
       
        if(handleAddExercise)
            handleAddExercise(exercise)
        handleClose();
    }

    return (
    <div className="exercise">
        {/* Displaying all available exercises after button for a specific muscle group is clicked: */}
        <Button variant="primary" onClick={handleShow}>
            {e.name}
        </Button>

        {/* Displaying pop up window after button for a specific exercise for a specific muscle group is clicked: */}
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

// Component takes in handler function that handles where to add the exercise:
const CreateExercise = ({ inSplit, workout, categories, workoutID, handleAddExercise, user }) => {
    let exercise = {};
    const [custom, setCustom] = useState(false);
    const [exxID, setExxID] = useState(objectID())

    const handleCreateExerciseObject = () => {
        setCustom(false);
        exercise.workout = workoutID;
        exercise._id = exxID;
        exercise.googleId = user.id;
        exercise.name = document.getElementById("exerciseName").value;
        exercise.description = document.getElementById("exerciseDescription").value;
        exercise.notes = document.getElementById("exerciseNotes").value;
        if(!inSplit){
            axios.post("/exercises", exercise)
            .catch((err) => console.log(err))
        }
        if(!categories){
            window.location.reload();
        }
        if(handleAddExercise)
            handleAddExercise(exercise);
    };

    return (
        <>
        {/* All muscle group buttons for when an exercise is being created: */}
        <div id="selectExerciseCategory">
            <ExxCategory categories={categories} className="category" title={"Arms"} category={8} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise}/>
            <ExxCategory categories={categories} className="category" title={"Legs"} category={9} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise}/>
            <ExxCategory categories={categories} className="category" title={"Abs"} category={10} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise}/>
            <ExxCategory categories={categories} className="category" title={"Chest"} category={11} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise}/>
            <ExxCategory categories={categories} className="category" title={"Back"} category={12} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise}/>
            <ExxCategory categories={categories} className="category" title={"Shoulders"} category={13} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise}/>
            <ExxCategory categories={categories} className="category" title={"Calves"} category={14} user={user} workoutID={workoutID} handleAddExercise={handleAddExercise}/>
            <Button class="btn btn-success" onClick={() => setCustom(true)}>Custom</Button>
        </div>

        {/* Form for when "Custom" button is clicked: */}    
        <div id="form">
            <br/>
            {custom && <><Form className="formBodyExercise">
                <Form.Group
                    className="mb-3"
                    controlId="formBasicExercise"
                    name="name"
                >
                    <Form.Label>Exercise Name</Form.Label>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Enter exercise"
                        id="exerciseName"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSets">
                    <Form.Label>Description</Form.Label>
                    <input type="textarea" className="formInput" placeholder="Description" id="exerciseDescription" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNotes">
                    <Form.Label>Notes</Form.Label>
                    <input
                        type="textarea"
                        className="formInput"
                        placeholder="Exercise Notes"
                        id="exerciseNotes"
                    />
                </Form.Group>
            </Form>
            <Button
                variant="primary"
                id="addExercise"
                type="button"
                onClick={handleCreateExerciseObject}
            >
                Add Exercise
            </Button></>}
        </div>
        </>
    );
};

export default CreateExercise;
