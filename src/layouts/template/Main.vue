<template>
  <v-app :theme="this.$store.state.theme? this.$store.state.theme : 'light'"> 
      <Header />
      <Sidebar />
      <v-main>        
        <v-container fluid>     
          Hello World, this is just frontend test.
          </v-container>
        <Footer />
      </v-main>
  </v-app>
</template>

<script>
import Header from './AppBar.vue'
import Sidebar from './SideBar.vue'
import Toolbar from './Tools.vue'
import Contents from './Content.vue'
import Footer from './Footer.vue'

import Gallery from '@/components/Gallery.vue'
import List from '@/components/List.vue'

export default {
 components:{
   Header,
   Sidebar,
   Toolbar,
   Contents,
   Footer,
   Gallery,
   List
 },
}
</script>
