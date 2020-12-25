<template>
  <div class="cart-good-list">
      <cart-good-item v-for="(item, index) in goods" :key="index" :product="item"/>
  </div>
</template>

<script>
import CartGoodItem from "./CartGoodItem"

export default {
    name: "CartGoodList",
    components: {
        CartGoodItem
    },
    data () {
        return {
            goods: []
        }
    }, 
    created () {
        this.goods = this.$store.state.carList;
    }
}
</script>

<style>
</style>