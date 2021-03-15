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
import getPosts from '../../composables/get/getPosts'
// component imports
import PostList from '@/components/post/PostList.vue'
import Spinner from '@/components/spinner/Spinner.vue'
import { formatDistanceToNow } from 'date-fns'
import {computed} from 'vue'

export default {
  name: 'Post',
  props: ['type'],
  components: { PostList, Spinner},
  setup(props) { 


    const { posts, error, load } = getPosts(props.type)
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