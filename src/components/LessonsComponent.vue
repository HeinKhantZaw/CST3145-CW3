<script>
export default {
  data() {
    return {
      title: "Lessons",
      descriptions: "You can choose the lessons here:",
      sortBy: "Subject",
      sortOrder: "asc",
      searchQuery: "",
      apiURL: this.baseURL + "api/",
    };
  },
  watch: {
    searchQuery: function () {
      this.fetchAndFilterLessons();
    },
    sortBy: function () {
      this.fetchAndFilterLessons();
    },
    sortOrder: function () {
      this.fetchAndFilterLessons();
    },
  },
  props: ["baseURL", "lessons", "images", "cart", "changeView"],

  methods: {
    fetchAndFilterLessons: async function () {
      const response = await fetch(
        `${this.apiURL}search?query=${this.searchQuery}&sortBy=${this.sortBy}&sortOrder=${this.sortOrder}`
      );
      this.lessons = await response.json();
    },
  },
};
</script>

<template>
  <div
    class="container-fluid justify-content-center align-items-center"
    style="height: 100vh"
  >
    <div class="row">
      <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="mt-3">
          <h4>Sort by:</h4>
          <select class="form-control" v-model="sortBy">
            <option value="Subject">Subject</option>
            <option value="Location">Location</option>
            <option value="Price">Price</option>
            <option value="Spaces">Availability</option>
          </select>
          <br />
          <div class="col">
            <h4>Order:</h4>
            <input
              id="rdoAscending"
              class="form-check-input"
              type="radio"
              v-model="sortOrder"
              value="asc"
            />
            <label for="rdoAscending" class="form-check-label">
              Ascending
            </label>
            <br />
            <input
              id="rdoDescending"
              class="form-check-input"
              type="radio"
              v-model="sortOrder"
              value="dsc"
            />
            <label for="rdoDescending" class="form-check-label"
              >Descending</label
            >
          </div>
        </div>
      </nav>
      <main class="col-md-10 col-12 pt-3 px-4">
        <div class="row">
          <div class="col-9 mx-auto mt-2 mb-2 text-center search-bar">
            <input
              type="text"
              class="form-control"
              placeholder="Search lessons"
              v-model="searchQuery"
            />
          </div>
          <slot name="shoppingCart"></slot>
          <div class="d-flex d-md-none">
            <!-- Sort By Dropdown -->
            <div class="dropdown mx-5">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="sortByDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort by
              </button>
              <div class="dropdown-menu" aria-labelledby="sortByDropdown">
                <a class="dropdown-item" @click="sortBy = 'Subject'">Subject</a>
                <a class="dropdown-item" @click="sortBy = 'Location'"
                  >Location</a
                >
                <a class="dropdown-item" @click="sortBy = 'Price'">Price</a>
                <a class="dropdown-item" @click="sortBy = 'Spaces'"
                  >Availability</a
                >
              </div>
            </div>

            <!-- Order Dropdown -->
            <div class="dropdown mx-5">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="orderDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Order
              </button>
              <div class="dropdown-menu" aria-labelledby="orderDropdown">
                <a class="dropdown-item" @click="sortOrder = 'asc'"
                  >Ascending</a
                >
                <a class="dropdown-item" @click="sortOrder = 'dsc'"
                  >Descending</a
                >
              </div>
            </div>
          </div>
        </div>
        <h1>{{ title }}</h1>
        <p>{{ descriptions }}</p>
        <div class="row">
          <!--Lesson cards-->
          <div class="col-lg-4 col-sm-12" v-for="lesson in lessons">
            <div class="card mb-4">
              <img
                class="card-img-top"
                :src="
                  images.find((image) => image.Subject === lesson.Subject).URL
                "
                :alt="lesson.Subject"
              />
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="card-title">Subject: {{ lesson.Subject }}</h5>
                    <p class="card-text">Location: {{ lesson.Location }}</p>
                    <p class="card-text">Price: £{{ lesson.Price }}</p>
                    <p class="card-text">Spaces: {{ lesson.Spaces }}</p>
                  </div>
                </div>
              </div>
              <button
                class="btn btn-primary"
                :class="lesson.Spaces <= 0 && 'disabled btn-secondary'"
                @click="$emit('add-item-to-cart', lesson)"
                :disabled="lesson.Spaces <= 0"
                :style="{
                  cursor: lesson.Spaces <= 0 ? 'not-allowed' : 'pointer',
                }"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
