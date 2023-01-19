// This code defines a React component called "MySplits" that renders a web page with a few functionalities. 
// The component imports a few modules such as 'react', 'jquery', 'axios', 'bootstrap' and 'react-bootstrap/Container' to use in the component. 
// It also imports a utility function called 'getUser' and two other components called 'ListSplits' and 'CreateSplit'
// When the component is rendered, it first displays a button that says "Add Split" which, when clicked, triggers a function that sets the state variable 'showCreateSplit' to true and 'showAddSplit' to false. 
// This causes the component to display the "CreateSplit" component and hide the "Add Split" button. 
// The "CreateSplit" component allows the user to create new workout splits and save them to the back-end.
// After the split is added, the component then displays a list of existing workout splits which are fetched from the back-end, this is done by the "ListSplits" component which takes in the user as a prop.
// The component also defines some additional functionality such as opening and closing modals for creating a workout and a split. These modals are rendered using Bootstrap.
// Overall, the purpose of this component is to provide the user with a way to view, create, and manage their workout splits.

import React from "react";
import {useState} from "react";
import $ from "jquery";
import 'bootstrap';
import Container from "react-bootstrap/Container";
import axios from 'axios';
import getUser from "../utils/get-user";
import Layout from "../components/Layout";
import ListSplits from "../components/Workout/ListSplits"
import CreateWorkout from "../components/Workout/CreateWorkout"
import objectID from "../utils/objectID";
import CreateSplit from "../components/Workout/CreateSplit";



export default function MySplits(){
    const user = getUser();
    
    const [splitID,setSplitID] = useState(objectID());
    const [showCreateSplit, setShowCreateSplit] = useState(false);
    const [showAddSplit, setShowAddSplit] = useState(true);
    
    const closeWorkoutModal = () => {
        $('#createWorkout').hide();
        $('#createSplit').show();

    }
    
    const openWorkoutModal= () => {
        $('#createWorkout').show();
        $('#addSplit').hide();
    }
    
    const closeSplitModal = () => {
        setShowCreateSplit(false);
        setShowAddSplit(true);
    }
    
    const openSplitModal = () => {
        $('#addSplit').show();
        

    }

    const handleShowCreateSplit = () => {
        setShowCreateSplit(true);
        setShowAddSplit(false);
    }

    const handleAddSplit = (split) => {
        axios.post('/splits',split)
            .then(window.location.reload())
            .catch(console.log("Couldn't post split"));
   }

    return(
        <Layout user={user}>
            <Container>

                {showAddSplit && <button type="button" class="btn btn-primary btn-block" onClick={handleShowCreateSplit}>
                    Add Split
                </button>}
                
                {showCreateSplit && <CreateSplit handleAddSplit={handleAddSplit} closePrompt={closeSplitModal} user={user} id={"createSplit"}/>}
                <div class="modal" id="createWorkout" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <CreateWorkout closeModal={closeWorkoutModal} splitID={splitID} user={user}/>
                </div> <br/>
                <h2>My Splits</h2>
                <ListSplits user={user} />
            </Container>
            
        </Layout>
    )
}
