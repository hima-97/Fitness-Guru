// The ListExercises.js file in the Fitness Guru application defines a component for displaying a list of exercises and enabling their management.

// **Imports**
// It imports:
// - **React:** Main library for building user interfaces.
// - **Exercise Component:** Represents individual exercises in the list.
// - **Custom CSS:** 'ListExercises.css' for component styling.

// **ListExercises Component**
// A functional component that receives several props:
// - `setAddingExercises`: Callback to set the state of exercises being added.
// - `addingExercises`: Array of exercises currently being added.
// - `removeExercise`: Callback to remove an exercise from the list.
// - `handleClickExercise`: Callback to handle exercise selection.
// - `editExercises`: Callback to edit an exercise in the list.
// - `exercises`: Array of exercises to be displayed.
// - **Return Statement:**
//   - Maps through `exercises` and renders an `Exercise` component for each exercise.
//   - Passes down all relevant props to the `Exercise` component.
//   - Wraps the exercise list in a div with the class `exercisesBody` for styling purposes.

// **Summary**
// - **Exercise Listing Workflow:**
//   - Accepts an array of exercises and maps them to individual `Exercise` components.
//   - Allows editing, removal, and selection of exercises via callbacks.
// - **Exercise Management:**
//   - **Exercise Component:** Handles the display and interaction of each exercise.
//   - Supports editing and removal functionalities via `editExercises` and `removeExercise` callbacks.

// Example Usage:

// <ListExercises
//   setAddingExercises={setAddingExercises}
//   addingExercises={addingExercises}
//   removeExercise={removeExercise}
//   handleClickExercise={handleClickExercise}
//   editExercises={editExercises}
//   exercises={exercises}
// />



import React from "react";
import Exercise from "./Exercise";
import "./ListExercises.css";

/**
 * ListExercises Component
 * Displays a list of exercises passed as a prop.
 * 
 * Props:
 * - setAddingExercises: Function to set the list of exercises being added.
 * - addingExercises: Array of exercises currently being added.
 * - removeExercise: Function to remove an exercise from the list.
 * - handleClickExercise: Function to handle click events on an exercise.
 * - editExercises: Function to edit an exercise in the list.
 * - exercises: Array of exercises to be displayed.
 */
const ListExercises = ({
  setAddingExercises,
  addingExercises,
  removeExercise,
  handleClickExercise,
  editExercises,
  exercises,
}) => {
  return (
    <div className="exercisesBody">
      {/* Map over the exercises array and render an Exercise component for each item */}
      {exercises.map((item) => {
        return (
          <Exercise
            setAddingExercises={setAddingExercises}
            addingExercises={addingExercises}
            removeExercise={removeExercise}
            handleClickExercise={handleClickExercise}
            editExercises={editExercises}
            e={item} // Pass the exercise item as a prop to the Exercise component
          />
        );
      })}
    </div>
  );
};

export default ListExercises;

