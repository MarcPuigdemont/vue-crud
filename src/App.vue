<template>
  <div id="app">
    <b-navbar id="nav" toggleable="lg">
      <b-navbar-brand href="#">Vue<span class="highlight">CRUD</span></b-navbar-brand>
    </b-navbar>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 460px;
}
#nav {
  background-color: #293041;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.navbar-brand {
  color: white !important;
}
.highlight {
  color: #f138a4 !important;
}
i[disabled] {
  color: rgba(0, 0, 0, 0.1);
}
</style>
