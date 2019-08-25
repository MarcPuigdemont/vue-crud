<template>
  <b-row>
    <b-col v-for="service in services" :key="service.name">
      <i class="material-icons" :title="service.name" :disabled="!service.available">{{ getIcon(service.name) }}</i>
    </b-col>
  </b-row>
</template>
<script>
const icons = {
  bags: 'work',
  checkin: 'where_to_vote',
  seats: 'airline_seat_recline_normal',
};
export default {
  props: { services: Array },
  methods: {
    getIcon: serviceName => icons[serviceName] || 'error',
  },
};
</script>
<style scoped>
i[disabled] {
  color: rgba(0, 0, 0, 0.1);
}
</style>
