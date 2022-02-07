# Shareo

This project was created with Create-React-App. It'a simple demo/POC of a feature that lets users upload a video, generate shareable links to that video and engage with the link using views and comments.

Video Upload -> Shareable Link -> View Video is end to end implemented using Firebase. 

Comments functionality was integrated using Disqus. Views functionality isn't implemented in this project. 

## Project Structure

`/src/context `

The context folder contains global data store setup that's ready to be used for handling authentication on Frontend. (This is unrelated to the project wrt current scope because project is not using authentication yet )

`/src/firebase.config.js`

Firebase configurations and exports (Firestore, Auth, Storage etc). If you wish to use your own Firebase project, simply replace the config object with yours inside this file.

`/src/App.js`

Root component for the project. It contains two routes - `/` and `/video:videoid`. 
`/` is used to render the Homepage inside `src/pages/Home.js`. It contains UI and logic of upload videos functionality. 

The `/video:videoid` renders the Video page inside `src/pages/Video.js`. It contains UI and logic of view video, view video count, and comments functionality. 

`/src/hooks/useAuth.js`

Abstracted logic layer that interfaces Firebase Auth with Auth UI. (This is unrelated to the project wrt current scope because project is not using authentication yet )

`/src/hooks/useFingerprint.js`

Returns user's unique fingerprint id or hash.

`/src/utils/validations`

Contains a simple validation utility function that can be used to check if an uploaded file was a valid video file. 
## Run Locally

Ensure you have NodeJS V15 or greater.

Fork/Clone the Github Repo. Open the local repo in a code editor like VSCode and run:

In the project directory, you can run:

### `npm install`
Installs all the dependencies for the project. 
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


