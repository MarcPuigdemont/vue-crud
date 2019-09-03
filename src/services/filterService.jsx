const contains = (string, substring) => string.toLowerCase().indexOf(substring.toLowerCase()) > -1;

const filterByStringAndServices = (airlines, string, serviceList = []) => {
  const matchingAirlines = string.trim() === '' ? airlines : airlines.filter(a => contains(a.iata, string) || contains(a.name, string));

  const numOfServices = serviceList.length;
  return matchingAirlines.filter(airline => serviceList.filter(s => airline.services[s]).length === numOfServices);
};

// eslint-disable-next-line import/prefer-default-export
export { filterByStringAndServices };
