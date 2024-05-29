// The get-user.js file in the client/src/utils directory of your application provides a utility function called `getUser` which is essential for integrating Google's authentication services into your app. This function is specifically designed to fetch and handle the user's profile information securely and efficiently when they are signed into your application using Google.

// **Function Definition**
// **Name:** getUser
// **Output:** user object or null

// **Description:**
// This utility function interacts with the Google API to retrieve the current user's profile information. It ensures seamless integration of Google sign-in by handling user authentication status and fetching profile details.

// **Detailed Workflow:**
// 1. **API Check:**
//    - Verifies the presence of `gapi` and `gapi.auth2` in the global namespace to ensure that the Google API script is loaded and initialized correctly. If these objects aren't defined, it returns null to prevent runtime errors.
// 2. **Authentication Instance Retrieval:**
//    - Retrieves the current Google authentication instance using `gapi.auth2.getAuthInstance()`.
// 3. **Sign-in Status Check:**
//    - Checks if the user is currently signed in with `isSignedIn.get()`. If not, returns null.
// 4. **Profile Information Extraction:**
//    - If the user is signed in, accesses the user's basic profile information using `currentUser.get().getBasicProfile()`.
// 5. **User Object Construction:**
//    - Constructs a user object containing key details from the profile:
//      - **id:** The user's unique Google ID.
//      - **fullName:** The user's full name.
//      - **givenName:** The user's first name.
//      - **familyName:** The user's last name.
//      - **imageUrl:** URL to the user's profile image.
//      - **email:** The user's email address.
//      - **signOut:** A method to sign out the user using the Google auth instance.
// 6. **Return Value:**
//    - Returns the constructed user object, enabling other parts of your application to utilize this authenticated user data.

// **Usage Scenario:**
// This function is typically called during the application load or in context where user information is required to personalize the app experience, manage sessions, or for any operations requiring user authentication.

// **Example Implementation:**
// ```javascript
// import getUser from './get-user';

// function App() {
//   const user = getUser();
//   if (user) {
//     console.log('User signed in:', user.fullName);
//   } else {
//     console.log('No user signed in.');
//   }
//   return (
//     <div>
//       {user ? `Welcome, ${user.givenName}` : 'Please sign in'}
//     </div>
//   );
// }
// ```

// **Benefits:**
// - Enhances user experience by providing personalized interactions.
// - Secures user sessions and data interactions within the app.
// - Streamlines the process of user authentication and profile management with Google's reliable services.


// Function to retrieve the current user's profile if they're signed in through Google's authentication service.
export default function getUser() {
    // Check if the Google API script and the auth2 module have loaded properly.
    if (window.gapi === undefined || window.gapi.auth2 === undefined) {
        // If not, return null indicating no user data is available.
        return null;
    }

    // Retrieve the authentication instance from the Google Auth API.
    const authInstance = window.gapi.auth2.getAuthInstance();
    // Check if the user is currently signed in.
    const isSignedIn = authInstance.isSignedIn.get();

    // If the user is not signed in, return null.
    if (isSignedIn === false) {
        return null;
    }

    // Retrieve the profile information of the currently signed-in user.
    const profile = authInstance.currentUser.get().getBasicProfile();
    // Construct a user object with useful properties extracted from the profile.
    const user = {
        id: profile.getId(), // Unique identifier for the user.
        fullName: profile.getName(), // User's full name.
        givenName: profile.getGivenName(), // User's given (first) name.
        familyName: profile.getFamilyName(), // User's family (last) name.
        imageUrl: profile.getImageUrl(), // URL to the user's profile image.
        email: profile.getEmail(), // User's email address.
        signOut: authInstance.signOut, // Method to sign out the user from the application.
    };

    // Return the user object containing the profile info.
    return user;
}

