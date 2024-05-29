# Fitness Guru Design

![Fitness Guru - System Architecture Diagram](https://user-images.githubusercontent.com/66971869/194792718-d14ba65e-3fd5-44cd-9747-45949bb5c646.png)

# Project Structure
```
Fitness-Guru/
│
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── index.html/
│   ├── src/
│   │   ├── components/
│   │   │   ├── workout/
│   │   │   │   ├── CreateExercise.js
│   │   │   │   ├── CreateExercise.css
│   │   │   │   ├── CreateSplit.js
│   │   │   │   ├── CreateSplit.css
│   │   │   │   ├── CreateWorkout.js
│   │   │   │   ├── CreateWorkout.css
│   │   │   │   ├── Exercise.js
│   │   │   │   ├── Exercise.css
│   │   │   │   ├── ListExercises.js
│   │   │   │   ├── ListExercises.css
│   │   │   │   ├── ListSplits.js
│   │   │   │   ├── ListSplits.css
│   │   │   │   ├── ListWorkouts.js
│   │   │   │   ├── ListWorkouts.css
│   │   │   │   ├── PublicSplits.js
│   │   │   │   ├── Split.js
│   │   │   │   ├── Split.css
│   │   │   │   ├── Workout.js
│   │   │   │   └── Workout.css
│   │   │   ├── contai.css
│   │   │   ├── Chart.js
│   │   │   ├── Exercise.js
│   │   │   ├── Footer.js
│   │   │   ├── Layout.js
│   │   │   ├── NavBar.js
│   │   │   ├── Profile.js
│   │   │   ├── ProfilePicture.js
│   │   │   ├── PublicSplits.js
│   │   │   ├── Repetitions.js
│   │   │   ├── TrackedExercises.js
│   │   │   └── Weight.js
│   │   ├── pages/
│   │   │   ├── CheckingSignedIn.js
│   │   │   ├── CreateWorkout.js
│   │   │   ├── Home.js
│   │   │   ├── MyExercises.js
│   │   │   ├── MyExercises.css
│   │   │   ├── MySplits.js
│   │   │   ├── MyWeights.js
│   │   │   ├── MyWorkouts.js
│   │   │   ├── PageNotFound.js
│   │   │   ├── Private.js
│   │   │   ├── Profile.js
│   │   │   ├── ProgressPage.js
│   │   │   ├── PublicSplits.js
│   │   │   └── WorkoutPage.js
│   │   ├── test/
│   │   ├── utils/
│   │   │   ├── compare.js
│   │   │   ├── get-user.js
│   │   │   └── objectID.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── Index.js
│   │   └── Index.css
│   ├── package.json
├── config/
│   ├── db.js
│   ├── routes/
│   │   ├── exercise.js
│   │   ├── index.js
│   │   ├── repetitions.js
│   │   ├── split.js
│   │   ├── trackedExercises.js
│   │   ├── user.js
│   │   ├── weight.js
│   │   └── workout.js
├── docs/
│   ├── DEPLOY.md
│   ├── DESIGN.md
│   ├── MANUAL.md
│   └── MERN.md
├── models/
│   ├── Exercise.js
│   ├── Repetitions.js
│   ├── Split.js
│   ├── TrackedExercises.js
│   ├── User.js
│   ├── Weight.js
│   └── Workout.js
├── team/
│   ├── CONTRIBS.md
│   ├── LEADERSHIP.md
│   ├── LEARNING.md
│   ├── problem_scenario.md
│   ├── TESTING.md
│   └── user_journey.md
├── .prettierrc
├── index.js
├── package.json
└── README.md
```

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
            This folder contains all the reusable React components used in the application such as buttons, forms, and navigation elements. <br>
            React components are reusable building blocks of a React application, and they are used to create the structure and layout of the application's pages. <br>
            Each component is a self-contained unit of functionality that can be rendered to the browser as a piece of the user interface.
        
        	-   workout: <br>
                This folder contains the components related to workout functionality, such as 'ListWorkouts.js', 'Workout.js', 'Split.js', 'Exercise.js', etc. <br>
                'ListWorkouts.js' component, for example, is responsible for displaying the list of all the workouts for the user. <br>
                'Workout.js' component is responsible for displaying the details of a specific workout and allowing the user to interact with it. <br>
                'Split.js' component, on the other hand, is responsible for displaying the details of a specific split and allowing the user to interact with it.

        -	pages: <br>
            This folder contains all the pages that make up the application such as the homepage, profile, etc. <br>
            Each file in this folder represents a page and exports a component that is rendered when the corresponding route is accessed. <br>
            For example, the 'MyWorkouts' component is rendered when the 'MyWorkouts' page is accessed, and the 'Profile' component is rendered when the 'Profile' page is accessed.

        -	test: <br>
            This folder contains test files used to test the different components and pages of the application.

        -	utils: <br>
            This folder contains utility functions and modules that are used throughout the application. <br>
            These files are used to store functionality that is not specific to any one component or page, but is used by multiple parts of the application. <br>
            For example, the 'get-user.js' file exports a function used to retrieve the user's profile information, and the 'objectID.js' file exports a function to generate an unique id.

        
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


## Team Decisions

- Using MERN Stack
  - MongoDB used for database
  - Express and Mongoose used for server side logic
  - React.js used for front end
  - Node.js used for backend
- Using Google Oauth for authentication
- Creating pages for users to create lists of exercises, workouts, and splits (https://github.com/ucsb-cs148-f21/project-t03-fitnessguru/blob/main/team/sprint02/sprint02.md)
- Allow for users to select from pre-made exercises to add to their exercise list (https://github.com/ucsb-cs148-f21/project-t03-fitnessguru/blob/main/team/sprint03/sprint03.md)
- Allow for users to record their weights and reps for specific exercises and check their progress by being able to view charts that display their logged data (https://github.com/ucsb-cs148-f21/project-t03-fitnessguru/blob/main/team/sprint03/sprint03.md)
- Allow users to make their splits public and view other users' splits that have been made public (https://github.com/ucsb-cs148-f21/project-t03-fitnessguru/blob/main/team/sprint03/sprint03.md)
- We started by creating basic pages like the profile page and MyExercises page for the MVP. From there, we built out our more advanced pages like the MyWorkouts, MySplits, MyProgress, and Public Splits pages.

## User Flow

![Fitness Guru - User Flow Diagram](https://user-images.githubusercontent.com/66971869/196836916-766745cc-0785-41a4-bf87-79f5ce97552f.png)

## Specifics
- Pages: Home, Profile, MyExercises, MyWorkouts, MySplits, MyWeights, Progress

  - Home
    - Prompts user with a welcome message
  - Profile
    - Connected to MongoDB database via Node.js backend
    - Allows user to log profile picture, name, weight, height, and notes
  - MyExercises
    - Connected to MongoDB database via Node.js backend
    - Lists all exercises that user has added to their exercises list
    - User can create a new exercise (CreateExercise component) which allows them to select from wgerAPI's exercises or create a custom one
    - User can edit and delete exercises
  - MyWorkouts
    - Connected to MongoDB database via Node.js backend
    - Lists all workouts that user has added to their workouts list
    - User can create a new workout (CreateWorkout component) which allows them to add different exercises to a new workout
      - Any new exercises from the new workout will be added to the MyExercises page
    - User can log exercise information (repetitions and weight) for exercises within workouts. This information is automatically updated on the MyWeights page, where it can then be visualized on the MyProgress page.
    - User can edit and delete workouts
  - MySplits
    - Connected to MongoDB database via Node.js backend
    - Lists all Splits that user has added to their splits list
    - User can create a new split, and add workouts to the split.
    - User can edit and delete splits
    - User can make split public
  - Public Splits
    - Lists all splits that have been made public by all users
    - Users are able to copy these splits into their own MySplits page.
  - MyWeights
    - User can log their weights that they lifted for specific exercises from the MyExercises page
    - This information is posted to the MongoDB database via Node.js backend
  - Progress
    - User can select an exercise and the number of reps to see a chart of their progress for that given exercise for that amount of reps.
