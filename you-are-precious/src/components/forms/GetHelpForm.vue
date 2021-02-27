<template>
  <div>
      <form class="col s12 l9" @submit.prevent="handleSubmit">
          <div class="row center"><h1 class="header center pink-text text-lighten-1">Help Is Always Here</h1></div>
          <div class ="row">
              <div class="input-field col s12 l6">
                <input id="first_name" v-model="first_name" type="text" class="validate">
                <label for="first_name">First Name</label>
              </div>
                <div class="input-field col s12 l6">
                <input id="last_name" v-model="last_name" type="text" class="validate">
                <label for="last_name">Last Name</label>
              </div>
          </div>
          <div class ="row">
                <div class="input-field col s12 l6">
                    <select v-model="race" id="race">
                    <option value=""  disabled selected><span class="pink-text">Select your race</span></option>
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
              <div class="input-field col s12 l6">
                <input id="userLocation" v-model="userLocation" type="text">
                <label for="userLocation">Location</label>
              </div>
          </div>
          <div class = "row">
              <div class="input-field col s12 l6">
                <input id="email" v-model="email" type="email">
                <label for="email">Email</label>
              </div>
            <div class="input-field col s6">
            <input id="phone" v-model="phone" type="tel">
            <label for="phone">Telephone</label>
            </div>
          </div>
          
          <div class = "row">
            <div class="switch">
                <label>
                <input type="checkbox" v-model="permission">
                <span class="lever"></span>
                Is it ok if someone contacts you?
                </label>
            </div>
          </div>
 
          
        <div class="row">         
            <div class="input-field col s12">
            <textarea id="issue" v-model="body" class="materialize-textarea" maxlength="5000"></textarea>
            <label for="issue">What are you going through...</label>
            </div>
        </div>
        <div class="row center">
            <Spinner v-if="loading"/>
            <p class="red-text text-darken-2">{{error}}</p>
            <button class="btn waves-effect waves-light pink lighten-1" type="submit" name="action">
                <span>Submit</span>
                <i class="material-icons right">send</i>
            </button>
        </div>
      </form>
  </div>
</template>

<script>

import Spinner from '../spinner/Spinner'
import firebase from "firebase"
import {ref} from 'vue'
export default {
    components:{Spinner},
    setup(){
        const first_name = ref('')
        const last_name = ref('')
        const race = ref('')
        const userLocation = ref('')
        const email = ref('')
        const phone = ref('')
        const permission = ref(false)
        const body = ref('')
        const error = ref('')
        const loading = ref(false)
        
        const handleSubmit = ()=>{
            
            var errorMessage = '';
            let helpForm = {
                first_name: first_name.value,
                last_name: last_name.value,
                race: race.value,
                userLocation: userLocation.value,
                email: email.value,
                phone: phone.value,
                permission: permission.value,
                body: body.value 
            }
            // if(!checkhelpForm(helpForm)){
            //     //error.value = "invalid input"
            //     throw "invalid input"
            // }
            
            var emailRegex = /^\w{1,40}\@[\w\.]{1,20}\.[a-zA-Z]{1,3}$/;
            var phoneRegex = /^[0-9]{10}$/;

            //check first name
            if(helpForm.first_name.length > 30 || helpForm.first_name.length < 1) {
              errorMessage = errorMessage + "First Name is required and needs to less than 30 letters.";
            }

            //check last name
            else if(helpForm.last_name.length > 30 || helpForm.last_name.length < 1) {
              errorMessage = errorMessage + "\nLast Name is required and needs to less than 30 letters.";
            }
            
            //check location
            else if(helpForm.userLocation.length > 50) {
              errorMessage = errorMessage + "\nLocation can't be longer than 50 letters.";
            }

            //check email and/or phone
            else if(!(emailRegex.test(helpForm.email) || phoneRegex.test(helpForm.phone))) {
              errorMessage = errorMessage + "\nYou need to provide aleast one valid contact method: Email or Phone Number";
            }

            //check message typed by the user
            else if(helpForm.body < 1) {
              errorMessage = errorMessage + "\nPlease provide some details. ";
            }

            else if(helpForm.body.search(/\S{50,}/) != -1) {
              errorMessage = errorMessage + "\nYou can't use words longers than 50 characters in the message.";
            }
            

            //If there are no user input errors then submit the form
            if(errorMessage == '') {
              loading.value = true;
              var submitGetHelpForm = firebase.functions().httpsCallable('submitGetHelpForm');
              //loader.value = true;
              submitGetHelpForm({ helpForm: helpForm})
              .then((result) => {
                  // Read result of the Cloud Function.
                  var message = result.data.message;
                  console.log(message)
                  location.reload();
              })
              .catch((err) => {
                  loading.value = false;
                  //console.log(err.message)
                  error.value = err.message
              });
            }
            //add the error value to error variable
            else {error.value = errorMessage}

            
          }
        return {first_name,last_name,race,userLocation,email,phone,body,permission,error,loading,handleSubmit}
    }
}


</script>

<style>

</style>
