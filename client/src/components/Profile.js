// The Profile.js file in the Fitness Guru application defines the Profile component, which is responsible for displaying and updating the user's profile information. This component is designed to be interactive, user-friendly, and accessible.

// **Imports**
// It imports:
// - **React and Hooks:** For managing state and side effects within the component.
// - **getUser:** Utility function to fetch user details.
// - **React-Bootstrap Components:** Button and others for creating interactive and responsive UI elements.
// - **CSS:** 'contai.css' for custom styling.

// **Profile Component**
// A functional component that:
// - Uses `useState` and `useEffect` to manage and fetch user profile data.
// - **Dynamic Profile Display:**
//   - Fetches user-specific profile details such as date of birth, height, weight, and custom notes.
//   - Displays these details dynamically in a well-organized format.
// - **Interactive Update Mechanism:**
//   - Incorporates a modal which is triggered by a 'Update Profile' button.
//   - The modal provides form inputs for updating user details.
//   - Submits the updated data to the server via a POST request, ensuring the profile is up-to-date.
// - **Responsive and Accessible Design:**
//   - Uses React-Bootstrap components to ensure the UI is accessible and responsive, adapting to different device screens.
//   - Renders profile information in a clear layout, using buttons and form controls that are easy to interact with.

// **Return Statement:**
// - Renders user profile details in a structured layout.
// - Includes an 'Update Profile' button that opens the modal for editing profile details.
// - Uses a modal for form inputs where users can enter their updated information.

// **CSS Styling:**
// - Utilizes 'contai.css' for styling, ensuring that the profile display is visually appealing and consistent with the overall application design.

// **Key Features and Functionality**
// - **Dynamic Profile Display:** Automatically fetches and displays the current user's profile data.
// - **Interactive Update Mechanism:** Offers an easy-to-use interface for users to update their profile details.
// - **Responsive and Accessible Design:** Ensures that the component is usable on a variety of devices and accessible to all users.

// Example Usage:

// <Profile />


// Imports necessary libraries and styles
import React, { useState, useEffect } from "react";
import getUser from "../utils/get-user";
import "./contai.css";
import { Button } from "react-bootstrap";

// Defines the Profile component that displays and updates user profile information
export default function Profile() {
    // Initializes profile state as an empty object
    const [profile, setProfile] = useState({});

    // Retrieves current logged-in user's details
    const user = getUser();

    // Fetches the user's profile data from the server when the component mounts or when the user's ID changes
    useEffect(() => {
        fetch(`/user/${user.id}`)
            .then((res) => res.json())
            .then((user) => setProfile(user));
    }, [user.id]);

    // Renders the profile page layout, including a button to open a modal for updating profile details
    return (
        <div>
            {/* Button triggers the modal for updating profile information */}
            <button
                type="button"
                className="btn btn-primary btn-block"
                data-toggle="modal"
                data-target="#updateProfile"
            >
                Update Profile
            </button>
            {console.log(profile)}
            {Object.keys(profile).length === 0 ? (
                // Displays a modal window if the profile data is available
                <div>
                    <div
                        className="modal fade"
                        id="updateProfile"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Update Profile
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                {/* Form for updating profile details */}
                                <form action="/user" method="POST" className="mb-4">
                                    <div className="modal-body">
                                        <input
                                            type="hidden"
                                            name="googleId"
                                            value={user.id}
                                            className="form-control"
                                        />
                                        {/* Input fields for profile details */}
                                        <div className="form-group">
                                            <label htmlFor="dateOfBirth">Date of Birth</label>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="heightFeet">Height (Feet)</label>
                                            <input
                                                type="number"
                                                name="heightFeet"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="heightInches">Height (Inches)</label>
                                            <input
                                                type="number"
                                                name="heightInches"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="weight">Weight (Pounds)</label>
                                            <input
                                                type="number"
                                                name="weight"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="notes">Notes</label>
                                            <input
                                                type="text"
                                                name="notes"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <input
                                            type="submit"
                                            value="Update Profile"
                                            className="btn btn-primary btn-block"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {/* If the profile object is not empty, display the modal and mapped profile details */}
                    {profile.map((profile) => (
                        <div>
                            <div
                                className="modal fade"
                                id="updateProfile"
                                tabIndex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">
                                                Update Profile
                                            </h5>
                                            <button
                                                type="button"
                                                className="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form
                                            action={"/user/put/" + user.id}
                                            method="POST"
                                            className="mb-4"
                                        >
                                            <div className="modal-body">
                                                <div className="form-group">
                                                    <label htmlFor="dateOfBirth">Date of Birth</label>
                                                    <input
                                                        type="date"
                                                        name="dateOfBirth"
                                                        defaultValue={profile.dateOfBirth}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="heightFeet">Height (Feet)</label>
                                                    <input
                                                        type="number"
                                                        name="heightFeet"
                                                        defaultValue={profile.heightFeet}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="heightInches">Height (Inches)</label>
                                                    <input
                                                        type="number"
                                                        name="heightInches"
                                                        defaultValue={profile.heightInches}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="weight">Weight (Pounds)</label>
                                                    <input
                                                        type="number"
                                                        name="weight"
                                                        defaultValue={profile.weight}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="notes">Notes</label>
                                                    <input
                                                        type="text"
                                                        name="notes"
                                                        defaultValue={profile.notes}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    data-dismiss="modal"
                                                >
                                                    Close
                                                </button>
                                                <input
                                                    type="submit"
                                                    value="Update Profile"
                                                    className="btn btn-primary btn-block"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
