// The CreateWorkout.js component in the Fitness Guru application enables users to create and manage workout plans, allowing seamless addition of exercises and integration with workout splits.

// **Imports**
// It imports several modules:
// - **React's useState Hook:** For managing component state.
// - **CreateExercise, ListExercises:** Components for exercise creation and visualization.
// - **axios:** HTTP client for backend interaction.
// - **Custom CSS:** 'CreateWorkout.css' for component styling.

// **CreateWorkout Component**
// CreateWorkout is a functional component that receives `handleAddWorkout` as a prop.
// - **State Management:**
//   - `exercises`: Stores all exercises added to the workout.
//   - `showAddExercise`: Toggles visibility of the "Create Exercise" component.
// - **Event Handlers:**
//   - `handleAddExercise`: Concatenates a new exercise to the `exercises` array.
//   - `handleSetShowAddExercise`: Toggles visibility of the "Create Exercise" component.
//   - `handleClose`: Clears input fields and hides the "Create Exercise" component.
//   - `handleCreateWorkoutObject`: Validates input fields, creates a workout object (name, notes, exercises), and passes it to `handleAddWorkout`.
//   - `getCategoryData`: Fetches exercise data for a given category using `axios`.
// - **useEffect Hook:**
//   - Fetches exercise data for all seven categories upon component mount, utilizing `getCategoryData`.

// **Return Statement:**
// - **Form:**
//   - Input fields for workout name and notes.
//   - Buttons for adding exercises, saving the workout, and closing the modal.
// - **ListExercises Component:**
//   - Displays exercises added to the workout.

// **Summary**
// - **Workout Creation:** Allows users to input workout names, notes, and add exercises for custom routines.
// - **Exercise Management:**
//   - **CreateExercise Component:** Enables dynamic addition of exercises.
//   - **ListExercises Component:** Visualizes exercises added to the workout.
// - **Workout Organization:**
//   - **Split Integration:** Workouts can be linked to splits via `splitID`.
//   - **Exercise Categorization:** Exercises are grouped into muscle categories for better selection.
// - **State Management and Validation:**
//   - React hooks manage state for exercises and conditional rendering.
//   - Input validation ensures proper workout name entry.
// - **Loader Integration:** Displays a loading animation during exercise data loading.
// - **Error Handling:** Manages errors during HTTP requests via `axios`.



import React from 'react'; // React library import
import { useState, useEffect, useRef } from 'react'; // Importing hooks from React
import CreateExercise from './CreateExercise'; // Importing the CreateExercise component
import ListExercises from './ListExercises'; // Importing the ListExercises component
import Button from "react-bootstrap/Button"; // Importing Button component from react-bootstrap
import Form from "react-bootstrap/Form"; // Importing Form component from react-bootstrap
import './CreateWorkout.css'; // Importing styles for CreateWorkout
import axios from 'axios'; // Axios for making API requests
import Loader from 'react-loader-spinner'; // Loader component for loading indicator

const CreateWorkout = ({ closeModal, splitID, handleAddWorkout, user }) => {
    let workout = {}; // Initialize an empty workout object

    // State variables for managing exercises, visibility of Add Exercise forms, and loading states
    const [exercises, setExercises] = useState([]);
    const [showAddExercise, setShowAddExercise] = useState(false);
    const [showAddExercise1, setShowAddExercise1] = useState(true);

    const [arms, setArms] = useState(); // State for exercises in the "Arms" category
    const [legs, setLegs] = useState(); // State for exercises in the "Legs" category
    const [chest, setChest] = useState(); // State for exercises in the "Chest" category
    const [back, setBack] = useState(); // State for exercises in the "Back" category
    const [shoulders, setShoulders] = useState(); // State for exercises in the "Shoulders" category
    const [calves, setCalves] = useState(); // State for exercises in the "Calves" category
    const [abs, setAbs] = useState(); // State for exercises in the "Abs" category
    const [categories, setCategories] = useState([]); // State for holding all exercise categories
    const [loadingExercises, setLoadingExercises] = useState(true); // Loading state for exercises
    const notInitRender = useRef(false); // Ref to handle initial render

    // Function to fetch exercise data based on category and update the corresponding state
    const getCategoryData = (set, cat) => {
        axios.get(`https://wger.de/api/v2/exercise/?limit=100&offset=0&language=2&category=${cat}`)
            .then((res) => set(res.data.results))
            .catch((error) => console.log(error))
    }

    // useEffect to fetch exercises data by category when the component mounts
    useEffect(() => {
        if (!arms) {
            getCategoryData(setArms, 8); // Fetch exercises in the "Arms" category
        }
        if (!legs)
            getCategoryData(setLegs, 9); // Fetch exercises in the "Legs" category
        if (!abs)
            getCategoryData(setAbs, 10); // Fetch exercises in the "Abs" category
        if (!chest)
            getCategoryData(setChest, 11); // Fetch exercises in the "Chest" category
        if (!back)
            getCategoryData(setBack, 12); // Fetch exercises in the "Back" category
        if (!shoulders)
            getCategoryData(setShoulders, 13); // Fetch exercises in the "Shoulders" category
        if (!calves)
            getCategoryData(setCalves, 14); // Fetch exercises in the "Calves" category
    }, [])

    // useEffect to update the loading state after the initial render
    useEffect(() => {
        if (notInitRender.current) {
            setLoadingExercises(false); // Stop loading once data is fetched
        } else {
            notInitRender.current = true; // Set flag for subsequent renders
        }
    }, [arms])

    // Function to add an exercise to the current workout
    const handleAddExercise = (exercise) => {
        const newExercises = exercises.concat(exercise); // Add the new exercise to the list
        setExercises(newExercises); // Update state
        setShowAddExercise1(true); // Hide Add Exercise button
        return setShowAddExercise(false); // Close the Add Exercise form
    }

    // Function to set up and show the Add Exercise form
    const handleSetShowAddExercise = (e) => {
        e.preventDefault();
        setCategories([arms, legs, chest, back, shoulders, calves, abs]); // Populate categories
        setShowAddExercise1(false); // Hide Add Exercise button
        return setShowAddExercise(true); // Show the Add Exercise form
    }

    // Function to close the workout modal and reset form inputs
    const handleClose = () => {
        document.getElementById('workoutName').value = ''; // Clear workout name input
        setShowAddExercise1(true); // Show Add Exercise button
        setShowAddExercise(false); // Close the Add Exercise form
        closeModal(); // Close the modal
    }

    // Function to validate and create a new workout object
    const handleCreateWorkoutObject = () => {
        // Check if the workout name is not empty
        if (!document.getElementById('workoutName').value) {
            document.getElementById('workoutName').style.borderColor = "red"; // Highlight empty input
            document.getElementById('workoutName').style.borderWidth = "4px";
            return; // Exit function
        }
        workout.name = document.getElementById('workoutName').value; // Set workout name
        workout.exercises = exercises; // Assign exercises to the workout
        workout.split = splitID; // Assign the split ID if available
        workout.googleId = user.id; // Assign the Google user ID

        // Create the workout in the backend
        if (splitID == null) {
            axios.post('/workouts', workout)
                .then(window.location.reload()) // Reload the page after successful creation
                .catch((err) => console.log(err))
        } else {
            axios.post('/workouts', workout)
                .catch((err) => console.log(err))
            handleAddWorkout(workout); // Add the workout to the parent component
        }
        setExercises([]); // Clear exercises
        document.getElementById('workoutName').value = ''; // Clear workout name input
        setShowAddExercise1(true); // Show Add Exercise button
        setShowAddExercise(false); // Close Add Exercise form
        return closeModal(); // Close the modal
    }

    // Function to remove an exercise from the workout
    const handleRemoveExercise = (exercise) => {
        const newExercises = exercises.filter((exx) => exx != exercise); // Remove the specified exercise
        setExercises(newExercises); // Update state
        axios.post(`/exercises/delete/${exercise._id}`); // Delete exercise from the backend
    }

    // JSX return statement for rendering the workout creation form
    return (
        <Form className="formBodyWorkout">
            <Button style={{ position: 'relative', left: '670px', top: '-10px' }} variant="close" id="closeWorkoutModal" type="button" onClick={handleClose}>
            </Button>
            <Form.Group id="workoutNameInput" className="mb-3" controlId="formBasicExercise">
                <Form.Label className="label">Workout Name</Form.Label>
                <input type="text" placeholder="Enter workout" id="workoutName" />
            </Form.Group>
            {showAddExercise && <CreateExercise workoutID={1} categories={categories} handleAddExercise={handleAddExercise} user={user} />}<br /><br />

            <div className="addExercise">
                <div className="addButton">
                    {loadingExercises && <><p>Loading Exercises...</p><Loader id="loadingIcon" type="TailSpin" color="black" height={50} width={50} /></>}
                    {!loadingExercises && showAddExercise1 && <Button className="addWorkout" onClick={handleSetShowAddExercise}>Add Exercise</Button>}
                </div>

                <div className="exerciseList">
                    <ListExercises setAddingExercises={setExercises} addingExercises={exercises} removeExercise={handleRemoveExercise} className="exercises" exercises={exercises} />
                </div>
            </div>

            <Button variant="primary" id="addWorkout" type="button" onClick={handleCreateWorkoutObject}>
                Create Workout
            </Button>
        </Form>
    )
}

export default CreateWorkout;
