// The App.js file in your React application serves as the main entry point and orchestrator for the entire front-end structure. This crucial component manages routing, user authentication, and component lifecycle for your application. Here's an in-depth explanation of its structure and key functionalities:

// **Overview of App.js**
// App.js is structured to handle the core functionalities of a Single Page Application (SPA) using React. It leverages React Router for navigation, Google authentication for user management, and environment variables for secure configuration.

// **Key Functionalities and Structure:**

// **1. React Router Setup:**
// - Utilizes `BrowserRouter` and `Switch` from `react-router-dom` to set up client-side routing.
// - Defines multiple `Route` components within `Switch` to handle different URLs, linking them to specific React components.

// **Code Example:**
// ```javascript
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// <Router>
//     <Switch>
//         <Route path="/" exact component={Home} />
//         <PrivateRoute path="/profile" component={Profile} />
//         <Route path="/login" component={Login} />
//     </Switch>
// </Router>
// ```

// **2. Dynamic Component Rendering:**
// - Implements conditional rendering based on the user's authentication status.
// - Uses a `PrivateRoute` component to wrap routes that require user authentication, checking if the user is signed in and redirecting to a login page if not.

// **3. Google Sign-in Integration:**
// - Handles user authentication using Google's API.
// - A function `initGoogleSignIn` initializes Google Auth2 with configurations and sets up event listeners for sign-in state changes.

// **4. Environment Variables:**
// - Manages sensitive information such as Google client ID through environment variables (`REACT_APP_AUTH_CLIENT_ID`), ensuring that these details are not exposed in the source code.

// **5. Route Management:**
// - Manages different application routes, ensuring each page/component has a specific path.
// - Protects routes requiring authentication with `PrivateRoute`, which checks the authentication status and redirects accordingly.

// **6. State Management for Authentication:**
// - Uses React's `useState` hook to maintain the authentication state (`isSignedIn`), which is crucial for conditional rendering and access control.

// **Code Example:**
// ```javascript
// import React, { useState, useEffect } from 'react';
// function App() {
//     const [isSignedIn, setIsSignedIn] = useState(false);

//     useEffect(() => {
//         // Initialize Google Sign-in and check authentication status
//         initGoogleSignIn();
//     }, []);

//     return (
//         <Router>
//             <Switch>
//                 <Route path="/" exact component={Home} />
//                 <PrivateRoute path="/profile" component={Profile} isAuthenticated={isSignedIn} />
//             </Switch>
//         </Router>
//     );
// }
// ```

// **Benefits:**
// - **Single Page Application (SPA) Benefits:** Provides a seamless user experience with fast, dynamic transitions between pages without reloading the entire application.
// - **Secure User Authentication:** Utilizes robust Google authentication to manage user sessions securely.
// - **Flexible and Secure Configuration:** Uses environment variables to configure application settings securely and flexibly.

// The `App.js` component is vital for coordinating the application's high-level behaviors, such as routing, user authentication, and content rendering, making it the backbone of your React application's architecture.


import React, { useState } from "react";
// Import routing components from react-router-dom to manage navigation between pages
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Importing various page components to be used in routing
import CheckingSignedIn from "./pages/CheckingSignedIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Private from "./pages/Private";
import MyWorkouts from "./pages/MyWorkouts";
import CreateWorkout from "./pages/CreateWorkout";
import PageNotFound from "./pages/PageNotFound";
import MyExercises from "./pages/MyExercises";
import MySplits from "./pages/MySplits";
import MyWeights from "./pages/MyWeights";
import ProgressPage from "./pages/ProgressPage";
import PublicSplits from "./pages/PublicSplits";
import WorkoutPage from "./pages/WorkoutPage";

export default function App() {
    // State hook to monitor user's sign-in status
    const [isSignedIn, setIsSignedIn] = useState(null);

    // Create a script element to load Google's authentication API script
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => initGoogleSignIn(); // Initialize Google Sign-In when the script loads
    document.body.appendChild(script); // Append the script to the body of the page

    // Function to initialize Google Sign-In
    function initGoogleSignIn() {
        window.gapi.load("auth2", () => {
            window.gapi.auth2
                .init({
                    client_id: process.env.REACT_APP_AUTH_CLIENT_ID, // Client ID from environment variable
                    scope: "email", // Scope to access user's email address
                    plugin_name: 'Fitness Guru' // Custom name for the sign-in plugin
                })
                .then(() => {
                    const authInstance = window.gapi.auth2.getAuthInstance();
                    const isSignedIn = authInstance.isSignedIn.get(); // Get current sign-in status
                    setIsSignedIn(isSignedIn); // Update state with sign-in status

                    // Listen for changes in sign-in status
                    authInstance.isSignedIn.listen((isSignedIn) => {
                        setIsSignedIn(isSignedIn);
                    });
                });
        });
        // Initialize the secondary Google Sign-In button with specific styling
        window.gapi.load("signin2", () => {
            window.gapi.signin2.render("login-button", {
                theme: "dark",
            });
        });
    }

    // A custom private route function to protect routes that require authentication
    function PrivateRoute(props) {
        const { component, ...rest } = props;
        return <Route {...rest} component={isSignedIn ? component : Private} />;
    }

    // Rendering the app with routing configured
    if (isSignedIn !== null) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/* Private routes require authentication, if not authenticated, render the Private component */}
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute exact path="/myexercises" component={MyExercises} />
                    <PrivateRoute exact path="/myworkouts" component={MyWorkouts} />
                    <PrivateRoute exact path="/mysplits" component={MySplits} />
                    <PrivateRoute exact path="/publicsplits" component={PublicSplits} />
                    <PrivateRoute exact path="/myweights" component={MyWeights} />
                    <PrivateRoute exact path="/workout" component={WorkoutPage} />
                    <PrivateRoute exact path="/progress" component={ProgressPage} />
                    {/* Default route for any paths that do not match */}
                    <Route path="/" component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        );
    }

    // If sign-in status is not determined yet, show a loading or checking sign-in status component
    return <CheckingSignedIn />;
}
