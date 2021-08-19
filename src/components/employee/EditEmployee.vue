<template>
  <button v-on:click="editEmployee()" class="btn btn-primary btn-extra">
    Edit
  </button>
</template>

<script>
// import db from "../../firebaseInit";

export default {
  name: "EditEmployee",
  props: ["id"],

  methods: {
    editEmployee() {},
  },
};
</script>

<style scoped></style>
