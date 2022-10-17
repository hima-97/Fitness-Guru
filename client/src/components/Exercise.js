// This file is used for the "Exercise" component

import React, { useState, useEffect } from "react";
import getUser from "../utils/get-user";
import compare from "../utils/compare";
import { Table } from "reactstrap";
import "./contai.css";
import ReactHtmlParser from 'react-html-parser';

export default function Exercise() {
    // The React "useState" hook allows you to track state in a function component:
    // State generally refers to data or properties that need to be tracked in an application
    const [exercises, setExercises] = useState([]);

    const user = getUser();
    useEffect(() => {
        fetch(`/exercises/${user.id}`)
            .then((res) => res.json())
            .then((exercises) => setExercises(exercises));
    }, [user.id]);

    exercises.sort(compare)

    return (
        <div>
            <br />
            {/* Creating table with Exercise, Description, and Notes attributes: */}
            <table class = "table table-hover table-bordered table-morecondensed" style={{height: "auto"}}>
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Description</th>
                        <th>Notes</th>
                        <th></th>
                    </tr>
                </thead>
                {/* The body of the table: */}
                <tbody>
                    {exercises.map((exercise) => (
                        <tr style={{paddingBottom:'0px'}}>
                            <td className = "tablentry">{exercise.name}</td>
                            <td>{ReactHtmlParser(exercise.description)}</td>
                            <td>{ReactHtmlParser(exercise.notes)}</td>
                            <td>
                                {/* Creating "Update" button: */}
                                <div>
                                    <button
                                        type="button"
                                        class="btn btn-primary btn-block"
                                        data-toggle="modal"
                                        style={{marginBottom: '0px'}}
                                        data-target={
                                            "#updateExercise" + exercise._id
                                        }
                                    >
                                        Update
                                    </button>
                                </div>
                                {/* After clicking "Update" button, a small window pops up: */}                                            
                                <div
                                    class="modal fade"
                                    id={"updateExercise" + exercise._id}
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5
                                                    class="modal-title"
                                                    id="exampleModalLabel"
                                                >
                                                    Update Exercise
                                                </h5>
                                                <button
                                                    type="button"
                                                    class="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                >
                                                    <span aria-hidden="true">
                                                        &times;
                                                    </span>
                                                </button>
                                            </div>
                                            <form
                                                action={
                                                    "/exercises/put/" +
                                                    exercise._id
                                                }
                                                method="POST"
                                                class="mb-4"
                                            >
                                                {/* Adding two attributes to pop up window: */}
                                                <div class="modal-body">
                                                    <br />
                                                    {/* Adding "Description" attribute to pop up window: */}
                                                    <div class="form-group">
                                                        <label for="description">
                                                            Description
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="description"
                                                            defaultValue={
                                                                exercise.description
                                                            }
                                                            class="form-control"
                                                        />
                                                    </div>
                                                    <br />
                                                    {/* Adding "Notes" attribute to pop up window: */}
                                                    <div class="form-group">
                                                        <label for="notes">
                                                            Notes
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="notes"
                                                            defaultValue={
                                                                exercise.notes
                                                            }
                                                            class="form-control"
                                                        />
                                                    </div>
                                                    <br />
                                                </div>
                                                {/* Adding "Close" button to bottom of pop up window: */}
                                                <div class="modal-footer">
                                                    <button
                                                        type="button"
                                                        class="btn btn-secondary"
                                                        data-dismiss="modal"
                                                    >
                                                        Close
                                                    </button>
                                                    {/* Adding "Update Exercise" input-submit-type button to bottom of pop up window: */}
                                                    <input
                                                        type="submit"
                                                        value="Update Exercise"
                                                        class="btn btn-primary btn-block"
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <form
                                    action={"/exercises/delete/" + exercise._id}
                                    method="POST"
                                    class="mb-4"
                                >
                                    <input
                                        type="submit"
                                        value="Delete"
                                        class="btn btn-primary btn-block"
                                        style = {{marginTop:'0px',marginBottom:'0px'}}
                                    />
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}