// This code defines a React functional component called 'ListSplits' that takes in a user object as a prop. 
// Inside the component, it uses the React hooks 'useState' and 'useEffect' to manage the state of the component.
// The useState hook is used to create a state variable called 'splits' and a setter function 'setSplits' which is initially set to an empty array.
// The useEffect hook is used to fetch the splits data from the server when the component is first rendered and whenever the user id changes. 
// The hook makes a GET request to the server endpoint '/splits/:userId' where :userId is the id of the user passed in as a prop. 
// The returned data is then set to the 'splits' state variable using the setter function 'setSplits'.
// The component then maps over the splits data and for each split, it returns a 'Split' component, passing in the 'split' and 'user' props. 
// The component also sorts the splits by 'name' before rendering them.
// Lastly, the component is exported so that it can be imported and used in other parts of the application.





import React from "react";
import { useState, useEffect } from "react";
import Split from "./Split";
import "./ListSplits.css";
import { SplitButton } from "react-bootstrap";
import compare from "../../utils/compare"

export default function ListSplits({ user }) {
    const [splits, setSplits] = useState([]);

    useEffect(() => {
        fetch(`/splits/${user.id}`)
            .then((res) => res.json())
            .then((splits) => setSplits(splits));
    }, [user.id]);

    splits.sort(compare)

    return (
        <div className="splitList">
            {splits.map((split) => {
                return <Split className="split" split={split} user={user} />;
            })}
        </div>
    );
}
