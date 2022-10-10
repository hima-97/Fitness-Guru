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