# App Description

Fitness Guru is a full-stack web application that allows users to create custom workouts and track their progress at the gym.
This application helps people who go to the gym keep track of their progress both in strength and physical changes.
The app allows users to create custom workout plans and share their workouts with other people in the fitness community. 
Users are able to add exercises to their custom splits and workouts.

# Software Stack

Fitness Guru is built using the MERN stack:

- MongoDB
- Express
- React
- Node.js

The application also uses Mongoose, a simple schema-based solution to model application data that makes it easier to work with MongoDB in Node.js.

For more details on the MERN stack implementation: <br>
https://github.com/hima-97/Fitness-Guru/blob/master/docs/MERN.md

# User Roles

-   People who go to the gym (new or experienced)
-   Admins / Fitness Trainers

# User Permissions

-   People who go to the gym (new or experienced) can create their own custom workouts, track their own progress, and share their workouts with other users.
-   Admins / Fitness Trainers can post challenges to keep users engaged.

# Dependencies

-   react, react-dom, react-router-dom, react-scripts for running the app
-   bootstrap, react-bootstrap, reactstrap, styled-components for styling the app
-   express and mongoose for the backend with MongoDB database
-   dotenv for loading environment variables
-   prettier for code formatting
-   concurrently to run the frontend and the backend concurrently
-   nodemon to refresh the app

# Functionality

-   You can view your profile on the Profile page. Click the Update Profile button to update your profile.
-   You can view your exercises on the My Exercises page. Click the Add Exercise button to add an exercise. Click Update to update the exercise and Delete to delete the exercise.

# Known Problems

-   You may not be able to run the app locally without a Google Client ID for OAuth. Don't worry, we will update our instructions soon!
-   The "Last Updated" time for the Profile page does not update correctly. To reproduce, update the profile. The "Last Updated" time will not update.

# Code Stucture:

-   .vscode: <br>
    This folder typically contains configuration files for the Visual Studio Code text editor, such as settings and launch configurations.
-   client: <br>
    This folder is used for the client-side (i.e. front-end) of the web application. It contains the React components, styles, and other code related to the user interface.
-   config: <br>
    This folder contains configuration files for the application, such as environment variables, database settings, and other settings that are likely to change between different environments.
-   models: <br>
    This folder contains code related to the data models of the application, such as the schema for the MongoDB database and any additional logic to interact with it.
-   .gitignore: <br>
    This file is used to tell Git which files and directories to ignore when committing code to a repository.
-   .prettierrc: <br>
    This file is used to configure the Prettier code formatter, which can be used to automatically format code according to a set of rules.
-   README.md: <br>
    This file is typically used to provide documentation for the project, including information on how to run, build, and contribute to the codebase.
-   index.js: <br>
    This file is the entry point for the application (i.e. it is where the app starts executing).
-   package.json: <br>
    This file contains metadata about the project, such as the project's name, version, and dependencies. It also includes scripts for common tasks, such as building and running the application.





# Installation and Deployment

To check out our most recent deployment of the app, visit the link here: <br>
https://fitness-guru-main.herokuapp.com/

To install and deploy the app, follow the instructions here: <br>
https://github.com/hima-97/Fitness-Guru/blob/master/docs/DEPLOY.md