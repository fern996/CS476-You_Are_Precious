<template>
    <div @click="followUnfollow">
        <span v-if="followCheck">UnFollow</span>
        <span v-else>Follow</span>
        ({{subCollection.length}})
    </div>
</template>

<script>
import getSubCollection from '@/composables/get/getSubCollection'
import getUser from '@/composables/get/getUser'
import firebase from "firebase";
import {computed} from 'vue'
export default {
    props: ['postId'],
    setup(props){
    const { user } = getUser()
    const { error, subCollection } = getSubCollection(props.postId, `followers`)

    const followUnfollow = () => {
        var followUnfollowPost = firebase.functions().httpsCallable('followUnfollowPost');

        followUnfollowPost({postId: props.postId})
        .then(() =>{
            console.log('completed followUnfollow')
        })
        .catch((error) => {
            console.log(error.message)
        })


    }

    const followCheck = computed(() => {

        var x = false;
        subCollection.value.forEach(like => {
            if(like.id == user.value.uid){
            x = true;
            }
        })
        return x;

    })



    return { subCollection, followUnfollow, followCheck }
    }
}
</script>

