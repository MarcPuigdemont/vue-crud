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
  props: {
    airlines: Array,
  },
};
</script>
