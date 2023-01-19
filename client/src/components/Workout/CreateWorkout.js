// This file contains a React component called CreateWorkout. 
// It's responsible for creating a new workout, and it allows the user to add exercises to that workout.
// The component starts by importing React's useState hook, the CreateExercise component, the ListExercises component, and the axios library for making HTTP requests.
// The component has a state variable called exercises which is an array that stores all the exercises that are added to the workout. 
// The component also has a state variable called showAddExercise which is a boolean value that determines whether to show or hide the CreateExercise component.
// The component has a function handleAddExercise which takes in an exercise object as an argument. 
// It then concatenates this exercise object to the existing exercises array, updating the state and re-rendering the component.
// The component also has a function handleSetShowAddExercise which is an event handler that is triggered when the user clicks on the "Add Exercise" button. 
// This function sets the showAddExercise state variable to true, which in turn renders the CreateExercise component, allowing the user to create a new exercise.
// The component also has a function handleClose which is an event handler that is triggered when the user clicks on the "Close" button. 
// This function clears the input field and sets the showAddExercise state variable to false, hiding the CreateExercise component.
// The component also has a function handleCreateWorkoutObject which is an event handler that is triggered when the user clicks on the "Save" button. 
// This function takes the name of the workout and the notes of the workout, and the exercises array that has been added to the workout, and creates an object called workout. 
// This workout object is then passed to the handleAddWorkout function as an argument, which is a prop passed down from the parent component.
// The component also has a function getCategoryData to make an axios request to an external API to get the exercises data for a given category, and sets the state for each category with this data.
// The component also has a useEffect which is used to get the data for all 7 categories of exercises when the component is mounted.
// The component is rendered with a form that has input fields for the name and notes of the workout. 
// It also has a button to add exercises to the workout, a button to save the workout and a button to close the modal.
// It also has a ListExercises component that is rendered with the exercises that have been added to the workout.

import React from 'react';
import {useState, useEffect, useRef} from 'react';
import CreateExercise from './CreateExercise';
import ListExercises from './ListExercises';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './CreateWorkout.css';
import axios from 'axios';
import Loader from 'react-loader-spinner';

const CreateWorkout = ({closeModal,splitID, handleAddWorkout, user}) => {
    let workout = {};

    const [exercises, setExercises] = useState([]);
    const [showAddExercise, setShowAddExercise] = useState(false);
    const [showAddExercise1, setShowAddExercise1] = useState(true);
    //const [workoutID, setWorkoutID] = useState(objectID());

    const[arms, setArms] = useState();
    const[legs, setLegs] = useState();
    const[chest, setChest] = useState();
    const[back, setBack] = useState();
    const[shoulders, setShoulders] = useState();
    const[calves, setCalves] = useState();
    const[abs, setAbs] = useState();
    const[categories, setCategories] = useState([]);
    const[loadingExercises, setLoadingExercises] = useState(true);
    const notInitRender = useRef(false);

    const getCategoryData = (set, cat) => {
        axios.get(`https://wger.de/api/v2/exercise/?limit=100&offset=0&language=2&category=${cat}`)
        .then((res) => set(res.data.results))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        if(!arms){
            getCategoryData(setArms, 8);
        }
        if(!legs)
            getCategoryData(setLegs, 9);
        if(!abs)
            getCategoryData(setAbs, 10);
        if(!chest)
            getCategoryData(setChest, 11);
        if(!back)
            getCategoryData(setBack, 12);
        if(!shoulders)
            getCategoryData(setShoulders, 13);
        if(!calves)
            getCategoryData(setCalves, 14);
    },[])
    


    useEffect(() => {
        if(notInitRender.current){
            setLoadingExercises(false);
        }
        else{
            notInitRender.current = true;
        }
        
    }, [arms])
  
    const handleAddExercise = (exercise) => {
      const newExercises = exercises.concat(exercise);
      setExercises(newExercises);
      setShowAddExercise1(true);
      return(
        setShowAddExercise(false)
      )
    }

    const handleSetShowAddExercise = (e) => {
        e.preventDefault();
        setCategories([arms,legs,chest,back,shoulders,calves,abs]);
        setShowAddExercise1(false);
        return(setShowAddExercise(true));
    }

    const handleClose = () => {
        document.getElementById('workoutName').value = '';
        setShowAddExercise1(true);
        setShowAddExercise(false);
        closeModal();
    }

    const handleCreateWorkoutObject = () => {
        //setWorkoutID(objectID());
      
        if(!document.getElementById('workoutName').value){
            document.getElementById('workoutName').style.borderColor = "red";
            document.getElementById('workoutName').style.borderWidth = "4px";
            return;
        } 
        workout.name = document.getElementById('workoutName').value;
        workout.exercises = exercises;
        workout.split = splitID;
        workout.googleId = user.id;
        console.log("HMMM");
        if(splitID == null){
            axios.post('/workouts',workout)
                .then(window.location.reload())
                .catch((err) => console.log(err))
        }
        else{
            axios.post('/workouts',workout)
                .catch((err) => console.log(err))
            console.log("WORKOUT");
            console.log(workout);
            handleAddWorkout(workout);
        }
        setExercises([]);
        document.getElementById('workoutName').value='';
        setShowAddExercise1(true);
        setShowAddExercise(false);
        return(
            closeModal()
        )
        
    }

    const handleRemoveExercise = (exercise) => {
        const newExercises = exercises.filter((exx) => exx != exercise);
        setExercises(newExercises);
        axios.post(`/exercises/delete/${exercise._id}`);
    }

   return (

    <Form className="formBodyWorkout">
        <Button style={{position:'relative', left:'670px', top:'-10px'}}variant="close" id="closeWorkoutModal" type="button" onClick={handleClose}>
        </Button>
        <Form.Group id="workoutNameInput" className="mb-3" controlId="formBasicExercise">
            <Form.Label className="label">Workout Name</Form.Label>
            <input type="text" placeholder="Enter workout" id="workoutName"/>
        </Form.Group>
        
        {showAddExercise && <CreateExercise workoutID={1} categories={categories} handleAddExercise={handleAddExercise} user={user}/>}<br /><br />

        <div className="addExercise">
            <div className="addButton">
            {loadingExercises && <><p>Loading Exercises...</p><Loader id="loadingIcon" type="TailSpin" color="black" height={50} width={50}/></>}
            {!loadingExercises && showAddExercise1 && <Button className="addWorkout" onClick={handleSetShowAddExercise}>Add Exercise</Button>}
            </div>
        
            <div className="exerciseList">
                <ListExercises setAddingExercises={setExercises} addingExercises={exercises} removeExercise={handleRemoveExercise} className="exercises" exercises={exercises}/>
            </div>
           
          
        </div>

        <Button variant="primary" id="addWorkout" type="button" onClick={handleCreateWorkoutObject} >
            Create Workout
        </Button>
        
    </Form>
   )
  }

  export default CreateWorkout;