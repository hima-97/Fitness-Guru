// This file is used for the "Profile" component

import React, { useState, useEffect } from "react";
import getUser from "../utils/get-user";
import "./contai.css";
import {Button} from "react-bootstrap";


export default function Exercise() {
    // It defines the component's state with the useState hook, setting the initial value of the "profile" state to an empty object:
    // The React "useState" hook allows you to track state in a function component
    // State generally refers to data or properties that need to be tracked in an application
    const [profile, setProfile] = useState({});

    // Getting current logged-in user:
    const user = getUser();

    // useEffect hook to fetch the user's profile data from the server when the component is rendered, using the user's ID as a parameter:
    // The response is parsed as JSON and the user's profile is set as the component's state
    // (i.e. "useEffect" hook to fetch the user's profile information from an endpoint, /user/${user.id}, and update the state with the fetched data)
    useEffect(() => {
        fetch(`/user/${user.id}`)
            .then((res) => res.json())
            .then((user) => setProfile(user));
    }, [user.id]);

    // The return statement of the component is rendering the layout of the profile page, including a button labeled "Update Profile" which opens a bootstrap modal window when clicked.
    // The modal window contains a form with several input fields for updating the user's profile information, such as date of birth, height, and weight. 
    // Each input field is associated with a specific label, and the form is set to submit to the endpoint /user using the POST method. 
    // The form also includes a hidden input field with the user's googleId, which is pre-populated with the value of user.id obtained from the getUser function.
    // The console.log(profile) is only for debugging purpose to check the profile state.
    // The ternary operator (i.e. ':' ) checks whether the profile object is empty or not. If it's empty, the modal will not be rendered.
    // Once the form is filled and submitted, the user's profile information will be updated in the database.
    return (
        <div>
            <div>
                {/* Displaying "Update Profile" button: */}
                <button
                    type="button"
                    class="btn btn-primary btn-block"
                    data-toggle="modal"
                    data-target="#updateProfile"
                    class1 = "btn btn-outline-info"
                    className = "bt2"
                >
                    Update Profile
                </button>
            </div>
            {console.log(profile)}
            {Object.keys(profile).length === 0 ? (
                <div>
                    <div
                        class="modal fade"
                        id="updateProfile"
                        tabIndex="-1"
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
                                        Update Profile
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
                                <form action="/user" method="POST" class="mb-4">
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <input
                                                type="hidden"
                                                name="googleId"
                                                value={user.id}
                                                class="form-control"
                                            />
                                        </div>
                                        <br />
                                        <div class="form-group">
                                            <label for="dateOfBirth">
                                                Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                class="form-control"
                                            />
                                        </div>
                                        <br />
                                        <div class="form-group">
                                            <label for="heightFeet">
                                                Height (Feet)
                                            </label>
                                            <input
                                                type="number"
                                                name="heightFeet"
                                                class="form-control"
                                            />
                                        </div>
                                        <br />
                                        <div class="form-group">
                                            <label for="heightInches">
                                                Height (Inches)
                                            </label>
                                            <input
                                                type="number"
                                                name="heightInches"
                                                class="form-control"
                                            />
                                        </div>
                                        <br />
                                        <div class="form-group">
                                            <label for="weight">
                                                Weight (Pounds)
                                            </label>
                                            <input
                                                type="number"
                                                name="weight"
                                                class="form-control"
                                            />
                                        </div>
                                        <br />
                                        <div class="form-group">
                                            <label for="notes">Notes</label>
                                            <input
                                                type="text"
                                                name="notes"
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
                                            value="Update Profile"
                                            class="btn btn-primary btn-block"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {/* After clicking "Update Profile" button, a small window pops up: */}
                    {profile.map((profile) => (
                        <div>
                            <div
                                class="modal fade"
                                id="updateProfile"
                                tabIndex="-1"
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
                                                Update Profile
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
                                            action={"/user/put/" + user.id}
                                            method="POST"
                                            class="mb-4"
                                        >
                                            <div class="modal-body">
                                                <br />
                                                <div class="form-group">
                                                    <label for="dateOfBirth">
                                                        Date of Birth
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="dateOfBirth"
                                                        defaultValue={
                                                            profile.dateOfBirth
                                                        }
                                                        class="form-control"
                                                    />
                                                </div>
                                                <br />
                                                <div class="form-group">
                                                    <label for="heightFeet">
                                                        Height (Feet)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="heightFeet"
                                                        defaultValue={
                                                            profile.heightFeet
                                                        }
                                                        class="form-control"
                                                    />
                                                </div>
                                                <br />
                                                <div class="form-group">
                                                    <label for="heightInches">
                                                        Height (Inches)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="heightInches"
                                                        defaultValue={
                                                            profile.heightInches
                                                        }
                                                        class="form-control"
                                                    />
                                                </div>
                                                <br />
                                                <div class="form-group">
                                                    <label for="weight">
                                                        Weight (Pounds)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="weight"
                                                        defaultValue={
                                                            profile.weight
                                                        }
                                                        class="form-control"
                                                    />
                                                </div>
                                                <br />
                                                <div class="form-group">
                                                    <label for="notes">
                                                        Notes
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="notes"
                                                        defaultValue={
                                                            profile.notes
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
                                                {/* Adding "Update Profile" input-submit-type button to bottom of pop up window: */}
                                                <input
                                                    type="submit"
                                                    value="Update Profile"
                                                    class="btn btn-primary btn-block"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <br />
                            {/* Text card for "Profile" with different attributes: */}
                            <div className = "inf">
                                <div class = "card text-center biggercard">
                            <ul class = "list-group list-group-flush">
                                <li class = "list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    {" "}
                                    <h6 class = "mb-0"> Name: </h6> <span class = "text-secondary">{user.fullName}{" "} </span>
                                </li>
                                <br />
                                <li  class = "list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    {" "}
                                    <h6 class = "mb-0"> Date of Birth: </h6>{" "}
                                    <span class = "text-secondary">{profile.dateOfBirth}{" "} </span>
                                </li>
                                <br />
                                <li  class = "list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    {" "}
                                    <h6 class = "mb-0"> Height: </h6> <span class = "text-secondary">{profile.heightFeet} Feet{" "}
                                    {profile.heightInches} Inches{" "} </span>
                                </li>
                                <br />
                                <li class = "list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    {" "}
                                    <h6 class = "mb-0"> Weight: </h6> <span class = "text-secondary"> {profile.weight} Pounds </span>
                                </li>
                                <br />
                                <li class = "list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    {" "}
                                    <h6 class = "mb-0"> Notes: </h6> <span class = "text-secondary"> {profile.notes}{" "} </span>
                                </li>
                                <br />
                                <li class = "list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    {" "}
                                    <h6 class = "mb-0"> Joined: </h6>{" "}
                                    <span class = "text-secondary"> {profile.createdAt.split("T").at(0)}{" "} </span>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
