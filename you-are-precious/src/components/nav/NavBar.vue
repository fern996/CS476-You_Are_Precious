<template>
  <nav id="navBar" class="blue-grey lighten-4" role="navigation">
    <div class="nav-wrapper container"><router-link to="/" id="logo-container" class="brand-logo pink-text text-lighten-1">
    <img src ="../../assets/Navlogo.png" id="logo">
    </router-link>
    
      <ul class="right hide-on-med-and-down">
        <MainLinks />
      </ul>

      <ul id="nav-mobile" class="sidenav">
        <UserLinks />
        <MainLinks />
      </ul>
      <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>
</template>

<script>
import {onMounted} from 'vue'
import M from 'materialize-css'
import MainLinks from '../../view-links/MainLinks'
import UserLinks from '../../view-links/UserLinks'

export default {

    name: 'NavBar',
    components:{MainLinks,UserLinks},
    setup(){
        onMounted(() =>{
             M.AutoInit()
        })
    }

}
//<router-link to="/" id="logo-container" class="brand-logo pink-text text-lighten-1">URPrecious</router-link>
</script>

<style>
#logo {
  width: 200px;
    height: 50px;
    margin: 6px;
    
}
</style>