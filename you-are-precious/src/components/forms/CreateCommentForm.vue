<template>
    <div class="col s12">
      <div class="row">
        <div class="input-field col s11">
          <textarea :id="postId" v-model="comment" class="materialize-textarea"></textarea>
          <i class="material-icons prefix pointer" @click ="handleCommentSubmit">send</i>
          <label :for="postId">Comment ...........</label>
        </div>
      </div>
    </div>
</template>
<script>
import firebase from "firebase";
import {ref} from 'vue'
    export default {
        props: ['postId'],
        setup(props){
            const postId = props.postId
            const comment = ref('')

            const handleCommentSubmit = ()=>{

                var addNewComment = firebase.functions().httpsCallable('addNewComment');
                addNewComment({postId: postId, comment: comment.value })
                .then((result) => {
                    // Read result of the Cloud Function.
                    var message = result.data.message;
                    console.log(message)
                    //reload the page from here
                    //location.reload();
                    comment.value = ""

                })
                .catch((error) => {
                    // Getting the Error details.
                    console.log(error.message)
                    //var message = error.message;
                    //var details = error.details;
                    // ...
                });

            }

            return {comment, handleCommentSubmit}
        }
    }
</script>
<style scoped>
.pointer {cursor: pointer;}
.pointer:hover {color: #ff5252 }
.input-field:focus{
    color: yellow;
}
</style>