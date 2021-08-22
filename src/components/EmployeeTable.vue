<template>
  <button v-on:click="goToAddEmployees()" class="btn btn-primary">
    Add employee
  </button>
  <Filters v-bind:employees="employees" v-on:getEmployees="filterEmployees" />
  <table class="table table-striped table-hover" id="employee-table">
    <thead>
      <tr id="table-head">
        <th scope="col">Picture</th>
        <th scope="col">
          First and Last Name
          <button class="btn sort-btn" v-on:click="sortTableByName(1)">
            <i class="fas fa-sort"> </i>
          </button>
        </th>
        <th scope="col">
          Email
          <button class="btn sort-btn" v-on:click="sortTableByName(2)">
            <i class="fas fa-sort"> </i>
          </button>
        </th>
        <th scope="col">
          Sex
          <button class="btn sort-btn" v-on:click="sortTableByName(3)">
            <i class="fas fa-sort"> </i>
          </button>
        </th>
        <th scope="col">
          Birthdate
        </th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="employee in employeesCopy" v-bind:key="employee.id">
        <td>
          <img v-bind:src="employee.picture" />
        </td>
        <td>{{ employee.firstName + " " + employee.lastName }}</td>
        <td>{{ employee.email }}</td>
        <td>{{ employee.gender }}</td>
        <td>{{ employee.birthdate }}</td>
        <td>
          <button
            v-on:click="deleteEmployee(employee.id)"
            type="button"
            class="btn btn-danger btn-extra"
          >
            Delete
          </button>
          <router-link
            v-bind:to="'/edit/' + employee.id"
            type="button"
            class="btn btn-primary btn-extra"
          >
            Edit
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import db from "../firebaseInit";

import Filters from "./Filters.vue";

const moment = require("moment");
export default {
  components: {
    Filters,
  },

  name: "Table",
  data() {
    return {
      employees: [],
      employeesCopy: [],
    };
  },
  emits: ["getEmployees"],
  methods: {
    filterEmployees(data) {
      this.employeesCopy = data;
      // console.log(this.employeesCopy);
    },
    goToAddEmployees() {
      this.$router.push("/add");
    },
    deleteEmployee(id) {
      // console.log(id);
      db.collection("employees")
        .doc(id)
        .delete();
      var employeeIndex = this.employees.find((x) => x.id === id);
      this.employees.splice(this.employees.indexOf(employeeIndex), 1);
      this.employeesCopy.splice(this.employees.indexOf(employeeIndex), 1);
    },
    sortTableByName(n) {
      var table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
      table = document.getElementById("employee-table");
      switching = true;
      dir = "asc";
      while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < rows.length - 1; i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount++;
        } else {
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    },
  },
  created() {
    db.collection("employees")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const employeeData = {
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            gender: doc.data().gender,
            birthdate: moment(doc.data().birthdate).format("D MMMM YYYY"),
            picture: doc.data().picture,
          };

          this.employees.push(employeeData);
          this.employeesCopy.push(employeeData);
        });
      })
      .catch((error) => {
        alert("Error getting employees ", error);
      });
    // console.log(this.employees);
  },
};
</script>

<style scoped>
table {
  max-width: 90%;
  min-width: 400px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px;
}
img {
  width: 70px;
  height: 70px;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
}

button {
  margin: 10px;
}
</style>
