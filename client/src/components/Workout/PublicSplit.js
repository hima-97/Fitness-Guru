// This code file defines a React component called 'PublicSplit', which is used to display the information of a workout split on the front-end of the application. 
// The component is composed of several elements, including a 'Modal' component from the 'react-bootstrap' library, a 'Card' component, a 'ListGroup' component, and a 'Button' component.
// The component uses the 'useState' and 'useEffect' hooks from the 'react' library to manage the state and lifecycle of the component.
// The component imports 'React' from the 'react' library, the 'Split.css' stylesheet, 'Card', 'Button', 'ListGroup', 'Modal' and 'Exercise' from the 'react-bootstrap' library, 'getUser' from '../../utils/get-user', and 'Workout' from './Workout'.
// The component has a nested function called 'MyVerticallyCenteredModal' which is a modal for displaying the selected workout, it takes the props passed down from the parent component and sets the state of the workout and setWorkout function.
// The 'PublicSplit' component receives the 'split' and 'user' props as its inputs. 
// It uses the 'useState' hook to set the 'modalShow' state variable and the 'workouts' state variable. 
// It also sets the 'selectedWorkout' state variable, which is used to keep track of the workout that is currently being viewed in the modal.
// The 'useEffect' hook is used to fetch the workout data from the server using the '/workouts/:id' endpoint and the user id, it then filters the workouts array to only contain the ones that have the same split id as the one passed down as prop to the component.
// The component defines a function called 'handleShowWorkout' which is called when a user clicks on a workout button. This function sets the 'selectedWorkout' state variable to the workout that the user clicked on and sets the 'modalShow' state variable to true, which causes the modal to be displayed.
// The component returns a 'div' element with the class 'splitItem' which contains the 'Card' component, 'ListGroup' component and the modal. 
// The Card component displays the name of the split and its notes, the ListGroup component displays the names of all the workouts in the split and the modal is used to display the selected workout.
// When a user clicks on a workout button, the 'handleShowWorkout' function is called and the modal is displayed with the selected workout. 
// The modal also contains a form that allows the user to copy the split to their own account by sending a POST request to the /splits/public/:id/split/:splitid endpoint.

import React from "react";
import { useState, useEffect } from "react";
import "./Split.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Exercise from "./Exercise";
import Workout from "./Workout";
import getUser from "../../utils/get-user"

function MyVerticallyCenteredModal(props) {
    const [workouts, setWorkouts] = useState(props.split.workouts)

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            
            <div id="workoutModalPublic">
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

    const currentUser = getUser()

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

    return (
        <div className="splitItem">
            <Card id="splitCard" style={{ width: "20rem" }}>
                <Card.Header id="splitName">
                    <div className="card-top">
                        <div id="top">
                        <div>
                            <div id="title">{split.name}</div>
                        </div>
                        
                        <div>
                        <form
                            action={"/splits/public/" + currentUser.id + "/split/" + split._id}
                            method="POST"
                            class="mb-4"
                        >
                            <input
                                id="copySplit"
                                type="submit"
                                value="Copy"
                                class="btn btn-secondary btn-block"
                            />
                        </form>
                        </div>
                    </div>
                </div>
                    <div id="notes">{split.notes}</div>
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
