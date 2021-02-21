<template>
  <div @click="addLikes">
    <i v-if="careColor" class="tiny: 1rem material-icons" >favorite</i>
    <i v-else class="tiny: 1rem material-icons">favorite_border </i>
    ({{subCollection.length}})
  </div>
</template>

<script>
import getLikes from '@/composables/get/getLikes'
import getSubCollection from '@/composables/get/getSubCollection'
import getUser from '@/composables/get/getUser'
import firebase from "firebase";
import {computed} from 'vue'
export default {
    props: ['postId'],
    setup(props){
    const { user } = getUser()
    const { error, subCollection } = getSubCollection(props.postId, `likes`)
    
    const addLikes = () => {    
      var likeUnlikePost = firebase.functions().httpsCallable('likeUnlikePost');
      
      likeUnlikePost({postId: props.postId})
      .then(() => {
        //  var returnMessage = result.data.message;
        //         console.log(returnMessage)
        console.log('completed like fun connection')
      })
      .catch((error) => {
        console.log(error.message)
      });

    }

      const careColor = computed(() => {

        var x = false;
        subCollection.value.forEach(like => {
          if(like.id == user.value.uid){
            x = true;
          }
        })
        return x;

      })
    
    
    return {  addLikes, subCollection, careColor  }
  }
}
</script>

<style>

</style>