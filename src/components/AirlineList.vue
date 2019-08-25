<template>
  <b-list-group class="w-100">
    <AirlineListItem v-for="(airline, index) in filteredAirlines" :key="index" :airline="airline" @edit="edit" />
  </b-list-group>
</template>
<script>
import AirlineListItem from './AirlineListItem.vue';

const contains = (string, substring) => string.toLowerCase().indexOf(substring.toLowerCase()) > -1;

export default {
  name: 'AirlineList',
  components: {
    AirlineListItem,
  },
  props: {
    airlines: Array,
    filter: String,
    serviceFilter: Array,
  },
  computed: {
    filteredAirlines() {
      if (this.filter.trim() === '') {
        return this.filterByServices(this.airlines);
      } else {
        const matchingAirlines = this.airlines.filter(a => contains(a.iata, this.filter) || contains(a.name, this.filter));
        return this.filterByServices(matchingAirlines);
      }
    },
  },
  methods: {
    edit(airline) {
      this.$emit('edit', airline);
    },
    filterByServices(airlines) {
      const numOfServices = this.serviceFilter.length;
      return airlines.filter(airline => this.serviceFilter.filter(s => airline.services[s]).length === numOfServices);
    },
  },
};
</script>
