<template>
    <div id="header" class="parallax-container">
        <div class="section no-pad-bot">
            <div class="container">
                <br><br>
                <h1 class="header center pink-text text-lighten-1">Help Is Always Here</h1>
                <br><br>
            </div>
        </div>
        <div class="parallax"><img src="../../assets/test3.jpg" alt="Unsplashed background img 1"></div>
    </div>
</template>

<script>
import { onMounted} from 'vue'
import M from 'materialize-css'
export default {
    name:"Header",
    props:['image'],
    setup(){
    onMounted(() =>{
             M.AutoInit()
        })

  }

}
</script>

<style>
.parallax-container {
  min-height: 380px;
  line-height: 0;
  height: auto;
  color: rgba(255,255,255,.9);
}
  .parallax-container .section {
    width: 100%;
  }

@media only screen and (max-width : 992px) {
  .parallax-container .section {
    position: absolute;
    top: 40%;
  }
  #header .section {
    top: 10%;
  }
}

@media only screen and (max-width : 600px) {
  #header .section {
    top: 0;
  }
}
</style>