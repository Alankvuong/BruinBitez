const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, addDoc } = require("firebase/firestore");
const express = require("express");
const cors = require("cors");

const firebaseConfig = {
    apiKey: "AIzaSyA7N3HNdokIkp8uHhbGilzdZcSqNc7KGSo",
    authDomain: "bryft-382e7.firebaseapp.com",
    projectId: "bryft-382e7",
    storageBucket: "bryft-382e7.appspot.com",
    messagingSenderId: "16895573382",
    appId: "1:16895573382:web:c426996e8f867f49a78007",
    measurementId: "G-XK6V3NESWR"
  };
  
  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);
  // initialize firestore and get reference to service
  const db = getFirestore(firebase);
  const usersCollection = collection(db, 'users');

  const app = express();
  app.use(express.json());
  app.use(cors());

  // API endpoint to handle user information submission
  app.post("/api/submit-user", async (req, res) => {
    try {
        const {firstName, lastName, car, bio } = req.body;

        await addDoc(usersCollection, {
            firstName,
            lastName,
            car,
            bio
        });

        console.log("User information submitted successfuly!");
        res.sendStatus(200);
    } catch (err) {
        console.error("Error submitting user information", err);
        res.sendStatus(500);
    }
  });
  
  app.listen(8000, () => {
    console.log('Backend server is running on http://localhost:8000');
  })

//   createNewUser();
  
