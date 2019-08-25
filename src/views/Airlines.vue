<template>
  <b-container>
    <b-row no-gutters>
      <b-col>
        <h1>Airline List</h1>
        <b-button-group class="display_buttons">
          <b-button class="display_button"><i class="material-icons">view_headline</i></b-button>
          <b-button class="display_button"><i class="material-icons">view_module</i></b-button>
        </b-button-group>

        <div class="border-top my-3"></div>

        <div class="d-flex justify-content-between my-3 my-lg-3">
          <b-button pill variant="success" class="add_button"><i class="material-icons" @click="create">add</i></b-button>
          <div class="d-flex flex-direction-row">
            <i
              class="material-icons filter-button"
              :disabled="!filterServices.bags"
              title="Filter by Bags service available"
              @click="filterServices.bags = !filterServices.bags"
              >work</i
            >
            <i
              class="material-icons filter-button"
              :disabled="!filterServices.checkin"
              title="Filter by Check-in service available"
              @click="filterServices.checkin = !filterServices.checkin"
              >where_to_vote</i
            >
            <i
              class="material-icons filter-button"
              :disabled="!filterServices.seats"
              title="Filter by Seats service available"
              @click="filterServices.seats = !filterServices.seats"
              >airline_seat_recline_normal</i
            >
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
    <b-row no-gutters class="justify-content-center">
      <AirlineForm v-if="formVisible" :action="action" :entity="selectedAirline" class="mb-4 w-75" @refresh="fetchList" @close="close" />
    </b-row>
    <b-row no-gutters>
      <AirlineList :airlines="airlines" :filter="searchFilter" :service-filter="activeFilterServices" @edit="edit" />
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
import constants from '@/constants';

export default {
  name: 'home',
  components: {
    AirlineForm,
    AirlineList,
  },
  data() {
    return {
      airlines: [],
      action: 'create',
      selectedAirline: null,
      formVisible: false,
      searchFilter: '',
      filterServices: {
        bags: false,
        checkin: false,
        seats: false,
      },
      alertDismissCountDown: 0,
      alertMessage: '',
      alertVariant: 'success',
    };
  },
  computed: {
    activeFilterServices() {
      return Object.keys(this.filterServices).filter(key => this.filterServices[key]) || [];
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
  top: 0;
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
