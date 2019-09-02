<template>
  <b-list-group-item class="flex-column align-items-start" style="cursor: pointer" data-test="list-row" @click="$emit('edit', airline)">
    <b-row>
      <b-col data-test="list-row-iata">
        {{ airline.iata }}
      </b-col>
      <b-col data-test="list-row-name">
        {{ airline.name }}
      </b-col>
      <b-col :title="airline.primary_color">
        <div :style="{ 'background-color': airline.primary_color }" class="h-100" />
      </b-col>
      <b-col :title="airline.secondary_color">
        <div :style="{ 'background-color': airline.secondary_color }" class="h-100" />
      </b-col>
      <b-col>
        <AirlineListItemServices :services="servicesList" />
      </b-col>
    </b-row>
  </b-list-group-item>
</template>

<script>
import AirlineListItemServices from './AirlineListItemServices.vue';

export default {
  name: 'AirlineListItem',
  props: {
    airline: Object,
  },
  components: {
    AirlineListItemServices,
  },
  computed: {
    servicesList: function() {
      return Object.keys(this.airline.services).map(service => ({ name: service, available: this.airline.services[service] }));
    },
  },
};
</script>
