// This is the "My Exercises" page, which is accessible from the navbar

import React from "react";
import {useState} from "react";
import Container from "react-bootstrap/Container";

import getUser from "../utils/get-user";
import Layout from "../components/Layout";
import Exercise from "../components/Exercise";
import CreateExercise from "../components/Workout/CreateExercise";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import axios from "axios";
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


// const Exx = ({exercise}) => {
//   return(
//     <>
//     <h1>{exercise.name}</h1>
//     <p>{exercise.description}</p>
//     </>
//   )
// }

// const ExerciseCatDropDown = ({exercises, title}) => {
//   return(
//   <>
//   <Dropdown id="Primary">
//     <Dropdown.Toggle variant="success" id="dropdown-basic">
//       {title}
//     </Dropdown.Toggle>
  
//     <Dropdown.Menu>
//       {exercises.map(exercise => <Dropdown.Item>{exercise.name}</Dropdown.Item>)}
//     </Dropdown.Menu>
//   </Dropdown>
//   </>
//   )
// }
