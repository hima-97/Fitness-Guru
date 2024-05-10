// The ListWorkouts.js file in the Fitness Guru application defines a component for displaying and managing a list of workout plans.

// **Imports**
// It imports:
// - **React Hooks (useState, useEffect):** For managing state and fetching data.
// - **Workout Component:** Represents individual workouts in the list.
// - **compare Function (from utils):** Custom comparison function for sorting workouts.
// - **Custom CSS:** 'ListWorkouts.css' for component styling.

// **ListWorkouts Component**
// A functional component that receives several props:
// - `creating`: Boolean indicating if the component is in workout creation mode.
// - `removeWorkout`: Callback function to remove a workout from the list.
// - `inSplit`: Boolean indicating if the workouts are displayed within a split.
// - `setWorkouts`: Function to update the workouts state.
// - `workouts`: Array of workouts to be displayed.
// - `user`: User object for managing user-specific data.
// - **State Management:**
//   - `workouts`: State variable for managing the list of workouts.
//   - `setWorkouts`: Setter function for updating `workouts`.
// - **useEffect Hook:**
//   - Sorts the workouts based on the `compare` function if `creating` is false.
//   - Executes only on the first render or when `creating` changes.
// - **Return Statement:**
//   - Wraps the workout list in a div with the id `workoutList`.
//   - Maps through the `workouts` array and renders a `Workout` component for each workout.
//   - Passes down all relevant props to the `Workout` component.

// **Summary**
// - **Workout Listing Workflow:**
//   - Accepts a list of workouts and maps them to `Workout` components for display.
//   - Optionally sorts the workouts using a custom comparison function.
// - **State Management and Conditional Sorting:**
//   - **State Hooks:** Manage the state of the workout list using `useState`.
//   - **Sorting Logic:** Sorts the workouts based on the `compare` function if `creating` is false.

// Example Usage:

// <ListWorkouts
//   creating={false}
//   removeWorkout={removeWorkout}
//   inSplit={true}
//   setWorkouts={setWorkouts}
//   workouts={workouts}
//   user={user}
// />


import React from "react";
import { useState, useEffect } from "react";
import Workout from "./Workout";
import "./ListWorkouts.css";
import compare from "../../utils/compare";

// ListWorkouts component is responsible for displaying a list of workout plans
const ListWorkouts = ({ creating, removeWorkout, inSplit, setWorkouts, workouts, user }) => {
  // If not creating a new workout, sort the workouts using the custom compare function
  if (!creating) {
    workouts.sort(compare);
  }

  // Debugging logs for verifying the workouts data
  console.log(workouts);
  console.log('waw');

  return (
    <div id="workoutList">
      {/* Map over the workouts array and render each workout using the Workout component */}
      {workouts.map((workout) => {
        return (
          <Workout
            creating={creating} // Indicates if workouts are being created
            removeWorkout={removeWorkout} // Callback function to remove a workout
            inSplit={inSplit} // Indicates if the workouts belong to a specific split
            user={user} // User information
            workouts={workouts} // Array of workouts
            setWorkouts={setWorkouts} // Function to update the workouts state
            className="workout"
            w={workout} // The workout object to be displayed
          />
        );
      })}
    </div>
  );
};

export default ListWorkouts;
