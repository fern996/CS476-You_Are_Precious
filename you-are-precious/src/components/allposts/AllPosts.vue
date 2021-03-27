<template>
    <div v-if="error">{{ error }}</div>
    <div v-if="formattedDocuments.length">
      <PostList :posts="formattedDocuments" />
    </div>
    <div v-else>
      <Spinner />
    </div>
</template>

<script>
import getAllPosts from '../../composables/get/getAllPosts'
// component imports
import PostList from '@/components/post/PostList.vue'
import Spinner from '@/components/spinner/Spinner.vue'
import { formatDistanceToNow } from 'date-fns'
import {computed} from 'vue'

export default {
  name: 'Post',
  components: { PostList, Spinner},
  setup() { 

    console.log('this is all posts')

    const { posts, error, load } = getAllPosts()
    load()

    const formattedDocuments = computed(() => {
        if (posts.value) {
            return posts.value.map(doc => {
            let time = formatDistanceToNow(doc.createdAt.toDate())
            return { ...doc, createdAt: time }
            })
        }
        })
    
    return { formattedDocuments, error }
  },
}
</script>