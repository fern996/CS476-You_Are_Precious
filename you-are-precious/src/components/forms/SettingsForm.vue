<template>
  <div class="row">
    <div class="col s12 l6">
        <p class="left-align">Information collected are not personal identifiable data these data are for Analysis purposes. Providing accurate information will aid in better analysis to help users.</p>
    </div>
    <form class="col s12 l9" @submit.prevent="handleSubmit">
        <div class="row">
            <!-- else display the name here !-->
            <div v-if="user && user.setUp" class="input-field col s12 l6">
                <h4 class="head">{{alias}}-urp{{user.accountNumber}}</h4>
            </div>
            <!-- ask user to set name if not set already !-->
            <span v-else>
            <div class="col s12">
            <p>Alias Can not be changed once set.</p>
            </div>
            <div class="input-field col s12 l6">
                <i class="material-icons prefix">account_circle</i>
                <input id="icon_prefix" v-model="alias" type="text" pattern="^[a-zA-Z]+[a-zA-z0-9]+\s?" maxlength="15" minlength="2" class="validate" required>
                <label for="icon_prefix" >Alias</label>
                <span class="helper-text left-align">
                    Alias must be 2 to 15 charcters in length. Starting with a Letter and includes no special character. e.g bob002
                </span>
            </div>
            </span>
            <div class="col s12">
                <hr>
                <!-- Select from gender !-->
                <h6>Gender</h6>
                <p>
                    <label>
                        <input class="with-gap" v-model="gender" value="Male" id="Male" name="Gender" type="radio"/>
                        <span>Male</span>
                    </label>
                    <span>
                        <label>
                            <input class="with-gap" v-model="gender" value="Female" id="Female" name="Gender" type="radio"/>
                            <span>Female</span>
                        </label>
                    </span>
                    <span>
                        <label>
                            <input class="with-gap" v-model="gender" value="Other" id="Other" name="Gender" type="radio"/>
                            <span>Other gender identification</span>
                        </label>
                    </span>
                </p>
            </div>
            <div class="col s12">
                <p>If you choosed "Other gender identification" please provide your spedific gender identity</p>
            </div>
            <div class="input-field col s12 l6">
                <i class="material-icons prefix">person_outline</i>
                <input v-if="gender == `Other`" id="otherGender" v-model="otherGender" type="text" pattern="^[a-zA-Z]+([a-zA-Z]+\s?)*$" class="validate" maxlength="20" minlength="3" required/>
                <input v-else id="otherGender" disabled="disabled"/>
                <label v-if="otherGender == `` || gender == `Male` || gender == `Female`" for="otherGender">Specify your Gender here</label>
                <span class="helper-text left-align">
                    Accepts leters wors and white space only
                </span>
            </div>
            <div class="col s12">
                <hr>
                <h6>Age</h6>
                <p>
                    <label>
                        <input class="with-gap" v-model="age" value="18 or Under" id="18 or Under" name="Age" type="radio" required/>
                        <span>18 or Under</span>
                    </label>
                    <span>
                        <label>
                            <input class="with-gap" v-model="age" value="19-30" id="19-30" name="Age" type="radio"  />
                            <span>19-30</span>
                        </label>
                    </span>
                    <span>
                        <label>
                            <input class="with-gap" v-model="age" value="31-59" id="31-59" name="Age" type="radio"  />
                            <span>31-59</span>
                        </label>
                    </span>
                    <span>
                        <label>
                            <input class="with-gap" v-model="age" value="60 or Over" id="60 or Over" name="Age" type="radio" />
                            <span>60 or Over</span>
                        </label>
                    </span>
                </p>
                <hr>
            </div>
            <div class="col s12 l6">
                <h6>Race:</h6>
                    <select class="browser-default" v-model="race" id="race" required>
                    <option value=""  disabled selected><span class="pink">Select your race</span></option>
                    <option value="African">African</option>
                    <option value="Amerindian">Amerindian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="East Indian">East Indian</option>
                    <option value="Europeans">Europeans</option>
                    <option value="Mixed">Mixed</option>
                    <option value="Portuguese">Portuguese</option>
                    <option value="Others">Others</option>
                </select>
            </div>
            <div class="col s12 l6">
                <h6>Region:</h6>
                <select class="browser-default" v-model="region" id="region" required>
                    <option value="" disabled selected>Select Your Region</option>
                    <option value="1">Region 1</option>
                    <option value="2">Region 2</option>
                    <option value="3">Region 3</option>
                    <option value="4">Region 4</option>
                    <option value="5">Region 5</option>
                    <option value="6">Region 6</option>
                    <option value="7">Region 7</option>
                    <option value="8">Region 8</option>
                    <option value="9">Region 9</option>
                    <option value="10">Region 10</option>
                </select>
            </div>
        </div>
        <div class="row center">
            <Spinner v-if="loading"/>
            <p class="red-text text-darken-2">{{error}}</p>
            <button class="btn waves-effect waves-light pink lighten-1" type="submit" name="action">
                <span v-if="user && !user.setUp">Submit</span>
                <span v-else>Update</span>
                <i class="material-icons right">send</i>
            </button>
        </div>
    </form>
  </div>
  <div id="loginMessage" class="modal">
        <div class="modal-content">
            <h4>Updated Successfully!!!</h4>
            <p>Please 
                <span class="modal-close pink-text text-darken-1">re-login</span>
                to view changes.
            </p>
        </div>
        <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat pink-text text-darken-1">Login</a>
        </div>
    </div>
  
</template>

<script>
import {ref, onMounted} from 'vue'
import firebase from "firebase";
import getUser from '@/composables/get/getUser'
import Spinner from '../spinner/Spinner'
import useLogout from '../../composables/logout/useLogout'
import { useRouter } from 'vue-router'

export default {
    components:{Spinner},
    setup(props, context){
        const alias = ref('')
        const gender = ref('')
        const otherGender = ref('')
        const age = ref('')
        const race = ref('')
        const region = ref('')
        const { user } = getUser()
        const loading = ref(false)
        const { logout} = useLogout()
        const router = useRouter()
        const error = ref('')

        const handleSubmit = ()=>{
            let userInfo = {
                alias: alias.value.trim(),
                gender: gender.value,
                otherGender: otherGender.value.trim(),
                age: age.value,
                race: race.value,
                region: region.value
            }
            if(!checkUserInfo(userInfo)){
                //error.value = "invalid input"
                throw "invalid input"
            }
            loading.value = true;
            var setUserInfo = firebase.functions().httpsCallable('setUserInfo');
            //loader.value = true;
            setUserInfo({ userInfo: userInfo})
            .then((result) => {
                // Read result of the Cloud Function.
                var message = result.data.message;
                console.log(message)
                //send user to login page to refresh token
                    return logout()
            }).then((result) => {
                //context.emit('login')
                var Modalelem = document.querySelector('.modal');
                var instance = M.Modal.init(Modalelem,{ onCloseEnd: onModalClose});
                instance.open();
            })
            .catch((err) => {
                loading.value = false;
                //console.log(err.message)
                error.value = err.message
            });

        }

        const onModalClose = ()=>{
            router.push({ name: 'Login',params: { view: '/settings' }})
        }

        onMounted(() =>{
            if(user.value && user.value.setUp){
                document.getElementById(user.value.gender).checked = true;
                if(user.value.otherGender){
                    otherGender.value = user.value.otherGender
                }
                document.getElementById(user.value.age).checked = true;
                document.getElementById('race').value=user.value.race;
                document.getElementById('region').value=user.value.region;
                alias.value = user.value.alias;
                gender.value = user.value.gender;
                otherGender.value = user.value.otherGender;
                age.value = user.value.age;
                race.value = user.value.race;
                region.value = user.value.region;
            }
        });
    const checkUserInfo = (userInfo) => {
        const raceArray = ["African", "Amerindian", "Chinese", "East Indian", "Europeans", "Mixed", "Portuguese", "Others"]
        const genderArray = ["Male", "Female", "Other"]
        const ageArray = ["18 or Under", "19-30", "31-59", "60 or Over"]
        const regionArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]    

        if(!userInfo.alias.match("^[a-zA-Z]+[a-zA-z0-9]+\s?")){
            error.value = "invalid alias"
            return false;
        }
        else if(!genderArray.includes(userInfo.gender)){
            error.value = "invalid gender"
            return false
        }
        else if(userInfo.gender === "Other" && !userInfo.otherGender.match("^[a-zA-Z]+([a-zA-Z]+\s?)*$")){
            error.value = "invalid other gender"
            return false;
        }
        else if(!ageArray.includes(userInfo.age)){
            error.value = "invalid age"
            return false
        }
        else if(!raceArray.includes(userInfo.race)){
            error.value = "invalid race"
            return false;
        }
        else if(!regionArray.includes(userInfo.region)){
            error.value = "invalid region"
            return false;
        }
        else{
            return true;
        }
    }

        return{alias, gender,otherGender, age, race, region, handleSubmit, user, loading, error}
        
    }

}
</script>

<style scoped>
    p span {
    padding-left: 1em;
    color: #ec407a;
    }

    .pink {
        color: pink;
    }

    hr{
        height: 1px;
        background-color: #ccc;
        border: none;
    }
</style>