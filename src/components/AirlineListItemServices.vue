<template>
  <b-row>
    <b-col v-for="service in services" :key="service.name">
      <i class="material-icons" :title="service.name" :disabled="!service.available" :data-test="`list-row-service-${service.name}`">
        {{ getIcon(service.name) }}
      </i>
    </b-col>
  </b-row>
</template>
<script>
import { BRow, BCol } from 'bootstrap-vue';
import constants from '@/constants';

export default {
  name: 'AirlineListItemServices',
  components: {
    BRow,
    BCol,
  },
  props: { services: Array },
  methods: {
    getIcon: serviceName => constants.ICONS[serviceName.toUpperCase()] || 'error',
  },
};
</script>
