<template>
  <v-container>
    <h1>Product Management</h1>
    <p>Here, you will manage your products.</p>
    <v-data-table :items="this.allProducts" :headers="headers" item-key="_id" items-per-page="4">

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn class="mb-2" color="info" elevation="12" variant="outlined" v-bind="activatorProps">
                <b>New Productz</b>
              </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <Form @close="closeDialog" @save="closeDialog" ></Form>
            </template>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="800px">
      <v-card>
        <v-card-title class="text-h5"> Delete Product {{ candidateDelete.product }}
          <v-card-text>
            Are you sure you want to delete product <b>{{ candidateDelete.product }}</b>
          </v-card-text>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import Form from './Form.vue';
export default {
  components: {
    Form
  },
  name: 'ProductLanding',
  watch: {
    dialog(newVal) {
      console.log(newVal, 'dialog');
      if(newVal == false){
        this.resetEditProduct();
      }
    }
  },  
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { title: 'Name', key: 'product', value: 'product' },
        { title: 'Serial Number', key: 'serialNumber', value: 'serialNumber' },
        { title: 'Warranty Period In Days', key: 'warrantyPeriodDays', value: 'warrantyPeriodDays' },
        { title: 'Created At', key: 'createdAt', value: 'createdAt' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      candidateDelete: {},
      editedIndex: -1
    }
  },
  filters: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  computed: {
    ...mapGetters('product', ['allProducts']),
    ...mapState('product', {
      createProduct: state => state.createProduct,
    })
  },
  methods: {
    ...mapActions('product', ['fetchProducts', 'deleteProduct', 'editProduct','setModelProduct','resetEditProduct']),
    editItem(item) {
      this.editedIndex = this.allProducts.findIndex(product => product._id === item.value._id);
      
      this.setModelProduct(item.value);
      this.dialog = true
    },

    deleteItem(item) {
      console.log(item, 'item', item.value);
      this.editedIndex = this.allProducts.findIndex(product => product._id === item.value._id);

      if (this.editedIndex === -1) {
        //errors
        return;
      }
      console.log(this.editedIndex, 'editedIndex');
      this.candidateDelete = this.allProducts[this.editedIndex];
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.deleteProduct(this.candidateDelete._id);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    closeDialog(){
      this.dialog = false;
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>