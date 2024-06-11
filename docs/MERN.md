# MERN

MERN (MongoDB, Express, React, Node) is an open-source JavaScript software stack used for building dynamic websites and web applications. It is a full-stack solution, including:

- **Front-end display tier**: React.js
- **Application tier**: Express.js and Node.js
- **Database tier**: MongoDB

MERN is a variation of the MEAN stack (MongoDB, Express, Angular, Node), replacing Angular.js with React.js. Other variations include MEVN (MongoDB, Express, Vue, Node). Any front-end JavaScript framework can work with this stack.

## Why MERN?

ME(RVA)N is an ideal approach for working with JavaScript and JSON throughout the development stack. It allows developers to use a single language (JavaScript) across the entire application, making development more efficient and streamlined.

## Components of MERN

### MongoDB
- **Document-based open-source database**: MongoDB stores data in flexible, JSON-like documents, meaning fields can vary from document to document and data structure can be changed over time.
- **Integration**: JSON documents created in the React.js front end can be sent to the Express.js server, processed, and stored directly in MongoDB for later retrieval.
- **Scalability and Flexibility**: MongoDB is designed to scale out easily and to support a wide variety of data types.
- **Cloud-native applications**: MongoDB Atlas provides an auto-scaling MongoDB cluster on the cloud provider of your choice.
- **Setup**: [How to set up a MongoDB cluster](https://www.mongodb.com/basics/clusters/mongodb-cluster-setup).

### Express.js
- **Web application framework for Node.js**: Express.js simplifies the process of building robust web applications and APIs.
- **Purpose**: Express allows you to handle different HTTP requests at specific URLs (routes) and implement middleware to handle requests.
- **Features**: 
  - Simplifies server creation with robust routing.
  - Supports middleware to respond to HTTP requests.
  - Defines a routing table for performing different actions based on HTTP methods and URLs.
  - Integrates with various template engines like Pug, EJS, etc.

### React.js
- **Client-side JavaScript framework**: React.js is used for building user interfaces, especially single-page applications where you need a fast, interactive user experience.
- **Purpose**: React lets you build UI components, manage the state within components, and render these components as HTML.
- **Features**: 
  - Component-based architecture: Build encapsulated components that manage their own state.
  - Virtual DOM: React creates an in-memory data structure cache, computes the resulting differences, and then updates the browser’s displayed DOM efficiently.
  - JSX: JavaScript syntax extension that allows mixing HTML with JavaScript.
  - Unidirectional data flow: Makes it easier to understand and debug applications.

### Node.js
- **Open-source, cross-platform, back-end development platform**: Node.js is built on Chrome's V8 JavaScript engine, enabling server-side scripting using JavaScript.
- **JavaScript runtime environment**: Executes JavaScript code server-side, allowing for the development of scalable network applications.
- **Features**: 
  - Asynchronous and Event-Driven: All APIs of Node.js library are asynchronous, meaning non-blocking.
  - Fast and Scalable: Node.js uses a single-threaded model with event looping.
  - NPM (Node Package Manager): Provides over 800,000 packages for developers to use in their projects.

## MERN Structure

![MERN - Diagram](https://user-images.githubusercontent.com/66971869/194792199-f3af0786-5e5e-4881-a919-0f19d3335d60.png)

## Fitness Guru Structure

![Fitness Guru - System Architecture Diagram](https://user-images.githubusercontent.com/66971869/194792718-d14ba65e-3fd5-44cd-9747-45949bb5c646.png)

### Detailed Breakdown

#### Frontend (React.js)
- **React Components**: Each UI element in the Fitness Guru application is a React component, making the code modular and reusable.
- **State Management**: React’s useState and useEffect hooks manage the state and lifecycle of components.
- **Routing**: React Router is used for navigation between different pages like Home, Profile, MyExercises, etc.
- **UI/UX**: Styled using CSS and libraries like Bootstrap for responsive design.

#### Backend (Express.js & Node.js)
- **Server Setup**: Express.js sets up the server and defines routes to handle different HTTP requests.
- **API Endpoints**: The backend has multiple API endpoints for CRUD operations on entities like users, exercises, workouts, splits, etc.
- **Middleware**: Middleware functions handle tasks such as logging, authentication, and request parsing.

#### Database (MongoDB)
- **Schemas**: Mongoose schemas define the structure of the data stored in MongoDB.
- **Data Storage**: User data, exercises, workouts, and other information are stored as documents in MongoDB collections.
- **Data Retrieval**: Mongoose provides an easy way to retrieve, update, and delete documents from the database.

### Integration
- **Data Flow**: Data flows seamlessly from the frontend to the backend and into the database. For example, when a user logs a new workout, the data is sent from the React component to the Express server, which then stores it in MongoDB.
- **Authentication**: Google OAuth is used for user authentication, with tokens managed by the backend to ensure secure access.

By leveraging the MERN stack, Fitness Guru ensures a consistent, performant, and scalable development environment, allowing the team to build a comprehensive fitness tracking application that meets user needs effectively.

