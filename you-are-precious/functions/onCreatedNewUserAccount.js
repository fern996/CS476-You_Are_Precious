const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.onCreatedNewUserAccount = functions.auth.user().onCreate((user) => {

    if (typeof user.providerData[0] === "undefined") {
        /// Throwing an HttpsError so that the client gets the error details.
        return admin.auth().setCustomUserClaims(user.uid, { verfiedUser: false });
    } else if (user.email && !user.emailVerified) {
        return admin
            .auth()
            .deleteUser(user.uid)
            .then(() => {
                console.log('Successfully deleted user');
            })
            //instaed of catching it we can do something better for security purposes
            .catch((error) => {
                console.log('Error deleting user:', error);
            });
    }


    const email = user.email || null; // The email of the user.
    const emailVerified = user.emailVerified || null;
    const displayName = user.displayName; // The display name of the user.
    const OwnerId = user.uid; // the user account Id
    const phoneNumber = user.phoneNumber || null;
    const providerId = user.providerData[0].providerId || null;
    const phototURL = user.photoURL || null
    let accountNumber;
    const setRef = admin.firestore().collection('users').doc(`${OwnerId}`);
    const getRef = admin.firestore().collection('users').orderBy('createdAt', 'desc').limit(1)

    //write things to verify email user if not verfied deleet user account

    return getRef.get()
        .then((res) => {
            //check if any user exists
            if (res.empty) {
                return accountNumber = 1
            } else {
                res.forEach(doc => {
                    return accountNumber = doc.data().accountNumber + 1
                });
            }
        }).then(() => {
            return setRef.set({
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                displayName: displayName,
                alias: "anonymous",
                email: email,
                phoneNumber: phoneNumber,
                providerId: providerId,
                photoURL: phototURL,
                accountNumber: accountNumber
            })
        }).then(() => {
            if (emailVerified || phoneNumber || providerId == "facebook.com") {
                return admin.auth().setCustomUserClaims(OwnerId, { verfiedUser: true, setUp: false, alias: "anonymous", accountNumber: accountNumber });
            } else {
                return admin.auth().setCustomUserClaims(OwnerId, { verfiedUser: false });
            }
        }).catch((error) => {
            /// Throwing an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('failed-precondition', 'Error' +
                'while saving Info Please try again');
        });

});