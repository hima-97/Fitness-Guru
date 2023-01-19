// This file is used for the "Footer" component

// The component renders the footer of the web page. The component is using the "Container" component from the "react-bootstrap" library
// It includes a div element with a className "footer" to style the footer
// The div has a "marginTop" of "-100px" and "clear" and "bottom" properties set to 0, which positions it at the bottom of the web page
// The footer contains a message displaying "Fitness Guru - Check out the source code here." and an anchor tag linking to the Github repository
// The footer serves as a navigation aid for the user and to credit the source code for the project


import Container from "react-bootstrap/Container";

export default function Footer() {
    return (
        <Container>
            <div className="footer" style={{ marginTop: '-100px', clear: 'both', bottom: 0 }}>
                {/* Displaying message in the page footer (i.e. bottom of web page): */}
                Fitness Guru - Check out the source code{" "}
                <a href="https://github.com/hima-97/Fitness-Guru">
                    here
                </a>
                .
            </div>
        </Container>
    );
}
