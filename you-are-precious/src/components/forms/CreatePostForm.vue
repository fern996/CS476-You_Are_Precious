<template>
    <div v-if="loader" class="progress">
      <div class="indeterminate"></div>
    </div>
    
    <form class="center" @submit.prevent="handleSubmit">
        
        <div class="row">
            <div class="input-field col offset-l1 s8">
                <select id="type" v-model="type" required>
                    <option value="" disabled selected>Select Your Post Type</option>
                    <option value="abuse" >Abuse</option>
                    <option value="suicidal" >Suicidal</option>
                    <option value="mentalHealth">Mental Health</option>
                </select>
                
            </div>
        </div>

        <div class="row">
        <div class="col s12 offset-l1 left-align">
                <!-- Select from issue sub-type !-->
                <h6>Classifications</h6>
               
                    <div class="col s3" v-for="classifiers in classificationslist" :key="classifiers">
                        <label>
                            <input class="with-gap" v-model="classifications" :value="classifiers" :id="classifiers" name="classifications" type="radio"/>
                            <span>{{classifiers}}</span>
                        </label>
                    </div>
                
            </div>
            </div>

       

        <div class="row">
            <div class="input-field col offset-l1 s12">
                <textarea id="body" v-model="body" class="materialize-textarea" maxlength="300" minlength="4" required></textarea>
                <label for="body">Add post</label>
                <p class="light-blue-text text-lighten-1 ">Select Your Post Tags</p>
                    <span >
                        <div class="tags" v-for="tag in tagList" :key="tag" :id="tag" @click="updateTags(tag)">#{{tag}}</div>
                    </span>
            </div>
        </div>

        

        <div class="row">
            <button class="btn waves-effect waves-light pink lighten-1" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
            </button>
        </div>
    </form>
</template>

<script>
import {ref, watch} from 'vue'
import {onMounted} from 'vue'
import M from 'materialize-css'
import firebase from "firebase";
//import {timestamp} from '@/firebase/config'
import {abuseTags, suicidalTags, mentalhealthTags} from "../../tags/tags"
//import { abuseClassifications, suicidalClassifications } from "../classifications/classifications" 
export default {
    setup(){


        

        const loader = ref(false)
        //form values
        const body = ref('')
        const tags= ref([])
        const type = ref('')
        const classifications = ref('')
        
        

        onMounted(() =>{
             M.AutoInit()
        })

        const updateTags = (tag)=>{

            if (!tags.value.includes(tag)) {
                tags.value.push(tag)
                document.getElementById(tag).style.color = '#757575';
            }
            else{                
                var index = tags.value.indexOf(tag);
                if (index > -1) {
                    tags.value.splice(index, 1);
                    document.getElementById(tag).style.color = '#ec407a';
                }
            }
        }


        const handleSubmit = ()=>{

            let post = {
                body: body.value,
                tags: tags.value,
                type: type.value,
                classifications: classifications.value
            }
            
            var addNewPost = firebase.functions().httpsCallable('addNewPost');
            loader.value = true;
            addNewPost({ post: post})
            .then((result) => {
                // Read result of the Cloud Function.
                var returnMessage = result.data.message;
                console.log(returnMessage)
                //reload the page from here
                location.reload();

            })
            .catch((error) => {
                // Getting the Error details.
                console.log(error.message)
                //var message = error.message;
                //var details = error.details;
                // ...
            });

        }
        const classificationslist = ref('')
        const a = ["Mental", "Physical", "Sexual", "Verbal/Emotional", "Financial", "Digital", "Stalking", "Emotional", "Child abuse"]
        const b = ["Impulsives", "Aggresion"]
        const c = ["Anxiety", "Depression", "Bipolar"]

        //import Tags
        const tagList = ref('')

        watch(type, ()=>{
            console.log("rajuuuuuuu")
            if(type.value === 'abuse')
            {
                console.log('test')
                classificationslist.value = a
                tagList.value = abuseTags
            }
            else if (type.value === 'suicidal')
            {
                console.log('test2')
                classificationslist.value = b
                tagList.value = suicidalTags
            }
            else if (type.value === 'mentalHealth')
            {
                console.log('test3')
                classificationslist.value = c
                tagList.value = mentalhealthTags
            }
        })
        

        return {body, tagList, updateTags, type,tags, handleSubmit, loader, classifications, classificationslist}
    }
}
</script>

