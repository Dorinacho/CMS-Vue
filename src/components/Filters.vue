<template>
  <div class="form-outline">
    <input
      type="search"
      id="search-bar"
      class="form-control"
      placeholder="Search employee.."
      aria-label="Search"
      title="Type in a name"
      v-on:keyup="searchEmployee()"
    />
  </div>

  <div id="filters">
    <div class="col-sm-2 filter">
      <label for="gender-filter" class="col-sm-4 col-form-label">
        Gender
      </label>
      <div class="col-sm-9">
        <select
          v-on:change="filterByGender()"
          class="form-select"
          id="gender-filter"
          aria-label="Default select example"
          v-model="gender"
        >
          <option v-for="value in genderFilter" :value="value" :key="value">{{
            value
          }}</option>
        </select>
      </div>
    </div>
    <div class="col-sm-2 filter">
      <label for="picture-filter" class="col-sm-4 col-form-label">
        Picture
      </label>
      <div class="col-sm-9">
        <select
          v-on:change="filterByPicture()"
          v-model="picture"
          class="form-select"
          id="picture-filter"
          aria-label="Default select example"
        >
          <option v-for="value in pictureFilter" :value="value" :key="value">{{
            value
          }}</option>
        </select>
      </div>
    </div>

    <div class="col-sm-2 filter">
      <label for="birthdate" class="col-sm-6 col-form-label">
        Start date
      </label>
      <input
        v-on:change="filterByDate()"
        v-model="startDate"
        type="date"
        class="col-sm-9"
        id="start-date"
        title="Please choose the start date"
      />
    </div>
    <div class="col-sm-2 filter">
      <label for="birthdate" class="col-sm-6 col-form-label">
        End date
      </label>
      <input
        v-on:change="filterByDate()"
        v-model="endDate"
        type="date"
        class="col-sm-9"
        id="end-date"
        title="Please choose the end date"
      />
    </div>
  </div>
  <button
    type="submit"
    class="btn btn-primary btn-extra"
    id="reset-button"
    v-on:click="resetFilters"
  >
    Reset filters
  </button>
</template>

<script>
// const moment = require("moment");
export default {
  name: "Filters",
  props: ["employees"],
  data() {
    return {
      genderFilter: ["", "Male", "Female", "Shemale"],
      gender: "",
      pictureFilter: ["", "picture", "no-picture"],
      picture: "",
      startDate: "",
      endDate: "",
      byGender: false,
      byDate: false,
    };
  },
  methods: {
    searchEmployee() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("search-bar");
      filter = input.value.toUpperCase();
      table = document.querySelector("tbody");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    },
    filterByGender() {
      if (this.gender != "") {
        var genderFiltered = this.employees.filter((el) => {
          return el.gender == this.gender;
        });
        this.$emit("getEmployees", genderFiltered);
      } else {
        this.$emit("getEmployees", this.employees);
      }
    },
    filterItems(arr, query) {
      return arr.filter(function(el) {
        return el.indexOf(query) !== -1;
        // return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    },
    filterByPicture() {
      var pictureFiltered;
      if (this.picture == "no-picture") {
        pictureFiltered = this.employees.filter((el) => {
          console.log(el.picture);
          return el.picture.includes("https");
        });
        // console.log(pictureFiltered);
        this.$emit("getEmployees", pictureFiltered);
      } else if (this.picture == "picture") {
        pictureFiltered = this.employees.filter((el) => {
          console.log(el.picture);
          return el.picture.includes("base64");
        });
        // console.log(pictureFiltered);
        this.$emit("getEmployees", pictureFiltered);
      } else {
        this.$emit("getEmployees", this.employees);
      }
    },
    filterByDate() {
      var dateFilter;
      var startD = new Date(this.startDate);
      var endD = new Date(this.endDate);
      if (this.startDate != "" && this.endDate == "") {
        dateFilter = this.employees.filter((el) => {
          var date = new Date(el.birthdate);
          return date.getTime() >= startD.getTime();
        });
        this.$emit("getEmployees", dateFilter);
      } else if (this.startDate == "" && this.endDate != "") {
        dateFilter = this.employees.filter((el) => {
          var date = new Date(el.birthdate);
          return date.getTime() <= endD.getTime();
        });
        this.$emit("getEmployees", dateFilter);
      } else if (this.startDate != "" && this.endDate != "") {
        dateFilter = this.employees.filter((el) => {
          var date = new Date(el.birthdate);
          return (
            date.getTime() >= startD.getTime() &&
            date.getTime() <= endD.getTime()
          );
        });
        this.$emit("getEmployees", dateFilter);
      } else {
        this.$emit("getEmployees", this.employees);
      }
    },
    resetFilters() {
      (this.gender = ""),
        (this.picture = ""),
        (this.startDate = ""),
        (this.endDate = "");
      this.$emit("getEmployees", this.employees);
    },
  },
};
</script>

<style scoped>
.form-outline {
  display: inline-block;
  width: 200px;
  margin-bottom: 20px;
}
#filters {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 50px 20px 0;
}

img {
  width: 70px;
  height: 70px;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
}

.btn-extra {
  margin: 0;
}

.filter {
  display: flex;
  margin: 20px !important;
}

#reset-button {
  margin: 10px 0 20px 0;
  padding: 5px 10px 5px 10px !important;
}

.sort-btn:hover {
  background-color: rgb(214, 218, 216);
}
</style>
