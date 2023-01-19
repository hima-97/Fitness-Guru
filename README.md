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

    -	node_modules: <br>
        This folder contains all of the packages or libraries that the project depends on. These packages are installed via npm (Node Package Manager) and are listed in the 'dependencies' or 'devDependencies' sections of the 'package.json' file.

    -	public: <br>
        This folder contains static files that will be served to the client, such as images, fonts, and the index.html file.
    
    -   index.html: <br>
        The index.html file is the main HTML page that loads when the user goes to the website. <br>
        It serves as the base structure for the website, which includes the head section (meta data, title, and links to CSS and JavaScript files) and the body section (where the React app is loaded). <br>
        It also includes links to bootstrap css and javascript files which enable the usage of bootstrap framework for styling and layout. <br>
        The file defines a 'div' element with the ID of "root" which is used as a container for the React app. <br>
        The JavaScript code that is loaded is stored in the "client/src/index.js" file.

    -	src: <br>
        This folder contains the source code of the application. This is where you will find the React components, their associated styles and images, and any other code specific to the application.

        -   components: <br>
            This folder contains all the reusable React components used in the application such as buttons, forms, and navigation elements.

        -	pages: <br>
            This folder contains all the pages that make up the application such as the homepage, profile, etc.

        -	test: <br>
            This folder contains test files used to test the different components and pages of the application.

        -	utils: <br>
            This folder contains utility functions and modules that are used throughout the application.
        
        -	App.css: <br>
            This file contains the styles for the App component.

        -	App.js: <br>
            This file is the root component of the application. It is the parent component that holds all the other pages and components of the application.

        -	index.css: <br>
            This file contains global styles for the application.

        -	index.js: <br>
            This file is the entry point of the application, it is responsible for rendering the App component to the DOM and starting the React application.

    -	.env: <br>
        This file is used to store environment-specific configuration data for the application, such as API keys or application URLs. This file is typically ignored by version control systems so that sensitive information is not accidentally committed and shared with others.

    -	package-lock.json: <br>
        This file is automatically generated by npm and contains a detailed record of the installed packages and their versions. It is used to ensure that the dependencies of the project are installed in a consistent manner across different environments.

    -	package.json: <br>
        This file contains information about the project, such as its name, version, and dependencies. This file is used by npm to manage the project's dependencies and scripts. It also contains information about the project's scripts, such as start, build, and test commands.

-   config: <br>
    This folder contains configuration files for the application, such as environment variables, database settings, and other settings that are likely to change between different environments.

    -	routes: <br>
        This folder contains the code for the API endpoints that handle the different routes of the application. <br>
        Each file inside the folder corresponds to a specific entity or feature of the application, such as users, exercises, workouts, etc. <br>
        Each file exports a set of router functions that handle the different HTTP requests for that entity, such as GET, POST, PUT and DELETE requests.

    -	config.env: <br>
        This file is used for defining environment variables for the application, such as the connection strings for the database and other third-party services, as well as other configurations (for example port number) that may change between different environments.

    -	db.js: <br>
        This file contains the code that connects to the MongoDB database and sets up any necessary configurations. It exports a function that connects to the MongoDB database using the Mongoose library and the MongoDB URI from the environment variable.

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

# User Flow Diagram:

![Fitness Guru - User Flow Diagram](https://user-images.githubusercontent.com/66971869/213334328-b2c81390-1d99-48a8-bd2f-a2aa96aedcce.png)

# Installation and Deployment

To check out our most recent deployment of the app, visit the link here: <br>
https://fitness-guru-main.herokuapp.com/

To install and deploy the app, follow the instructions here: <br>
https://github.com/hima-97/Fitness-Guru/blob/master/docs/DEPLOY.md
