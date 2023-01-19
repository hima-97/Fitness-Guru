// The code imports the useState and useEffect hooks from the React library, and then exports a functional component called Weight that takes in a prop called "repetitions_id". 
// The component sets up a state variable called "weight" which is an empty array and will be used to store the weight data fetched from the server.
// Then useEffect hook is used to fetch the data from the server with the endpoint "/weight/{repetitions_id}" where the {repetitions_id} is passed as props to the component. 
// The data is returned as a json object and is then set to the "weight" state variable.
// The component then maps through the weight state variable, concatenating each weight element and adding a "|" separator to the weights variable. 
// This variable is then truncated and returned on the screen for the user to see.

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
