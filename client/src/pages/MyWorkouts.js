// The MyWorkouts.js file in the Fitness Guru application defines a React component that facilitates the management of workout sessions. It allows users to view, add, and interact with their workout plans dynamically and efficiently.

// **Imports**
// It imports:
// - **React and Hooks (useState, useEffect):** For building the component and managing state.
// - **jQuery:** For handling DOM manipulations, particularly for modal operations.
// - **Layout:** Component from '../components/Layout' to ensure a consistent layout across the application.
// - **Container:** From 'react-bootstrap' for responsive layout management.
// - **CreateWorkout, ListWorkouts:** Components from '../components' for adding new workouts and listing existing workouts.

// **MyWorkouts Component**
// A functional component that:
// - Utilizes 'Layout' for a consistent application structure.
// - Manages state with 'useState' for 'workouts' (an array of workout plans) and 'showAddWorkout' (a boolean to control modal visibility).
// - Uses 'useEffect' to fetch workout plans from the backend server specific to the current user and populates the 'workouts' state.
// - Renders a 'Container' that encapsulates the main content including a button labeled "Add Workout".
// - Incorporates a modal using jQuery to show the 'CreateWorkout' component when adding a new workout.
// - Includes a 'ListWorkouts' component to display existing workouts with options to edit or delete.

// **Key Features and Functionality**
// - **Workout Management:**
//   - Provides an interface to add new workouts through a modal containing the 'CreateWorkout' component.
//   - Displays existing workouts using 'ListWorkouts', allowing users to manage (edit or delete) them.
// - **Dynamic Content Loading:**
//   - Dynamically fetches and updates the list of workouts based on user interaction and server responses.
// - **Interactive and Responsive Design:**
//   - Uses interactive elements such as modals and buttons to enhance usability.
//   - Employs jQuery in conjunction with React for advanced UI dynamics like showing and hiding modals.

// **Return Statement:**
// - The component returns JSX that includes the 'Layout' component wrapping a 'Container'. Inside this container, it conditions the visibility of the 'Add Workout' button and the 'CreateWorkout' modal based on the 'showAddWorkout' state.
// - Always renders the 'ListWorkouts' component to display a list of the user's workouts.

// **CSS Styling:**
// - Likely uses CSS from 'react-bootstrap' and additional custom styles defined in an external CSS file to ensure that the modal and page layout are visually appealing and align with the application's design standards.

// **Example Usage:**

// <MyWorkouts />


import React from "react";
import { useState, useEffect } from "react";
import $ from "jquery"; // Importing jQuery for DOM manipulation
import 'bootstrap'; // Importing Bootstrap for styling and layout
import Container from "react-bootstrap/Container"; // Bootstrap container for layout structure
import getUser from "../utils/get-user"; // Utility function to fetch current user data
import Layout from "../components/Layout"; // Layout component that includes the navbar and footer
import CreateWorkout from "../components/Workout/CreateWorkout"; // Component to create a new workout
import ListWorkouts from "../components/Workout/ListWorkouts"; // Component to list all workouts

export default function MyWorkouts() {
  const user = getUser(); // Fetching the current logged-in user details
  const [workouts, setWorkouts] = useState([]); // State to store the list of workouts
  const [showAddWorkout, setShowAddWorkout] = useState(true); // State to control visibility of the add workout button

  // Function to close the workout modal and show the add workout button
  const closeWorkoutModal = () => {
    $('#createWorkout').hide(); // Using jQuery to hide the workout modal
    setShowAddWorkout(true); // Setting the state to show the add workout button
  }

  // Function to show the workout creation modal and hide the add workout button
  const handleShowCreateWorkout = () => {
    setShowAddWorkout(false); // Setting the state to hide the add workout button
    $('#createWorkout').show(); // Using jQuery to show the workout modal
  }

  // useEffect to fetch workouts from the server when the component mounts or user changes
  useEffect(() => {
    fetch(`/workouts/${user.id}`) // API call to fetch workouts by user ID
    .then(res => res.json()) // Parsing the response to JSON
    .then(workouts => setWorkouts(workouts)) // Setting the fetched workouts to state
    .catch(error => console.log(error)) // Logging any errors to the console
  }, [user.id])

  return (
    <Layout user={user}> // Using Layout component to wrap the page content
      <Container>
        {showAddWorkout && <button type="button" class="btn btn-primary btn-block" onClick={handleShowCreateWorkout}>
          Add Workout
          </button>}
        {/* Button to add a workout, shows only if showAddWorkout is true */}

        <div class="modal" id="createWorkout" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          {/* Modal to create a new workout */}
          <CreateWorkout closeModal={closeWorkoutModal} splitID={null} user={user}/>
          {/* Passing props to control modal and provide user and splitID context */}
        </div> <br/>
        <h2>My Workouts</h2>
        {/* Heading for the workouts section */}
        <ListWorkouts user={user} setWorkouts={setWorkouts} workouts={workouts} />
        {/* Component to list all workouts, passing necessary state and handlers */}
      </Container>
    </Layout>
  );
}
