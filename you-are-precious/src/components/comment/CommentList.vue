<template>
    <ul class="collection">
      <li v-for="comment in comments" :key="comment.id" class="collection-item">
        <SignleComment :comment="comment"/>
      </li>
    </ul>
  
</template>

<script>
import SignleComment from './SingleComment'
export default {
    props: ['comments'],
    components: {SignleComment},
    setup(props){

    }

}
</script>

<style>

</style>