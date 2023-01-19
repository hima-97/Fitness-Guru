// This code file defines a React functional component called 'ListSplits'. 
// This component uses the 'useState' and 'useEffect' hooks from React to handle the state of the component. 
// The state of the component is an empty array called 'splits', which is set using the useState hook.
// The 'useEffect' hook is used to fetch data from the '/splits/public' endpoint on the server, which retrieves a list of public splits. 
// This data is then passed to the 'setSplits' function, which updates the 'splits' state variable with the fetched data.
// The 'splits' array is sorted by the compare function imported from "../utils/compare". This function compares the split's name attribute.
// The component then renders a div element with a class of "splitList". 
// Inside this div, the component maps over the 'splits' array and for each split, it renders an instance of the "PublicSplit" component, passing in the individual split and user id as props.
// It also logs the splits array to the console for debugging purposes.

import React from "react";
import { useState, useEffect } from "react";
import PublicSplit from "./Workout/PublicSplit";
import "./Workout/ListSplits.css"
import { SplitButton } from "react-bootstrap";
import compare from "../utils/compare"

export default function ListSplits() {
    const [splits, setSplits] = useState([]);

    useEffect(() => {
        fetch(`/splits/public`)
            .then((res) => res.json())
            .then((splits) => setSplits(splits));
    }, []);

    splits.sort(compare)
    console.log(splits)

    return (
        <div className="splitList">
            {splits.map((split) => {
                return <PublicSplit className="split" split={split} user={split.googleId} />;
            })}
        </div>
    );
}