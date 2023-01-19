// This file defines a React component called "PublicSplits" which is rendered when the corresponding route is accessed.
// The component defines a functional component that returns JSX. 
// It retrieves the user data by calling the imported "getUser" function, and then renders the "Layout" component with the "user" prop passed to it. 
// Inside of the "Layout" component, it renders a "Container" component from "react-bootstrap" and inside of the container component, it renders the "PublicSplits" component which displays a list of public splits.


import React from "react";
import Container from "react-bootstrap/Container";

import getUser from "../utils/get-user";
import Layout from "../components/Layout";
import PublicSplits from "../components/PublicSplits";

export default function MyWeights() {
    const user = getUser();

    return (
        <Layout user={user}>
            <Container>
                <PublicSplits />
            </Container>
        </Layout>
    );
}
