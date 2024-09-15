<template>
  <v-parallax
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <div class="d-flex flex-column fill-height justify-center align-center text-white">
      <h1 class="text-h4 font-weight-thin mb-4">
        Vue3 + Vuetify
      </h1>
      <h4 class="subheading">
        Vuetify Start Template for Vue3 by 100SANG
      </h4>    
      <v-btn rounded="xl" size="large"  append-icon="mdi-arrow-right" variant="outlined mt-8" @click="goDemo()">START</v-btn>     
    </div>

  </v-parallax>
</template>

<script>
import Gallery from '@/components/Gallery.vue'
import List from '@/components/List.vue'

export default {
 components:{
   Gallery,
   List
 },
 methods : {
   goDemo(){
     this.$router.push('/demo');
   },
 }
}
</script>
