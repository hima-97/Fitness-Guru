# Fitness Guru Deployment Guide

Check the current Heroku deployment here: [Fitness Guru on Heroku](https://fitness-guru-main.herokuapp.com/)

## Prerequisites

- **Computer with Internet Access**
- **Web Browser**: Google Chrome, Mozilla Firefox, etc.
- **Git**: [Install Git](https://git-scm.com/downloads)
- **Node and npm**: [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
  - **nvm (Node Version Manager)**: Allows you to download and install multiple versions of Node.js.
    - Originally developed for Linux, but [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) can be installed for Windows. More details [here](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
  - **npm (Node Package Manager)**: Included with Node.js, allows you to install JavaScript packages.
- **Clear Browser Cache** (if running locally on Google Chrome):
  - In Chrome: Settings → Privacy and security → Clear browsing data → Cached images and files

## Obtaining Client ID

To obtain a `client_id`, follow these steps:

1. Visit [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and sign in or create an account.
2. Create a project.
3. On the OAuth consent screen, set the User Type to "External" and complete the form.
4. On the Credentials page, select Create Credentials and choose OAuth client ID.
5. Set the Application type to Web application.
6. Add the URI for your app to Authorized JavaScript origins and Authorized redirect URIs.
   - For local deployment, add "http://localhost:3000" to both Authorized JavaScript origins and Authorized redirect URIs.
7. Click Create and copy Your Client ID.

In the client directory, rename the file ".env.sample" to ".env" and add your `client_id`.

## Obtaining Mongo URI

To obtain a Mongo URI, follow these steps:

1. Visit [MongoDB](https://www.mongodb.com/) and sign in or create an account.
2. Create an organization, then create a project.
3. Click Build a Database and choose the Cluster option (recommend the free Shared Cluster).
4. After the cluster is created, click Connect.
5. Add a connection IP address and create a Database User.
6. On the Choose a connection method screen, select Connect your application.
7. Select your driver and version (Node.js, 4.0 or later) and copy the connection string.

In the config directory, rename the file "config.env.sample" to "config.env" and add your Mongo URI. Remember to replace `<password>` in the connection string with the actual password for the database user you created.

## Installation Steps

1. **Clone this repository:**

    ```sh
    git clone https://github.com/hima-97/Fitness-Guru.git
    ```

2. **Install dependencies in the root directory:**

    ```sh
    npm install
    ```

3. **Install dependencies in the client directory:**

    ```sh
    cd client
    npm install
    ```

4. **Run the app concurrently with npm run dev in the root directory:**

    ```sh
    cd ..
    npm run dev
    ```

The frontend should run on `http://localhost:3000`, and the backend should run on `http://localhost:5000`.

## Heroku Deployment

To deploy the app on Heroku, follow these steps:

1. **Create a new Heroku app:**
   - Visit [Heroku](https://www.heroku.com/), sign in or create an account, and create a new app.

2. **Configure environment variables:**
   - Go to the Settings tab of your new app.
   - Under Config Vars, click Reveal Config Vars.
   - Add the following Config Vars:
     - KEY: `MONGO_URI`
       VALUE: `<insert MONGO_URI here>`
     - KEY: `REACT_APP_AUTH_CLIENT_ID`
       VALUE: `<insert CLIENT_ID here>`

3. **Update Google Cloud Console:**
   - Visit [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and find the Client ID for your app.
   - Add the Heroku app URL to Authorized JavaScript origins and Authorized redirect URIs for your Client ID.
   - Click Save.

4. **Deploy the app:**
   - Go back to the app on Heroku.
   - Go to the Deploy tab.
   - Under Deployment method, click GitHub.
   - Connect to GitHub and search for your repository.
   - Under Manual deploy, choose a branch to deploy and click Deploy Branch.
   - Once deployment is finished, click Open app to view your deployed app.

---

Your Fitness Guru application is now deployed and running. For any issues or further assistance, please refer to the Heroku documentation or contact support.
