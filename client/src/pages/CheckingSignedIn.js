// The code creates a React functional component called 'CheckingSignedIn'. 
// This component is responsible for checking whether a user is signed in or not.
// It first imports the 'React' library, followed by 'Spinner' and 'styled' from 'react-bootstrap' and 'styled-components' library respectively. 
// It then imports 'Navbar' and 'Container' from 'react-bootstrap'
// The component creates a div element with the class 'CheckingSignedInWrapper' which is styled using the 'styled' method of the 'styled-components' library. 
// The styling sets the height, width and alignment of the div to center both horizontally and vertically, and gives it a light gray background color.
// Then, it returns JSX elements to be rendered on the browser. The JSX includes a 'Navbar' element that renders a navbar with a brand name 'Fitness Guru' and a link to the homepage. 
// Inside the 'CheckingSignedInWrapper' element, it includes a 'Spinner' element that animates with the 'border' animation type and the role status is set to 'status'. 
// The spinner is used to indicate that the app is checking if the user is signed in or not.

import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const CheckingSignedInWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
`;

export default function CheckingSignedIn() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Fitness Guru</Navbar.Brand>
                </Container>
            </Navbar>
            <CheckingSignedInWrapper>
                <Spinner animation="border" role="status" />
            </CheckingSignedInWrapper>
        </>
    );
}
