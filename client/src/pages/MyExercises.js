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

const Exx = ({exercise}) => {
  return(
    <>
    <h1>{exercise.name}</h1>
    <p>{exercise.description}</p>
    </>
  )
}

const ExerciseCatDropDown = ({exercises, title}) => {
  return(
  <>
  <Dropdown id="Primary">
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      {title}
    </Dropdown.Toggle>
  
    <Dropdown.Menu>
      {exercises.map(exercise => <Dropdown.Item>{exercise.name}</Dropdown.Item>)}
    </Dropdown.Menu>
  </Dropdown>
  </>
  )
}

export default function MyExercises() {
  const user = getUser();
  const [show, setShow] = useState(false);

  return (
    <Layout user={user}>
      <Container>
        {!show && <Button onClick={() => setShow(true)}>Add Exercise</Button>}
        {show && <CreateExercise user={user}/>}
        <Exercise />    
        
      </Container>
    </Layout>
  );
}
