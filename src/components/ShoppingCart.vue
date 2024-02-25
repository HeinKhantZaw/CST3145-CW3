<script>
export default {
  props: ["cart", "changeView"],
  computed: {
    cartItemCount() {
      return this.cart.length;
    },
  },
};
</script>
<template>
  <div
    class="col-3 text-right d-flex align-items-center justify-content-center"
  >
    <!-- Shopping Cart Button for large screens -->
    <button
      class="btn d-none d-sm-block"
      :style="{ cursor: cart?.length <= 0 ? 'not-allowed' : 'pointer' }"
      :class="cart?.length > 0 ? 'btn-success' : 'btn-secondary'"
      :disabled="cart?.length <= 0"
      @click="changeView()"
    >
      ( {{ cartItemCount }} )<i class="fas fa-shopping-cart"></i> Shopping Cart
    </button>
    <!-- Shopping Cart Icon for small screens -->
    <div class="d-block d-sm-none">
      <a
        @click="changeView()"
        :class="cart?.length > 0 ? 'text-success' : 'text-muted'"
      >
        <i class="fas fa-shopping-cart"></i>
        <span class="badge badge-light">{{ cartItemCount }}</span>
      </a>
    </div>
  </div>
</template>
