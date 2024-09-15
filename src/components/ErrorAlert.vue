<template>
    <v-alert
      v-if="visible"
      type="error"
      :value="visible"
      border="left"
      color="red darken-3"
      dark
    >
      {{ message }}
    </v-alert>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        required: true,
      },
      visible: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
    },
  };
  </script>
  