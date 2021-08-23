<template>
  <div v-if="loading" class="spring-spinner">
    <div class="spring-spinner-part top">
      <div class="spring-spinner-rotator"></div>
    </div>
    <div class="spring-spinner-part bottom">
      <div class="spring-spinner-rotator"></div>
    </div>
  </div>
  <div v-else id="wrapper">
    <div id="button-and-search">
      <button
        v-on:click="goToAddEmployees()"
        class="btn btn-primary"
        id="add-employee"
      >
        Add employee
      </button>
      <Filters
        v-bind:employees="employees"
        v-on:getEmployees="filterEmployees"
      />
    </div>

    <div class="fixTableHead">
      <table class="table table-striped table-hover" id="employee-table">
        <thead>
          <tr id="table-head">
            <th scope="col">Picture</th>
            <th scope="col">
              First and Last Name
              <button
                class="btn sort-btn button"
                v-on:click="sortTableByName(1)"
              >
                <i class="fas fa-sort"> </i>
              </button>
            </th>
            <th scope="col">
              Email
              <button
                class="btn sort-btn button"
                v-on:click="sortTableByName(2)"
              >
                <i class="fas fa-sort"> </i>
              </button>
            </th>
            <th scope="col">
              Sex
              <button
                class="btn sort-btn button"
                v-on:click="sortTableByName(3)"
              >
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
    </div>
  </div>
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
      loading: false,
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
  async created() {
    this.loading = true;
    try {
      await db
        .collection("employees")
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
      this.loading = false;
    } catch (error) {
      this.loading = false;
      alert("Loading erroe ", error);
    }

    // console.log(this.employees);
  },
};
</script>

<style scoped>
.spring-spinner,
.spring-spinner * {
  box-sizing: border-box;
}

.spring-spinner {
  margin-top: 250px;
  height: 60px;
  width: 60px;
}

.spring-spinner .spring-spinner-part {
  overflow: hidden;
  height: calc(60px / 2);
  width: 60px;
}

.spring-spinner .spring-spinner-part.bottom {
  transform: rotate(180deg) scale(-1, 1);
}

.spring-spinner .spring-spinner-rotator {
  width: 60px;
  height: 60px;
  border: calc(60px / 7) solid transparent;
  border-right-color: #0d6efd;
  border-top-color: #0d6efd;
  border-radius: 50%;
  box-sizing: border-box;
  animation: spring-spinner-animation 3s ease-in-out infinite;
  transform: rotate(-200deg);
}

@keyframes spring-spinner-animation {
  0% {
    border-width: calc(60px / 7);
  }
  25% {
    border-width: calc(60px / 23.33);
  }
  50% {
    transform: rotate(115deg);
    border-width: calc(60px / 7);
  }
  75% {
    border-width: calc(60px / 23.33);
  }
  100% {
    border-width: calc(60px / 7);
  }
}
#wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
#button-and-search {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#add-employee {
  margin: 40px;
}
.fixTableHead {
  overflow-y: auto;
  height: 500px;
  max-width: 95%;
  min-width: 400px;
}

thead {
  display: table-header-group;
  vertical-align: middle;
  position: sticky;
}
.fixTableHead thead th {
  position: sticky;
  top: 0;
  background-color: #fff;
}
td {
  display: table-cell;
  vertical-align: middle;
}
img {
  width: 70px;
  height: 70px;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
}
.btn {
  margin: 10px;
}
</style>
