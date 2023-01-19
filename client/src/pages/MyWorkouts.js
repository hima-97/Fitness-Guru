// This file defines a React component called 'MyWorkouts' which is a page that allows the user to view and create workout plans.
// At the top of the file, it imports the necessary modules from React, jQuery, bootstrap, and other local files.
// It defines a functional component called 'MyWorkouts' which returns a JSX element that is rendered to the page. 
// It uses the 'Layout' component imported from the 'components' folder to set up the structure of the page. 
// Inside of this, it has a container element which will hold the content of the page.
// The component uses a state variable 'workouts' to hold an array of workout plans, which is set to an empty array initially. 
// It also uses a state variable 'showAddWorkout' which is set to true initially.
// It also uses useEffect function to fetch the workout plans for the current user from the backend server and set the 'workouts' state variable to the returned data.
// The component then renders a button with the text "Add Workout" which, when clicked, calls a function 'handleShowCreateWorkout' which sets the 'showAddWorkout' state variable to false and shows a modal window using jQuery.
// The modal window contains an instance of the 'CreateWorkout' component which is imported from the 'components' folder. 
// This component allows the user to create a new workout plan. 
// The modal window also has a close button which when clicked, calls a function 'closeWorkoutModal' which sets the 'showAddWorkout' state variable to true and hides the modal window using jQuery.
// The component also renders a heading 'My Workouts' and an instance of the 'ListWorkouts' component which is imported from the 'components' folder. 
// This component displays a list of the workout plans for the current user, with the ability to delete and edit them.

import React from "react";
import {useState, useEffect} from "react";
import $ from "jquery";
import 'bootstrap';
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import Layout from "../components/Layout";
import CreateWorkout from "../components/Workout/CreateWorkout";
import ListWorkouts from "../components/Workout/ListWorkouts";

export default function MyWorkouts() {
  const user = getUser();
  const [workouts, setWorkouts] = useState([]);
  const [showAddWorkout, setShowAddWorkout] = useState(true);

  const closeWorkoutModal = () => {
    $('#createWorkout').hide();
    setShowAddWorkout(true);
    
  }

  const handleShowCreateWorkout = () => {
    setShowAddWorkout(false);
    $('#createWorkout').show();
  }

  useEffect(() => {
    fetch(`/workouts/${user.id}`)
    .then(res => res.json())
    .then(workouts => setWorkouts(workouts))
    .catch(error => console.log(error))
  }, [user.id])

  return (
    <Layout user={user}>
      <Container>
        {showAddWorkout && <button type="button" class="btn btn-primary btn-block" onClick={handleShowCreateWorkout}>
          Add Workout
          </button>}

          <div class="modal" id="createWorkout" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <CreateWorkout closeModal={closeWorkoutModal} splitID={null} user={user}/>
          </div> <br/>
          <h2>My Workouts</h2>
          <ListWorkouts user={user} setWorkouts={setWorkouts} workouts={workouts} />
      </Container>
    </Layout>
  );
}
