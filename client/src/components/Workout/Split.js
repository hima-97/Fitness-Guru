import React from "react";
import { useState, useEffect } from "react";
import "./Split.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Exercise from "./Exercise";
import Workout from "./Workout";
import axios from "axios";

function MyVerticallyCenteredModal(props) {
    const [workouts, setWorkouts] = useState(props.split.workouts)

    return (
        <Modal
            {...props}
            id="vertModal"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <div id="workoutModal">
        <Workout  split={props.split} inSplit={1} workouts={workouts} setWorkouts={setWorkouts} id="displayedWorkout" w={props.w} user={props.user} />
        </div>
        
        
            
        </Modal>
    );
}

const Split = ({ split, user }) => {
    const [modalShow, setModalShow] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState({
        workoutName: "",
        exercises: [],
    });

    useEffect(() => {
        fetch(`/workouts/${user.id}`)
            .then((res) => res.json())
            .then((workouts) =>
                setWorkouts(workouts.filter((w) => w.split == split)),
            );
    }, [user.id]);

    const handleShowWorkout = ({ w }) => {
        setSelectedWorkout(w);
        return setModalShow(true);
    };

    const handleDelete = () => {
        axios.post('/splits/delete/' + split._id)
            .catch((err) => console.log(err))
        window.location.reload();
    }

    const handleMakePublic = () => {
        axios.post('/splits/public/' + split._id)
            .catch((err) => console.log(err))
        window.location.reload();
    }

   

    return (
        <div className="splitItem">
            <Card id="splitCard" style={{ width: "20rem" }}>
                <Card.Header id="splitName">
                    <div className="card-top">
                        <div id="top">
                        <div>
                            <div id="title">
                                {
                                split.public === "true" ?
                                split.name + " (Public)" :
                                split.public === "COPIED" ?
                                split.name + " (Copied)" :
                                split.name + " (Private)"
                                }
                            </div>
                        </div>
                        <div id="notes">{split.notes}</div>
                        <div id="buttons">
                        
                            <button
                                type="button"
                                className="splitButton"
                                id="updateButton"
                                data-toggle="modal"
                                data-target={
                                    "#updateSplit" + split._id
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 18zM3 20h18v2H3v-2z"/></svg>
                            </button>
                            {
                                split.public === "COPIED" ?
                                ""
                                :
                                <button id="makePublic" className="splitButton" onClick={handleMakePublic}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z"/></svg></button>

                            }
                            <button id="deleteSplit" className="splitButton" onClick={handleDelete}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/></svg></button>
                            
                        </div>
                    </div>
                </div>
                    

                    <div
                        class="modal fade"
                        id={"updateSplit" + split._id}
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
                                        Update {split.name}
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
                                    action={"/splits/put/" + split._id}
                                    method="POST"
                                    class="mb-4"
                                >
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label for="notes">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                defaultValue={split.name}
                                                class="form-control"
                                            />
                                        </div>
                                        <br />
                                        <div class="form-group">
                                            <label for="notes">Notes</label>
                                            <input
                                                type="text"
                                                name="notes"
                                                defaultValue={split.notes}
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
                                            value="Update Split"
                                            class="btn btn-primary btn-block"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Card.Header>

                <ListGroup id="workoutCards" variant="flush">
                    {split.workouts.map((w) => {
                        return (
                            <button
                                className="workoutButton"
                                onClick={() => handleShowWorkout({ w })}
                            >
                                {w.name}
                            </button>
                        );
                    })}
                </ListGroup>
            </Card>

            <MyVerticallyCenteredModal
                id="workoutModal"
                w={selectedWorkout}
                show={modalShow}
                split={split}
                onHide={() => setModalShow(false)}
                user={user}
            />
        </div>
    );
};

export default Split;
