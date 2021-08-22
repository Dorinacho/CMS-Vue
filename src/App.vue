<template>
  <router-view></router-view>
  <!-- <EmployeeTable /> -->
</template>

<script>
// import EmployeeTable from "./components/EmployeeTable.vue";
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
