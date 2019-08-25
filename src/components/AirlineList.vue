<template>
  <b-list-group class="w-100">
    <AirlineListItem v-for="(airline, index) in airlines" :key="index" :airline="airline" @edit="edit" />
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
  methods: {
    edit(airline) {
      this.$emit('edit', airline);
    },
  },
};
</script>
