# vue-crud

This is a simple CRUD created with vue to represent a simple airline list.

The project has been created with vue-cli 3.

As a style framework, BootstrapVue has been chosen as it provides a directive and component system very well suited for this example.

The coding style is based on Airbnb, but since it's using eslint + @vue/eslint-config-airbnb + prettier maybe some of the rules may be off. The intention is not being 100% accurate with one coding style but to provide a consistent style over all the written code.

## Project setup

```
npm install
```

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

Finally to reset to the default airlines from the template, use:

- GET /reset

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Run your unit tests

```
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
