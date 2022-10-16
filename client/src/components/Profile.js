import React, { useState, useEffect } from "react";
import getUser from "../utils/get-user";
import "./contai.css";
import {Button} from "react-bootstrap";
export default function Exercise() {
    const [profile, setProfile] = useState({});

    const user = getUser();

    useEffect(() => {
        fetch(`/user/${user.id}`)
            .then((res) => res.json())
            .then((user) => setProfile(user));
    }, [user.id]);

    return (
        <div>
            <div>
                {/* Displaying "Update Profile" button: */}
                <button
                    type="button"
                    class="btn btn-primary btn-block"
                    data-toggle="modal"
                    data-target="#updateProfile"
                    class = "btn btn-outline-info"
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
