<template>
    <span v-if="showLogin" >
        <div  class="row header center black-text text-lighten-1"><h4>Login</h4></div>
        <LoginForm :returnView ="returnView" @showSettingsForm="showSettingsForm"/>
    </span>
    <div v-else class="row">
        <div class="row header center black-text text-lighten-1"><h4>Please Fill Out the User Form</h4></div>
        <div  class="col offset-l3"><SettingsForm/></div>
        <div class="row center black-text text-lighten-1">
            <p>Add Info Here....................</p>
        </div>
    </div>
    <InfoBox />
</template>

<script>
import LoginForm from '../../components/login/LginForm'
import SettingsForm from '../../components/forms/SettingsForm'
import InfoBox from '../../components/infobox/InfoBox'
import getUser from '@/composables/get/getUser'
import { useRouter, useRoute} from 'vue-router'
import {ref, onMounted} from 'vue'
export default {
    components:{LoginForm, SettingsForm, InfoBox},
    setup(){

        const route = useRoute()
        const router = useRouter()
        const showLogin = ref(true)
        const returnView = ref(route.params.view)
        const { user } = getUser()
        onMounted(() =>{
            if(user.value){
                //router.push({ name: 'Settings'})
                showLogin.value = false
            }else{
                showLogin.value = true
            }
        })
        const showSettingsForm = ()=>{
            showLogin.value = false
        }
    
        return {showLogin, returnView, showSettingsForm}
    }

}
</script>

<style>

</style>