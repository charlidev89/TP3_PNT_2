<template>
  <div id="app">
    <BNavbar toggleable="lg" type="dark" variant="primary">
      <BContainer>
        <BNavbarBrand to="/">Vue MockAPI App</BNavbarBrand>
        <BNavbarToggle target="nav-collapse"></BNavbarToggle>
        <BCollapse id="nav-collapse" is-nav>
          <BNavbarNav>
            <BNavItem to="/formulario">Formulario</BNavItem>
            <BNavItem to="/usuarios">Usuarios MockAPI</BNavItem>
          </BNavbarNav>
        </BCollapse>
      </BContainer>
    </BNavbar>

    <BContainer class="mt-4">
      <router-view/>
    </BContainer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  max-width: 1140px;
}
</style>