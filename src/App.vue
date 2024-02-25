<template>
  <div id="app">
    <main>
      <parent-component />
    </main>
  </div>
</template>

<style scoped></style>
<script>
import ParentComponent from "./components/ParentComponent.vue";
export default {
  name: "App",
  components: {
    ParentComponent
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
  },
  methods: {
    storeInCache: async function(request, response) {
      const cache = await caches.open("lesson-cache");
      await cache.put(request, new Response(JSON.stringify(response)));
      console.log("Stored in cache:", response);
    },
  }
}
</script>
