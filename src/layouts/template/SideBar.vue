<template>
   <div>
   <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          :title="username"
          :subtitle="email"
          nav
        >
             <template v-slot:prepend>
           <v-avatar
              color="grey-darken-2"
            >
              <span class="text-h6">MJ</span>
          </v-avatar>
          </template>
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menus"
          :key="item.title"
          :value="item.value"
          :title="item.title"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.prependIcon"></v-icon>
          </template>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state.user);
  },
  data () {
      return {
        drawer: true,
        email : this.$store.state.role,
        username : this.$store.state.user.username,
        menus: [
          { title: 'Products', value: 1, prependIcon: 'mdi-bottle-tonic-outline'},
          { title: 'Warranty Claim', value: 2, prependIcon: 'mdi-package-check'},
        ],
        rail: true,
      }
  }
}
</script>

<style>

</style>