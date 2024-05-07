// The ListSplits.js file in the Fitness Guru application defines a component for displaying and managing a list of workout splits.

// **Imports**
// It imports:
// - **React Hooks (useState, useEffect):** For managing state and fetching data.
// - **Split Component:** Represents individual splits in the list.
// - **Custom CSS:** 'ListSplits.css' for component styling.

// **ListSplits Component**
// A functional component that receives a `user` object as a prop.
// - **State Management:**
//   - `splits`: Array of workout splits.
//   - `setSplits`: Setter function for `splits`, initially set to an empty array.
// - **useEffect Hook:**
//   - Fetches splits from the backend when the component first renders and whenever the `user` id changes.
//   - Makes a GET request to `/splits/${user._id}` to fetch splits data for the given user.
//   - Updates the `splits` state variable using `setSplits` with the fetched data.
// - **Return Statement:**
//   - Sorts `splits` by name before rendering them.
//   - Maps through `splits` and renders a `Split` component for each split.
//   - Passes down the `split` and `user` props to each `Split` component.

// **Summary**
// - **Split Listing Workflow:**
//   - Fetches workout splits for the user using a GET request.
//   - Maps each split to a `Split` component, displaying them in a sorted manner.
// - **State Management and API Integration:**
//   - **State Hooks:** Manage the `splits` state using `useState`.
//   - **API Calls:** Fetches splits data from the `/splits/:userId` endpoint via `fetch`.

// Example Usage:

// <ListSplits
//   user={user}
// />


import React from "react";
import { useState, useEffect } from "react";
import Split from "./Split"; // Component for displaying individual splits
import "./ListSplits.css"; // Styles for the list of splits
import compare from "../../utils/compare"; // Utility function for sorting splits

/**
 * `ListSplits` Component
 * Displays a list of workout splits for a given user
 * 
 * Props:
 * - user: Object containing user details including the user ID
 */
export default function ListSplits({ user }) {
    // State to hold the list of workout splits
    const [splits, setSplits] = useState([]);

    // Effect to fetch the splits data when the component mounts or the user ID changes
    useEffect(() => {
        // Fetches the list of splits for the given user ID from the backend
        fetch(`/splits/${user.id}`)
            .then((res) => res.json()) // Parses the response JSON
            .then((splits) => setSplits(splits)); // Updates the state with the fetched splits
    }, [user.id]); // Dependency array includes user ID to refetch data if it changes

    // Sort the splits using the custom compare function
    splits.sort(compare);

    // Render a list of `Split` components based on the fetched splits
    return (
        <div className="splitList">
            {splits.map((split) => (
                <Split className="split" split={split} user={user} />
            ))}
        </div>
    );
}
