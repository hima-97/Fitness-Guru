// The code is creating a React component called Home. 
// The component is being exported as the default export so that it can be imported and used in other parts of the application.
// The component is being rendered within a Layout component, which is imported from '../components/Layout' and passed the current user data as a prop.
// The component is rendering a Bootstrap Container component, which is a responsive container that centers its content horizontally.
// Within the Container component, the component is displaying a heading that welcomes the user to the Fitness Guru app. 
// The heading uses a ternary operator to check if the user is logged in or not, and if the user is logged in, then displays the users first name.
// It also displays a TextWrapper component that is a styled component. 
// The component is setting the width and max-width of the TextWrapper component to 700px and 100% respectively.
// The component is also displaying another message that also uses a ternary operator to check if the user is logged in or not. 
// If the user is logged in, the component is displaying a message that the user can now create custom workouts and track progress. 
// If the user is not logged in, the component is displaying a message to log in to start using the app.

import React from "react";
import Container from "react-bootstrap/Container";
import styled from "styled-components";

import getUser from "../utils/get-user";
import Layout from "../components/Layout";

const TextWrapper = styled.div`
    width: 700px;
    max-width: 100%;
`;

export default function Home() {
    const user = getUser();

    return (
        <Layout user={user}>
            <Container>
                <h1>
                    {user != null ? "Hello " + user.givenName + ", " : ""}
                    Welcome to Fitness Guru!
                </h1>
                <TextWrapper>
                    {user != null
                        ? "You can now create custom workouts and track your progress!"
                        : "Please log in to start using the app!"}
                </TextWrapper>
            </Container>
        </Layout>
    );
}
