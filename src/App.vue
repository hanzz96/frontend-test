<template>
  <router-view />
  <!-- <div class="app">
    <v-locale-provider>
      <v-app :theme="this.$store.state.theme ? this.$store.state.theme : 'light'">
        <Header />
        <Sidebar />
        <v-main>
          <router-view />
          <Footer />
        </v-main>
      </v-app>
    </v-locale-provider>
  </div> -->

</template>

<script>
import Header from './layouts/template/AppBar.vue'
import Sidebar from './layouts/template/SideBar.vue'
import Toolbar from './layouts/template/Tools.vue'
// import Contents from './Content.vue'
import Footer from './layouts/template/Footer.vue'

export default {
  components: {
    
    Header,
    Sidebar,
    Toolbar,
    // Contents,
    Footer,
  },
}
</script>


<style></style>
