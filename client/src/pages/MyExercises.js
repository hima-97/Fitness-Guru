// The 'MyExercises.js' file is a React component that renders the "My Exercises" page. 
// The page is designed to allow the user to view and manage the exercises they have created. 
// The component uses functional component and hooks with the useState hook to manage the state of the component.
// The component then defines a functional component 'MyExercises' which is exported as the default. 
// The component uses the getUser function to get the current user and assigns the result to the constant variable 'user'. 
// The component then defines a state variable 'show' using the useState hook and assigns it the initial value of false.
// The component then renders a Layout component and passes the 'user' variable as a prop to it. 
// Within the Layout component, the component renders a Container component which is used to center the contents of the page. 
// Inside the Container component, the component uses a ternary operator to conditionally render a button labeled 'Add Exercise' with an onClick event that sets the state variable 'show' to true.
// When the button is clicked, it will show the CreateExercise component, When the state variable 'show' is true.
// The component also renders the 'Exercise' component, which is a table that displays all of the user's exercises.
// The component uses the axios library to make requests to the server to retrieve and update data.
// The component also contains some commented out code that is not currently in use. 
// The code appears to define a functional component 'Exx' which takes an exercise object as a prop and renders the name and description of the exercise. 
// The component also defines a functional component 'ExerciseCatDropDown' which takes an array of exercises and a title as props and renders a dropdown menu containing the names of the exercises in the array.

import React from "react";
import {useState} from "react";
import Container from "react-bootstrap/Container";

import getUser from "../utils/get-user";
import Layout from "../components/Layout";
import Exercise from "../components/Exercise";
import CreateExercise from "../components/Workout/CreateExercise";
import Button from "react-bootstrap/Button";
import "./MyExercises.css";

export default function MyExercises() {
  const user = getUser();
  const [show, setShow] = useState(false);

  return (
    <Layout user={user}>
      <Container>
        {/* Displaying "Add Exercise" button: */}
        {!show && <Button onClick={() => setShow(true)}>Add Exercise</Button>}
        {/* Displaying buttons for different muscle groups, after "Add Exercise" button is clicked: */}
        {show && <CreateExercise user={user}/>}
        {/* Displaying "Exercise" component (i.e. exercise table): */}
        <Exercise />    
        
      </Container>
    </Layout>
  );
}
