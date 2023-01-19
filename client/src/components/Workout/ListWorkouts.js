// The code imports React and the useState and useEffect hooks from the React library. 
// It also imports the 'Workout' component, the 'ListWorkouts.css' stylesheet, and the 'compare' function from the 'utils' directory.
// The ListWorkouts component is defined as a functional component that takes in several props as arguments: creating, removeWorkout, inSplit, setWorkouts, workouts, and user. 
// It uses the useState hook to create a state variable workouts and a function setWorkouts to update it.
// It has a useEffect hook, which will only run on the first render, that sorts the workouts based on the compare function imported from the 'utils' directory, if creating is false.
// It then renders a 'div' element with the id "workoutList" and maps over the 'workouts' array, creating a 'Workout' component for each workout in the array, 
// and passing the following props to the component: creating, removeWorkout, inSplit, user, workouts, and setWorkouts.
// The component then returns the 'div' element with the mapped 'Workout' components as its children.


import React from "react";
import {useState, useEffect} from "react";
import Workout from "./Workout";
import "./ListWorkouts.css";
import compare from "../../utils/compare"

const ListWorkouts = ({ creating, removeWorkout, inSplit, setWorkouts, workouts, user }) => {

  if(!creating) {workouts.sort(compare)}

  console.log(workouts);
  console.log('waw');
  return (
    <div id="workoutList">
      {workouts.map((workout)=>{
        return <Workout creating={creating} removeWorkout={removeWorkout} inSplit={inSplit} user={user} workouts={workouts} setWorkouts={setWorkouts} className="workout" w={workout} />
      })}
    </div>
  )
};

export default ListWorkouts;