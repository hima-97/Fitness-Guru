// The Weight.js file in the Fitness Guru application defines a functional component called Weight, which is responsible for fetching and displaying weight data associated with specific repetitions of an exercise. This component makes effective use of React's functional component structure and hooks to manage state and handle side effects.

// **Imports**
// It imports:
// - **useState, useEffect:** From "react" to manage state and handle lifecycle events.
// - **fetch API:** For making server requests.

// **Weight Component**
// A functional component that:
// - Takes `repetitions_id` as a prop, which is used to fetch specific weight data.
// - Initializes a state variable `weight` as an empty array to store the fetched weight data.
// - Uses `useEffect` to fetch weight data from the server at the endpoint `/weight/{repetitions_id}`. The `repetitions_id` is dynamically inserted into the URL to fetch specific data.
// - Upon fetching, the data is set to the `weight` state variable after converting it to a JSON object.
// - Maps through the `weight` array to create a formatted string of weight values separated by "|" (vertical bars). This string is then displayed to the user.

// **Dynamic Data Fetching:**
// - Fetches weight data specific to the `repetitions_id` provided, ensuring the data displayed is relevant to the specific set of repetitions.
// - The `useEffect` hook triggers re-fetching whenever the `repetitions_id` changes, keeping the data up-to-date.

// **State Management and Effect Hook:**
// - Manages the state of the weight data using `useState`.
// - Utilizes `useEffect` for side effects, specifically for fetching data on component mount and when `repetitions_id` changes.

// **Data Processing and Display:**
// - Processes the fetched weight data by concatenating them into a string with "|" separators, making it compact and easy to read.
// - This processed string is then rendered on the screen, allowing users to quickly see the weights associated with their exercise repetitions.

// **Return Statement:**
// - Returns a simple display of weight data formatted as a string separated by vertical bars, which is straightforward for users to interpret.

// **CSS Styling:**
// - Could utilize CSS to style the display of weight data, ensuring it fits well within the application's aesthetic and is easy to read.

// **Key Features and Functionality**
// - **Dynamic Data Fetching:** Ensures real-time accuracy by fetching data based on the `repetitions_id`.
// - **State Management and Effect Hook:** Efficiently manages and updates the weight data using React's built-in hooks.
// - **Data Processing and Display:** Provides a simple yet effective presentation of weight data.

// Example Usage:

// <Weight repetitions_id={12345} />



import React, { useState, useEffect } from "react";

export default function Weight({repetitions_id}) {
    const [weight, setWeight] = useState([]);

    useEffect(() => {
        fetch(`/weight/${repetitions_id}`)
            .then((res) => res.json())
            .then((weight) => setWeight(weight));
    }, [repetitions_id]);

    let weights = ""

    weight.forEach(element => {
        weights += element.weight + " | "
    });

    weights = weights.substr(0, weights.length - 3)

    return (
        <div>
            {weights}
        </div>
    );
}
