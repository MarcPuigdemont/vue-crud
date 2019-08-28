// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();

const app = express();
require('express-ws')(app);

/** Websockets for live update */
const clients = new Set();

const notifyClients = () => {
  clients.forEach(client => client.send('refresh'));
};

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

const cleanAirline = airline => {
  const cleanAirLine = {};
  if (airline['iata']) cleanAirLine['iata'] = airline['iata'];
  if (airline['name']) cleanAirLine['name'] = airline['name'];
  if (airline['primary_color']) cleanAirLine['primary_color'] = airline['primary_color'];
  if (airline['secondary_color']) cleanAirLine['secondary_color'] = airline['secondary_color'];
  if (airline['services']) cleanAirLine['services'] = airline['services'];
  return cleanAirLine;
};

let airlines = [];
const reset = () => {
  try {
    airlines = JSON.parse(fs.readFileSync('server/airlines-template.json', 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.info('Template file for airlines not found. Initializing empty array');
    } else if (error instanceof SyntaxError) {
      console.info('Template file for airlines is corrupted. Initializing empty array');
    } else {
      throw error;
    }
  }
};
reset();

app.get('/', (req, res) => {
  res.send(`The primary key or id is the combination of iata and name properties. Use paths:<br>
  GET /airlines to get a list of all airlines<br>
  POST /airline with a json body with the desired data to create a new airline<br>
  PUT /airline with a json body with the desired modified data of an existing airline to update it<br>
  DELETE /airline with a json body with iata and name properties to delete the desired airline<br>
  <br>
  Finally to reset to the default airlines from the template, use: <br>
  GET /reset`);
});

app.get('/airlines', (req, res) => {
  res.json(airlines);
});
app.get('/reset', (req, res) => {
  reset();
  res.json(airlines);
  notifyClients();
});

app.post('/airline', (req, res) => {
  const data = req.body;
  if (!data.iata || !data.name) {
    res.status(400).send('Missing iata or name properties');
  } else {
    const exists = airlines.find(
      airline => airline.iata.toLowerCase() === data.iata.toLowerCase() && airline.name.toLowerCase() === data.name.toLowerCase(),
    );
    if (exists) {
      res.status(400).send('Trying to create an already existing airline, please use PUT method instead');
    } else {
      const airline = cleanAirline(req.body);

      airlines.push(airline);
      res.send('POST successful to /airline');
      notifyClients();
    }
  }
});

app.put('/airline', (req, res) => {
  const data = req.body;
  if (!data.iata || !data.name) {
    res.status(400).send('Missing iata or name properties');
  } else {
    const foundAirline = airlines.find(
      airline => airline.iata.toLowerCase() === data.iata.toLowerCase() && airline.name.toLowerCase() === data.name.toLowerCase(),
    );
    if (foundAirline) {
      const airline = cleanAirline(req.body);

      Object.assign(foundAirline, airline);
      res.send('PUT successful to /airline');
      notifyClients();
    } else {
      res.status(400).send('Trying to update an unexisting airline, please use POST method if you want to create it instead');
    }
  }
});

app.delete('/airline', (req, res) => {
  const data = req.body;
  if (!data.iata || !data.name) {
    res.status(400).send('Missing iata or name properties');
  } else {
    const foundAirline = airlines.find(
      airline => airline.iata.toLowerCase() === data.iata.toLowerCase() && airline.name.toLowerCase() === data.name.toLowerCase(),
    );
    if (foundAirline) {
      airlines = airlines.filter(
        airline => airline.iata.toLowerCase() !== foundAirline.iata.toLowerCase() || airline.name.toLowerCase() !== foundAirline.name.toLowerCase(),
      );
      res.send('DELETE successful to /airline');
      notifyClients();
    } else {
      res.status(400).send('Trying to delete an unexisting airline');
    }
  }
});

app.post('/force', (req, res) => {
  const data = req.body;
  airlines = data;

  res.send('Airlines list has been overriden');
  notifyClients();
});

app.ws('/subscribe', ws => {
  clients.add(ws);

  ws.on('close', function() {
    clients.delete(ws);
    console.log('Active clinets: ', clients.size);
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Airlines server is listening on port ${process.env.SERVER_PORT}!`);
});
