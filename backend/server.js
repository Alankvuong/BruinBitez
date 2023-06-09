const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, setDoc, doc, updateDoc, query, where, arrayUnion, arrayRemove } = require('firebase/firestore');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

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

// Get the Firebase Storage instance
const firebaseStorage = getStorage(firebase);
// Set up multer middleware to handle file uploads
const uploadStorage = multer({ firebaseStorage }); // Use Firebase Storage as the destination storage


//api endpoint to get names
app.get('/api/get-names', async (req, res) => {
    try {
        let names = [];
        const usersRef = collection(db, "users");

        if (req.query.uids !== undefined) {
            for (const uid of req.query.uids) {
                //req.query.uids.forEach(async (uid) => {
                let queryRef = query(usersRef);
                querySnapshot = await getDocs(query(queryRef, where('uid', '==', uid)));
                querySnapshot.forEach((doc) => {
                    names.push(doc.data().firstName + ' ' + doc.data().lastName);
                });
            };
        }

        res.json({ names: names });
    } catch (err) {
        console.error("Error submitting user information", err);
        res.sendStatus(500);
    }
})

//api endpoint to create ride post
app.post('/api/create-ride', async (req, res) => {
    try {
        const rideDocRef = await addDoc(collection(db, "rides"), req.body);
        await updateDoc(rideDocRef, {
            docId: rideDocRef.id
        });
        console.log("Ride created successfully!");
        res.sendStatus(200);
    } catch (err) {
        console.error("Error submitting user information", err);
        res.sendStatus(500);
    }
})

//api endpoint to fetch existing ride posts
app.get('/api/get-rides', async (req, res) => {
    try {
        const ridesRef = collection(db, 'rides');
        let queryRef = query(ridesRef);

        Object.entries(req.query).forEach(([field, value]) => {
            if (value !== '') {
                queryRef = query(queryRef, where(field, '==', value));
            }
        });

        const querySnapshot = await getDocs(queryRef);
        const documents = querySnapshot.docs.map((doc) => doc.data());
        res.json(documents);
    } catch (err) {
        console.error("Error submitting user information", err);
        res.sendStatus(500);
    }
})

//api endpoint to join a ride
app.post("/api/join-ride", async (req, res) => {
    try {
        const rideDocRef = doc(collection(db, 'rides'), req.body.docId);
        await updateDoc(rideDocRef, { riderUids: arrayUnion(req.body.uid) });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
})

//api endpoint to leave a ride
app.post("/api/leave-ride", async (req, res) => {
    try {
        const rideDocRef = doc(collection(db, 'rides'), req.body.docId);
        await updateDoc(rideDocRef, { riderUids: arrayRemove(req.body.uid) });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
})

//api endpoint to change number of available spots in the ride
app.post("/api/change-spots", async (req, res) => {
    try {
        const rideDocRef = doc(collection(db, 'rides'), req.body.docId);
        await updateDoc(rideDocRef, { numSpots: req.body.numSpots });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

// api endpoint to handle user review submission
app.post("/api/add-review", async (req, res) => {
    const userReviewsCollection = collection(db, 'user-reviews');
    try {
        const { reviewDate, reviewTime, reviewTitle, reviewMessage, reviewRating, riderUID, driverUID } = req.body;

        console.log(req.body);
        const newDocRef = doc(collection(db, 'user-reviews'));

        await setDoc(newDocRef, {
            reviewDate,
            reviewTime,
            reviewTitle,
            reviewMessage,
            reviewRating,
            riderUID,
            driverUID
        });

        console.log("Review submitted succecssfully!");
        res.sendStatus(200);
    } catch (err) {
        console.error("Error submitting user information", err);
        res.sendStatus(500);
    }
});

async function getDocumentIdFromUid(uid) {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const documentId = querySnapshot.docs[0].id;
        return documentId;
    } else {
        return null; // No document found with the given UID
    }
}

// POST route for updating user profile
app.post('/api/update-user-profile', uploadStorage.single('file'), async (req, res) => {
    console.log("Hitting /api/update-user-profile API");
    try {
        const { car, bio, userUID } = req.body;
        const selectedImage = req.file; // Access the uploaded file using req.file
        // console.log(req.body);

        // console.log("Selected image: ");
        // console.log(selectedImage);

        // console.log("User ID:", userUID);
        // Your existing code to get the document ID from the user UID
        const uid = userUID;
        getDocumentIdFromUid(uid)
            .then(async (documentId) => {
                // console.log(documentId);
                if (documentId) {
                    const userDocRef = doc(db, 'users', documentId);

                    console.log(selectedImage);
                    if (selectedImage !== undefined) {
                        // console.log(selectedImage);
                        // console.log("Inside if statement");
                        // Upload the file to Firebase Storage
                        const storageRef = ref(firebaseStorage, `images/${userUID}/${selectedImage.originalname}`);
                        await uploadBytes(storageRef, selectedImage.buffer);

                        // Get the download URL of the uploaded file
                        const downloadURL = await getDownloadURL(storageRef);

                        // Update the user document in Firestore with the download URL
                        await updateDoc(userDocRef, {
                            car,
                            bio,
                            selectedImage: downloadURL,
                        });
                    } else {
                        // Update the user document in Firestore without the download URL
                        await updateDoc(userDocRef, {
                            car,
                            bio,
                        });
                    }

                    console.log('User profile updated successfully!');
                    res.sendStatus(200);
                } else {
                    console.log('Document not found for UID:', uid);
                }
            })
            .catch((error) => {
                console.error('Error retrieving document ID:', error);
                res.sendStatus(500);
            });
    } catch (err) {
        console.error('Error submitting user information', err);
        res.sendStatus(500);
    }
});

app.get("/api/get-reviews", async (req, res) => {
    console.log("Hitting /api/get-reviews");
    try {
        let driverUID = req.query.driverUID;
        let riderUID = req.query.riderUID;

        console.log("Driver UID: ", driverUID);
        console.log("Rider UID: ", riderUID);

        let reviewsQuery = null;

        if (driverUID === '0') {
            reviewsQuery = await getDocs(query(collection(db, 'user-reviews'), where('riderUID', '==', riderUID)));
        } else if (riderUID === '0') {
            reviewsQuery = await getDocs(query(collection(db, 'user-reviews'), where('driverUID', '==', driverUID)));
        } else {
            reviewsQuery = await getDocs(query(collection(db, 'user-reviews'), where('driverUID', '==', driverUID)));
        }

        let documents = [];
        reviewsQuery.forEach((doc) => {
            documents.push({ id: doc.id, data: doc.data() });
        });

        res.json(documents);
    } catch (error) {
        console.log("Error getting documents", error);
        res.status(500).json({ error: "Failed to retrieve documents" });
    }
});

app.get("/api/get-user-profile", async (req, res) => {
    try {
        const uid = req.query.uid;

        userInfoQuery = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)));
        const documents = [];
        userInfoQuery.forEach((doc) => {
            documents.push({ id: doc.id, data: doc.data() });
        });

        res.json(documents);
    } catch (err) {
        console.error("Error getting documents: ", error);
    }
})

app.listen(8000, () => {
    console.log('Backend server is running on http://localhost:8000');
});