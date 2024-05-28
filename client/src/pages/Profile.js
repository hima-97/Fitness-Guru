// The Profile.js file in the Fitness Guru application defines a React component called Profile, which serves as the central hub for displaying and managing user profile information. This component orchestrates various functionalities to provide a comprehensive profile management experience.

// **Imports**
// It imports:
// - **React:** Main library for building the user interface.
// - **Layout:** Component from '../components/Layout' for a consistent layout across the application.
// - **ProfilePicComponent:** Handles the display and updating of the user's profile picture.
// - **ProfileComponent:** Manages the display and updates of user profile details like name, date of birth, etc.
// - **getUser:** Utility function from '../utils/get-user', for fetching current user data.
// - **contai.css:** Stylesheet for custom styling of the profile page elements.

// **Profile Component**
// A functional component that:
// - Uses 'getUser' to fetch the current user's information and assigns it to a variable 'user'.
// - Renders the JSX within the 'Layout' component to maintain a consistent structure with the rest of the application.
// - Includes an 'h1' tag with class 'welcome' that may display a welcome message.
// - Features a 'div' with class 'c', which serves as a container for profile elements:
//   - An 'h' tag with class 'prof' that contains the 'ProfilePicComponent', facilitating the display and update of the user's profile picture.
//   - Another 'h' tag with class 'av' that contains the 'ProfileComponent', which is responsible for displaying and updating the user's personal details.

// **Key Features and Functionality**
// - **Integration of Profile Components:**
//   - Utilizes 'ProfilePicComponent' for interactive management of the user's profile picture.
//   - Incorporates 'ProfileComponent' for detailed display and management of personal profile details, offering update functionalities.
// - **User Authentication:**
//   - Fetches authenticated user information using 'getUser', ensuring that the displayed profile is accurate and specific to the logged-in user.

// **Return Statement:**
// - The component returns JSX that structures the profile page with logical division and styling, wrapped inside the 'Layout' component for consistency across the application.

// **CSS Styling:**
// - Uses 'contai.css' for custom styling, ensuring that the profile page is visually appealing and aligns with the overall design of the application.

// **Example Usage:**

// <Profile />



// Importing necessary React and Bootstrap components
import React from "react";
import Container from "react-bootstrap/Container";  // Importing Container component from react-bootstrap for layout purposes
import Button from "react-bootstrap/Button";       // Button component for any buttons that might be needed (not used in this specific block)
import getUser from "../utils/get-user";           // Utility function to fetch the currently logged-in user's data
import Layout from "../components/Layout";         // Layout component that wraps around the page content for consistent styling
import ProfileComponent from "../components/Profile";   // Component that displays and allows updates to the user's profile data
import ProfilePicComponent from "../components/ProfilePicture"; // Component that handles the display and update of the user's profile picture
import "../components/contai.css";                 // Importing CSS styles for additional styling needs

// Definition of the Profile functional component
export default function Profile() {
    const user = getUser();  // Retrieving the current user's data

    // Render method of the Profile component, which returns JSX to be displayed on the page
    return (
        <Layout user={user}>  // Using the Layout component to ensure consistent layout across the site. It also passes the user data down to Layout for any user-specific render logic.
            <h1 className="welcome">
                {/* This could potentially display a welcome message or remain empty for design reasons */}
            </h1>
            <div className="c">  // Container div for profile picture section with a custom class for styling
                <h className="prof">  // Semantic HTML usage for headers, though not conventionally correct for a div container; intended for sectioning content
                    {/* Displaying "ProfilePicComponent" component which includes the profile picture and a button to update the picture */}
                    <ProfilePicComponent />
                </h>
            </div>
            <br />  // Break line for spacing purposes
            <h className="av">  // Another semantic header, similar usage as above, for sectioning the profile information component
                {/* Displaying "ProfileComponent" which handles the user's profile details like name, email, etc., and includes an update functionality */}
                <ProfileComponent />
            </h>
        </Layout>  // Closing tag for the Layout component
    );
}
