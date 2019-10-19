<template>
  <div class="" id="app">
    <nav id="nav" class="absolute z-10 right-0 px-5 py-3 bg-gray-200 shadow-md">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
