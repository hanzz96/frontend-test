<template>
    <v-alert
      v-if="visible"
      type="error"
      :value="visible"
      dense
      dismissible
      border="left"
      color="red darken-3"
      dark
      @input="closeAlert"
    >
      <v-icon left>mdi-alert-circle</v-icon>
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
      closeAlert() {
        this.$emit('update:visible', false);
      },
    },
  };
  </script>
  