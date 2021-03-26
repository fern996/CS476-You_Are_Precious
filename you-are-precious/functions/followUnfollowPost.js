const functions = require('firebase-functions');
const admin = require('firebase-admin');




exports.followUnfollowPost = functions.https.onCall((data, context) => {

    // Checking that the user is authenticated.
    if (!context.auth || context.auth.token.verfiedUser === false) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    //user id
    const ownerId = context.auth.uid;
    //post id
    const postId = data.postId

    const followRef = admin.firestore().collection('verifiedPost').doc(postId).collection('followers').doc(ownerId);

    return followRef.get()
        .then((res) => {
            //check if the user already follows the post
            if (res.empty) {
                //user wants to follow the post
                return followRef.set({
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                })
            } else {//user wants to unfollow post
                return followRef.delete()
            }
        })

})