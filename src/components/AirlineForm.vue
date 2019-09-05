<template>
  <b-form @submit="$event.preventDefault()" @reset="$event.preventDefault()" class="mx-2 airline-form">
    <b-form-row>
      <b-form-group id="input-group-1" label="IATA:" label-for="input-1" class="w-50 pr-1">
        <b-form-input id="input-1" v-model="form.iata" required placeholder="Enter IATA code" data-test="form-iata-input" />
        <b-form-invalid-feedback :state="form.iata.length > 0">
          IATA must be filled
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="input-group-2" label="Airline Name:" label-for="input-2" class="w-50 pl-1">
        <b-form-input id="input-2" v-model="form.name" required placeholder="Enter airline name" data-test="form-name-input" />
        <b-form-invalid-feedback :state="form.name.length > 0">
          Name must be filled
        </b-form-invalid-feedback>
      </b-form-group>
    </b-form-row>
    <b-form-row>
      <b-form-group id="input-group-3" label="Primary Color:" label-for="input-3" label-class="crud-form-label" class="w-25 pr-1">
        <b-form-input id="input-3" v-model="form.primary_color" type="color" required placeholder="Enter primary color"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Secondary Color:" label-for="input-4" label-class="crud-form-label" class="w-25 px-1">
        <b-form-input id="input-4" v-model="form.secondary_color" type="color" required placeholder="Enter secondary color"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Services:" label-for="checkboxes-1" class="align-content-end w-50">
        <b-form-checkbox-group v-model="form.services" id="checkboxes-1" class="ml-2">
          <b-form-checkbox value="bags">
            <i class="material-icons" title="Bags" :disabled="isServiceDisabled('bags')" data-test="form-bags-checkbox">
              {{ icons['BAGS'] }}
            </i>
          </b-form-checkbox>
          <b-form-checkbox value="checkin">
            <i class="material-icons" title="Check-in" :disabled="isServiceDisabled('checkin')" data-test="form-checkin-checkbox">
              {{ icons['CHECKIN'] }}
            </i>
          </b-form-checkbox>
          <b-form-checkbox value="seats">
            <i class="material-icons" title="Seats" :disabled="isServiceDisabled('seats')" data-test="form-seats-checkbox">
              {{ icons['SEATS'] }}
            </i>
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </b-form-row>
  </b-form>
</template>
<script>
import { BForm, BFormCheckbox, BFormCheckboxGroup, BFormGroup, BFormInput, BFormInvalidFeedback, BFormRow } from 'bootstrap-vue';
import constants from '@/constants';
import formatColor from '@/services/colorService.jsx';

export default {
  name: 'AirlineForm',
  components: {
    BForm,
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BFormRow,
  },
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
      icons: constants.ICONS,
    };
  },
  computed: {
    isValid() {
      return !!(this.form.iata && this.form.name);
    },
  },
  mounted() {
    if (this.entity) {
      const airline = this.entity;
      const form = { ...airline };

      form.primary_color = formatColor(form.primary_color);
      form.secondary_color = formatColor(form.secondary_color);
      form.services = Object.keys(airline.services).filter(k => airline.services[k]);

      this.form = form;
    }
  },
  methods: {
    enitityUpdated() {
      const services = {
        bags: false,
        checkin: false,
        seats: false,
      };
      this.form.services.forEach(s => (services[s] = true));

      // Before spread operator: Object.assign({}, this.form, { services })
      return { ...this.form, ...{ services } };
    },
    isServiceDisabled(name) {
      return !this.form.services.find(s => s === name);
    },
  },
  watch: {
    form: {
      handler: function() {
        this.$emit('entityUpdated', this.enitityUpdated());
      },
      deep: true,
    },
    isValid: {
      handler: function() {
        this.$emit('validate', this.isValid);
      },
      immediate: true,
    },
  },
};
</script>
<style>
.crud-form-label {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
