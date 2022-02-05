import {auth, provider} from '../firebase.config';
import { useStateValue } from '../context/auth/provider/AuthProvider';
import { authActions } from '../context/auth/actions/authActions';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


export default function useAuth(){
    
    const [state,dispatch]=useStateValue();

    const signIn=()=>{
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            dispatch({
                type: authActions.SET_USER,
                user: user
            })
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
        
    }
    const signOut=()=>{
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch({
                type:authActions.LOG_OUT
            })
        }).catch((error) => {
            // An error happened.
        });
    }
    return {
        signOut,
        signIn
    };
}