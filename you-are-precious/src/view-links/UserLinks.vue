<template>

        <li class="no-padding">
        <ul class="collapsible collapsible-accordion z-depth-0">
          <li>
            <a class="collapsible-header no-padding pink-text text-darken-1">Profile<i class="material-icons">arrow_drop_down</i></a>
            <div class="collapsible-body">
              <ul>
                <li><router-link :to="{ name: 'Profile', params: { profileView:'profile' }}" class="sidenav-close" :class="{'grey-text text-darken-2': profileView === 'profile'}">Profile</router-link></li>
              <li><router-link :to="{ name: 'Profile', params: { profileView:'userSettings' }}" class="sidenav-close " :class="{'grey-text text-darken-2': profileView === 'userSettings'}">User Settings</router-link></li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
        <li class="no-padding">
        <ul class="collapsible collapsible-accordion z-depth-0">
          <li>
            <a class="collapsible-header no-padding pink-text text-darken-1">Posts<i class="material-icons">arrow_drop_down</i></a>
            <div class="collapsible-body">
              <ul>
                <li><router-link :to="{ name: 'Abuse', params: { view:'Post' }}" class="sidenav-close" :class="{'grey-text text-darken-2': page === 'Abuse'}">Abuse</router-link></li>
                <li><router-link :to="{ name: 'Suicidal', params: { view:'Post' }}" class="sidenav-close" :class="{'grey-text text-darken-2': page === 'Suicidal'}">Suicidal</router-link></li>
                <li><router-link :to="{ name: 'MentalHealth', params: { view:'Post' }}" class="sidenav-close" :class="{'grey-text text-darken-2': page === 'MentalHealth'}">Mental Health</router-link></li>
                <li><router-link :to="{ name: 'AllPosts', params: { view:'Post' }}" class="sidenav-close " :class="{'grey-text text-darken-2': page === 'AllPosts'}">All Posts</router-link></li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
      <li><router-link to="/gethelp" class="sidenav-close" :class="{'grey-text text-darken-2': page === 'GetHelp'}">Get Help</router-link></li>
      <li><router-link to="/create-post" class="sidenav-close" :class="{'grey-text text-darken-2': page === 'CreatePost'}">Create Post</router-link></li>

        
        
</template>

<script>
import {useRoute} from 'vue-router'
import {onMounted, computed} from 'vue'
import M from 'materialize-css'
export default {

  setup(){
    const route = useRoute()
    onMounted(() =>{
             M.AutoInit()
        })
    const page = computed(() => {
      return route.name
    })
    const profileView = computed(() => {
        return route.params.profileView
    })
    
      return {page, profileView}
  }

  
}
</script>
<style scoped>
        .sidenav-close{
                color: #ec407a;
        }

        .collapsible {
                margin-top: 0px;
        margin-bottom: 0px; 
                margin-left: 0px; 
                margin-right: 0px;  
        }
</style>