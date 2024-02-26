<script>
import ShoppingCart from "@/components/ShoppingCart.vue";
import Home from "@/components/LessonsComponent.vue";
import Checkout from "@/components/CheckoutComponent.vue";

export default {
  data() {
    return {
      cart: [],
      lessons: [],
      images: [],
      currentPage: "Home",
      baseURL: "https://vue-env.eba-knuwpbba.eu-west-2.elasticbeanstalk.com/"
    };
  },
  components: {
    ShoppingCart,
    Home,
    Checkout
  },
  created() {
    this.fetchLessons();
  },
  methods: {
    fetchLessons: async function() {
      const response = await fetch(this.baseURL + "api/lessons");
      this.lessons = await response.json();
      this.lessons.map(async (lesson) => {
        this.images.push({
          Subject: lesson.Subject,
          URL: this.baseURL + "images/" + lesson.Subject.toLowerCase() + ".jpg"
        });
      });
    },
    changeView: function() {
      if (this.cart.length > 0 && this.currentPage === "Home") {
        this.currentPage = "Checkout";
      } else {
        this.currentPage = "Home";
      }
    },
    addToCart: function(lesson) {
      if (lesson.Spaces > 0) {
        lesson.Spaces--;
        const lessonIndex = this.cart.findIndex(
          (item) => item.lesson === lesson
        );
        if (lessonIndex !== -1) {
          this.cart[lessonIndex].amount++;
        } else {
          this.cart.push({
            lesson: lesson,
            amount: 1
          });
        }
      }
    },
    removeFromCart: function(item) {
      item.lesson.Spaces += item.amount;
      const lessonIndex = this.cart.findIndex(
        (cartItem) => cartItem.lesson === item.lesson
      );
      if (lessonIndex !== -1) {
        this.cart.splice(lessonIndex, 1);
      }
    }
  }
};
</script>

<template>
  <div>
    <component
      :is="currentPage"
      :cart="cart"
      :lessons="lessons"
      :images="images"
      :baseURL="baseURL"
      :changeView="changeView"
      @add-item-to-cart="addToCart"
      @remove-item-from-cart="removeFromCart"
    >
      <template v-slot:shoppingCart>
        <ShoppingCart :cart="cart" :changeView="changeView" />
      </template>
    </component>
  </div>
</template>

<style scoped>

</style>
