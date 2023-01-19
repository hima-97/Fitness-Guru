// The code above creates a React component called "MyWeights". 
// This component is a functional component that is rendered when the user navigates to the "MyWeights" page.
// The first line, import React from "react"; imports the React library. 
// The next line, import Container from "react-bootstrap/Container"; imports the Container component from the react-bootstrap library. 
// This component is used to center the contents of the page.
// The next line, import getUser from "../utils/get-user"; imports the getUser function from the "../utils/get-user" file. 
// This function is used to get the current user's information, such as the user's name and ID.
// The next line, import Layout from "../components/Layout"; imports the Layout component from the "../components/Layout" file. 
// This component is used to add a consistent layout to all pages in the application.
// The next line, import TrackedExercises from "../components/TrackedExercises"; imports the TrackedExercises component from the "../components/TrackedExercises" file. 
// This component is used to display the user's tracked exercises.
// The MyWeights component itself is a functional component that returns a JSX element when rendered. 
// It is wrapped by the Layout component which provides a consistent layout to all pages. 
// Inside this component, there is a Container component that centers the contents of the page.
// The TrackedExercises component is rendered

import React from "react";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import Layout from "../components/Layout";
import TrackedExercises from "../components/TrackedExercises";

export default function MyWeights() {
    const user = getUser();

    return (
        <Layout user={user}>
            <Container>
                <TrackedExercises />
            </Container>
        </Layout>
    );
}
