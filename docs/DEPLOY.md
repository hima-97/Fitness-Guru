# Installation and Deployment

Check the current Heroku deployment here: https://fitness-guru-main.herokuapp.com/

## Prerequisites

-   Computer with Internet Access
-   Web Browser (Google Chrome, Mozilla Firefox, etc.)
-   Git (Install Here: https://git-scm.com/downloads)
-   Node and npm (Install Here: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
    - nvm (node version manager) is a tool that allows you to download and install Node.js.
        - nvm allows you to manage multiple versions of Node.js installed on your system
        - nvm was originally developed for Linux systems, however nvm-windows can be installed for Windows with the following steps: <br>
          https://github.com/coreybutler/nvm-windows/releases <br>
          https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows
    - npm (node package manager) is the package manager for Node.js and allows you to install javascript packages
        - npm is included with Node.js, so if you have Node.js installed then most likely you have npm installed as well
-   If you are running the app locally on Google Chrome make sure to clear the browser cache
    - In Chrome: Settings → Privacy and security → Clear browsing data → Cached images and files

## Client ID

To obtain a client_id, visit https://console.cloud.google.com/apis/credentials and follow the steps after signing in or creating an account:

* create a project
* on the OAuth consent screen, set the User Type to "External" and complete the form
* on the Credentials page, select Create Credentials and choose OAuth client ID
* set the Application type to Web application
* add the URI for your app to Authorized JavaScript origins and Authorized redirect URIs
* for the local deployment, add "http://localhost:3000" to Authorized JavaScript origins and Authorized redirect URIs
* click Create
* copy Your Client ID

In the client directory, you will see a file named ".env.sample". Rename this file to ".env" and add your client_id.

## Mongo URI

To obtain a Mongo URI, please visit this link: https://www.mongodb.com/ and follow the steps after signing in or creating an account:

* create an organization, then create a project
* click Build a Database
* choose the Cluster option (we recommend the free Shared Cluster)
* after the cluster is created, click Connect
* Add a connection IP address
* Create a Database User
* on the Choose a connection method screen, select Connect your application
* Select your driver and version (Node.js, 4.0 or later)
* copy the connection string

In the config directory, you will see a file named "config.env.sample". Rename this file to "config.env" and add your Mongo URI. <br>
Remember to replace \<password> in the connection string with the actual password for the database user you created!

## Installation Steps

Clone this repository:

```sh
git clone https://github.com/hima-97/Fitness-Guru.git
```

Run npm install in the root directory:

```sh
npm install
```

Run npm install in the client directory:

```sh
cd client
npm install
```

Run the app concurrently with npm run dev in the root directory:

```sh
cd ..
npm run dev
```

The frontend should run on localhost:3000, and the backend should run on localhost:5000.

# Heroku Deployment

To deploy the app on Heroku, please visit this link: https://www.heroku.com/ and follow these steps after signing in or creating an account:

* Create new app
* Go to Settings
* Under Config Vars, click Reveal Config Vars
* Add 2 Config Vars:
    - KEY: MONGO_URI <br>
      VALUE: \<insert MONGO_URI here>
    - KEY: REACT_APP_AUTH_CLIENT_ID <br>
      VALUE: \<insert CLIENT_ID here>

Note that you should create a new CLIENT_ID for the Heroku deployment, so revisit the earlier instructions.

* Click Open app and copy the URL of the app
* Go to this link: https://console.cloud.google.com/apis/credentials and find the Client ID for your app
* Add the URL to Authorized JavaScript origins and Authorized redirect URIs for your Client ID
* Click Save

* Go back to the app on Heroku
* Go to Deploy
* Under Deployment method, click GitHub
* Connect to GitHub
* Under Manual deploy, Choose a branch to deploy
* Click Deploy Branch
* When the deployment is finished, click Open app to view your deployed app
