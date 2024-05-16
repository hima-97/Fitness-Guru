// The Layout.js file in the Fitness Guru application defines the Layout component, which is essential for providing a consistent structure to the web application by including navigation, main content, and footer elements on each page.

// **Imports**
// It imports:
// - **NavBar Component:** Manages the navigation bar.
// - **Footer Component:** Manages the footer of the page.
// - **React:** Main library for building user interfaces.

// **Layout Component**
// A functional component that:
// - Receives `props` as an argument, which includes any children components and user data.
// - Utilizes the `NavBar` component to create a dynamic navigation bar based on the user's login status. The `user` object is passed to `NavBar` to display different links or options depending on whether the user is logged in.
// - Renders `props.children`, which contain the page-specific content. This allows the Layout component to act as a wrapper for other components, enabling a consistent structure across all pages.
// - Includes the `Footer` component at the bottom of the layout to provide a consistent footer across all pages.

// **Key Features and Functionality**
// - **Structural Consistency:**
//   - Ensures every page has a uniform appearance by consistently including a navigation bar at the top, main content in the center, and a footer at the bottom.
// - **Content Isolation:**
//   - Places the page-specific content (`props.children`) within a div, ensuring it is well-separated from the navigation bar and footer, thus maintaining clean layout boundaries and enhancing UI aesthetics.

// **Return Statement:**
// - Renders the `NavBar` at the top.
// - Displays `props.children` within a central div to ensure content is appropriately sectioned off from the navigation and footer.
// - Concludes with the `Footer` component, which includes a hyperlink to the source code, styled with the message "Fitness Guru - Check out the source code here."

// **CSS Styling:**
// - The layout might include additional CSS for margins, paddings, and other styling considerations to ensure visual appeal and functional spacing between the structural elements.

// Example Usage:

// <Layout user={user}>
//   <HomePage />
// </Layout>

// Importing the NavBar and Footer components from their respective files.
// These components will be used to consistently display the navigation bar and footer across all pages.
import NavBar from "./NavBar";
import Footer from "./Footer";

// Defining the Layout component which acts as the main structure for pages in the application.
// It receives props from its parent component, which can include any additional data or children components.
export default function Layout(props) {
    // Extracting the user object from props. This user information is typically passed down from a higher-level component like App.
    // It is used here to provide user-specific information to the NavBar component.
    const user = props.user;

    // Returning the JSX for the Layout component.
    // This JSX code outlines the structure of the layout including the NavBar, a content area, and the Footer.
    return (
        <div>
            {/* Inserting the NavBar component at the top of the layout and passing the user prop to it.
               This allows the NavBar to display user-specific content, such as the user's name or profile actions. */}
            <NavBar user={user} />

            {/* Defining a div to act as the content area between the NavBar and Footer.
                 Inline styles are applied to ensure there is sufficient spacing and that the content area does not overlap with the footer.
                 - minHeight: Ensures that the content area has a minimum height to maintain layout consistency even if there's little or no content.
                 - marginBottom: Provides a buffer space below the content area before the footer starts, preventing any visual clutter.
                 - clear: 'both' is used to clear floated elements within the content area to maintain layout integrity. */}
            <div style={{minHeight: '150px', marginBottom: '100px', clear: 'both'}}>
                {/* Inserting children components passed into the Layout. This allows the Layout component to be highly reusable and adapt to different page contents.
                   `props.children` represents any child elements or components included between the Layout tags from the parent component. */}
                {props.children}
            </div>

            {/* Inserting the Footer component at the bottom of the layout to provide a consistent footer across all pages. */}
            <Footer />
        </div>
    );
}

