// This is a React functional component called "ProfilePicChanger".
// The component uses the React hooks 'useState' and 'useEffect' to track the state of the user's profile and fetch the user's information from the server.
// The 'useState' hook is used to set the initial value of the 'profile' state to an empty object, and the 'setProfile' function is used to update the 'profile' state. 
// The 'useEffect' hook is used to fetch the user's information from the server using the user's id and then updating the 'profile' state with the received user information.
// The component returns a button that when clicked, opens a modal window that allows the user to update the profile picture. 
// The modal window is created using Bootstrap classes, and it contains a form that allows the user to input a new profile picture by entering a text. 
// The form makes a POST request to the '/user' route and passes the user's googleId and the new profile picture as parameters.
// When the modal window is closed, the component logs the current 'profile' state to the console and also checks if the object 'profile' is empty or not. 
// If the object is empty, the modal window is not rendered, otherwise it will be rendered.
// It also includes a close button at the bottom of the modal window.

import React, { useState, useEffect } from "react";
import getUser from "../utils/get-user";
import "./contai.css";
export default function ProfilePicChanger() {
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
                <button
                    type="button"
                    class="btn btn-primary btn-block"
                    data-toggle="modal"
                    data-target="#updateProfilePic"
                    className="bt"
                >
                    Change Profile Picture
                </button>
            </div>
            {console.log(profile)}
            {Object.keys(profile).length === 0 ? (
                <div>
                    <div
                        class="modal fade"
                        id="updateProfilePic"
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
                                        Update Profile Picture
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
                                            <label for="Profile Picture">
                                                Profile Picture
                                            </label>
                                            <input
                                                type="text"
                                                name="ProfilePic"
                                                class="form-control"
                                            />
                                        </div>
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
                    <p>
                                <img
                                    src={profile.profilePic}
                                    alt=""
                                    style={{
                                        width: 200,
                                        height: 200,
                                        borderRadius: 100,
                                        position: 'relative',
                                        top: -100,
                                        left: 600
                                    }}
                                />
                            </p>
                </div>
            ) : (
                <div>
                    {profile.map((profile) => (
                        <div>
                            <div
                                class="modal fade"
                                id="updateProfilePic"
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
                                                Update Profile Picture
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
                                                    <label for="Profile Picture">
                                                        Enter link to profile
                                                        picture:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="profilePic"
                                                        defaultValue={
                                                            profile.profilePic
                                                        }
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
                            <p>
                                <img
                                    src={profile.profilePic}
                                    alt=""
                                    style={{
                                        width: 200,
                                        height: 200,
                                        borderRadius: 100,
                                        position: 'relative',
                                        top: -100,
                                        left: 600
                                    }}
                                />
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
