// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const functions = require('firebase-functions')
const { onRequest } = require("firebase-functions/v2/https");

const app = require('express')()
require('express-async-errors')
const cors = require('cors')

app.use(cors({ origin: true }))

app.use('/trader', traderRouter)


// error handler
app.use((err, req, res, next) => {
    // firebase aggregated alerts are based on error logs
    console.error(err)
    // reportOnPagerDuty(err, req, res)
    next()
})

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addmessage = onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    
    res.json({ result: original.toUpperCase() });
});

// const envProjectId = JSON.parse(process.env.FIREBASE_CONFIG).projectId
exports.perks = functions
    .runWith({
        // Keep instances warm
        minInstances: 0,
        maxInstances: 50,
    })
    .https.onRequest(app)
