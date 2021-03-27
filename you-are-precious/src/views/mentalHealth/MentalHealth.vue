<template>
    <div id="createPost">
        <div class="row">
            <div class="col hide-on-med-and-down offset-l1 l2">
                <UserNavBar />
            </div>
                <div class="col  s12 l9">
                    <Contents type="mentalHealth" />
                </div>
        </div>
        <hr />
        <InfoBox />
    </div>
</template>

<script>
import UserNavBar from '../../components/nav/UserNavBar'
import InfoBox from '../../components/infobox/InfoBox'
import Contents from '../../components/abuse/Contents'


export default {
    name:"mentalHealth",
    components:{UserNavBar, InfoBox,Contents},
    setup(){
        
    }
    
  }

</script>