const admin = require("firebase-admin");

const serviceAccount = require("./server/wavbasedb-9a679-firebase-adminsdk-mz5bf-dc506005fa.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://wavbasedb-9a679.firebaseio.com"
});

module.exports = admin;