// The Exercise.js file in the Fitness Guru application defines a component for displaying and managing a list of exercises for a specific user, 
// with options to update and delete exercises directly from the UI.

// **Imports**
// It imports:
// - **React Hooks (useState, useEffect):** For managing component state and effects.
// - **getUser and compare Utilities:** To retrieve user details and sort exercises.
// - **Table Component:** From "reactstrap" for rendering tables.
// - **Custom CSS:** 'contai.css' for component styling.
// - **react-html-parser Library:** Parses HTML code within exercise descriptions and notes.

// **Exercise Component**
// A functional component that:
// - Uses `useState` to manage the 'exercises' state variable.
// - Calls `getUser` to retrieve the current user.
// - Uses `useEffect` to fetch exercises from the server when `user.id` changes.
// - Sorts the fetched exercises using the `compare` function.
// - Renders a `Table` that lists exercises with "Exercise", "Description", and "Notes" columns.
// - Each row in the table includes a "Update" button that triggers a modal for updating exercise details.
// - Uses `ReactHtmlParser` to correctly render HTML content in descriptions and notes.

// **Event Handlers**
// - Handles update operations through a modal interface where users can edit exercise details.
// - Provides a delete button in each row to remove exercises directly from the list.

// **Return Statement:**
// - Wraps the table in a div with a class `exerciseContainer`.
// - Maps over the `exercises` array to populate the table body, parsing HTML in the "Description" and "Notes".

// **Summary**
// - **Exercise Display and Management:**
//   - Fetches and displays exercises associated with the user.
//   - Provides options to update or delete each exercise.
// - **Interactive UI with Modals and Forms:**
//   - Uses modals for updating exercises.
//   - Implements forms within modals for submitting updates.
// - **State Management and API Integration:**
//   - Manages exercise data using React's `useState`.
//   - Integrates with the backend via `fetch` to retrieve and update exercises based on user interactions.

// Example Usage:

// <Exercise
//   user={currentUser}
// />




import React, { useState, useEffect } from "react";
import getUser from "../utils/get-user";
import compare from "../utils/compare";
import { Table } from "reactstrap"; // Importing Table component from reactstrap for styling.
import "./contai.css";
import ReactHtmlParser from 'react-html-parser'; // For converting HTML strings into React components.

export default function Exercise() {
    // Using useState to manage the exercises state which starts as an empty array.
    const [exercises, setExercises] = useState([]);

    // Retrieving the current user's information.
    const user = getUser();

    // Fetching exercises from the server when the component mounts or user.id changes.
    useEffect(() => {
        fetch(`/exercises/${user.id}`)
            .then((res) => res.json())
            .then((exercises) => setExercises(exercises));
    }, [user.id]);

    // Sorting the exercises using a utility function 'compare' to order them consistently.
    exercises.sort(compare);

    // The component returns JSX to be rendered to the DOM.
    return (
        <div>
            <br />
            {/* Creating a table with headings for Exercise, Description, and Notes. */}
            <table class="table table-hover table-bordered table-morecondensed" style={{height: "auto"}}>
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Description</th>
                        <th>Notes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping over each exercise to create table rows for each. */}
                    {exercises.map((exercise) => (
                        <tr style={{paddingBottom:'0px'}}>
                            {/* Displaying exercise name. */}
                            <td className="tablentry">{exercise.name}</td>
                            {/* Displaying exercise description parsed from HTML to JSX. */}
                            <td>{ReactHtmlParser(exercise.description)}</td>
                            {/* Displaying exercise notes parsed from HTML to JSX. */}
                            <td>{ReactHtmlParser(exercise.notes)}</td>
                            <td>
                                {/* Button to trigger the update modal. */}
                                <div>
                                    <button
                                        type="button"
                                        class="btn btn-primary btn-block"
                                        data-toggle="modal"
                                        style={{marginBottom: '0px'}}
                                        data-target={"#updateExercise" + exercise._id}
                                    >
                                        Update
                                    </button>
                                </div>
                                {/* Modal for updating exercise information. */}
                                <div
                                    class="modal fade"
                                    id={"updateExercise" + exercise._id}
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">
                                                    Update Exercise
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
                                            {/* Form to submit updated exercise details. */}
                                            <form
                                                action={"/exercises/put/" + exercise._id}
                                                method="POST"
                                                class="mb-4"
                                            >
                                                <div class="modal-body">
                                                    <div class="form-group">
                                                        <label for="description">Description</label>
                                                        <input
                                                            type="text"
                                                            name="description"
                                                            defaultValue={exercise.description}
                                                            class="form-control"
                                                        />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="notes">Notes</label>
                                                        <input
                                                            type="text"
                                                            name="notes"
                                                            defaultValue={exercise.notes}
                                                            class="form-control"
                                                        />
                                                    </div>
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
                                                        value="Update Exercise"
                                                        class="btn btn-primary btn-block"
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* Form to delete an exercise. */}
                                <form
                                    action={"/exercises/delete/" + exercise._id}
                                    method="POST"
                                    class="mb-4"
                                >
                                    <input
                                        type="submit"
                                        value="Delete"
                                        class="btn btn-primary btn-block"
                                        style={{marginTop:'0px', marginBottom:'0px'}}
                                    />
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
