<template>
  <div id="filters">
    <div class="col-sm-2 filter">
      <label for="gender-filter" class="col-sm-4 col-form-label">
        Gender
      </label>
      <div class="col-sm-9">
        <select
          class="form-select"
          id="gender-filter"
          aria-label="Default select example"
          onchange="filterGender();"
        >
          <option value="null">-- select an option --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Shemale">Shemale</option>
        </select>
      </div>
    </div>
    <div class="col-sm-2 filter">
      <label for="picture-filter" class="col-sm-4 col-form-label">
        Picture
      </label>
      <div class="col-sm-9">
        <select
          class="form-select"
          id="picture-filter"
          aria-label="Default select example"
          onchange="filterPicture();"
        >
          <option value="null">-- select an option --</option>
          <option value="picture">Picture</option>
          <option value="no-picture">No picture</option>
        </select>
      </div>
    </div>

    <div class="col-sm-2 filter">
      <label for="birthdate" class="col-sm-6 col-form-label">
        Start date
      </label>
      <input
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
        type="date"
        class="col-sm-9"
        id="end-date"
        title="Please choose the end date"
      />
    </div>
    <button
      type="submit"
      class="btn btn-primary btn-extra"
      id="sort-button"
      onclick="filterByDate();"
    >
      Sort
    </button>
  </div>
  <button
    type="submit"
    class="btn btn-primary btn-extra"
    id="reset-button"
    onclick="resetFilters();"
  >
    Reset filters
  </button>
</template>

<script>
export default {
  name: "Filters",
};
</script>

<style scoped>
#filters {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 5px 10px 5px 10px !important;
}

.sort-btn {
  margin: 0;
  padding: 3px 6px;
}

.sort-btn:hover {
  background-color: rgb(214, 218, 216);
}
</style>
