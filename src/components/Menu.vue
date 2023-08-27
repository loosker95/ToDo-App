<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
          <router-link class="navbar-brand" to="/">ToDo-App</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link class="nav-link" :to="{name: 'Welcome'}">Home</router-link>
            <router-link class="nav-link" :to="{name: 'About'}">About</router-link>
            <router-link class="nav-link" :to="{name: 'Contact'}">Contact</router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="container">
      <br />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
};
</script>

<style scoped>
</style>