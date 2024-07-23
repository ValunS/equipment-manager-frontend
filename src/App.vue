<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <router-link to="/" class="navbar-brand">
            Управление оборудованием
          </router-link>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link"> Оборудование </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/equipment-types" class="nav-link">
                Типы оборудования
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="footer mt-5 py-3 bg-light">
      <div class="container text-center">
        © {{ new Date().getFullYear() }} Мое приложение
      </div>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
