<template>
  <div id="parallaxImage" class="parallax-container valign-wrapper">
    <div class="section no-pad-bot">
      <div class="container">
        <div class="row center">
          <h5 class="header col s12 light">Message About the Image here</h5>
        </div>
      </div>
    </div>
    <div class="parallax"><img src="../../assets/test2.jpg" alt="Unsplashed background img 2"></div>
  </div>
</template>

<script>
import { onMounted} from 'vue'
import M from 'materialize-css'
export default {
    name:"ParalaxImage",
    setup(){
    onMounted(() =>{
             M.AutoInit()
        })

  }

}
</script>

<style scoped>
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
  #index-banner .section {
    top: 10%;
  }
}

@media only screen and (max-width : 600px) {
  #index-banner .section {
    top: 0;
  }
}
</style>