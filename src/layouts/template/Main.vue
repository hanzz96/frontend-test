<template>
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
</template>

<script>
import Header from './AppBar.vue'
import Sidebar from './SideBar.vue'
import Contents from './Content.vue'
import Footer from './Footer.vue'

export default {
  components: {
    
    Header,
    Sidebar,
    Contents,
    Footer,
  },
}
</script>
