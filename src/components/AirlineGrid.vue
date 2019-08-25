<template>
  <b-row class="w-100">
    <b-col v-for="(airline, index) in filteredAirlines" :key="index" class="pr-2 pb-2 col-lg-3 col-md-3 col-sm-4 col-xs-6">
      <AirlineGridItem :airline="airline" @edit="edit"/>
    </b-col>
  </b-row>
</template>
<script>
import AirlineGridItem from './AirlineGridItem.vue';
import { filterByStringAndServices } from '@/services/filterService';

export default {
  name: 'AirlineGrid',
  components: {
    AirlineGridItem,
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
