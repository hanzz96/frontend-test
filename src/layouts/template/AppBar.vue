<template>
    <v-app-bar
      color="primary"
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      :elevation="2"
    >
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title @click="goMain()">{{this.$store.state.project}} <span class="text-subtitle-2 ml-1">{{this.$store.state.desc}}</span></v-app-bar-title>

      <template v-slot:append>
         
          <!-- Dark Mode -->
          <v-btn dark icon @click="onClick">
            <v-icon :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
             <v-tooltip
              activator="parent"
              location="bottom"
            >{{ $filters.capitalize(theme) }} Theme</v-tooltip>
          </v-btn>

          <v-divider
              class="my-2 mx-3"
              vertical
          ></v-divider>

          <!-- Setting -->
           <v-menu>
          <template v-slot:activator="{ props }">
             <v-btn dark icon
              v-bind="props"
            >
               <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

         <!-- Notification-->
         <v-btn dark icon>
          <v-badge content="2" color="error">
            <v-icon>mdi-bell</v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
            >Notification</v-tooltip>
          </v-badge>
        </v-btn>

      </template>
    </v-app-bar>
</template>


<script>
export default {
  data () {
      return {
       items: [
        { title: 'Profile' },
        { title: 'Alert' },
        { title: 'Setting' },
        { title: 'Logout' },
      ],
     }
  },
  computed: {
    theme() {
      return this.$store.state.theme
    }
  },
  methods : {
    onClick () {
       this.$store.state.theme =  this.$store.state.theme === 'light' ? 'dark' : 'light'
    },
    goMain(){
       this.$router.push('/');
    },
  }
}

</script>
