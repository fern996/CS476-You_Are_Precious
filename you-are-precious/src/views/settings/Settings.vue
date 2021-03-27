<template>
    <div id="settings">
        <div class="row">
            <div class="col hide-on-med-and-down offset-l1 l2">
                <UserNavBar />
            </div>
                <div class="col  s12 l9">
                    <SettingsForm />
                </div>
        </div>
        <hr />
        <InfoBox />
    </div>
    <div id="loginMessage" class="modal">
        <div class="modal-content">
            <h4>Updated Successfully!!!</h4>
            <p>Please 
                <span class="modal-close pink-text text-darken-1">re-login</span>
                to view changes.
            </p>
        </div>
        <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat pink-text text-darken-1">Login</a>
        </div>
    </div>
</template>

<script>
import UserNavBar from '../../components/nav/UserNavBar'
import InfoBox from '../../components/infobox/InfoBox'
import SettingsForm from '../../components/forms/SettingsForm'


export default {
    name:"abuse",
    components:{UserNavBar, InfoBox,SettingsForm},
    setup(){

    }
    
  }

</script>