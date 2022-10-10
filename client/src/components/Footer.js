import Container from "react-bootstrap/Container";

export default function Footer() {
    return (
        <Container>
            <div className="footer" style={{ marginTop: '-100px', clear: 'both', bottom: 0 }}>
                App developed for CS148 S21. Check out the source code{" "}
                <a href="https://github.com/ucsb-cs148-f21/project-t03-fitnessguru">
                    here
                </a>
                .
            </div>
        </Container>
    );
}
