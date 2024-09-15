<template>

    <v-card>
        <v-card-title class="text-h5"> View Claim
            <v-card-text>
                Are you sure you want to {{ candidateConfirm.status }} this warranty claim?
            </v-card-text>
            <v-container>
                <v-card subtitle="Information Claim">
                    <v-card-text class="bg-surface-light pt-4">
                        <v-table>
                            <tbody>
                                <tr>
                                    <td>Product</td>
                                    <td>{{ candidateConfirm?.clickedData?.product?.name }}</td>
                                </tr>
                                <tr>
                                    <td>SN From Customer</td>
                                    <td>{{ candidateConfirm?.clickedData?.serialNumber }}</td>
                                </tr>
                                <tr>
                                    <td>Source SN Product</td>
                                    <td>{{ candidateConfirm?.clickedData?.product?.serialNumber }}</td>
                                </tr>
                                <tr>
                                    <td>Warranty Period (in Days)</td>
                                    <td>{{ candidateConfirm?.clickedData?.product?.warrantyPeriodDays }}</td>
                                </tr>
                                <tr>
                                    <td>Bought At</td>
                                    <td>{{ formatDate(candidateConfirm?.clickedData?.product?.createdAt) }}</td>
                                </tr>
                                <tr>
                                    <td>Issued At</td>
                                    <td>{{ formatDate(candidateConfirm?.clickedData?.createdAt) }}</td>
                                </tr>
                                <tr>
                                    <td>Description Issue</td>
                                    <td>{{ candidateConfirm?.clickedData?.description }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
                <slot name ="footer">
                </slot>
            </v-container>
        </v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="onCancelDialog">Cancel</v-btn>
            <v-btn color="green" @click="onActionApproval">Yes</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script>
// import { mapGetters, mapActions, mapState } from 'vuex';
import dateMixin from '@/filter/date';
export default {
    props: {
        candidateConfirm: {
            type: Object,
            required: true
        }
    },
    mixins: [dateMixin],
    name: 'FormProduct',
    data() {
        return {
            errorMessage: '',
            showErrorAlert: false,
        }
    },
    methods: {
        onActionApproval() {
            this.$emit('onActionApproval');
        },
        onCancelDialog() {
            this.$emit('onCancelDialog');
        }
    },
    mounted() {
    }
};
</script>