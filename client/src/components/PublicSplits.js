// The ListSplits.js file in the Fitness Guru application defines the ListSplits component, which displays a collection of public workout splits. This component makes use of React's functional component pattern along with hooks for state management and effects to fetch and display data dynamically.

// **Imports**
// It imports:
// - **React Hooks (useState, useEffect):** For state management and side effects.
// - **compare Function:** From "../utils/compare" to sort the splits by name.
// - **PublicSplit Component:** To display each split in the list.

// **ListSplits Component**
// A functional component that:
// - Initializes the 'splits' state as an empty array using `useState`.
// - Uses `useEffect` to fetch the list of public splits from the '/splits/public' endpoint when the component mounts.
// - Utilizes the `compare` function to sort the fetched 'splits' based on the split's name attribute.
// - Maps over the sorted 'splits' array to render each split using the `PublicSplit` component, passing the split and user id as props.

// **Return Statement:**
// - Renders a div with the class "splitList".
// - Inside the div, it maps over the 'splits' array, rendering a `PublicSplit` for each item.
// - Logs the 'splits' array to the console for debugging purposes to ensure that data is fetched and rendered correctly.

// **Key Features and Functionality**
// - **Dynamic Data Display:**
//   - Fetches and displays a list of public workout splits, allowing users to browse through different options.
// - **Use of React Hooks for Data Fetching:**
//   - Manages the state of the splits and fetches them from the server upon component mounting using `useState` and `useEffect`.
// - **Sorting and Debugging:**
//   - Sorts the splits for a consistent display using a utility function.
//   - Includes console logging for debugging to monitor the correct handling of fetched data.

// **CSS Styling:**
// - Likely utilizes CSS defined in 'splitList' for styling the list of splits, ensuring the UI is appealing and consistent with the application's design.

// Example Usage:

// <ListSplits user={currentUser} />


// Importing React and necessary hooks from the React library
import React from "react";
import { useState, useEffect } from "react";

// Importing the PublicSplit component to display each public workout split
import PublicSplit from "./Workout/PublicSplit";

// Importing CSS for styling the list of splits
import "./Workout/ListSplits.css";

// Importing SplitButton from react-bootstrap (though not used in the current component, might be planned for future features)
import { SplitButton } from "react-bootstrap";

// Importing a utility function to compare and sort splits
import compare from "../utils/compare";

// Defining the ListSplits component
export default function ListSplits() {
    // Using useState to manage the splits state, initially setting it to an empty array
    const [splits, setSplits] = useState([]);

    // Using useEffect to fetch public splits data from the server when the component mounts
    useEffect(() => {
        // Fetching data from the server's `/splits/public` endpoint
        fetch(`/splits/public`)
            .then((res) => res.json()) // Parsing the response as JSON
            .then((splits) => setSplits(splits)); // Setting the fetched splits to the state
    }, []); // Empty dependency array means this effect runs only once after the initial render

    // Sorting the splits using the compare function before rendering
    splits.sort(compare);
    // Logging the splits to the console for debugging purposes
    console.log(splits);

    // Rendering the component
    return (
        <div className="splitList">
            {/* Mapping over the splits array to render a PublicSplit component for each split */}
            {splits.map((split) => {
                // For each split, rendering the PublicSplit component with the split and user data
                return <PublicSplit className="split" split={split} user={split.googleId} />;
            })}
        </div>
    );
}
