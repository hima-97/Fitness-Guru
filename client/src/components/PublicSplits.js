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