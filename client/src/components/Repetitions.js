// The Repetitions.js file in the Fitness Guru application defines the Repetitions component, which displays and manages weight data for specific repetitions of an exercise. This component is designed to dynamically fetch and update repetition data, allowing users to interactively manage their weight records.

// **Imports**
// It imports:
// - **React Hooks (useState, useEffect):** For managing state and effects.
// - **fetch API:** To retrieve data from the server.
// - **Weight Component:** To display weight for each repetition.
// - **Modal Component:** For adding new weights interactively.

// **Repetitions Component**
// A functional component that:
// - Receives `exercise_id` and `date` as props.
// - Uses `useState` to initialize the `repetitions` state with an empty array.
// - Uses `useEffect` to fetch repetition data from the server when `exercise_id` changes. The fetch URL is constructed dynamically using `exercise_id`.
// - Updates the `repetitions` state with the fetched data, and sorts it by the number of repetitions in ascending order.
// - **Dynamic Data Fetching:**
//   - Makes server requests to get repetition data based on the `exercise_id`.
//   - Automatically updates the component state with fetched data, ensuring real-time display accuracy.
// - **Interactive Data Management:**
//   - Renders a `Modal` for each repetition to add new weight records. The modal includes a form where users can submit new weights.
//   - Submits new weight data to the server via a POST request, reflecting changes immediately in the user interface.
// - **Sorting and Presentation:**
//   - Ensures data is sorted by the number of repetitions.
//   - Uses a table layout to present repetitions and associated weights clearly.

// **Return Statement:**
// - Renders a table with columns for Repetitions and Weights.
// - Maps over the `repetitions` array to create a table row for each repetition, displaying the number of repetitions and a `Weight` component.
// - Includes an "Add Weight" button that triggers the modal for adding weight to the specific repetition.

// **CSS Styling:**
// - Likely uses CSS for styling the table and modal elements, ensuring they are visually integrated into the application's design.

// **Key Features and Functionality**
// - **Dynamic Data Fetching:** Fetches and displays up-to-date data for repetitions, enhancing user interaction and data accuracy.
// - **Interactive Data Management:** Allows users to add weights to repetitions through a user-friendly modal interface.
// - **Sorting and Presentation:** Organizes data in a clear and logical order, improving readability and user experience.

// Example Usage:

// <Repetitions exercise_id={12345} date={"2023-01-01"} />



// Import necessary React functions and components from libraries
import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";  // Reactstrap table component for styled tables
import Weight from "./Weight";  // Importing a custom Weight component that handles weight-related functionalities

// Define the Repetitions component, receiving 'exercise_id' and 'date' as props from its parent component
export default function Repetitions({exercise_id, date}) {
    // useState hook to manage the 'repetitions' state in the component
    const [repetitions, setRepetitions] = useState([]);

    // useEffect hook to fetch repetitions data from the server when 'exercise_id' changes
    useEffect(() => {
        fetch(`/repetitions/${exercise_id}`) // Fetch repetitions data for a specific exercise
            .then((res) => res.json()) // Parse the response into JSON
            .then((repetitions) => setRepetitions(repetitions)); // Update the 'repetitions' state with fetched data
    }, [exercise_id]);

    // Sort the fetched repetitions data in ascending order based on the number of repetitions
    repetitions.sort((a, b) => {
        return a.repetitions - b.repetitions;
    })

    // Render the component content
    return (
        <div>
            {/* Define a table with Bootstrap classes for styling */}
            <table className="table table-hover table-bordered table-morecondensed" style={{height: "auto"}}>
                <thead>
                    <tr>
                        <th>Repetitions</th> {/* Table header for repetitions count */}
                        <th>Weights</th> {/* Table header for associated weights */}
                    </tr>
                </thead>
                <tbody>
                    {/* Map over the 'repetitions' state to generate table rows for each entry */}
                    {repetitions.map((repetition) => (
                        <tr>
                            <td>
                                {repetition.repetitions} {/* Display the number of repetitions */}
                            </td>
                            <td>
                                <Weight repetitions_id={repetition._id} /> {/* Embed the Weight component for managing weights */}
                                {/* Button to trigger a modal for adding weight to a specific repetition */}
                                <button
                                    type="button"
                                    style={{float: "right"}}
                                    className="btn btn-primary btn-block"
                                    data-toggle="modal"
                                    data-target={"#addWeight" + repetition._id}
                                >
                                    Add Weight
                                </button>
                                {/* Modal structure for adding weight */}
                                <div
                                    className="modal fade"
                                    id={"addWeight" + repetition._id}
                                    tabIndex="-1"
                                    role="dialog"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">
                                                    Add Weight
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                >
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            {/* Form for submitting new weight data */}
                                            <form action="/weight" method="POST" className="mb-4">
                                                <div className="modal-body">
                                                    {/* Input field for weight value */}
                                                    <div className="form-group">
                                                        <label htmlFor="weight">Weight</label>
                                                        <input
                                                            type="number"
                                                            name="weight"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    {/* Hidden input fields for repetitions ID and date */}
                                                    <div className="form-group">
                                                        <input
                                                            type="hidden"
                                                            name="repetitions"
                                                            value={repetition._id}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="hidden"
                                                            name="date"
                                                            value={date}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        data-dismiss="modal"
                                                    >
                                                        Close
                                                    </button>
                                                    <input
                                                        type="submit"
                                                        value="Add Weight"
                                                        className="btn btn-primary btn-block"
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
