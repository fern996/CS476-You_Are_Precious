<template>
  <div id="infoBox" class="container">
    <div class="section">
      <!--   Icon Section   -->
      <div class="row">
        <div class="col s12 m4">
          <router-link to="/about"><div class="icon-block">
            <h2 class="center pink-text text-lighten-1"><i class="material-icons medium">info</i></h2>
            <h5 class=" black-text center">About</h5>

            <p class="light black-text center">About the website</p>
          </div></router-link>
        </div>

        <div class="col s12 m4">
          <router-link to="/terms-and-conditions"><div class="icon-block">
            <h2 class="center pink-text text-lighten-1"><i class="material-icons medium">receipt</i></h2>
            <h5 class="center black-text">Terms and Conditions</h5>

            <p class="light center black-text">Terms and Conditions of the website</p>
          </div></router-link>
        </div>

        <div class="col s12 m4">
          <router-link to="/faq"><div class="icon-block">
            <h2 class="center pink-text text-lighten-1"><i class="material-icons medium">question_answer</i></h2>
            <h5 class="center black-text">FAQ</h5>
            <p class="light center black-text">Answers to the most frequently asked questions</p>
          </div></router-link>
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
export default {
  name:"InfoBox"

}
</script>

<style>

</style>