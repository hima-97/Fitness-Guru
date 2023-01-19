// This code defines a React functional component called 'WorkoutPage'. 
// The component is responsible for displaying the workout page of the application.
// The component then defines a functional component called WorkoutPage that utilizes the useState hook to manage the component's local state.
// The component's state is initialized with two variables:
// -    splits: an empty array that will contain all the splits added to the workout
// -    showAddSplit: a boolean variable that is set to false. This variable is used to control the visibility of the "Add Split" button
// -    showAdd a boolean variable that is set to true. This variable is used to control the visibility of the "Add split" button
// The component then defines several functions that handle different events in the page:
// -    handleCreateSplit: this function takes an event object as an argument, prevent the default behavior of the event, and sets the showAdd state to

import React, { useState } from "react";
import Layout from "../components/Layout";
import getUser from "../utils/get-user";
import Container from "react-bootstrap/Container";
import CreateSplit from "../components/Workout/CreateSplit";
import ListWorkouts from "../components/Workout/ListWorkouts";

const WorkoutPage = () => {
    const user = getUser();

    const [splits, setSplits] = useState([]);
    const [showAddSplit, setShowAddSplit] = useState(false);
    const [showAdd, setShowAdd] = useState(true);

    const handleCreateSplit = (e) => {
        e.preventDefault();
        setShowAdd(false);
        return setShowAddSplit(true);
    };

    const handleAddSplit = (split) => {
        const newSplits = splits.concat(split);
        setShowAddSplit(false);
        setShowAdd(true);
        return setSplits(newSplits);
    };

    return (
        <Layout user={user}>
            <Container>
                <h1>Workout!</h1>
                {showAdd && (
                    <button
                        id="addSplit"
                        type="button"
                        onClick={handleCreateSplit}
                    >
                        Add Split
                    </button>
                )}
                {showAddSplit && (
                    <CreateSplit handleAddSplit={handleAddSplit} />
                )}
                <h2>My Splits:</h2>
                <ListSplits splits={splits} />
            </Container>
        </Layout>
    );
};

export default WorkoutPage;