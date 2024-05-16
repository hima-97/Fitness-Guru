// The Footer.js file in the Fitness Guru application defines the Footer component, which serves as a consistent footer across all pages, offering navigational aid and crediting the source code.

// **Imports**
// It imports:
// - **Container Component:** From "react-bootstrap" to provide a responsive fixed-width container for the footer content.

// **Footer Component**
// A static component that:
// - Utilizes a `Container` from "react-bootstrap" to align and wrap the footer content.
// - Contains a div with className "footer", styled to position it at the bottom of the web page using inline CSS styles:
//   - `marginTop`: "-100px" to adjust the vertical spacing.
//   - `clear`: "both" to prevent adjacent elements from floating next to the footer.
//   - `bottom`: "0" to ensure it sticks at the bottom.
// - Displays a message "Fitness Guru - Check out the source code here." and includes an anchor tag linking to the GitHub repository.

// **CSS Styling**
// - The footer uses inline CSS for positioning to ensure it remains visible at the bottom of the page without overlapping other content.
// - The `.footer` class may include additional styles defined in an external CSS file for aesthetic adjustments.

// **Return Statement:**
// - Renders the footer inside a `Container`, which itself contains the text message and a hyperlink to the GitHub project page, ensuring the footer remains consistent across all pages.

// **Summary**
// - **Static Content Display:**
//   - Displays a fixed message about the application.
//   - Provides a hyperlink to the project's source code on GitHub.
// - **CSS Styling:**
//   - Uses inline CSS for positioning and additional CSS for styling to ensure the footer remains fixed at the bottom and does not overlap with other content.

// Example Usage:

// <Footer />




// Importing the Container component from react-bootstrap, which is used for responsive alignment and spacing.
import Container from "react-bootstrap/Container";

// Defining the Footer component as a functional component.
export default function Footer() {
    // Returning JSX to render the component.
    return (
        // The Container component from react-bootstrap is used here to provide a responsive fixed-width container.
        <Container>
            {/* The 'div' element with a class 'footer' is used to contain the footer content.
                 Inline CSS styles are applied directly to this 'div':
                 - marginTop: '-100px' pushes the footer up by 100px, which can be useful for visual alignment in some designs.
                 - clear: 'both' is used to prevent floating elements from affecting the positioning of the footer.
                 - bottom: 0 ensures that the footer stays at the bottom of its container. */}
            <div className="footer" style={{ marginTop: '-100px', clear: 'both', bottom: 0 }}>
                {/* Static text displaying the application name and an invitation to check the source code. */}
                Fitness Guru - Check out the source code{" "}
                {/* A hyperlink ('a' tag) to the project's GitHub repository allows users to access and review the source code. 
                     The href attribute specifies the URL of the page the link goes to. */}
                <a href="https://github.com/hima-97/Fitness-Guru">
                    here
                </a>
                .
            </div>
        </Container>
    );
}

