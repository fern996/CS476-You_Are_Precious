<template>
    <div id="createPost">
        <div class="row">
            <div class="col hide-on-med-and-down offset-l1 l2">
                <UserNavBar />
            </div>
            <div class="col  s12 l8">
                 <Contents />
            </div>
        </div>
        <hr />
        <InfoBox />
    </div>
</template>

<script>
import UserNavBar from '../../components/nav/UserNavBar'
import Contents from '../../components/profile/Contents'
import InfoBox from '../../components/infobox/InfoBox'


export default {
    name:"CreatePost",
    components:{UserNavBar, Contents, InfoBox},
    setup(){

    }

}
</script>
