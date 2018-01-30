const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.getVehicleData = (req,res) => {
  functions.database.ref('vehicles').on('value', (data) => {
    if(data) {
      res.status(200).send(JSON.stringify(data))
    }
  })
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
