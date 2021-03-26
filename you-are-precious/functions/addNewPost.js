const functions = require('firebase-functions');
const admin = require('firebase-admin');



exports.addNewPost = functions.https.onCall((data, context) => {

    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    // post passed from the client.
    const post = data.post;
    //perform checks here on user input

    // Checking attribute.
    // //create funtion to check post
    // if (!(typeof post.body === 'string') || post.body.length === 0 || post.body.length > 400) {
    //     // Throwing an HttpsError so that the client gets the error details.
    //     throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
    //         'one arguments "body" containing the message text to add.');
    // }

    // This function calls checkUserInput function to check if user input is valid 
    if (!checkUserInput(post)) {
        // Throwing an HttpsError so that the client gets the error details. (Invalid input)
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
            'one arguments "body" containing the message text to add.');
    }
    // Authentication / user information is automatically added to the request.
    const ownerId = context.auth.uid;
    const alias = context.auth.token.alias + "-urp" + context.auth.token.accountNumber || "Anonymous"

    //Add the post to Verified User Collection
    if (context.auth.token.verfiedUser === true) {
        const ref = admin.firestore().collection('verifiedPost')
        return ref.add({
            post: post,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            author: { ownerId, alias},
            visible: true
        }).then(() => {
            console.log('New Message written');
            // Returning the sanitized message to the client.
            return { message: "message Successfully added" };
        })
    } 
    //Add the post to New Unverified User Collection 
    else {
        const ref = admin.firestore().collection('newUnverifiedPost')
        return ref.add({
            post: post,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            author: { ownerId, alias},
            visible: false
        }).then(() => {
            console.log('New Message written');
            // Returning the sanitized message to the client.
            return { message: "message Successfully added" };
        })
    }
})

//This function returns true or false to verify the user input is valid
const checkUserInput = (post) => {
    const type = post.type;
    const body = post.body;
    const tags = post.tags;
    const classification = post.classifications;
    const abuseTags = ["physical", "domesticviolence", "sexual", "psychologial/emotional", "financial/marital", "modern-slavery", "discriminatory-abuse",
    "organisational/institutional", "neglect", "act-of_omission", "self-neglect"
    ]

    const suicidalTags = ["suicidal", "depression", "sad", "depressed", "suicide", "anxiety", "broken", "alone", "mentalillness", "mentalhealth", "sadness", "love", "lonely", "brokenheart",
        "crying", "sadedits", "selfharm", "quotes", "pain", "hurt", "sadquotes", "mentalhealthawareness", "memes", "suicideprevention", "heartbroken", "killme", "help", "worthless", "life"
    ]

    const mentalhealthTags = ["mentalhealth", "mentalhealthawareness", "selfcare", "selflove", "love", "anxiety", "motivation", "depression", "health", "mentalhealthmatters", "life",
        "mindfulness", "loveyourself", "wellness", "inspiration", "fitness", "healing", "happiness", "positivity", "positivevibes", "quotes", "mindset", "therapy", "covid", "instagood", "happy", "meditation", "mentalillness", "yourself"
    ]

    const a = ["Mental", "Physical", "Sexual", "Verbal/Emotional", "Financial", "Digital", "Stalking", "Emotional", "Child abuse"]
    const b = ["Impulsives", "Aggresion"]
    const c = ["Anxiety", "Depression", "Bipolar"]

    //Check type
    if(type != "abuse" && type!= "suicidal" && type != "mentalHealth") {
        return false;
    }

    //Check body
    if(body.length < 1 || body.length > 1000 || body.search(/\S{30,}/) != -1) {
        return false;
    }

    //check classification and tags
    //abuse type
    if(type == "abuse") {
        //check classification
        if(a.includes(classification) == false) {
            return false;
        }

        //check tags
        tags.forEach(element => { 
            if(abuseTags.includes(element) == false) {
                return false
            }   
        });
    }
    //suicidal type
    else if(type == "suicidal") {
        if(b.includes(classification) == false) {
            return false;
        }

        //check tags
        tags.forEach(element => { 
            if(suicidalTags.includes(element) == false) {
                return false
            }   
        }); 
    }
    //mentalHealth type
    else {
        if(c.includes(classification) == false) {
            return false;
        }

        //check tags
        tags.forEach(element => { 
            if(mentalhealthTag.includes(element) == false) {
                return false
            }   
        });
    }

    return true;}