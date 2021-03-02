<template>
  <div id="welcome">
    <InfoBox />
    <ParallaxImage />
    <InfoBox />
    <ParallaxImage />
    <InfoBox />
    <ParallaxImage />
  </div>  
</template>

<script>
//import components
import InfoBox from '../../components/infobox/InfoBox'
import ParallaxImage from '../../components/parallax/ParallaxImage'
export default {
  name:"Welcome",
  components:{InfoBox, ParallaxImage}

}
</script>

<style>

</style>