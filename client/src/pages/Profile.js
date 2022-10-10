import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import getUser from "../utils/get-user";
import Layout from "../components/Layout";
import ProfileComponent from "../components/Profile";
import ProfilePicComponent from "../components/ProfilePicture";
import "../components/contai.css";
export default function Profile() {
    const user = getUser();

    return (
        <Layout user={user}>
            <h1 className="welcome">
            </h1>
            <div className="c">
                <h className="prof">
                    <ProfilePicComponent />
                </h>
            </div>
            <br />
            <h className="av">
                <ProfileComponent />
            </h>
        </Layout>
    );
}
