const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { initializeApp } = require('firebase-admin/app');
const { getDatabase, ref, push } = require('firebase-admin/database');
const { getStorage, ref: storageRef, uploadBytes, getDownloadURL } = require('firebase-admin/storage');

const app = express();

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwzwiuzcu4RfMf5vfGDUUBTfWRgV1UTDs",
  authDomain: "green-street-20e5e.firebaseapp.com",
  projectId: "green-street-20e5e",
  storageBucket: "green-street-20e5e.appspot.com",
  messagingSenderId: "420682581480",
  appId: "1:420682581480:web:6428c4a04a472d94c8905d",
  measurementId: "G-VQ7GX9TK6T"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer setup for file uploads
const multerUpload = multer();

// Handle form submission
app.post('/submit_form', multerUpload.single('file'), async (req, res) => {
    const formData = req.body;

    try {
        // Store image in Firebase Storage
        const file = req.file;
        const storageRef = storageRef(storage, `images/${file.originalname}`);
        await uploadBytes(storageRef, file.buffer);

        // Get image URL
        const imageUrl = await getDownloadURL(storageRef);

        // Add imageUrl to formData
        formData.imageUrl = imageUrl;

        // Store form data in Firebase Database
        await push(ref(database, 'contacts'), formData);

        res.status(200).send('Form submitted successfully!');
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).send('Error submitting form');
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
