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
              <span class="text-h6">JO</span>
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
          :to="item.value"
           @click="handleClick(item.value)"
          :disabled="isCurrentRoute(item.value)"
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
  },
  data () {
      return {
        drawer: true,
        email : this.$store.state.role,
        username : this.$store.state.user.username,
        menus: [
          { title: 'Products', value: "/product", prependIcon: 'mdi-bottle-tonic-outline'},
          { title: 'Warranty Claim', value: "/warranty-claim", prependIcon: 'mdi-package-check'},
        ],
        rail: true,
      }
  },
  methods: {
    goTo(value) {
      this.$router.push({ name: value });
    },
    isCurrentRoute(path) {
      return this.$route.path === path;
    },
    handleClick(to) {
      if (this.isCurrentRoute(to)) {
        // Prevent navigation if already on the route
        event.preventDefault(); // Prevent default action (navigation)
      }
    }
  }
}
</script>

<style>

</style>