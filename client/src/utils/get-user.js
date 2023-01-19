// This code is defining a function getUser() that is used to fetch the user's information from the Google API.
// Specifically, it is using the gapi library which is provided by the Google API to interact with the current user's profile.
// It first checks if the gapi object and the gapi.auth2 object are defined, and if not, it returns null. 
// This is to ensure that the code doesn't throw an error if the library is not loaded correctly.
// Next, it uses the gapi.auth2.getAuthInstance() method to get the current authentication instance, and then uses the isSignedIn.get() method to check if the user is currently signed in. 
// If the user is not signed in, it will return null.
// If the user is signed in, it uses the currentUser.get().getBasicProfile() method to get the user's profile information, and assigns it to the profile variable. 
// It then creates a new object called user and assigns the following information to it:
// -    id: user's id from the profile
// -    fullName: user's full name from the profile
// -    givenName: user's given name from the profile
// -    familyName: user's family name from the profile
// -    imageUrl: user's image url from the profile
// -    email: user's email from the profile
// -    signOut: signOut method from the authInstance
// Finally, it returns the user object.

export default function getUser() {
    if (window.gapi === undefined || window.gapi.auth2 === undefined) {
        return null;
    }

    const authInstance = window.gapi.auth2.getAuthInstance();
    const isSignedIn = authInstance.isSignedIn.get();

    if (isSignedIn === false) {
        return null;
    }

    const profile = authInstance.currentUser.get().getBasicProfile();
    const user = {
        id: profile.getId(),
        fullName: profile.getName(),
        givenName: profile.getGivenName(),
        familyName: profile.getFamilyName(),
        imageUrl: profile.getImageUrl(),
        email: profile.getEmail(),
        signOut: authInstance.signOut,
    };

    return user;
}
