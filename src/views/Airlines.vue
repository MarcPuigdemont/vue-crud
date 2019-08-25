<template>
  <b-container class="pt-3">
    <b-row no-gutters>
      <b-col>
        <h1>Airline List</h1>
        <b-button-group class="display_buttons">
          <b-button variant="light" class="display_button"><i class="material-icons" @click="displayMode = 'list'">view_headline</i></b-button>
          <b-button variant="light" class="display_button"><i class="material-icons" @click="displayMode = 'grid'">view_module</i></b-button>
        </b-button-group>

        <div class="border-top my-3"></div>

        <div class="d-flex justify-content-between my-3 my-lg-3">
          <b-button pill class="add_button" @click="create"><i class="material-icons">add</i></b-button>
          <div class="d-flex flex-direction-row">
            <i
              class="material-icons filter-button"
              :disabled="!filterServices.bags"
              title="Filter by Bags service available"
              @click="filterServices.bags = !filterServices.bags"
            >
              {{ icons['BAGS'] }}
            </i>
            <i
              class="material-icons filter-button"
              :disabled="!filterServices.checkin"
              title="Filter by Check-in service available"
              @click="filterServices.checkin = !filterServices.checkin"
            >
              {{ icons['CHECKIN'] }}
            </i>
            <i
              class="material-icons filter-button"
              :disabled="!filterServices.seats"
              title="Filter by Seats service available"
              @click="filterServices.seats = !filterServices.seats"
            >
              {{ icons['SEATS'] }}
            </i>
            <input
              v-model="searchFilter"
              class="form-control filter-form-search"
              type="search"
              placeholder="Search/Filter"
              aria-label="Search/Filter"
            />
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="formVisible" no-gutters class="justify-content-center">
      <div class="p-3 mb-4 w-75" style="background-color: #f8f9fa">
        <AirlineForm
          :action="action"
          :entity="selectedAirline"
          :style="{ 'max-height': formVisible ? '300px' : '0px' }"
          class="mb-2"
          @refresh="fetchList"
          @close="close"
        />
      </div>
    </b-row>
    <b-row no-gutters>
      <component :is="dynamicComponent" :airlines="airlines" :filter="searchFilter" :service-filter="activeFilterServices" @edit="edit" />
    </b-row>
    <b-alert class="fixed-alert" :show="alertDismissCountDown" dismissible :variant="alertVariant" @dismissed="alertDismissCountDown = 0">
      {{ alertMessage }}
    </b-alert>
  </b-container>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import AirlineForm from '@/components/AirlineForm.vue';
import AirlineList from '@/components/AirlineList.vue';
import AirlineGrid from '@/components/AirlineGrid.vue';
import constants from '@/constants';

export default {
  name: 'Airlines',
  components: {
    AirlineForm,
  },
  data() {
    return {
      airlines: [],
      action: 'create',
      selectedAirline: null,
      formVisible: false,
      searchFilter: '',
      icons: constants.ICONS,
      filterServices: {
        bags: false,
        checkin: false,
        seats: false,
      },
      alertDismissCountDown: 0,
      alertMessage: '',
      alertVariant: 'success',
      displayMode: 'list',
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
  },
  methods: {
    fetchList(reason) {
      axios.get(`${constants.SERVER_URL}/airlines`).then(response => (this.airlines = response.data));
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
.add_button {
  height: 38px;
  width: 38px;
  position: relative;
  outline: none !important;
  box-shadow: none !important;
  background-color: #293041;
  border-color: #293041;
}
.add_button i {
  position: absolute;
  top: 6px;
  left: 6px;
}
.filter-form-search {
  max-width: 200px;
}
.filter-button {
  margin-top: 0.5rem;
  margin-right: 2px;
  margin-left: 2px;
  cursor: pointer;
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
