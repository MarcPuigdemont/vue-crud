<template>
  <b-list-group class="w-100">
    <b-row no-gutters class="pl-3 font-weight-bold">
      <b-col>IATA</b-col>
      <b-col>Name</b-col>
      <b-col>Primary Color</b-col>
      <b-col>Secondary Color</b-col>
      <b-col>Available Services</b-col>
    </b-row>
    <AirlineListItem v-for="(airline, index) in filteredAirlines" :key="index" :airline="airline" @edit="edit" />
  </b-list-group>
</template>
<script>
import { BListGroup, BCol, BRow } from 'bootstrap-vue';
import AirlineListItem from './AirlineListItem.vue';
import { filterByStringAndServices } from '@/services/filterService.jsx';

export default {
  name: 'AirlineList',
  components: {
    AirlineListItem,
    BListGroup,
    BCol,
    BRow,
  },
  props: {
    airlines: Array,
    filter: String,
    serviceFilter: Array,
  },
  computed: {
    filteredAirlines() {
      return filterByStringAndServices(this.airlines, this.filter, this.serviceFilter);
    },
  },
  methods: {
    edit(airline) {
      this.$emit('edit', airline);
    },
  },
};
</script>
