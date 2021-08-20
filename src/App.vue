<template>
  <div id="container">
    <!-- <EmployeeTable /> -->
  </div>
  <router-view></router-view>
</template>

<script>
// import EmployeeTable from "./components/EmployeeTable.vue";

export default {
  name: "App",
  components: {
    // EmployeeTable,
  },
};
</script>

<style>
#container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
/* #app { */
/* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
/* margin-top: 60px; */
/* } */
</style>
