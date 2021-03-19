<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <span v-if="post.author.alias" >{{post.author.alias}}:- </span>
          <span v-else class="card-title">Anonymous:-</span>
          <i class="tiny: 1rem material-icons grey-text text-lighten-1 right" @click="deletePost">report</i>
          <p class="createdat">{{post.createdAt}}</p>
          <p class="black-text">{{post.post.body}}</p>
          <hr />

          <span class="blue-text text-blue-6" v-for="tag in post.post.tags" :key="tag">
            #{{ tag }}
          </span>
          
          <span>
            <p class="green-text">{{post.post.classifications}}</p>
          </span>
          
          <div v-if="showComment === post.id" >
             <div class="row right-align">
                <i class="tiny: 1rem material-icons  tags " @click="showCommentList">close</i>
             </div>
            <span v-if="user && user.verfiedUser === true"><CreateCommentForm :postId="post.id" /></span>
            <CommentList :comments="formattedComments" />
          </div>
        </div>
        <div class="card-action ">          
          <span v-if="user && user.verfiedUser === true" class="tags"><Like :postId="post.id" /></span>
          <span class="tags" @click="showCommentList">Comments ({{formattedComments.length}})</span>
          <span v-if="user && user.verfiedUser === true" class="tags"><Follow :postId="post.id"/></span>
        </div>
      </div>
      
      
    </div>
  </div>
</template>

<script>
//import { formatDistanceToNow } from 'date-fns'
import getUser from '@/composables/get/getUser'
import CreateCommentForm from '../../components/forms/CreateCommentForm'
import Like from '../../components/forms/Like'
import Follow from '../../components/forms/Follow'
import { projectFirestore } from '@/firebase/config'
import CommentList from '../../components/comment/CommentList'
//import getComments from '../../composables/get/getComments'
import getSubCollection from '@/composables/get/getSubCollection'
import { formatDistanceToNow } from 'date-fns'
import {computed, ref} from 'vue'
    export default {
        props: ['post'],
        components: {CreateCommentForm, CommentList, Like, Follow},
        setup(props) { 
          const showComment = ref('')
          
          const { error, subCollection } = getSubCollection(props.post.id, `comment`)

          const formattedComments = computed(() => {
              if (subCollection.value) {
                  return subCollection.value.map(doc => {
                  let time = formatDistanceToNow(doc.createdAt.toDate())
                  return { ...doc, createdAt: time }
                  })
              }
              })


              const showCommentList = ()=> {
                if(showComment.value){
                  showComment.value = ''
                }else{
                    showComment.value = props.post.id
                }
              }

              const { user } = getUser()

              const deletePost = async()=>{
                await projectFirestore.collection("verifiedPost")
                .doc(props.post.id)
                .delete()
              }
          
          return { formattedComments, error, showComment, showCommentList, user, deletePost }
        }
    }
</script>

