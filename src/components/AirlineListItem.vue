<template>
  <b-list-group-item class="flex-column align-items-start">
    <b-row>
      <b-col>
        {{ airline.iata }}
      </b-col>
      <b-col>
        {{ airline.name }}
      </b-col>
      <b-col>
        {{ airline.primary_color }}
      </b-col>
      <b-col>
        {{ airline.secondary_color }}
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
