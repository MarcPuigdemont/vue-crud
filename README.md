# vue-crud

This is a simple CRUD created with vue to represent a simple airline list.

The project has been created with vue-cli 3.

As a style framework, BootstrapVue has been chosen as it provides a directive and component system very well suited for this example.

The coding style is based on Airbnb, but since it's using eslint + @vue/eslint-config-airbnb + prettier maybe some of the rules may be off. The intention is not being 100% accurate with one coding style but to provide a consistent style over all the written code.

## Testing

Testing is done with Jest for unit test and Cypress for e2e. Jest is used for snapshots, and component logic test. Cypress to ensure the whole app works as expected.

To run the test, please, check the 'Run your unit tests' section.

Coverage is also a must, so with Jest and Istanbul it can be tracked. I left out the Views folder, as they'll be tested properly with Cypress, and the files marked with '/_ istanbul ignore file _/' such as proxyService which unit tests would be to test axios.

Coverage can be found on 'coverage' folder after running the unit tests. This folder is ignored on git

## Desgin decission taken

This I left behind, and could be added as improvements:

- Localization, only english is used.
- Frontend pagination / Backend pagination.
- Themes and theme selector for primary and secondary App colors (nothing to do with airplanes)
  - Be able to select an Airline and apply it's colors to the current app theme
- Integrate both unit and e2e tests with CircleCI
- Improve style and add animations

Done:

- Document e2e tests so it's easier to know what each part of the test does
- Also, decouple e2e from icons and classes by using other selectors such as data-\*
- Added unit tests and coverage

## Project setup

```
npm install
```

If you desire to change the server port (which defaults to 3000), please make sure to update the .env file AND the src/constants.js file.
Frontend is not using the .env as it requires a bit more structure than a simple vue npm run serve.

### Server

This project runs on a simple Backend done on node and express. It should be started on a separate terminal BEFORE running the Frontend.

Use:

```
npm run start-server
```

As a design choice, the primary key or id is the combination of 'iata' and 'name' properties, as it is as close as possible to the supplied data. This will force some logic to be on the Frontend, which is good for the sake of the example as Frontend is the main goal of this project.

The API offers:

- GET /airlines to get a list of all airlines
- POST /airline with a json body with the desired data to create a new airline
- PUT /airline with a json body with the desired modified data of an existing airline to update it
- DELETE /airline with a json body with 'iata' and 'name' properties to delete the desired airline

Realtime data update:

- WS /subscribe connect via websocket to this endpoint to receive websocket events when data changes

Finally to reset to the default airlines from the template or to set your own airlines (used for e2e testing), use:

- GET /reset
- POST /force with a json body with the airline list

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

To update the snapshots after a change on the components' template, please, use:

```
npm run test:unit -- -u
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
