<template>
  <li id="logout" @click="handleClick" class="sidenav-close"><a href="#" class="pink-text text-lighten-1" >Logout</a></li>
</template>

<script>
import useLogout from '../../composables/logout/useLogout'
import getUser from '../../composables/get/getUser'
import { useRouter } from 'vue-router'

export default {
  name:"Logout",
  setup() {
    const router = useRouter()
    //funtion returns an error -- grab it and print out 
    const { logout} = useLogout()
    const { user } = getUser()
    const handleClick = async () => {
      return logout()
      .then((result) => {
        const { user } = getUser()
        if (!user.value) {
        router.push({ name: 'Welcome' })
      }
      })
    }

    return { handleClick, user }
  }
}
</script>