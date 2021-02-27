<template>
    <div>   <!-- HTML portion -->
        <div class="row">
            <div class="col hide-on-med-and-down offset-l1 l2">
                <UserNavBar />
            </div>
            <div class="col  s12 l9">
                    <GetHelpForm />
            </div>
        </div>
        <hr />
        <InfoBox />
    </div>
</template>

<script> //javascript portion
//import component
import GetHelpForm from '@/components/forms/GetHelpForm.vue'
import UserNavBar from '../../components/nav/UserNavBar'
import InfoBox from '../../components/infobox/InfoBox'

//export to HTML portion
export default {
    name:"getHelp",
    components:{UserNavBar, InfoBox, GetHelpForm},
    setup(){   
    }
}
</script>

<style>

</style>