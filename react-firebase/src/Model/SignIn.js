const db = require('../Database_config');

module.exports = function SignIn(email, password) {
    return db.auth().signInWithEmailAndPassword(email, password)
        .then(user => user.user)
        .catch(error => console.log(error));
}