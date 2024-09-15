<template>
  <v-app-bar color="primary" :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title @click="goMain()">{{ this.$store.state.project }} <span class="text-subtitle-2 ml-1">{{
      this.$store.state.desc }}</span></v-app-bar-title>

    <template v-slot:append>

      <!-- Dark Mode -->
      <v-btn dark icon @click="onClick">
        <v-icon :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
        <v-tooltip activator="parent" location="bottom">{{ $filters.capitalize(theme) }} Theme</v-tooltip>
      </v-btn>

      <v-divider class="my-2 mx-3" vertical></v-divider>

      <v-btn class="ma-2" @click="logout()">
        <v-icon icon="mdi mdi-logout" start></v-icon>
        Logout
      </v-btn>

    </template>
  </v-app-bar>
</template>


<script>
export default {
  computed: {
    theme() {
      return this.$store.state.theme
    }
  },
  methods: {
    onClick() {
      this.$store.state.theme = this.$store.state.theme === 'light' ? 'dark' : 'light'
    },
    goMain() {
      console.log('goMain');
      this.$router.push({name:'home'});
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'login' });
    }
  }
}

</script>
