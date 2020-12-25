<template>
  <div class="check-button" :class="{check: isChecked}">
      <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    name: "CheckButton",
    props: {
        isChecked: {
            type: Boolean,
            default: false
        }
},
    methods: {
        // checkClick() {
        //     this.$emit('checkClick')
        // }
    }
}
</script>

<style scoped>
    .check-button {
        height: 18px;
        width: 18px;
        border-radius: 50%;
        border: 2px solid #c8c8c8;
    }


    .check {
        background:#ff8198;
        border: 2px solid #ff8198;
    }
</style>