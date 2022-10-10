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
