const functions = require('firebase-functions');
const admin = require('firebase-admin');


exports.submitGetHelpForm = functions.https.onCall((data, context) => {
     // Checking that the user is authenticated.
     if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    // helpForm passed from the client.
    const helpForm = data.helpForm;

    // This function calls checkUserInput function to check if user input is valid 
    if (!checkUserInput(helpForm)) {
        // Throwing an HttpsError so that the client gets the error details. (Invalid input)
        throw new functions.https.HttpsError('invalid-argument', 'Invalid User Input');
    }
    // Authentication / user information is automatically added to the request.
    //const alias = context.auth.token.alias + "-urp" + context.auth.token.accountNumber || "Anonymous"
    const ownerId = context.auth.uid; // the user account Id

    //Add the helpForm to getHelpFormSubmitted collection
    const ref = admin.firestore().collection('getHelpFormSubmiited')
    return ref.add({
        helpForm: helpForm,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        author: {ownerId},
        visible: true
    }).then(() => {
        console.log('New Message written');
        // Returning the sanitized message to the client.
        return { message: "message Successfully added" };
    })

})

//This function returns true or false to verify the user input is valid
const checkUserInput = (helpForm) => {

    const first_name = helpForm.first_name;
    const last_name = helpForm.last_name;
    const race = helpForm.race;
    const userLocation = helpForm.userLocation;
    const email = helpForm.email;
    const phone = helpForm.phone;
    const permission = helpForm.permission;
    const body = helpForm.body;
    var emailRegex = /^\w{1,40}\@[\w\.]{1,20}\.[a-zA-Z]{1,3}$/;
    var phoneRegex = /^[0-9]{1,10}$/;
    const raceTypes = ["African","Amerindian","Chinese","East Indian","Europeans","Mixed","Portuguese"
    ,"Others"];


    //Check first_name
    if(first_name.length > 30 || first_name.length < 1 || last_name.length > 30 || last_name.length < 1
         || userLocation.length > 50 || (!(emailRegex.test(helpForm.email) || phoneRegex.test(helpForm.phone))) ||
          body.length < 1 || body.length > 5000 || body.search(/\S{50,}/) != -1) {
        return false;
    }

    if(race.length > 0 && raceTypes.includes(race) == false) {
        return false;
    }

    return true;
}