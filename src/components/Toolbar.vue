<template>
  <div class="d-flex justify-content-between">
    <b-button pill class="add_button" data-test="new-airline-button" @click="$emit('create')"><i class="material-icons">add</i></b-button>
    <div class="d-flex flex-direction-row">
      <i
        class="material-icons filter-button"
        :disabled="!filterServices.bags"
        title="Filter by Bags service available"
        data-test="filter-bags"
        @click="toggleService('bags')"
      >
        {{ icons['BAGS'] }}
      </i>
      <i
        class="material-icons filter-button"
        :disabled="!filterServices.checkin"
        title="Filter by Check-in service available"
        data-test="filter-checkin"
        @click="toggleService('checkin')"
      >
        {{ icons['CHECKIN'] }}
      </i>
      <i
        class="material-icons filter-button"
        :disabled="!filterServices.seats"
        title="Filter by Seats service available"
        data-test="filter-seats"
        @click="toggleService('seats')"
      >
        {{ icons['SEATS'] }}
      </i>
      <input
        v-model="searchFilter"
        class="form-control filter-form-search"
        type="search"
        placeholder="Search/Filter"
        aria-label="Search/Filter"
        data-test="filter-input"
      />
    </div>
  </div>
</template>
<script>
import constants from '@/constants';

export default {
  data() {
    return {
      searchFilter: '',
      icons: constants.ICONS,
      filterServices: {
        bags: false,
        checkin: false,
        seats: false,
      },
    };
  },
  methods: {
    toggleService(service) {
      this.filterServices[service] = !this.filterServices[service];
      this.$emit('service-filter', this.filterServices);
    },
  },
  watch: {
    searchFilter: function(val) {
      this.$emit('filter', val);
    },
  },
};
</script>
<style scoped>
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
</style>
