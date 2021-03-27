<template>

        <li><router-link to="/home" class="sidenav-close " :class="{'grey-text text-darken-2': page === 'Home'}">Home</router-link></li>
        <li><router-link to="/about" class="sidenav-close " :class="{'grey-text text-darken-2': page === 'About'}">About</router-link></li>
        <li><router-link to="/terms-and-conditions" class="sidenav-close " :class="{'grey-text text-darken-2': page === 'TermsAndConditions'}">Terms &amp; Conditions </router-link></li>
        <li><router-link to="/faq" class="sidenav-close " :class="{'grey-text text-darken-2': page === 'Faq'}">FAQ</router-link></li>
        <li v-if="user" ><Logout /></li>
        <li v-else><router-link  :to="{ name: 'Login', params: { view:'/home' }}" class="sidenav-close ">Login</router-link></li>
        <li v-if="!user"><router-link  :to="{ name: 'Signup', params: { settings:'/home' }}" class="sidenav-close ">Signup</router-link></li>
        
        
</template>
<script>
import Logout from '../components/logout/Logout'
import getUser from '../composables/get/getUser'
import {useRoute} from 'vue-router'
import {computed} from 'vue'
export default {
    components:{Logout},
    setup(){
        const {user} = getUser()
        const route = useRoute()
        const page = computed(() => {
                return route.name
        })
    
            return {user, page}
    }
}
//<li v-if="!user"><router-link  :to="{ name: 'Signup', params: { view:'/home' }}" class="sidenav-close ">Signup</router-link></li>
</script>
<style scoped>
.sidenav-close{
        color: #ec407a;
}
</style>