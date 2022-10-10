import React from "react";
import {useState} from "react";
import "./Exercise.css";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactHtmlParser from 'react-html-parser';
import axios from "axios";
import getUser from "../../utils/get-user"

const ExerciseModalNoEdit = ({ show, handleClose, e}) => {
    return(
      
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="exerciseTitle">{e.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body id="exerciseBody">
      {e.description && <div id="descArea">
        <h5>Description</h5>
        <div id="exerciseDesc">{ReactHtmlParser(e.description)}</div>
      </div>}<br/><br/>
      {e.notes && <div id="notesArea">
        <h5>Notes</h5>
        <div id="exerciseNotes">{e.notes}</div>
    </div>}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      
    )
}

const ExerciseModal = ({ setAddingExercises, addingExercises, editExercises, show, handleClose, e, workout}) => {
    const [update, setUpdate] = useState(false);

    const handleEditExercise = () => {
      setUpdate(true);

      let title = document.querySelector('#exerciseTitle');
      title.outerHTML = `<textarea id="updateTitle">` + title.innerText+ '</textarea>';
      
      let desc = document.querySelector('#exerciseDesc');
      desc.outerHTML = `<textarea id="updateDesc"}>` + desc.innerText + '</textarea>';

      let notes = document.querySelector('#exerciseNotes');
      notes.outerHTML = `<textarea id="updateNotes"}>` + notes.innerText + '</textarea>';
    }

    async function updateWorkout() {
        let exerciseIndex = workout.exercises.findIndex((exx) => exx._id == e._id);
        workout.exercises[exerciseIndex].name = document.getElementById("updateTitle").value;
        workout.exercises[exerciseIndex].description = document.getElementById("updateDesc").value;
        workout.exercises[exerciseIndex].notes = document.getElementById("updateNotes").value;
        editExercises(workout.exercises);
        axios.post("/workouts/put/" + workout._id, {exercises: workout.exercises})
            .catch(err => console.log(err))
    }

    const handleSaveEdits = () => {
        
        if(addingExercises){
          let newAddingExercises = addingExercises;
          let exerciseIndex = newAddingExercises.findIndex((exx) => exx._id == e._id);
          newAddingExercises[exerciseIndex].name = document.getElementById("updateTitle").value;
          newAddingExercises[exerciseIndex].description = document.getElementById("updateDesc").value;
          newAddingExercises[exerciseIndex].notes = document.getElementById("updateNotes").value;
          setAddingExercises(newAddingExercises);
        }
        else{
          updateWorkout();
        }
      axios.post("/exercises/put/" + e._id, {name: document.getElementById("updateTitle").value, notes: document.getElementById("updateDesc").value}) 
        .catch((err) => console.log(err))
    
        setUpdate(false);
      handleClose();
    }

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    
    return(
      <div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="exerciseTitle">{e.name}</Modal.Title>
        </Modal.Header>
    <Modal.Body id="exerciseBody">
      <div id="descArea">
        <h5>Description</h5>
        <div id="exerciseDesc">{ReactHtmlParser(e.description)}</div>
      </div><br/><br/>
      <div id="notesArea">
        <h5>Notes</h5>
        <div id="exerciseNotes">{e.notes}</div>
      </div></Modal.Body>
        <Modal.Footer>
          {!update && <Button variant="primary" onClick={handleEditExercise}>Edit</Button>}
          {update && <Button variant="primary" onClick={handleSaveEdits}>Save</Button>}
          {!update && <Button
                                        variant="primary"
                                        
                                        data-toggle="modal"
                                       
                                        data-target={
                                            "#logExercise" + e._id
                                        }
                                        onClick={handleClose}
                                    >
                                        Log
                                    </Button>}
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

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
                                                <h5
                                                    class="modal-title"
                                                    id="exampleModalLabel"
                                                >
                                                    Log Exercise
                                                </h5>
                                                <button
                                                    type="button"
                                                    class="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                >
                                                    <span aria-hidden="true">
                                                        &times;
                                                    </span>
                                                </button>
                                            </div>
                                            <form
                                                action={
                                                    "/weight/log/" +
                                                    e.name
                                                }
                                                method="POST"
                                                class="mb-4"
                                            >
                                                <div class="modal-body">
                                                    <div class="form-group">
                                                        <input
                                                            type="hidden"
                                                            name="googleId"
                                                            value={e.googleId}
                                                            class="form-control"
                                                        />
                                                    </div>
                                                    <div class="form-group">
                                                        <input
                                                            type="hidden"
                                                            name="date"
                                                            value={today}
                                                            class="form-control"
                                                        />
                                                    </div>
                                                    <br />
                                                    <div class="form-group">
                                                        <label for="Repetitions">
                                                            Repetitions
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="Repetitions"
                                                            class="form-control"
                                                        />
                                                    </div>
                                                    <br />
                                                    <div class="form-group">
                                                        <label for="Weight">
                                                            Weight
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="Weight"
                                                            class="form-control"
                                                        />
                                                    </div>
                                                    <br />
                                                </div>
                                                <div class="modal-footer">
                                                    <button
                                                        type="button"
                                                        class="btn btn-secondary"
                                                        data-dismiss="modal"
                                                    >
                                                        Close
                                                    </button>
                                                    <input
                                                        type="submit"
                                                        value="Log Exercise"
                                                        class="btn btn-primary btn-block"
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
      </div>
    

      
      
    )
}

// Component takes in an exercise object e and displays it.
const Exercise = ({ creating, setAddingExercises, addingExercises, inSplit, removeExercise, editExercises, e, workout}) => {

    const actualUser = getUser()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleOpen = (event) => {
      event.preventDefault();
      setShow(true);
    }

    const handleDelete = () => {
        removeExercise(e);
    }

    return (
        <div id="exercise">
          <div id="cardAndDelete">
            <button className="exerciseBody" onClick={handleOpen}>
              <Card.Body>
                <div id="exxBody">
                <h id="exxName">{e.name}</h>
                </div>
              </Card.Body>
            </button>
            {
              e.googleId === actualUser.id && !creating ?
              <div id="delExx">
                <button class="btn btn-danger btn-block" id="deleteExercise" onClick={handleDelete}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z" fill="#F06362"/></svg></button>
                <div id="underline"></div>
          
              </div>
              :
              <div>
              </div>
            }
          </div>
        
        {!inSplit && !creating && <ExerciseModal setAddingExercises={setAddingExercises} addingExercises={addingExercises} id="exerciseModal" editExercises={editExercises} show={show} handleClose={handleClose} e={e} workout={workout}/>}
        {(inSplit || creating) && <ExerciseModalNoEdit id="exerciseModal" editExercises={editExercises} show={show} handleClose={handleClose} e={e}/>}
        </div>
    );
};


export default Exercise;



