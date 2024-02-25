<template>
  <div id="app">
    <main>
      <component
          :is="currentPage"
          :cart="cart"
          :baseURL="baseURL"
          :changeView="changeView"/>
    </main>
  </div>
</template>

<style scoped>

</style>
<script>
import Home from "@/pages/Home.vue";
import Checkout from "@/pages/Checkout.vue";

export default {
  name: "App",
  data() {
    return {
      cart: [],
      currentPage: "Home",
      baseURL: "https://vue-env.eba-knuwpbba.eu-west-2.elasticbeanstalk.com/",
    }
  },
  components: {
    Home,
    Checkout
  },
  created: function () {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js")
          .then(registration => {
            console.log("Service Worker registered with scope:", registration.scope);
          }).catch(error => {
        console.log("Service Worker registration failed:", error);
      });
    }
  },
  methods: {
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
