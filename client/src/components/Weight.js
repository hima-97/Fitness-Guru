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
