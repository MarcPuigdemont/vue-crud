<template>
  <b-container class="pt-3">
    <b-row no-gutters>
      <b-col>
        <h1>Airline List</h1>
        <b-button-group class="display_buttons">
          <b-button variant="light" class="display_button" @click="displayMode = 'list'"><i class="material-icons">view_headline</i></b-button>
          <b-button variant="light" class="display_button" @click="displayMode = 'grid'"><i class="material-icons">view_module</i></b-button>
        </b-button-group>

        <div class="border-top my-3"></div>
        <Toolbar class="my-3 my-lg-3" @create="create" @filter="search" @service-filter="serviceFilter"></Toolbar>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <component :is="dynamicComponent" :airlines="airlines" :filter="searchFilter" :service-filter="activeFilterServices" @edit="edit" />
    </b-row>
    <b-alert class="fixed-alert" :show="alertDismissCountDown" dismissible :variant="alertVariant" @dismissed="alertDismissCountDown = 0">
      {{ alertMessage }}
    </b-alert>
    <b-modal v-if="formVisible" @hidden="close" :visible="formVisible" :title="action" :hide-footer="true" :centered="true" size="lg">
      <AirlineForm :action="action" :entity="selectedAirline" class="mb-2" @notify="notifyAlert" @close="close" />
    </b-modal>
  </b-container>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import AirlineForm from '@/components/AirlineForm.vue';
import AirlineList from '@/components/AirlineList.vue';
import AirlineGrid from '@/components/AirlineGrid.vue';
import Toolbar from '@/components/Toolbar.vue';
import constants from '@/constants';

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
            this.notifyAlert({ result: 'error', message: 'List has changed while you are editing, proceed at your own risk' });
          }
        }
      };
      this.socket.onclose = event => {
        if (!event.wasClean) {
          setTimeout(() => {
            this.connect();
            this.notifyAlert({ result: 'error', message: 'Connection lost, retrying to connect in 5 seconds' });
          }, 5000);
        }
      };
    },
    fetchList() {
      axios.get(`${constants.SERVER_URL}/airlines`).then(response => (this.airlines = response.data));
    },
    notifyAlert(reason) {
      if (reason) {
        this.alertMessage = reason.message;
        this.alertVariant = reason.result === 'success' ? 'success' : 'danger';
        this.alertDismissCountDown = 10;
      }
    },
    close() {
      this.formVisible = false;
      this.selectedAirline = null;
    },
    create() {
      this.action = 'create';
      this.formVisible = true;
    },
    edit(airline) {
      this.action = 'update';
      this.selectedAirline = airline;
      this.formVisible = true;
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
</style>
