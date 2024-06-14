// firebase.js
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCwzwiuzcu4RfMf5vfGDUUBTfWRgV1UTDs",
    authDomain: "green-street-20e5e.firebaseapp.com",
    projectId: "green-street-20e5e",
    storageBucket: "green-street-20e5e.appspot.com",
    messagingSenderId: "420682581480",
    appId: "1:420682581480:web:6428c4a04a472d94c8905d",
    measurementId: "G-VQ7GX9TK6T"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

function submitForm() {
    const longitude = document.getElementById('longitude').value;
    const latitude = document.getElementById('latitude').value;
    const description = document.getElementById('description').value;
    const file = document.getElementById('file_path').files[0]; // Assuming only one file is uploaded

    // Create a storage reference for the file
    const storageRef = storage.ref('images/' + file.name);

    // Upload file to Firebase Storage
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);

                // Save data to Firestore
                db.collection('mapData').add({
                    longitude: parseFloat(longitude),
                    latitude: parseFloat(latitude),
                    description: description,
                    imageUrl: downloadURL
                }).then(docRef => {
                    console.log('Document written with ID:', docRef.id);
                    alert('Data saved successfully');
                }).catch(error => {
                    console.error('Error adding document:', error);
                    alert('Error saving data');
                });
            });
        }
    );
}

