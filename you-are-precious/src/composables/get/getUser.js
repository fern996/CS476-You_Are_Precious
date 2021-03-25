import { ref } from 'vue'
import { projectAuth } from '../../firebase/config'

// refs
const user = ref(projectAuth.currentUser)

// listen for auth changes outside of function
// so only 1 listener is ever attached
projectAuth.onAuthStateChanged(_user => {
    //console.log('User state change. Current user is:', _user)

    if (_user) {

        _user.getIdTokenResult().then((idTokenResult) => {
                // Confirm the user is an Admin.
                _user.verfiedUser = idTokenResult.claims.verfiedUser;
                _user.setUp = idTokenResult.claims.setUp;
                _user.alias = idTokenResult.claims.alias;
                _user.gender = idTokenResult.claims.gender;
                _user.otherGender = idTokenResult.claims.otherGender;
                _user.age = idTokenResult.claims.age;
                _user.race = idTokenResult.claims.race;
                _user.region = idTokenResult.claims.region;
                _user.accountNumber = idTokenResult.claims.accountNumber

            })
            .catch((error) => {
                console.log(error);
            });
    }

    user.value = _user

});

const getUser = () => {
    return { user }
}

export default getUser