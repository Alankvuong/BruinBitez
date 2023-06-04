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
  const db = getFirestore(app);

  const app = express();
  app.use(express.json());
  app.use(cors());

  // API endpoint to handle user information submission
  app.post("/api/submit-user", async (req, res) => {
    try {
        const {firstName, lastName, car, bio } = req.body;

        await usersCollection.add({
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

  async function createNewUser() {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            age: 21,
            car: "Honda Accord",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Arcu felis bibendum ut tristique et."
        });
    
        console.log("Document written with ID: ", docRef.id);
    } catch (err) {
        console.log("Error adding document: ", err);
    }

  }

//   createNewUser();
  