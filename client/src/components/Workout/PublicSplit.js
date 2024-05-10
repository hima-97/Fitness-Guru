// The PublicSplit.js file in the Fitness Guru application defines a component for displaying a public workout split and providing detailed workout information through a modal.

// **Imports**
// It imports:
// - **React Hooks (useState, useEffect):** For managing state and component lifecycle.
// - **react-bootstrap Components:** Modal, Card, ListGroup, Button for UI elements.
// - **Workout Component:** Represents individual workouts.
// - **getUser Utility:** Retrieves user data for API requests.
// - **Custom CSS:** 'Split.css' for component styling.

// **PublicSplit Component**
// A functional component that receives `split` and `user` as props.
// - **State Management:**
//   - `modalShow`: Boolean controlling the visibility of the workout modal.
//   - `workouts`: Array of workouts associated with the split.
//   - `selectedWorkout`: Stores the currently viewed workout in the modal.
// - **useEffect Hook:**
//   - Fetches workout data from the backend using the `/workouts/${user._id}` endpoint.
//   - Filters workouts to only include those belonging to the specified `split`.
//   - Updates the `workouts` state variable with the filtered data.
// - **Event Handlers:**
//   - `handleShowWorkout`: Sets `selectedWorkout` to the selected workout and enables `modalShow` to display the modal.
// - **Nested Component (MyVerticallyCenteredModal):**
//   - A modal that displays detailed information about a selected workout.
//   - Takes `props` from the parent component and manages workout data using `workout` and `setWorkout`.
// - **Return Statement:**
//   - Wraps the split information in a div with the class `splitItem`.
//   - Displays the `Card` component for the split's name and notes.
//   - Uses `ListGroup` to show the associated workouts.
//   - Displays the `MyVerticallyCenteredModal` for detailed workout information.

// **Summary**
// - **Public Split Display Workflow:**
//   - Displays a split with its name, notes, and associated workouts.
//   - Allows the user to copy a public split to their account via POST request.
// - **Workout Modal:**
//   - Provides detailed information about a workout using a modal.
// - **State Management and API Integration:**
//   - **State Hooks:** Manage modal visibility and workout data using `useState`.
//   - **API Calls:** Fetches workout data via `/workouts/:id` endpoint.

// Example Usage:

// <PublicSplit
//   split={split}
//   user={user}
// />


// Import necessary libraries and components
import React from "react";
import { useState, useEffect } from "react";
import "./Split.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Workout from "./Workout";
import getUser from "../../utils/get-user";

// Modal component that displays the selected workout details
function MyVerticallyCenteredModal(props) {
    // Initialize workouts state from the split's workouts prop
    const [workouts, setWorkouts] = useState(props.split.workouts);

    return (
        <Modal
            {...props} // Pass modal properties down from the parent component
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div id="workoutModalPublic">
                {/* Display the selected workout in the modal */}
                <Workout
                    split={props.split}
                    inSplit={1}
                    workouts={workouts}
                    setWorkouts={setWorkouts}
                    id="displayedWorkout"
                    w={props.w}
                    user={props.user}
                />
            </div>
        </Modal>
    );
}

// Main Split component that displays information about the public split
const Split = ({ split, user }) => {
    // State to control the visibility of the workout modal
    const [modalShow, setModalShow] = useState(false);
    // State to store the workouts in the split
    const [workouts, setWorkouts] = useState([]);
    // State to store the currently selected workout for detailed viewing
    const [selectedWorkout, setSelectedWorkout] = useState({
        workoutName: "",
        exercises: [],
    });

    // Fetch the current user's information
    const currentUser = getUser();

    // Fetch workouts for the user and filter by the given split
    useEffect(() => {
        fetch(`/workouts/${user.id}`)
            .then((res) => res.json())
            .then((workouts) =>
                // Filter workouts that belong to the specified split
                setWorkouts(workouts.filter((w) => w.split == split))
            );
    }, [user.id]);

    // Function to handle the display of a selected workout in the modal
    const handleShowWorkout = ({ w }) => {
        setSelectedWorkout(w); // Set the selected workout
        return setModalShow(true); // Show the modal
    };

    return (
        <div className="splitItem">
            {/* Card representing the split information */}
            <Card id="splitCard" style={{ width: "20rem" }}>
                <Card.Header id="splitName">
                    <div className="card-top">
                        <div id="top">
                            <div>
                                {/* Split title */}
                                <div id="title">{split.name}</div>
                            </div>
                            <div>
                                {/* Form to copy the public split to the user's account */}
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
                    {/* Notes associated with the split */}
                    <div id="notes">{split.notes}</div>
                </Card.Header>

                {/* List of workouts associated with the split */}
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

            {/* Modal to display the details of the selected workout */}
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

