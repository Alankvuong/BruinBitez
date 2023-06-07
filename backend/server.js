const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, addDoc, setDoc, doc } = require("firebase/firestore");
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

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const app = express();
app.use(cors());
app.use(express.json());


//api endpoint to create ride post
app.post('/api/create-ride', async (req, res) => {
    try {
        console.log(req.body);
        const rideDocRef = await addDoc(collection(db, "rides"), req.body);
        console.log("Review submitted successfully!");
        res.sendStatus(200);
    } catch (err) {
        console.error("Error submitting user information", err);
        res.sendStatus(500);
    }
})

//api endpoint to fetch existing ride posts
app.get('/api/get-rides', async (req, res) => {
    try {
        const collectionRef = collection(db, 'rides');
        const querySnapshot = await getDocs(collectionRef);
        const documents = querySnapshot.docs.map((doc) => doc.data());
        
        res.json(documents);
    } catch (err) {
        console.error("Error submitting user information", err);
        res.sendStatus(500);
    }
})

// api endpoint to handle user review submission
app.post("/api/add-review", async (req, res) => {
    const userReviewsCollection = collection(db, 'user-reviews');
    try {
        const {reviewDate, reviewTitle, reviewMessage, reviewRating} = req.body;

        console.log(req.body);
        const newDocRef = doc(collection(db, 'user-reviews'));
        
        await setDoc(newDocRef, {
            reviewDate,
            reviewTitle,
            reviewMessage,
            reviewRating
        });

        console.log("Review submitted succecssfully!");
        res.sendStatus(200);
    } catch (err) {
        console.error("Error submitting user information", err);
        res.sendStatus(500);
    }
  });
  
  app.get("/api/get-reviews", async (req, res) => {
    try {
        const reviewsQuery = await getDocs(collection(db, 'user-reviews'));

        const documents = [];
        reviewsQuery.forEach((doc) => {
            documents.push({ id: doc.id, data: doc.data() });
        });

        res.json(documents);
    } catch (error) {
        console.log("Error getting documents", error);
        res.status(500).json({ error: "Failed to retrieve documents" });
    }
  })

app.listen(8000, () => {
    console.log('Backend server is running on http://localhost:8000');
});