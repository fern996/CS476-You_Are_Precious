<template>
        <section id="login">
            <section id="firebaseui-auth-container"></section>
            <div id="loader">Loading...</div>
        </section>
</template>

<script>
import firebase from "firebase";
import {projectAuth} from '@/firebase/config'
import * as firebaseui from "firebaseui";
import {onMounted} from 'vue'

export default {
    props: ['returnView'],
    name: "Loginform",
    setup(props, context){
        onMounted(() => {
            let ui = firebaseui.auth.AuthUI.getInstance();
            if (!ui) {
                ui = new firebaseui.auth.AuthUI(projectAuth)
            }
            var uiConfig = {
                callbacks: {
                    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    //const { user } = getUser()
                    var isNewUser = authResult.additionalUserInfo.isNewUser;
                    var providerId = authResult.additionalUserInfo.providerId;
                    if(isNewUser && providerId){
                        //console.log("new User")
                        context.emit('showSettingsForm')
                        return false;
                    }
                    else{
                        return true;
                    }
                    },
                    uiShown: function() {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                    }
                },
                signInSuccessUrl: props.returnView, // This redirect can be achived by route using callback.
                signInFlow: "popup",

                signInOptions: [
                    {
                        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                        fullLabel: 'Using Facebook'
                    },
                    {
                        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                        fullLabel: 'Using Google'
                    },
                    {
                        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
                        requireDisplayName: true,
                        fullLabel: 'Using Email'
                    },

                    //phone 
                    {
                        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                        recaptchaParameters: {
                            type: 'image', // 'audio'
                            size: 'normal', // 'invisible' or 'compact'
                            badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
                        },
                        //defaultCountry: '+44', // Set default country to the United Kingdom (+44).
                        loginHint: '+592',
                        fullLabel: 'Using Phone Number'
                    },
                    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
                    
                ]

            };
            ui.start('#firebaseui-auth-container', uiConfig);
            
        }

        )}
        
};
</script>

<style>
</style>