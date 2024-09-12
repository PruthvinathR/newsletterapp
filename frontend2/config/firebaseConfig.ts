import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqULFAhYUMvmvqcKa4m8DFIlMKYn-MGqA",
  authDomain: "contextifyi.firebaseapp.com",
  projectId: "contextifyi",
  storageBucket: "contextifyi.appspot.com",
  messagingSenderId: "355086982939",
  appId: "1:355086982939:web:ec2405355eca241f62fdbe",
  measurementId: "G-3NP123RYQT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };