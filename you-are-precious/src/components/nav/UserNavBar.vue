<template>
    <ul class="z-depth-5">
        <UserLinks />
    </ul>
</template>

<script>

import UserLinks from '../../view-links/UserLinks'
export default {

    components:{UserLinks},
    setup(){
        
    }

}
</script>

<style>

.z-depth-5 li {
    padding-left: 2em;
    padding-bottom: 1.5em;
}

</style>