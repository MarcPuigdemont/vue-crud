<template>
  <b-container class="pt-3">
    <b-row no-gutters>
      <b-col>
        <h1 data-test="title">Airline List</h1>
        <b-button-group class="display_buttons">
          <b-button variant="light" class="display_button" @click="displayMode = 'list'"><i class="material-icons">view_headline</i></b-button>
          <b-button variant="light" class="display_button" @click="displayMode = 'grid'" data-test="grid-view">
            <i class="material-icons">view_module</i>
          </b-button>
        </b-button-group>
        <div class="border-top my-3"></div>
        <Toolbar class="my-3 my-lg-3" @create="openForm()" @filter="search" @service-filter="serviceFilter"></Toolbar>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <component :is="dynamicComponent" :airlines="airlines" :filter="searchFilter" :service-filter="activeFilterServices" @edit="openForm" />
    </b-row>
    <b-alert
      class="fixed-alert"
      :show="alertDismissCountDown"
      dismissible
      :variant="alertVariant"
      data-test="alert"
      @dismissed="alertDismissCountDown = 0"
    >
      {{ alertMessage }}
    </b-alert>
    <b-modal v-if="formVisible" @hidden="closeForm" :visible="formVisible" :title="action" :centered="true" size="lg">
      <AirlineForm :action="action" :entity="selectedAirline" class="mb-2" @entityUpdated="updateEntity" @validate="validateForm" />
      <template #modal-footer>
        <b-button :disabled="!formValid" variant="primary" class="mx-1 crud-form-button" data-test="button-create" @click="createAirline">
          {{ createButtonText }}
        </b-button>
        <b-button
          v-if="action === 'update'"
          :disabled="!formValid"
          variant="danger"
          class="mx-1 crud-form-button"
          data-test="button-delete"
          @click="deleteAirline"
        >
          Delete
        </b-button>
        <b-button class="ml-1 crud-form-button" data-test="button-cancel" @click="closeForm">Close</b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
// @ is an alias to /src
import AirlineForm from '@/components/AirlineForm.vue';
import AirlineList from '@/components/AirlineList.vue';
import AirlineGrid from '@/components/AirlineGrid.vue';
import Toolbar from '@/components/Toolbar.vue';
import constants from '@/constants';
import { AirlinesProxy } from '@/services/proxyService';

export default {
  name: 'Airlines',
  components: {
    AirlineForm,
    Toolbar,
  },
  data() {
    return {
      socket: null,
      airlines: [],
      action: 'create',
      selectedAirline: null,
      formVisible: false,
      displayMode: 'list',

      formEntity: null,
      formValid: false,

      searchFilter: '',
      filterServices: {},

      alertDismissCountDown: 0,
      alertMessage: '',
      alertVariant: 'success',
    };
  },
  computed: {
    activeFilterServices() {
      return Object.keys(this.filterServices).filter(key => this.filterServices[key]) || [];
    },
    createButtonText() {
      return this.action === 'create' ? 'Create' : 'Edit';
    },
    dynamicComponent() {
      return this.displayMode === 'list' ? AirlineList : AirlineGrid;
    },
  },
  mounted() {
    this.fetchList();
    this.connect();
  },
  beforeDestroy() {
    this.socket.close();
  },
  methods: {
    connect() {
      this.socket = new WebSocket(constants.WEBSOCKET_URL);
      this.socket.onmessage = event => {
        if (event.data === 'refresh') {
          this.fetchList();
          if (this.formVisible && this.action === 'update') {
            this.notifyAlert({ status: 'error', message: 'List has changed while you are editing, proceed at your own risk' });
          }
        }
      };
      this.socket.onclose = event => {
        if (!event.wasClean) {
          setTimeout(() => {
            this.connect();
            this.notifyAlert({ status: 'error', message: 'Connection lost, retrying to connect in 5 seconds' });
          }, 5000);
        }
      };
    },
    fetchList() {
      AirlinesProxy.getAirlines().then(response => (this.airlines = response.data));
    },
    notifyAlert(reason) {
      if (reason) {
        this.alertMessage = reason.message;
        this.alertVariant = reason.status === 'success' ? 'success' : 'danger';
        this.alertDismissCountDown = 10;
      }
    },
    openForm(airline) {
      if (airline) {
        this.action = 'update';
        this.selectedAirline = airline;
        this.formVisible = true;
      } else {
        this.action = 'create';
        this.formVisible = true;
      }
    },
    closeForm() {
      this.formVisible = false;
      this.selectedAirline = null;
    },
    createAirline() {
      const airline = this.formEntity;
      if (!this.formValid) {
        this.notifyAlert({ status: 'error', message: 'Airline must have iata and name' });
      } else if (this.action === 'create') {
        AirlinesProxy.addAirline(airline)
          .then(message => {
            this.notifyAlert(message);
            this.closeForm();
          })
          .catch(message => this.notifyAlert(message));
      } else {
        AirlinesProxy.editAirline(airline, this.selectedAirline)
          .then(message => {
            this.notifyAlert(message);
            this.closeForm();
          })
          .catch(message => this.notifyAlert(message));
      }
    },
    deleteAirline() {
      const airline = this.formEntity;
      AirlinesProxy.deleteAirline(airline)
        .then(message => {
          this.notifyAlert(message);
          this.closeForm();
        })
        .catch(message => this.notifyAlert(message));
    },
    updateEntity(entity) {
      this.formEntity = entity;
    },
    validateForm(valid) {
      this.formValid = valid;
    },
    search(filter) {
      this.searchFilter = filter;
    },
    serviceFilter(filter) {
      this.filterServices = filter;
    },
  },
};
</script>
<style scoped>
.display_buttons {
  position: absolute;
  top: 12px;
  right: 0;
}
.display_button {
  height: 38px;
}
.display_button:focus {
  outline: none;
  box-shadow: none;
}
.fixed-alert {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  text-align: center;
  margin-bottom: 0;
  border-radius: 0;
}
.crud-form-button {
  min-width: 70px;
}
</style>
