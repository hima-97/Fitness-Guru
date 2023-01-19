// This code is for a React component called "TrackedExercises". 
// It imports React, the getUser utility function, the Repetitions component, the compare utility function, and the DropdownButton and Dropdown components from the react-bootstrap library.
// The component uses the useState hook to initialize two state variables, trackedExercises and exercises, which will be used to store data fetched from the server. 
// The component also uses the getUser utility function to get the user's ID.
// There's a variable today which is set to the current date and formatted as a string in the format of mm/dd/yyyy.
// The component also uses the useEffect hook to execute a side effect when the component first renders. It makes two fetch calls to the server, one to retrieve the trackedExercises and another to retrieve exercises, which are stored in the state variables. The useEffect hook is passed the user.id, so that the effect will re-run whenever user.id changes.
// The component has a DropdownButton where you can select which exercise to add to the list of tracked exercises. The list of exercises that are shown in the dropdown are the exercises that the user has created but haven't been added to the list of tracked exercises yet. When an exercise is selected, the component makes a POST request to the server with the name of the selected exercise and the user's ID, adding the selected exercise to the list of tracked exercises.
// The component maps over the trackedExercises array and renders the name of each exercise, and a button that allows the user to add repetitions for that exercise. It also renders the Repetitions component with the exercise_id and the date passed as props.
// The component also renders a modal with a form for adding repetitions for the exercise. When the form is submitted, it sends a POST request to the server to add the repetitions.


import React, { useState, useEffect } from "react";
import getUser from "../utils/get-user";
import Repetitions from "./Repetitions";
import compare from "../utils/compare"
import { DropdownButton, Dropdown } from 'react-bootstrap';

export default function Weights() {
    const [trackedExercises, setTrackedExercises] = useState([]);
    let [exercises, setExercises] = useState([]);

    const user = getUser();

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    useEffect(() => {
        fetch(`/trackedexercises/${user.id}`)
            .then((res) => res.json())
            .then((trackedExercises) => setTrackedExercises(trackedExercises));
        fetch(`/exercises/${user.id}`)
            .then((res) => res.json())
            .then((exercises) => setExercises(exercises));
    }, [user.id]);

    exercises.sort(compare)
    trackedExercises.sort(compare)
    exercises = exercises.filter((exercise) => {
        for(let i = 0; i < trackedExercises.length; i++){
            if(trackedExercises[i].name === exercise.name){
                return false
            }
        }
        return true
    })

    return (
        <div>
            <DropdownButton id="dropdown-basic-button" title="Add an Exercise to Track" menuVariant = 'light'>
              {exercises.map(exercise =>
                <Dropdown.Item onClick = {() => {
                  fetch("/trackedexercises", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        googleId: user.id,
                        name: exercise.name,
                    })
                  })
                  .then(() => {
                    fetch(`/trackedexercises/${user.id}`)
                    .then((res) => res.json())
                    .then((trackedExercises) => setTrackedExercises(trackedExercises));
                  })
                }}> 
                  {exercise.name}
                </Dropdown.Item>
              )}
            </DropdownButton>
            <br />
            <br />
            {trackedExercises.map((trackedExercise) => (
                <div>
                    <p><b>{trackedExercise.name}</b></p>
                    <button
                        type="button"
                        class="btn btn-primary btn-block"
                        data-toggle="modal"
                        data-target={"#addRepetitions" + trackedExercise._id}
                    >
                        Add Repetition to Exercise
                    </button>
                    <br />
                    <br />
                    <Repetitions exercise_id={trackedExercise._id} date={today} />
                        
                    <div
                        class="modal fade"
                        id={"addRepetitions" + trackedExercise._id}
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">
                                        Add Repetitions
                                    </h5>
                                    <button
                                        type="button"
                                        class="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form action="/repetitions" method="POST" class="mb-4">
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label for="repetitions">Repetitions</label>
                                            <input
                                                type="number"
                                                name="repetitions"
                                                class="form-control"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <input
                                                type="hidden"
                                                name="weights"
                                                value={trackedExercise._id}
                                                class="form-control"
                                            />
                                        </div>
                                        <br />
                                    </div>
                                    <div class="modal-footer">
                                        <button
                                            type="button"
                                            class="btn btn-secondary"
                                            data-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <input
                                            type="submit"
                                            value="Add Repetitions"
                                            class="btn btn-primary btn-block"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <br />
        </div>
    );
}
