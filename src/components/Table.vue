<template>
  <table class="table table-striped table-hover" id="employee-table">
    <thead>
      <tr>
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
          <!-- <button class="btn sort-btn" onclick="sortTableByBirthdate(4);">
                            <i class="fas fa-sort">
                            </i>
                        </button> -->
        </th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
};
</script>
