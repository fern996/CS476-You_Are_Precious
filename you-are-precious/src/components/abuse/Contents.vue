<template>
  <nav class="transparent z-depth-0">
    <div class="nav-wrapper">
      <ul class="left">
        <li><router-link :to="{ name: pageName, params: { view:'Classification' }}" class="sidenav-close" :class="{'grey-text text-darken-2': view === 'Classification'}">Classification</router-link></li>
        <li><router-link :to="{ name: pageName, params: { view:'Info' }}" class="sidenav-close" :class="{'grey-text text-darken-2': view === 'Info'}">Info</router-link></li>
        <li><router-link :to="{ name: pageName, params: { view:'Post' }}" class="sidenav-close " :class="{'grey-text text-darken-2': view === 'Post'}">Post</router-link></li>
      </ul>
    </div>
  </nav>
  <div  v-if="view === `Classification`" class="col s12"><Classifications /></div>
  <div v-if="view === `Info`" class="col s12 red">Test 2</div>
  <div  v-if="view === `Post`" class="col s12"><Post :type="type"/></div>
</template>

<script>
import Classifications from '@/components/abuse/Classifications'
import Post from '@/components/abuse/Post'
import {useRoute} from 'vue-router'
import {ref, computed} from 'vue'
export default {
  name: 'Content',
  props: ['type'],
  components:{Post, Classifications},
  setup() { 
      const route = useRoute()
        
        const view = computed(() => {
            return route.params.view
        })

        const pageName = computed(() => {
            return route.params.name
        })
      return {view, pageName}

  }
}

</script>
