<template>
  <div id="container">
    <Form />
    <Filters />
    <Table />
  </div>
</template>

<script>
import Form from "./components/Form.vue";
import Filters from "./components/Filters.vue";
import Table from "./components/Table.vue";

export default {
  name: "App",
  components: {
    Form,
    Filters,
    Table,
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
