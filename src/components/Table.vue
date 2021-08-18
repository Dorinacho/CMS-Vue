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
      <tr v-for="employee in employees" v-bind:key="employee.id">
        <td>
          <img v-bind:src="employee.picture" />
        </td>
        <td>{{ employee.firstName + " " + employee.lastName }}</td>
        <td>{{ employee.email }}</td>
        <td>{{ employee.gender }}</td>
        <td>{{ employee.birthdate }}</td>
        <td>
          <button class="btn btn-danger btn-extra">
            Delete
          </button>
          <button type="button" class="btn btn-primary btn-extra">
            Edit
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// import TableRow from "./TableRow.vue";
import db from "../firebaseInit";
export default {
  // components: { TableRow },
  name: "Table",
  data() {
    return {
      employees: [],
    };
  },
  computed: {
    decodePicture(picture) {
      var decoded = atob(picture);
      return decoded;
    },
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
            birthdate: doc.data().birthdate,
            picture: doc.data().picture,
          };
          this.employees.push(employeeData);
        });
      })

      .catch((error) => {
        alert("Error getting employees ", error);
      });
    console.log(this.employees);
    // };
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
