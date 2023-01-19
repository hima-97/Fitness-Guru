// The Private.js file is a functional component that renders a 'This page is private!' message on the screen. 
// It imports React, Container from react-bootstrap, getUser from a utils file, and Layout.
// When the component is rendered, it calls the getUser function to check if the user is logged in. 
// If the user is logged in, it will render the Layout component and pass the user object as a prop. 
// Inside the Layout component, it will render a Container component from react-bootstrap and inside of that, 
// it will render an H1 element with the text "This page is private!" and a div with the text "(meaning you have to login to view the page)". 
// This page is used to let the user know when they have accessed a page that is intended for logged in users only, and they need to login to access it.

import React from "react";
import Container from "react-bootstrap/Container";

import getUser from "../utils/get-user";
import Layout from "../components/Layout";

export default function Login() {
    const user = getUser();

    return (
        <Layout user={user}>
            <Container>
                <h1>This page is private!</h1>
                <div>(meaning you have to login to view the page)</div>
                <br />
            </Container>
        </Layout>
    );
}
