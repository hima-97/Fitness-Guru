// This code defines a React component called Profile that is responsible for rendering the profile page of the app. 
// This component imports a few other components and modules that it uses to render the page.
// The component then defines a function called Profile which will return JSX that will be rendered on the page. 
// In this function, it first calls the getUser() function and assigns the returned value to the user variable.
// It then returns JSX that is wrapped in the <Layout> component, which sets the layout for the page. 
// Within the layout, it has an h1 tag with a class of 'welcome' and an empty div with a class of 'c'. 
// Inside the 'c' div, it has an h tag with a class of 'prof' and another h tag with a class of 'av'. 
// Inside the 'prof' h tag, it renders the ProfilePicComponent component, which is responsible for rendering the profile picture and the update picture button. 
// Inside the 'av' h tag, it renders the ProfileComponent component, which is responsible for rendering the profile table and the update profile button.
// It also uses the 'contai.css' file to style the components.

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
                    {/* Displaying "ProfilePicComponent" component (i.e. profile picture + update picture button): */}
                    <ProfilePicComponent />
                </h>
            </div>
            <br />
            <h className="av">
                {/* Displaying "ProfileComponent" component (i.e. profile table + update profile button): */}
                <ProfileComponent />
            </h>
        </Layout>
    );
}
