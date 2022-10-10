import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CheckingSignedIn from "./pages/CheckingSignedIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Private from "./pages/Private";
import MyWorkouts from "./pages/MyWorkouts";
import CreateWorkout from "./pages/CreateWorkout";
import PageNotFound from "./pages/PageNotFound";
import MyExercises from "./pages/MyExercises";
import MySplits from "./pages/MySplits";
import MyWeights from "./pages/MyWeights";
import ProgressPage from "./pages/ProgressPage";
import PublicSplits from "./pages/PublicSplits";
import WorkoutPage from "./pages/WorkoutPage";

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(null);
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => initGoogleSignIn();
    document.body.appendChild(script);

    function initGoogleSignIn() {
        window.gapi.load("auth2", () => {
            window.gapi.auth2
                .init({
                    client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
                    scope: "email",
                    plugin_name:'Fitness Guru'
                })
                .then(() => {
                    const authInstance = window.gapi.auth2.getAuthInstance();
                    const isSignedIn = authInstance.isSignedIn.get();
                    setIsSignedIn(isSignedIn);

                    authInstance.isSignedIn.listen((isSignedIn) => {
                        setIsSignedIn(isSignedIn);
                    });
                });
        });
        window.gapi.load("signin2", () => {
            window.gapi.signin2.render("login-button", {
                theme: "dark",
            });
        });
    }

    function PrivateRoute(props) {
        const { component, ...rest } = props;
        return <Route {...rest} component={isSignedIn ? component : Private} />;
    }

    if (isSignedIn !== null) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute
                        exact
                        path="/myexercises"
                        component={MyExercises}
                    />
                    <PrivateRoute
                        exact
                        path="/myworkouts"
                        component={MyWorkouts}
                    />
                    <PrivateRoute exact path="/mysplits" component={MySplits} />
                    <PrivateRoute exact path="/publicsplits" component={PublicSplits} />
                    <PrivateRoute
                        exact
                        path="/myweights"
                        component={MyWeights}
                    />
                    <PrivateRoute
                        exact
                        path="/workout"
                        component={WorkoutPage}
                    />
                    <PrivateRoute
                        exact
                        path="/progress"
                        component={ProgressPage}
                    />
                    <Route path="/" component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        );
    }

    return <CheckingSignedIn />;
}