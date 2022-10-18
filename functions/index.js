const functions = require("firebase-functions");

const axios = require("axios");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from firebase functions");
});

exports.api = functions.https.onRequest(async (req, res) => {
  switch (req.method) {
    case "GET":
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      res.send(response.data);
      break;

    case "POST":
      const body = req.body;
      res.send(body);
      break;

    case "DELETE":
      res.send("It was a DELETE request");
      break;

    default:
      res.send("It was a default request...");
  }
});

// background function triggers

// Firebath Auth,

exports.userAdded = functions.auth.user().onCreate((user) => {
  console.log(`${user.email || user.displayName} is created...`);
  console.log(`${user.phoneNumber || user.email}`)
  return Promise.resolve();
});

exports.userDeleted = functions.auth.user().onDelete((user) => {
  console.log(`${user.displayName} is deleted...`);
  return Promise.resolve();
});
// please explore more examples...

// Firebase Firestore

exports.fruitAdd = functions.firestore
  .document("/fruits/{documentId}")
  .onCreate((snapshot, context) => {
    console.log(snapshot.data().name, "is added");
    return Promise.resolve();
  });

exports.deleteFruit = functions.firestore
  .document("/fruits/{documentId}")
  .onDelete((snapshot, context) => {
    console.log(snapshot.data().name, "is deleted");
    return Promise.resolve();
  });

exports.fruitUpdated = functions.firestore
  .document("/fruits/{documentId}")
  .onUpdate((snapshot, context) => {
    console.log("Before", snapshot.before.data());
    console.log("After", snapshot.after.data());
    return Promise.resolve();
  });

//   Scheduled functions
// this function wil only run when deployed, not on emulator
exports.scheduledFunction = functions.pubsub
  .schedule("00 15 * * 1-5")
  .onRun((context) => {
    console.log("I am executing every minute...");
    return null;
  });
