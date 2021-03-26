const functions = require('firebase-functions');
const admin = require('firebase-admin');




exports.likeUnlikePost = functions.https.onCall((data, context) => {

    // Checking that the user is authenticated.
    if (!context.auth || context.auth.token.verfiedUser === false) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    const ownerId = context.auth.uid;

    //const comment = data.comment
    const postId = data.postId

    const likeRef = admin.firestore().collection('verifiedPost').doc(postId).collection('likes').doc(ownerId);

    return likeRef.get()
        .then((res) => {
            //check if this user has already liked
            if (res.empty) {
                //user wants to like the post
                return likeRef.set({
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                })
            } else {//user wants to unlike the post
                return likeRef.delete()
            }
        })

})