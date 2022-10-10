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
