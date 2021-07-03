/**
 * firebase initialization
 */

// static imports
import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// relative imports
import { firebaseConfig } from "../constants/firebaseConfig";

const firebase = Firebase.initializeApp(firebaseConfig);
const { fieldValue } = Firebase.firestore;

export { firebase, fieldValue };
