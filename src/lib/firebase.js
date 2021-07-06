/**
 * firebase initialization
 */

// static imports
import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// relative imports
import { firebaseConfig } from "../constants/firebaseConfig";
// import { seedDatabase } from "../data/seed";

const firebase = Firebase.initializeApp(firebaseConfig);
const { fieldValue } = Firebase.firestore();

// console.log(`firebase is connected: ${firebase}`);

/**
 * seed the database
 * means we need to run the seed script once to set up a demo account
 * to figure out the rest of the things
 */

// seedDatabase(firebase);
// console.log(`database just got seeded ${seedDatabase}`);

export { firebase, fieldValue };
