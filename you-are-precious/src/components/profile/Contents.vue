<template>
  <nav class="transparent z-depth-0">
    <div class="nav-wrapper">
      <ul class="left">
        <li><router-link :to="{ name: 'Profile', params: { profileView:'profile' }}" class="sidenav-close" :class="{'grey-text text-darken-2': profileView === 'profile'}">Profile Posts</router-link></li>
        <li><router-link :to="{ name: 'Profile', params: { profileView:'userSettings' }}" class="sidenav-close " :class="{'grey-text text-darken-2': profileView === 'userSettings'}">User Settings</router-link></li>
      </ul>
    </div>
  </nav>

  <div id="profile" v-if="profileView === `profile`">
    <div v-if="error">{{ error }}</div>
    <div v-if="formattedDocuments.length">
      <PostList :posts="formattedDocuments" />
    </div>
    <div v-else>
      <Spinner />
    </div>
    </div>


  <div id="usersettings" v-if="profileView === `userSettings`" class="col s12"><SettingsForm /></div>
</template>

<script>
import SettingsForm from '@/components/forms/SettingsForm'
import getUserPosts from '../../composables/get/getUserPosts'
import PostList from '@/components/post/PostList.vue'
import Spinner from '@/components/spinner/Spinner.vue' 
import {onMounted, watch} from 'vue'
import {useRoute} from 'vue-router'
import getUser from '@/composables/get/getUser'
import { formatDistanceToNow } from 'date-fns'
import {ref, computed} from 'vue'
export default {
  name: 'profileContent',
  components:{SettingsForm, PostList, Spinner },
  setup() { 

    const route = useRoute()
    const { user } = getUser()
    const { posts, error, load } = getUserPosts(user.value.uid)
    load()

    const formattedDocuments = computed(() => {
        if (posts.value) {
            return posts.value.map(doc => {
            let time = formatDistanceToNow(doc.createdAt.toDate())
            return { ...doc, createdAt: time }
            })
        }
        })
        
        const profileView = computed(() => {
            return route.params.profileView
        })
      return {profileView, formattedDocuments, error}

  }
}

</script>
