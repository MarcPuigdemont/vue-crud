<template>
  <b-card :title="airline.name" :sub-title="airline.iata" class="airline-card" data-test="airline-card" @click="$emit('edit', airline)">
    <b-row no-gutters>
      <div :style="{ 'background-color': airline.primary_color }" class="airline-card__color w-50" />
      <div :style="{ 'background-color': airline.secondary_color }" class="airline-card__color w-50" />
    </b-row>
    <AirlineListItemServices :services="servicesList" />
  </b-card>
</template>

<script>
import { BCard, BRow } from 'bootstrap-vue';
import AirlineListItemServices from './AirlineListItemServices.vue';

export default {
  name: 'AirlineGridItem',
  props: {
    airline: Object,
  },
  components: {
    AirlineListItemServices,
    BCard,
    BRow,
  },
  computed: {
    servicesList: function() {
      return Object.keys(this.airline.services).map(service => ({ name: service, available: this.airline.services[service] }));
    },
  },
};
</script>
<style scoped>
.airline-card {
  cursor: pointer;
  margin-bottom: 10px;
}
.airline-card__color {
  height: 20px;
  margin-bottom: 10px;
}
</style>
