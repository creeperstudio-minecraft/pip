import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDaxE-MsBKlpUZEkmAi3hazohQS0So-yaM",
  authDomain: "bikeservices-6c049.firebaseapp.com",
  databaseURL: "https://bikeservices-6c049-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bikeservices-6c049",
  storageBucket: "bikeservices-6c049.appspot.com",
  messagingSenderId: "22724400220",
  appId: "1:22724400220:web:d474e973e9e483262fc299"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
