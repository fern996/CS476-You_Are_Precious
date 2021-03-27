<template>
    <p class="createdat">{{comment.createdAt}}</p>
    <div>{{comment.comment.comment}}</div>
</template>

<script>
export default {
    props: ['comment']

}
</script>

<style>
</style>