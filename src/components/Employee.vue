<template>
  <button
    v-on:click="goBack()"
    type="button"
    class="btn btn-secondary btn-extra"
  >
    Back
  </button>
  <form id="employee-data" v-on:submit.prevent="formSubmit()">
    <div class="row mb-3">
      <label for="first-name" class="col-sm-3 col-form-label">
        First Name
        <abbr title="This field is mandatory" aria-label="required">
          *
        </abbr>
      </label>
      <div class="col-sm-5">
        <input
          v-model.trim="firstName"
          type="text"
          class="form-control"
          id="first-name"
          required
          maxlength="35"
          pattern="[A-Za-z]+"
          title="Only letters in your name please"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="last-name" class="col-sm-3 col-form-label">
        Last Name
        <abbr title="This field is mandatory" aria-label="required">
          *
        </abbr>
      </label>
      <div class="col-sm-5">
        <input
          v-model.trim="lastName"
          type="text"
          class="form-control"
          id="last-name"
          required
          maxlength="35"
          pattern="[A-Za-z]+"
          title="Only letters in your name please"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="email" class="col-sm-3 col-form-label">
        Email
        <abbr title="This field is mandatory" aria-label="required">
          *
        </abbr>
      </label>
      <div class="col-sm-5">
        <input
          v-model.trim="email"
          type="email"
          class="form-control"
          id="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="gender-selector" class="col-sm-3 col-form-label">
        Gender
        <abbr title="This field is mandatory" aria-label="required">
          *
        </abbr>
      </label>
      <div class="col-sm-5">
        <select
          v-model="gender"
          class="form-select"
          id="gender-selector"
          aria-label="Default select example"
          required
        >
          <option disabled selected value>-- select an option --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Shemale">Shemale</option>
        </select>
      </div>
    </div>
    <div class="row mb-3">
      <label for="birthdate" class="col-sm-3 col-form-label">
        Birth date
        <abbr title="This field is mandatory" aria-label="required">
          *
        </abbr>
      </label>
      <input
        v-model="birthdate"
        type="date"
        class="col-sm-4"
        id="birthdate"
        required
        title="Please choose your birthdate"
      />
    </div>
    <div class="row mb-3">
      <label for="picture-upload" class="col-sm-2 col-form-label">
        Picture
      </label>
      <file-input
        v-model="picture"
        v-on:change="convertPicture()"
        is-image
        type="file"
        class=""
        id="picture-upload"
      />
    </div>
    <button
      type="submit"
      class="btn btn-primary"
      id="add-button"
      value="submit"
    >
      Save
    </button>
  </form>
</template>

<script>
import db from "../firebaseInit";
import firebase from "firebase";

import FileInput from "vue3-simple-file-input";

const moment = require("moment");
export default {
  name: "Form",
  components: {
    FileInput,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      birthdate: "",
      picture: firebase
        .storage()
        .ref()
        .child("user.png")
        .getDownloadURL()
        .then((url) => {
          this.picture = url;
          // console.log(this.picture);
        })
        .catch((error) => {
          alert("Error getting picture ", error);
        }),
      employees: [],
      employeeId: this.$route.params.employeeId,
    };
  },
  watch: {},
  props: {},
  methods: {
    goBack() {
      window.history.back();
    },
    getData() {
      const employeeId = this.$route.params.employeeId;
      console.log(employeeId);
      if (employeeId != undefined) {
        db.collection("employees")
          .doc(employeeId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.firstName = doc.data().firstName;
              this.lastName = doc.data().lastName;
              this.email = doc.data().email;
              this.gender = doc.data().gender;
              this.birthdate = doc.data().birthdate;
              this.picture = doc.data().birthdate;
            }
          });
      }
    },
    convertPicture() {
      console.log(this.employeeId);
      console.log(this.picture.file);
      if (this.picture != null) {
        try {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.picture = e.target.result;
          };
          reader.readAsDataURL(this.picture.file);
        } catch (error) {
          alert("Error firebase ", error);
        }
      }
    },
    async formSubmit() {
      var employee = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        gender: this.gender,
        birthdate: this.birthdate,
        picture: this.picture,
      };
      console.log(employee.picture);
      this.birthdate = moment(employee.birthdate).format("D MMMM YYYY");
      this.employees.push(employee);
      //reset the form
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.gender = "";
      this.birthdate = "";
      this.picture = "";
      await db
        .collection("employees")
        .doc(employee.email)
        .set(employee);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
form {
  background-color: rgb(238, 238, 238);
  border-radius: 50px;
  margin: 0 0 50px 0;
  width: 800px;
  max-width: 55%;
  min-width: 500px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px;
}

abbr[title] {
  border-bottom: none !important;
  cursor: inherit !important;
  text-decoration: none !important;
}

input:invalid {
  background-color: #fc00001c;
}

#picture-upload {
  /* margin-left: 35px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-extra {
  margin: 40px;
}
button {
  margin: 20px 40.8% 40px 40.8%;
}
</style>
