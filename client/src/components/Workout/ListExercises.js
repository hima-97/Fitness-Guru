// This code is a functional component in React called 'ListExercises' that is used to display a list of exercises. 
// The component takes in several props:
// -    setAddingExercises: a callback function that sets the state of the parent component for adding exercises.
// -    addingExercises: an array of exercises that are currently being added.
// -    removeExercise: a callback function that removes an exercise from the list of exercises.
// -    handleClickExercise: a callback function that handles the event when an exercise is clicked.
// -    editExercises: a callback function that edits an exercise in the list of exercises.
// -    exercises: an array of exercises that will be displayed in the component.
// The component maps over the exercises array and returns a new component called 'Exercise' for each exercise. 
// Each of the props passed to the 'ListExercises' component is passed down to the 'Exercise' component as well. 
// The 'ListExercises' component is wrapped in a div with the class 'exercisesBody', which is used for styling purposes.

import React from "react";
import Exercise from "./Exercise";
import "./ListExercises.css";

const ListExercises = ({ setAddingExercises, addingExercises, removeExercise, handleClickExercise, editExercises, exercises }) => {
    return (
        
        <div className="exercisesBody">
            {exercises.map((item) => {
                return <Exercise setAddingExercises={setAddingExercises} addingExercises={addingExercises} removeExercise={removeExercise} handleClickExercise={handleClickExercise} editExercises={editExercises} e={item} />;
            })}
        </div>
    );
};

export default ListExercises;
