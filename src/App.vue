<template>
  <router-view />
</template>

<script>
import Header from './layouts/template/AppBar.vue'
import Sidebar from './layouts/template/SideBar.vue'
import Footer from './layouts/template/Footer.vue'

export default {
  components: {
    
    Header,
    Sidebar,
    Footer,
  },
}
</script>


<style></style>
