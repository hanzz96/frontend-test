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



     <!-- Main Menu -->
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


    <!-- Sub Menu -->
    <!-- <v-navigation-drawer permanent>
      <v-list :items="submenus"> </v-list>
    </v-navigation-drawer> -->


    </div>
</template>

<script>
export default {
  data () {
      return {
        drawer: true,
        email : this.$store.state.email,
        username : this.$store.state.username,
        menus: [
          { title: 'Products', value: 1, prependIcon: 'mdi-bottle-tonic-outline'},
          { title: 'Warranty Claim', value: 2, prependIcon: 'mdi-package-check'},
          // { title: 'Starred', value: 3, prependIcon: 'mdi-star'},
          // { title: 'Gallery', value: 4, prependIcon: 'mdi-image-multiple'},
          // { title: 'Trash', value: 5, prependIcon: 'mdi-trash-can-outline'},
          // { title: 'Usage', value: 6, prependIcon: 'mdi-cloud-outline'},
        ],
        // submenus: [
        //     { type: 'subheader', title: 'Folders' },
        //     { title: 'Phohtos', value: 1, },
        //     { title: 'Recipes', value: 2, },
        //     { title: 'Vacation', value: 3, },
        //     { type: 'divider' },
        //     { type: 'subheader', title: 'Files' },
        //     { title: 'Work', value: 4, },
        //     { title: 'Project', value: 5, },
        //     { title: 'Travel', value: 6, },
        //     { title: 'Study', value: 7, },
        //     { type: 'divider' },
        // ],
        rail: true,
      }
  }
}
</script>

<style>

</style>