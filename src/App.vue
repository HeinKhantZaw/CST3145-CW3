<template>
  <div id="app">
    <main>
      <component
        :is="currentPage"
        :cart="cart"
        :lessons="lessons"
        :images="images"
        :baseURL="baseURL"
        :changeView="changeView"
      />
    </main>
  </div>
</template>

<style scoped></style>
<script>
import Home from "@/pages/Home.vue";
import Checkout from "@/pages/Checkout.vue";

export default {
  name: "App",
  data() {
    return {
      cart: [],
      lessons: [],
      images: [],
      currentPage: "Home",
      baseURL: "https://vue-env.eba-knuwpbba.eu-west-2.elasticbeanstalk.com/",
    };
  },
  components: {
    Home,
    Checkout,
  },
  created: function () {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }
    this.fetchLessons();
  },
  methods: {
    fetchLessons: async function () {
      const response = await fetch(this.baseURL + "api/lessons");
      this.lessons = await response.json();
      this.lessons.map(async (lesson) => {
        this.images.push({
          Subject: lesson.Subject,
          URL: this.baseURL + "images/" + lesson.Subject.toLowerCase() + ".jpg",
        });
      });
    },
    changeView: function () {
      if (this.cart.length > 0 && this.currentPage === "Home") {
        this.currentPage = "Checkout";
      } else {
        this.currentPage = "Home";
      }
    },
  }
}
</script>
