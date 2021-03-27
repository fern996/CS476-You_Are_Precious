<template>
<div class="row">
  <div class="col s12 l9">
    <ul>
      <li v-for="post in posts" :key="post.id">
        <SinglePost :post="post" />
      </li>
    </ul>
  </div>
  <div class="col s12 l3">
    <span class="tags" v-for="tag in tags" :key="tag">
          #<span class="pink-text">{{tag}}</span>
    </span>
  </div>
  </div>
   
</template>

<script>
import { onMounted, onUnmounted, onUpdated } from 'vue'
import useTags from '../../composables/useTags'

// component imports
import SinglePost from './SinglePost.vue'

export default {
  props: ['posts'],
  components: { SinglePost },
  setup(props) {
    const { tags } = useTags(props.posts)
    return { tags }
  }
}
</script>

<style>

</style>