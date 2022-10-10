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