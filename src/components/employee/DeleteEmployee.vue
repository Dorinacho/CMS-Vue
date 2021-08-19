<template>
  <button v-on:click="deleteEmployee()" class="btn btn-danger btn-extra">
    Delete
  </button>
</template>

<script>
import db from "../../firebaseInit";

export default {
  name: "DeleteEmployee",
  props: ["id"],
  // {
  //   employee: {
  //     type: Object,
  //     default: id,
  //   },
  // },
  methods: {
    async deleteEmployee() {
      console.log(this.id);
      await db
        .collection("employees")
        .doc(this.id)
        .delete();
    },
  },
};
</script>

<style scoped></style>
