const functions = require('firebase-functions');
const admin = require('firebase-admin');




exports.addNewComment = functions.https.onCall((data, context) => {

    // Checking that the user is authenticated.
    if (!context.auth || context.auth.token.verfiedUser === false) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    const ownerId = context.auth.uid;
    const alias = context.auth.token.alias + "-urp" + context.auth.token.accountNumber

    const comment = data.comment
    const postId = data.postId

    //Check that comment is valid
    if(comment.length < 1 || comment.length > 1000 || comment.search(/\S{30,}/) != -1) {
        throw new functions.https.HttpsError('failed-precondition', 'Invalid comment');
    }

    if (context.auth.token.verfiedUser === true) {
        const ref = admin.firestore().collection('verifiedPost').doc(postId).collection('comment')
        return ref.add({
            comment: { comment },
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            author: { ownerId, alias},
            visible: true
        }).then(() => {
            console.log('New Message written');
            // Returning the sanitized message to the client.
            return { message: "comment Successfully added" };
        })
    } else {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
})