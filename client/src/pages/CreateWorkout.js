// The 'CreateWorkout.js' file is a functional React component that serves as the page for creating new workouts. 
// It starts by importing the necessary modules from React and other libraries.
// The first line imports the React library so that JSX can be used in the component. 
// The next line imports the Container component from the 'react-bootstrap' library which is used for layout and positioning of elements on the page.
// The next line imports the 'getUser' function from the '../utils/get-user' file. 
// This function is used to get the current user from the server and will be used to display the user's information on the page.
// The last line imports the 'Layout' component from the '../components/Layout' file. 
// This component serves as the base layout for the page and is used to wrap the content of the page.
// The component is defined as a functional component that returns JSX. The component is wrapped in the 'Layout' component imported earlier and passed the user object as a prop. 
// Then, it renders a container and a header element with the text "This is the Create Workout page."
// When this component is rendered by the browser, it will display a header that says "This is the Create Workout page." and the layout of the page is determined by the Layout component. 
// The user object is passed as a prop to the Layout component, but not used in this specific component.

import React from "react";
import Container from "react-bootstrap/Container";

import getUser from "../utils/get-user";
import Layout from "../components/Layout";

export default function CreateWorkout() {
    const user = getUser();

    return (
        <Layout user={user}>
            <Container>
                <h1>This is the Create Workout page.</h1>
            </Container>
        </Layout>
    );
}
