const functions = require('firebase-functions');
const admin = require('firebase-admin');



exports.setUserInfo = functions.https.onCall((data, context) => {

    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }


    const ownerId = context.auth.uid; // the user account Id
    let alias = data.userInfo.alias.replace(/\b\w/g, c => c.toUpperCase());
    const gender = data.userInfo.gender.replace(/\b\w/g, c => c.toUpperCase());
    const otherGender = data.userInfo.otherGender.replace(/\b\w/g, c => c.toUpperCase());
    const age = data.userInfo.age;
    const race = data.userInfo.race.replace(/\b\w/g, c => c.toUpperCase());
    const region = data.userInfo.region;
    let ref;


    //perform check on data only if user is a verfied user
    return admin.auth().getUser(ownerId)
        .then((res) => {
            ref = admin.firestore().collection('users').doc(`${ownerId}`);

            if (res.customClaims.verfiedUser != true) {
                throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
                    'while authenticated as a verfied user.');
            }

            if (res.customClaims.alias != "anonymous") {
                alias = res.customClaims.alias;
            }

            const userInfo = {
                alias: alias.trim(),
                gender: gender,
                otherGender: otherGender.trim(),
                age: age,
                race: race,
                region: region
            }

            if (!checkUserInfo(userInfo)) {
                throw new functions.https.HttpsError('failed-precondition', 'Invalid Input ' +
                    'Check Your Input and Try Again');
            }

            if (res.customClaims.alias === "anonymous") {
                return admin.auth().setCustomUserClaims(context.auth.uid, {...res.customClaims, ...userInfo, setUp: true });
            } else {
                return admin.auth().setCustomUserClaims(context.auth.uid, {...res.customClaims, ...userInfo });
            }
        }).then(() => {
            ref.update({
                alias: alias,
                gender: gender,
                otherGender: otherGender,
                age: age,
                race: race,
                region: region
            })

        }).then(() => {
            console.log('New Message written');
            // Returning the sanitized message to the client.
            return { message: "account successfully updated" };
        }).catch((error) => {
            /// Throwing an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('failed-precondition', error.message);
        });

})

const checkUserInfo = (userInfo) => {
    const raceArray = ["African", "Amerindian", "Chinese", "East Indian", "Europeans", "Mixed", "Portuguese", "Others"]
    const genderArray = ["Male", "Female", "Other"]
    const ageArray = ["18 or Under", "19-30", "31-59", "60 or Over"]
    const regionArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

    if (!userInfo.alias.match("^[a-zA-Z]+[a-zA-z0-9]+\s?")) {
        return false;
    } else if (!genderArray.includes(userInfo.gender)) {
        return false
    } else if (userInfo.gender === "Other" && !userInfo.otherGender.match("^[a-zA-Z]+([a-zA-Z]+\s?)*$")) {
        return false;
    } else if (!ageArray.includes(userInfo.age)) {
        return false
    } else if (!raceArray.includes(userInfo.race)) {
        return false;
    } else if (!regionArray.includes(userInfo.region)) {
        return false;
    } else {
        return true;
    }
}