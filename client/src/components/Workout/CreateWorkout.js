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