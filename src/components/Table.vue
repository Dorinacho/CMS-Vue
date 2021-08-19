<template>
  <table class="table table-striped table-hover" id="employee-table">
    <thead>
      <tr id="table-head">
        <th scope="col">Picture</th>
        <th scope="col">
          First and Last Name
          <button class="btn sort-btn" onclick="sortTableByName(1);">
            <i class="fas fa-sort"> </i>
          </button>
        </th>
        <th scope="col">
          Email
          <button class="btn sort-btn" onclick="sortTableByName(2);">
            <i class="fas fa-sort"> </i>
          </button>
        </th>
        <th scope="col">
          Sex
          <button class="btn sort-btn" onclick="sortTableByName(3);">
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
      <tr
        v-for="employee in employeesArray"
        v-bind:key="employee.id"
        v-bind:id="employee.id"
      >
        <td>
          <img v-bind:src="employee.picture" />
        </td>
        <td>{{ employee.firstName + " " + employee.lastName }}</td>
        <td>{{ employee.email }}</td>
        <td>{{ employee.gender }}</td>
        <td>{{ employee.birthdate }}</td>
        <td>
          <!-- <button type="button" class="btn btn-danger btn-extra">
            Delete
          </button> -->
          <delete-employee
            v-bind:id="employee.id"
            v-on:click="employeesArray.splice(0, employee.id)"
          ></delete-employee>
          <edit-employee v-bind:id="employee.id"></edit-employee>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import db from "../firebaseInit";
import DeleteEmployee from "./employee/DeleteEmployee.vue";
import EditEmployee from "./employee/EditEmployee.vue";

const moment = require("moment");
export default {
  components: { DeleteEmployee, EditEmployee },

  name: "Table",
  data() {
    return {
      // employees: [],
    };
  },
  inject: ["employeesArray"],
  computed: {
    // getEmployees() {
    //   for (const key in localStorage) {
    //     //  console.log(`${key}: ${localStorage.getItem(key)}`);
    //     var y = JSON.parse(localStorage.getItem(key));
    //     this.employees.push(y);
    //   }
    //   console.log(this.employees);
    //   return this.employees;
    // },
  },
  methods: {},
  created() {
    // getEmployeesData() {
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
          // localStorage.setItem(
          //   employeeData.email,
          //   JSON.stringify(employeeData)
          this.employeesArray.push(employeeData);
          // );
        });
      })
      .catch((error) => {
        alert("Error getting employees ", error);
      });
    console.log(this.employeesArray);
  },
};
</script>

<style scoped>
table {
  max-width: 90%;
  min-width: 400px;
}

/* thead {
  display: flex;
  justify-content: space-between;
  width: 100%;
} */
/* #table-head {
  width: 200%;
  display: flex;
  justify-content: space-around;
} */
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
