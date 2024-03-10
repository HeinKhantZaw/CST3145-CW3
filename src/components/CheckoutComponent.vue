<script>
export default {
  props: ["changeView", "cart", "baseURL"],
  data() {
    return {
      name: "",
      phoneNumber: "",
      isNameValid: true,
      isNumberValid: true,
    };
  },
  computed: {
    cartItemCount() {
      return this.cart.length;
    },
    isFormValid: function () {
      return (
        this.name !== "" &&
        this.isNameValid &&
        this.phoneNumber !== "" &&
        this.isNumberValid &&
        this.cart.length > 0
      );
    },
    totalPrice: function () {
      return this.cart.reduce((total, item) => {
        return total + item.lesson.Price * item.amount;
      }, 0);
    },
  },
  methods: {
    validateName: function () {
      const nameRegex = /^[A-Za-z\s]+$/; // only letters and spaces
      this.isNameValid = nameRegex.test(this.name);
    },
    validateNumber: function () {
      let phoneRegex = /^[0-9]+$/; // only numbers
      this.isNumberValid = phoneRegex.test(this.phoneNumber);
    },
    backToHome: function (modalClose) {
      // reset everything when user goes back home
      this.isNameValid = true;
      this.isNumberValid = true;
      this.name = "";
      this.phoneNumber = "";
      if (modalClose === true) {
        this.cart.splice(0, this.cart.length);
      }
      this.changeView();
    },
    submitOrder: async function () {
      const finalCart = this.cart.map((item) => ({
        _id: item.lesson._id,
        Subject: item.lesson.Subject,
        amount: item.amount,
      }));
      const updatedLessons = this.cart.map((item) => ({
        _id: item.lesson._id,
        Spaces: item.lesson.Spaces,
      }));
      const order = {
        name: this.name,
        phoneNumber: this.phoneNumber,
        cart: finalCart,
      };
      fetch(this.baseURL + "api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }).then(async (res) => {
        const result = await res.json();
        if (result.acknowledged) {
          updatedLessons.map(async (lesson) => {
            await fetch(`${this.baseURL}api/lessons/${lesson._id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(lesson),
            });
          });
        }
      });
    },
  },
};
</script>

<template>
  <div>
    <!--Order Submitted Modal-->
    <div
      id="orderSubmittedModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Order Submitted</h5>
          </div>
          <div class="modal-body">
            <p>Your order has been submitted successfully!</p>
          </div>
          <div class="modal-footer">
            <button
              @click="backToHome(true)"
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--Checkout Page-->
    <div class="container-fluid">
      <div class="row mt-3">
        <div class="col-12 text-right">
          <button class="btn btn-primary" @click="backToHome">
            <i class="fas fa-home"></i>
            Back to Home
          </button>
        </div>
      </div>
    </div>
    <section class="h-100 h-custom">
      <div class="container py-1 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12">
            <div
              class="card card-registration card-registration-2 rounded-corner"
            >
              <div class="card-body p-0">
                <div class="row g-0">
                  <div class="col-lg-8">
                    <div class="p-5">
                      <div
                        class="d-flex justify-content-between align-items-center mb-5"
                      >
                        <div v-if="cartItemCount <= 0">
                          <h1 class="fw-bold mb-0 text-black">
                            Your Shopping Cart is empty!
                          </h1>
                        </div>
                        <div v-else>
                          <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                          <h6 class="mb-0 text-muted">
                            {{ cartItemCount }} lesson{{
                              cartItemCount > 1 ? "s" : ""
                            }}
                          </h6>
                        </div>
                      </div>
                      <hr class="my-4" />
                      <div v-for="item in cart">
                        <div
                          class="row mb-4 d-flex justify-content-between align-items-center"
                        >
                          <div class="col-12 col-lg-3 mb-3 mb-lg-0">
                            <h6 class="text-muted">
                              {{ item.lesson.Subject }}
                            </h6>
                            <h6 class="text-black mb-0">
                              {{ item.lesson.Location }}
                            </h6>
                          </div>
                          <div class="col-6 col-lg-4 d-flex">
                            <button
                              class="btn btn-link px-2"
                              @click="
                                $emit('reduce-item-from-cart', item.lesson)
                              "
                            >
                              <font-awesome-icon
                                icon="fas fa-minus"
                              ></font-awesome-icon>
                            </button>
                            <input
                              id="form1"
                              min="1"
                              name="quantity"
                              :value="item.amount"
                              type="number"
                              onKeyDown="return false"
                              class="form-control form-control-sm"
                            />
                            <button
                              class="btn btn-link px-2"
                              @click="$emit('add-item-to-cart', item.lesson)"
                            >
                              <font-awesome-icon
                                icon="fas fa-plus"
                              ></font-awesome-icon>
                            </button>
                          </div>
                          <div class="col-3 col-lg-3 offset-lg-1">
                            <h6 class="mb-0">
                              £{{ item.lesson.Price * item.amount }}
                            </h6>
                          </div>
                          <div class="col-1 col-lg-1 text-end">
                            <button
                              @click="$emit('remove-item-from-cart', item)"
                              class="btn btn-link px-2"
                            >
                              <font-awesome-icon
                                icon="fas fa-trash"
                                style="color: #e20100"
                              />
                            </button>
                          </div>
                        </div>
                        <hr class="my-4" />
                      </div>
                      <div class="pt-5 d-none d-sm-block">
                        <h6 class="mb-0">
                          <a @click="backToHome" class="text-body"
                            ><i class="fas fa-long-arrow-alt-left me-2"></i>Back
                            to Home</a
                          >
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 bg-grey">
                    <div class="pt-0 pb-2 px-3 p-lg-5">
                      <h3 class="fw-bold mb-5 mt-2 pt-1">Checkout</h3>
                      <hr class="my-4" />
                      <h5 class="text-uppercase mb-3">Personal Info</h5>
                      <div class="mb-4 pb-2">
                        <div class="form-group">
                          <label for="name">Name:</label>
                          <input
                            type="text"
                            :class="
                              isNameValid
                                ? 'form-control'
                                : 'form-control is-invalid'
                            "
                            id="name"
                            v-model="name"
                            @input="validateName"
                          />
                          <div
                            id="validateName"
                            class="invalid-feedback"
                            v-if="name && !isNameValid"
                          >
                            Please provide a valid name. (Only letters and
                            spaces)
                          </div>
                        </div>
                      </div>
                      <div class="mb-5">
                        <div class="form-group">
                          <label for="phone">Phone number:</label>
                          <input
                            type="text"
                            class="form-control"
                            :class="
                              isNumberValid
                                ? 'form-control'
                                : 'form-control is-invalid'
                            "
                            id="phone"
                            v-model="phoneNumber"
                            @input="validateNumber"
                          />
                          <div
                            id="validatePhone"
                            class="invalid-feedback"
                            v-if="phoneNumber && !isNumberValid"
                          >
                            Please provide a valid phone number. (Only digits)
                          </div>
                        </div>
                      </div>
                      <hr class="my-4" />

                      <div class="d-flex justify-content-between mb-5">
                        <h5 class="text-uppercase">Total price:</h5>
                        <h5>£{{ totalPrice }}</h5>
                      </div>

                      <button
                        type="button"
                        class="btn btn-dark btn-block btn-lg"
                        data-mdb-ripple-color="dark"
                        :disabled="!isFormValid"
                        data-toggle="modal"
                        @click="submitOrder"
                        data-target="#orderSubmittedModal"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
