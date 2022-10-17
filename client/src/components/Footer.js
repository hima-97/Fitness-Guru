// This file is used for the "Footer" component

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
