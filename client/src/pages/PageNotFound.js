// The "PageNotFound.js" file is a functional component that is used to handle 404 errors. 
// When a user tries to access a page that does not exist, this component is rendered.
// The component first imports the "Container" component from the "react-bootstrap" library, and "Layout" component from the "../components/Layout" file.
// The component then defines the functional component "PageNotFound", which returns a JSX element that is rendered to the user when the component is called. 
// The returned element is wrapped in the "Layout" component and contains a "Container" component. 
// Inside the "Container" component, there is an "h1" element containing the text "This page was not found :(", indicating to the user that the page they attempted to access does not exist.

import Container from "react-bootstrap/Container";
import Layout from "../components/Layout";

export default function PageNotFound() {
    return (
        <Layout>
            <Container>
                <h1>This page was not found :(</h1>
            </Container>
        </Layout>
    );
}
