# vue-crud

This is a simple CRUD created with vue to represent a simple airline list.

The project has been created with vue-cli 3.

As a style framework, BootstrapVue has been chosen as it provides a directive and component system very well suited for this example.

The coding style is based on Airbnb, but since it's using eslint + @vue/eslint-config-airbnb + prettier maybe some of the rules may be off. The intention is not being 100% accurate with one coding style but to provide a consistent style over all the written code.

## Desgin decission taken

This I left behind, and could be added as improvements:

- Localization, only english is used.
- Frontend pagination / Backend pagination.
- Themes and theme selector for primary and secondary App colors (nothing to do with airplanes)
  - Be able to select an Airline and apply it's colors to the current app them
- Add unit tests
- Document e2e tests so it's easier to know what each part of the test does
- Also, decouple e2e from icons and classes by using other selectors such as data-\*
- Integrate both unit and e2e tests with CircleCI
- Improve style and add animations

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

### Run your end-to-end tests

```
npm run test:e2e
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
