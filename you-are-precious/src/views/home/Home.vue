<template>
    <div id="createPost">
        <div class="row">
            <div class="col hide-on-med-and-down offset-l1 l2">
                <UserNavBar />
            </div>
            <div class="col pink-text s12 l8 h2 center">
                    <h5>Welcome to You Are Precious. We hope this website provides you with the help and support you need. Use the links in the sidebar to navigate through the website and remember</h5>
                    <h5>YOU ARE PRECIOUS!!</h5>
            </div>
        </div>
        <hr />
        <InfoBox />
    </div>
</template>

<script>
import UserNavBar from '../../components/nav/UserNavBar'
import InfoBox from '../../components/infobox/InfoBox'
import getUser from '@/composables/get/getUser'
import { useRouter } from 'vue-router'
import {onMounted} from 'vue'

export default {
    name:"CreatePost",
    components:{UserNavBar, InfoBox},
    setup(){
        const { user } = getUser()
        const router = useRouter()
        onMounted(() =>{

             if(user.value && user.value.verfiedUser && user.value.setUp === false){
                 router.push({ name: 'Settings'})
             }
             else if(user.value && typeof user.value.verfiedUser === "undefined" && typeof user.value.providerData[0] != "undefined"){
                 router.push({ name: 'Settings'})
             }
             
        })
    }

}
</script>


