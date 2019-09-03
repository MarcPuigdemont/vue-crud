import axios from 'axios';
import constants from '../constants';

const AirlinesProxy = {
  getAirlines: () => {
    return axios.get(`${constants.SERVER_URL}/airlines`);
  },
  addAirline: airline => {
    return axios
      .post(`${constants.SERVER_URL}/airline`, airline)
      .then(() => ({ status: 'success', message: 'A new Airline has been created' }))
      .catch(() => ({ status: 'error', message: 'Error creating the airline. Check that no other airline with same iata/name combination exists' }));
  },
  editAirline: (airline, oldAirline) => {
    if (airline.iata === oldAirline.iata && airline.name === oldAirline.name) {
      return axios
        .put(`${constants.SERVER_URL}/airline`, airline)
        .then(() => ({ status: 'success', message: 'An Airline has been updated' }))
        .catch(() => ({ status: 'error', message: 'Error updating the airline' }));
    } else {
      return axios
        .post(`${constants.SERVER_URL}/airline`, airline)
        .then(() => axios.delete(`${constants.SERVER_URL}/airline`, { data: { iata: oldAirline.iata, name: oldAirline.name } }))
        .then(() => ({ status: 'success', message: 'An Airline has been updated' }))
        .catch(() => ({
          status: 'error',
          message: 'Error updating the airline. Check that no other airline with same iata/name combination exists',
        }));
    }
  },
  deleteAirline: airline => {
    return axios
      .delete(`${constants.SERVER_URL}/airline`, { data: { iata: airline.iata, name: airline.name } })
      .then(() => ({ status: 'success', message: 'An Airline has been removed' }))
      .catch(() => ({ status: 'error', message: 'Error deleting the airline' }));
  },
};

// eslint-disable-next-line import/prefer-default-export
export { AirlinesProxy };
