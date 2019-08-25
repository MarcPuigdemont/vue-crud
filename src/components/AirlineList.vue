<template>
  <b-list-group class="w-100">
    <AirlineListItem v-for="(airline, index) in airlines" :key="index" :airline="airline" />
  </b-list-group>
</template>
<script>
import AirlineListItem from './AirlineListItem.vue';

export default {
  name: 'AirlineList',
  components: {
    AirlineListItem,
  },
  data() {
    return {
      airlines: [
        {
          iata: 'VY',
          name: 'Vueling',
          primary_color: '#fc0',
          secondary_color: '#666',
          services: {
            bags: false,
            checkin: true,
            seats: true,
          },
        },
        {
          iata: 'FR',
          name: 'Ryanair',
          primary_color: '#133590',
          secondary_color: '#f1c931',
          services: {
            bags: true,
            checkin: false,
            seats: false,
          },
        },
      ],
    };
  },
};
</script>
