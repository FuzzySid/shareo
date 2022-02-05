import * as firebase from "firebase/app"
import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAch2bz6kAPIrD62lbLxF4-kiNZbqDNpEg",
    authDomain: "shareo-71818.firebaseapp.com",
    projectId: "shareo-71818",
    storageBucket: "shareo-71818.appspot.com",
    messagingSenderId: "144689086716",
    appId: "1:144689086716:web:da6530b45343fb6e6a9779",
    measurementId: "G-050DV7KCLL"
  };

  const firebaseApp=initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth=getAuth(firebaseApp)
  const provider=new GoogleAuthProvider();
  const storage=getStorage(firebaseApp)

  export {db,auth,provider,storage};