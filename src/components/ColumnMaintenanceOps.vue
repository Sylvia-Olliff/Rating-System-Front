<template>
  <b-container fluid>
    <b-row>
      <b-col @click="viewLane" cols="1">
        <icon name="eye" />
      </b-col>
      <b-col @click="editLane" cols="1">
        <icon name="edit" />
      </b-col>
      <b-col @click="deleteLane" cols="1">
        <icon name="trash" />
      </b-col>
    </b-row>
    <modal-maintenance-view :display="showView" :laneData="data" v-on:closed="closeView" />
    <modal-maintenance-edit :display="showEdit" :laneData="data" v-on:closed="closeEdit" />
    <modal-maintenance-delete :display="showDelete" :laneData="data" v-on:closed="closeDelete" />
  </b-container>
</template>

<script>
import 'vue-awesome/icons/eye';
import 'vue-awesome/icons/edit';
import 'vue-awesome/icons/trash';
import Icon from 'vue-awesome/components/Icon';
import ModalMaintenanceView from './ModalMaintenanceView';
import ModalMaintenanceEdit from './ModalMaintenanceEdit';
import ModalMaintenanceDelete from './ModalMaintenanceDelete';

export default {
  name: 'column-maintenance-ops',
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      rnn: this.rowData.recordNum,
      data: this.rowData,
      showView: false,
      showEdit: false,
      showDelete: false
    }
  },
  methods: {
    viewLane () {
      console.log('Clicked View');
      this.showView = true;
    },
    closeView () {
      this.showView = false;
    },
    editLane () {
      console.log('Clicked edit');
      this.showEdit = true;
    },
    closeEdit () {
      this.showEdit = false;
    },
    deleteLane () {
      this.showDelete = true;
    },
    closeDelete () {
      this.showDelete = false;
    }
  },
  components: {
    Icon,
    ModalMaintenanceView,
    ModalMaintenanceEdit,
    ModalMaintenanceDelete
  }
}
</script>
