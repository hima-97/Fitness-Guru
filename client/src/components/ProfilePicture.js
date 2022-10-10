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
