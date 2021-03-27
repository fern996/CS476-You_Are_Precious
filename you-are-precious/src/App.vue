<template>
    <NavBar />
    <Header />
    <br>
    <router-view  />
    <Footer />
</template>

<script>
import NavBar from './components/nav/NavBar'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

export default {
  components: { NavBar, Footer, Header }  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* label focus color */
.input-field label {
   color: #42a5f5 !important;
 }

.tags {
    padding-left: 1em;
    display: inline-block;
    color: #ec407a;
}

.tags:hover{
    color: #42a5f5;
    cursor: pointer;
}

.createdat{
    font-size: 10px;
    color: #42a5f5;
}

.sidenav-close{
        color: #ec407a;
}

.activeLink{
  color: grey;
}

</style>
