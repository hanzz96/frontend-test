<template>
   <v-footer color="copyright" app inset height="45">

      <h5 class="font-weight-light">{{ new Date().getFullYear() }} — <strong>Vuetify Theme</strong></h5>
      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-2"
        :icon="icon"
        variant="plain"
        size="small"
      ></v-btn>

  </v-footer>
</template>

<script>
export default {
   data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
}
</script>

<style>

</style>