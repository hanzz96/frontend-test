<template>
  <v-container>
    <h1>Warranty Claim Management</h1>
    <p>Here, you will manage your approval warranty claims.</p>
    <v-data-table v-model:expanded="expanded" :items="this.allClaims" :headers="headers" item-key="_id"
      items-per-page="4" show-expand>
      <template v-slot:activator="{ props }">
        <v-btn class="mb-2" color="primary" dark v-bind="props">
          New
        </v-btn>
      </template>
      <template v-slot:item.createdAt="{ item, value }">
        {{ formatDate(item.raw.createdAt) }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip :color="chipColor(item.raw.status)">
          {{ titleCase(item.raw.status) }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-col v-if="item.raw.status === STATUS.PENDING">
          <v-btn class="ma-1" color="green" variant="text" outlined elevation="6"
            @click="actionApprovalConfirm(item, STATUS.APPROVED)">Approve</v-btn>
          <v-btn class="ma-1" color="red" variant="text" outlined elevation="6"
            @click="actionApprovalConfirm(item, STATUS.REJECTED)">Reject</v-btn>
        </v-col>

      </template>
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <!-- {{item.raw.product}} -->
            <p>Product info : {{ item.raw.product.name }}</p>
            <p>Serial Number Product : {{ item.raw.product.serialNumber }}</p>
            <p>Warranty Period (in Days) : {{ item.raw.product.warrantyPeriodDays }}</p>
            <!-- Product info {{ item.raw.product.name }}  -->
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Data Empty
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogConfirm" max-width="800px">
      
      <Approval @onActionApproval="onActionApproval" @onCancelDialog="onCancelDialog"
        :candidateConfirm="candidateConfirm" >
    
      <template #footer>
        <ErrorAlert :visible="showErrorAlert" :message="errorMessage" @update:visible="onCloseErrorAlert" />
      </template>
      </Approval>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import dateMixin from '@/filter/date';
import { STATUS } from '@/const/status';
import { titleCase } from '@/filter';
import Approval from './Approval.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
export default {
  mixins: [dateMixin],
  name: 'WarrantyClaimLanding',
  components: {
    Approval,
    ErrorAlert
  },
  data() {
    return {
      expanded: [],
      dialogConfirm: false,
      STATUS,
      showErrorAlert: false,
      errorMessage: '',
      // Define a mapping of status to colors
      statusColorMap: {
        [STATUS.APPROVED]: 'green',
        [STATUS.REJECTED]: 'red',
        [STATUS.PENDING]: 'primary'
      },
      headers: [
        { title: 'Product', key: 'product.name', },
        { title: 'Serial Number From Customer', key: 'serialNumber', },
        { title: 'Customer Issued By', key: 'customer.name', },
        { title: 'Issued At', key: 'createdAt', },
        { title: 'Status', key: 'status', },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      candidateConfirm: {}
    }
  },
  watch: {
    dialogConfirm(newVal) {
      if (newVal == false) {
        this.candidateConfirm = {};
        this.showErrorAlert = false;
        this.errorMessage = '';
      }
    }
  },
  computed: {
    ...mapGetters('warrantyClaim', ['allClaims']),
    ...mapState('warrantyClaim', {
      createProduct: state => state.createProduct,
    })
  },
  methods: {
    titleCase(string) {
      return titleCase(string);
    },
    ...mapActions('warrantyClaim', ['fetchClaims', 'actionApprovalClaim']),
    onActionApproval() {
      try {
        this.actionApprovalClaim(this.candidateConfirm)
        this.dialogConfirm = false;
      } catch (error) {
        this.errorMessage = error.message;
        this.showErrorAlert = true;
      }
    },
    actionApprovalConfirm(item, status) {
      this.dialogConfirm = true;
      Object.assign(this.candidateConfirm, { clickedData: item.value, status: status, approvedBy: this.$store.state.user.username });
    },
    chipColor(status) {
      // Return the color based on the status
      return this.statusColorMap[status] || 'default';
    },
    onCancelDialog() {
      this.dialogConfirm = false;
    },
    onCloseErrorAlert() {
      this.errorMessage = '';
      this.showErrorAlert = false;
    }
  },
  created() {
    this.fetchClaims();
  }
};
</script>