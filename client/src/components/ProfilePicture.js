// The ProfilePicture.js file in the Fitness Guru application defines the ProfilePicture component, which enhances user engagement by allowing users to update their profile picture through an interactive modal interface.

// **Imports**
// It imports:
// - **React and Hooks:** For managing component state and lifecycle.
// - **Bootstrap Components:** Utilized for the modal and form UI, ensuring a responsive and accessible design.
// - **Axios or fetch API:** For making HTTP requests to fetch and update the user's profile picture.

// **ProfilePicture Component**
// A functional component that:
// - Uses `useState` to manage the state of the current profile picture and the new URL entered by the user.
// - Uses `useEffect` to fetch the current profile picture from the server when the component mounts.
// - **Dynamic User Interaction:**
//   - Displays the current profile picture if available.
//   - Includes a button that triggers a modal, allowing users to input a new URL for their profile picture.
// - **Fetching and Updating User Data:**
//   - Fetches the user's current profile picture URL upon component mount.
//   - Submits updated profile data to the server when the user submits a new picture URL through the modal.

// **Return Statement:**
// - Renders the current profile picture.
// - Includes a 'Change Picture' button that opens the modal.
// - The modal contains a form where users can submit a new URL for their profile picture.

// **CSS Styling:**
// - Ensures the profile picture is styled appropriately, possibly using an external CSS file to align with the overall application aesthetics.

// **Key Features and Functionality**
// - **Interactive Profile Picture Update:** Provides a modal interface for users to update their profile picture, enhancing user interaction.
// - **Dynamic User Data Interaction:** Actively fetches and updates the user's profile picture, keeping the user's data dynamic and current.
// - **Responsive and Accessible UI:** Utilizes Bootstrap components to ensure the modal and form are easy to use and accessible across various devices.

// Example Usage:

// <ProfilePicture user={currentUser} />




import React, { useState, useEffect } from "react";
import getUser from "../utils/get-user";  // Import utility to fetch current user data
import "./contai.css";  // Importing CSS for styling

export default function ProfilePicChanger() {
    const [profile, setProfile] = useState({}); // State to hold profile data
    const user = getUser(); // Get current user's information

    // Fetch user profile from the server when the component mounts or user id changes
    useEffect(() => {
        fetch(`/user/${user.id}`) // API call to fetch profile data
            .then((res) => res.json()) // Parsing the response to JSON
            .then((user) => setProfile(user)); // Updating the profile state with fetched data
    }, [user.id]); // Dependency array to re-run the effect when user.id changes

    return (
        <div>
            <div>
                {/* Button to trigger modal for changing profile picture */}
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
            {/* Logging the profile data for debugging */}
            {console.log(profile)}
            {/* Conditional rendering based on profile data availability */}
            {Object.keys(profile).length === 0 ? (
                <div>
                    {/* Modal dialog for updating profile picture */}
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
                                    {/* Button to close the modal */}
                                    <button
                                        type="button"
                                        class="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                {/* Form to submit new profile picture */}
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
                                        {/* Button to close the modal */}
                                        <button
                                            type="button"
                                            class="btn btn-secondary"
                                            data-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        {/* Button to submit the form */}
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
                    {/* Display current profile picture */}
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
                    {/* Mapping over profile data if available */}
                    {profile.map((profile) => (
                        <div>
                            {/* Similar modal setup for each profile */}
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
                            {/* Display the updated profile picture */}
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
