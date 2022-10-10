import React from "react";
import {useState} from "react";
import Exercise from "./Exercise";
import "./Workout.css";
import Card from "react-bootstrap/Container";
import ListExercises from "./ListExercises";
import CreateExercise from "./CreateExercise";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"
import getUser from "../../utils/get-user"


const Workout = ({ split, creating, inSplit, workouts, setWorkouts, w, user}) => {

    const actualUser = getUser()
    const [exercises, setExercises] = useState(w.exercises);
    const [showCreateExercise, setShowCreateExercise] = useState(false);

    const editExercises = (newExercises) => {
        setExercises(newExercises);
        let workoutIndex = workouts.findIndex((workout) => workout._id == w._id);
        let newWorkouts = workouts;
        newWorkouts[workoutIndex].exercises = newExercises;
        setWorkouts(newWorkouts);

        axios.post("/workouts/put/" + w._id, {exercises: w.exercises})
            .then(res => console.log(res))
            .catch(err => console.log(err))

        if(split){
            axios.post("/splits/put/" + split._id, {workouts: newWorkouts})
                .then(res => console.log(res))
                .catch(err => console.log("RIP"))
        }
    }

    const removeExercise = (exx) => {
        let es = w.exercises.slice();
        let exxIndex = es.findIndex((exercise) => exercise._id == exx._id);
        if(exxIndex > -1){
            es.splice(exxIndex, 1);
        }
        editExercises(es);
    }

    const handleAddExercise = (exercise) => {
        let es = w.exercises.slice();
        es.push(exercise);
        editExercises(es);
        setShowCreateExercise(false);
    }

    const handleDelete = () => {
        axios.post("/workouts/delete/" + w._id)
            .catch((err) => console.log(err))

        window.location.reload();
    }

    return (
        <>
        <Card className="workoutBody" style={{ width: '18rem' }}>
          <div id="workoutHead">
            <h2 className="workoutName"><p data-editable>{w.name}</p></h2>
            {
                w.googleId === actualUser.id ?
                <div>
                    {!creating && <div id="buttons">
                    <button id="addExerciseButton" onClick={() => setShowCreateExercise(true)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6 6V7h2v4h4v2h-4v4h-2v-4H7v-2h4z"/></svg></button>
                        {!inSplit && <><button
                            id="updateButton"
                            type="button"
                            data-toggle="modal"
                            data-target={
                                "#updateWorkout" + w._id
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 18zM3 20h18v2H3v-2z"/></svg>
                        </button>
                        <button id="delete" onClick={handleDelete}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/></svg></button>
                        </>}
                    </div>}
                    <Modal size="lg" show={showCreateExercise} onHide={() => setShowCreateExercise(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Exercise</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><CreateExercise inSplit={inSplit} workout={w} workoutID={w._id} handleAddExercise={handleAddExercise} user={user}/></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowCreateExercise(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                :
                <div>
                </div>
            }
          </div>
           <div
                class="modal fade"
                id={"updateWorkout" + w._id}
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
                                Update {w.name}
                            </h5>
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
                            action={"/workouts/put/" + w._id}
                            method="POST"
                            class="mb-4"
                        >
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="notes">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={w.name}
                                        class="form-control"
                                    />
                                </div>
                                <br />
                            </div>
                            <div class="modal-body">
                              
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
                                    value="Update Workout"
                                    class="btn btn-primary btn-block"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
          <div id="exerciseList">
            {exercises.map((item)=>{
                return <Exercise creating={creating} inSplit={inSplit} removeExercise={removeExercise} editExercises={editExercises} e={item} workout={w}/>
            })}
          </div>
            
        </Card>
        </>
    )
}

export default Workout;