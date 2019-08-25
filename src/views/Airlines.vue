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
          <b-button pill variant="success" class="add_button"><i class="material-icons">add</i></b-button>
          <input class="form-control filter-form-search" type="search" placeholder="Search" aria-label="Search" />
        </div>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <AirlineList :airlines="airlines" />
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import AirlineList from '@/components/AirlineList.vue';
import constants from '@/constants';

export default {
  name: 'home',
  components: {
    AirlineList,
  },
  data() {
    return {
      airlines: [],
    };
  },
  mounted() {
    axios.get(`${constants.SERVER_URL}/airlines`).then(response => (this.airlines = response.data));
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
</style>
