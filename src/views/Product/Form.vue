<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <ErrorAlert :message="errorMessage" :visible="showErrorAlert" @close="closeErrorAlert" />
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="modelProduct.product" label="Product name" required
                            :rules="productRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="modelProduct.serialNumber" label="Serial Number" required
                            :rules="serialNumberRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="12">
                        <v-text-field v-model="modelProduct.warrantyPeriodDays" label="Warranty Period In Days"
                            :rules="warrantyPeriodDaysRules" required></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
            </v-btn>

        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
    name: 'FormProduct',
    data() {
        return {
            errorMessage: '',
            showErrorAlert: false,
            productRules: [
                value => {
                    if (value?.length >= 3) return true
                    return 'First name must be at least 3 characters.'
                },
            ],
            serialNumberRules: [
                value => {
                    if (value?.length >= 3) return true
                    return 'Serial Number must be at least 5 characters.'
                },
            ],
            warrantyPeriodDaysRules: [
                value => {
                    if (/^[1-9]\d*$/.test(value)) return true;
                    return 'Warranty Period In Days must be a number.'
                },
            ]
        }
    },
    computed: {
        ...mapState('product', {
            modelProduct: state => state.modelProduct,
        }),
        ...mapGetters('product', ['allProducts']),
        formTitle() {
            return Object.hasOwn(this.modelProduct, '_id') ? 'Edit Product' : 'New Product';
        }
    },
    methods: {
        ...mapActions('product', ['addProduct', 'editProduct']),
        validateData() {
            const findUniqueSnAndProduct = this.allProducts.find(product => product.serialNumber === this.modelProduct.serialNumber && product.product === this.modelProduct.product);
            
            if (findUniqueSnAndProduct) {
                this.errorMessage = 'Serial Number and Product must be unique';
                this.showErrorAlert = true;
                return false;
            }
            return true;
        },  
        save() {
            /**
             * its frontend test, i dont think i need to validate uniqueness ofdata
             */
            // if(!this.validateData()) {
            //     return;
            // }
            if (Object.hasOwn(this.modelProduct, '_id')) {
                this.editProduct(this.modelProduct);
            } else {
                this.addProduct(this.modelProduct);
            }
            this.$emit('save');
        },
        close() {
            this.$emit('close');
        },
    },
};
</script>