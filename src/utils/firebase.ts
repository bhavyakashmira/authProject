// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "authorproj.firebaseapp.com",
    projectId: "authorproj",
    storageBucket: "authorproj.appspot.com",
    messagingSenderId: "766573858294",
    appId: "1:766573858294:web:4f44a2f2ac11bef0308bd7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);