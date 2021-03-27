<template>
    <div id="createPost">
        <div class="row">
            <div class="col hide-on-med-and-down offset-l1 l2">
                <UserNavBar />
            </div>
                <div class="col  s12 l5 center">
                    <CreatePostForm />
                </div>
        </div>
        <hr />
        <InfoBox />
    </div>
</template>

<script>
import UserNavBar from '../../components/nav/UserNavBar'
import InfoBox from '../../components/infobox/InfoBox'
import CreatePostForm from '../../components/forms/CreatePostForm'
export default {
    name:"CreatePost",
    components:{UserNavBar, InfoBox, CreatePostForm}

}
</script>


