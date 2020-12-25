<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ carCount }})</div>
    </nav-bar>
    <scroll class="content">
      <cart-good-list />
    </scroll>
    <cart-bottom-bar />
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";

import NavBar from "@/components/common/navbar/NavBar";
import CartBottomBar from "./childComps/CartBottomBar";
import CartGoodList from "./childComps/CartGoodList";

export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartBottomBar,
    CartGoodList,
  },
  computed: {
    carCount() {
      return this.$store.state.carList.length;
    },
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
  position: relative;
}

.cart-nav {
  background: var(--color-tint);
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 93px;
  left: 0;
  right: 0;
}
</style>