<template>
  <router-view />
</template>

<script>
import Header from './layouts/template/AppBar.vue'
import Sidebar from './layouts/template/SideBar.vue'
import Toolbar from './layouts/template/Tools.vue'
import Footer from './layouts/template/Footer.vue'

export default {
  components: {
    
    Header,
    Sidebar,
    Toolbar,
    Footer,
  },
}
</script>


<style></style>
