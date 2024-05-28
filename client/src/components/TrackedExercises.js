// The TrackedExercises.js file in the Fitness Guru application defines the TrackedExercises component, which allows users to manage and track their exercises over time. It provides functionality to add new exercises to their tracked list and manage repetitions for each exercise interactively.

// **Imports**
// It imports:
// - **React and Hooks (useState, useEffect):** For managing component state and lifecycle.
// - **getUser Utility:** To retrieve the current user's ID.
// - **Repetitions Component:** To manage and display repetitions for each tracked exercise.
// - **compare Utility:** To sort data as needed.
// - **DropdownButton, Dropdown Components:** From "react-bootstrap" for creating a dropdown menu to add new exercises.
// - **fetch API:** For making server requests.

// **TrackedExercises Component**
// A functional component that:
// - Initializes state variables `trackedExercises` and `exercises` to store data fetched from the server.
// - Uses `getUser` to get the current user's ID and sets a `today` variable with the current date formatted as "mm/dd/yyyy".
// - Uses `useEffect` to fetch data for `trackedExercises` and `exercises` when the component mounts or when `user.id` changes.
// - Features a `DropdownButton` to select and add new exercises to the tracked list. When an exercise is selected, a POST request is made to add the exercise to `trackedExercises`.
// - Maps over `trackedExercises` to render each tracked exercise with options to add repetitions via a modal interface.
// - **Dynamic Tracking of Exercises:**
//   - Dynamically updates the list of tracked exercises through user interactions.
//   - Displays details for each tracked exercise, including options to manage repetitions.
// - **Interaction with Server Data:**
//   - Fetches available and currently tracked exercises from the server.
//   - Allows users to post new tracked exercises and repetitions to the backend.
// - **Use of React Hooks for State Management:**
//   - Manages state and effects to ensure the component is responsive and synchronized with the backend.

// **Return Statement:**
// - Renders a list of tracked exercises each with a button to add repetitions and the `Repetitions` component to manage further details.
// - Includes a `DropdownButton` for adding new exercises to the track list.
// - Utilizes a modal for submitting repetitions for each exercise.

// **CSS Styling:**
// - Likely utilizes CSS for styling the layout, dropdown menu, and modal to ensure they are visually integrated and user-friendly.

// **Key Features and Functionality**
// - **Dynamic Tracking of Exercises:** Allows users to easily add and manage their exercises, enhancing engagement and personalization.
// - **Interaction with Server Data:** Directly interacts with backend services to fetch and update exercise data.
// - **Responsive and User-Friendly UI:** Ensures the interface is accessible and responsive across various devices.

// Example Usage:

// <TrackedExercises />




import React, { useState, useEffect } from "react";
import getUser from "../utils/get-user"; // Utility to fetch user details
import Repetitions from "./Repetitions"; // Importing the Repetitions component
import compare from "../utils/compare"; // Utility for sorting
import { DropdownButton, Dropdown } from 'react-bootstrap'; // Bootstrap components for UI

export default function Weights() {
    // State to track exercises currently being tracked
    const [trackedExercises, setTrackedExercises] = useState([]);
    // State to hold list of all exercises available for tracking
    let [exercises, setExercises] = useState([]);

    // Fetch user details
    const user = getUser();

    // Date setup for tracking purposes
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy; // Formatting the date

    // Fetch tracked and all exercises data when component mounts or user changes
    useEffect(() => {
        fetch(`/trackedexercises/${user.id}`)
            .then((res) => res.json())
            .then((trackedExercises) => setTrackedExercises(trackedExercises));
        fetch(`/exercises/${user.id}`)
            .then((res) => res.json())
            .then((exercises) => setExercises(exercises));
    }, [user.id]);

    // Sort exercises for consistent display
    exercises.sort(compare);
    trackedExercises.sort(compare);

    // Filter out exercises that are already being tracked
    exercises = exercises.filter((exercise) => {
        for (let i = 0; i < trackedExercises.length; i++) {
            if (trackedExercises[i].name === exercise.name) {
                return false; // Do not include in list if already tracked
            }
        }
        return true; // Include in list if not already tracked
    });

    return (
        <div>
            {/* Dropdown to add a new exercise to the track list */}
            <DropdownButton id="dropdown-basic-button" title="Add an Exercise to Track" menuVariant='light'>
                {exercises.map(exercise =>
                    <Dropdown.Item onClick={() => {
                        // On click, post new tracked exercise to server
                        fetch("/trackedexercises", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                googleId: user.id,
                                name: exercise.name,
                            })
                        })
                        .then(() => {
                            // Refresh the list of tracked exercises
                            fetch(`/trackedexercises/${user.id}`)
                            .then((res) => res.json())
                            .then((trackedExercises) => setTrackedExercises(trackedExercises));
                        })
                    }}> 
                        {exercise.name}
                    </Dropdown.Item>
                )}
            </DropdownButton>
            <br /><br />

            {/* Display each tracked exercise and associated functionalities */}
            {trackedExercises.map((trackedExercise) => (
                <div>
                    <p><b>{trackedExercise.name}</b></p>
                    {/* Button to add repetitions for an exercise */}
                    <button
                        type="button"
                        class="btn btn-primary btn-block"
                        data-toggle="modal"
                        data-target={"#addRepetitions" + trackedExercise._id}
                    >
                        Add Repetition to Exercise
                    </button>
                    <br /><br />
                    {/* Show current repetitions */}
                    <Repetitions exercise_id={trackedExercise._id} date={today} />
                    
                    {/* Modal to add repetitions */}
                    <div
                        class="modal fade"
                        id={"addRepetitions" + trackedExercise._id}
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">
                                        Add Repetitions
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
                                {/* Form to submit new repetitions */}
                                <form action="/repetitions" method="POST" class="mb-4">
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label for="repetitions">Repetitions</label>
                                            <input
                                                type="number"
                                                name="repetitions"
                                                class="form-control"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <input
                                                type="hidden"
                                                name="weights"
                                                value={trackedExercise._id}
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
                                            value="Add Repetitions"
                                            class="btn btn-primary btn-block"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <br />
        </div>
    );
}
