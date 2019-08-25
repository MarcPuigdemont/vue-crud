<template>
  <b-form @submit="onSubmit" @reset="onReset">
    <b-form-row>
      <b-form-group id="input-group-1" label="IATA:" label-for="input-1" class="w-50 pr-1">
        <b-form-input id="input-1" v-model="form.iata" required placeholder="Enter IATA code"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Airline Name:" label-for="input-2" class="w-50 pl-1">
        <b-form-input id="input-2" v-model="form.name" required placeholder="Enter airline name"></b-form-input>
      </b-form-group>
    </b-form-row>
    <b-form-row>
      <b-form-group id="input-group-3" label="Primary Color:" label-for="input-3" class="w-25 pr-1">
        <b-form-input id="input-3" v-model="form.primary_color" type="color" required placeholder="Enter primary color"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Secondary Color:" label-for="input-4" class="w-25 px-1">
        <b-form-input id="input-4" v-model="form.secondary_color" type="color" required placeholder="Enter secondary color"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" class="align-content-end w-50">
        <b-form-checkbox-group v-model="form.services" id="checkboxes-1">
          <b-form-checkbox value="bags">Bags</b-form-checkbox>
          <b-form-checkbox value="checkin">Check-in</b-form-checkbox>
          <b-form-checkbox value="seats">Seats</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </b-form-row>
    <b-form-row class="justify-content-center">
      <b-button type="submit" variant="primary" class="mx-1">{{ createButtonText }}</b-button>
      <b-button v-if="action.toLowerCase() === 'update'" variant="danger" class="mx-1" @click="deleteEntity">Delete</b-button>
      <b-button type="reset" class="mx-1">Close</b-button>
    </b-form-row>
  </b-form>
</template>
<script>
import axios from 'axios';
import constants from '@/constants';

export default {
  props: {
    action: {
      type: String,
      required: true,
    },
    entity: Object,
  },
  data() {
    return {
      form: {
        iata: '',
        name: '',
        primary_color: '#293041',
        secondary_color: '#F138A4',
        services: [],
      },
    };
  },
  computed: {
    createButtonText() {
      return this.action.toLowerCase() === 'create' ? 'Create' : 'Edit';
    },
  },
  mounted() {
    if (this.entity) {
      this.updateFormFromEntity(this.entity);
    }
  },
  methods: {
    notifySuccess(reason) {
      this.$emit('refresh', { result: 'success', message: reason });
      this.$emit('close');
    },
    notifyError(reason) {
      this.$emit('refresh', { result: 'error', message: reason });
    },
    onSubmit(evt) {
      evt.preventDefault();
      const services = {
        bags: false,
        checkin: false,
        seats: false,
      };
      this.form.services.forEach(s => (services[s] = true));

      // Before spread operator: Object.assign({}, this.form, { services })
      const airline = { ...this.form, ...{ services } };

      if (this.action.toLowerCase() === 'update') {
        const notify = this.notifySuccess.bind(this, 'An Airline has been updated');
        if (airline.iata === this.entity.iata && airline.name === this.entity.name) {
          axios
            .put(`${constants.SERVER_URL}/airline`, airline)
            .then(notify)
            .catch(() => this.notifyError('Error updating the airline'));
        } else {
          axios
            .post(`${constants.SERVER_URL}/airline`, airline)
            .then(() => axios.delete(`${constants.SERVER_URL}/airline`, { data: { iata: this.entity.iata, name: this.entity.name } }))
            .then(notify)
            .catch(() => this.notifyError('Error updating the airline. Check that no other airline with same iata/name combination exists'));
        }
      } else {
        axios
          .post(`${constants.SERVER_URL}/airline`, airline)
          .then(() => this.notifySuccess('A new Airline has been created'))
          .catch(() => this.notifyError('Error creating the airline. Check that no other airline with same iata/name combination exists'));
      }
    },
    deleteEntity() {
      axios
        .delete(`${constants.SERVER_URL}/airline`, { data: { iata: this.entity.iata, name: this.entity.name } })
        .then(() => this.notifySuccess('An Airline has been removed'))
        .catch(e => this.notifyError('Error deleting the airline'));
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.iata = '';
      this.form.name = '';
      this.form.primary_color = '#293041';
      this.form.secondary_color = '#F138A4';
      this.form.services = [];
      this.$emit('close');
    },
    updateFormFromEntity(airline) {
      const expandColor = color =>
        color.length === 7
          ? color
          : '#' +
            Array.from(color)
              .slice(1)
              .map(c => c + c)
              .join('');

      this.form = { ...airline };

      // if color is in shorthand #000, the color input will not paint it properly, transform it to #000000
      this.form.primary_color = expandColor(this.form.primary_color || '#000000');
      this.form.secondary_color = expandColor(this.form.secondary_color || '#000000');
      this.form.services = Object.keys(airline.services).filter(k => airline.services[k]);
    },
  },
  watch: {
    entity() {
      this.updateFormFromEntity(this.entity);
    },
  },
};
</script>
