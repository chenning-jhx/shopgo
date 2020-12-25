<template>
  <div class="cart-good-item">
    <div class="cart-good-check">
      <check-button @click.native='checkClick' :isChecked="product.checked"/>
    </div>
    <div class="cart-good-img">
      <img :src="product.image" alt="" />
    </div>
    <div class="cart-good-info">
      <div class="cart-good-title">{{ product.title }}</div>
      <div class="cart-good-desc">{{ product.desc }}</div>
      <div class="cart-good-bottom">
        <div class="cart-good-price">{{ product.price | showPrice }}</div>
        <div class="cart-good-count">{{ product.count | showCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton"

export default {
  name: "CartGoodItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
      CheckButton
  },
  methods: {
      checkClick() {
        console.log(this.product.checked)
        this.product.checked = !this.product.checked
      }
  },
  filters: {
      showPrice(price) {
          return '￥' + price
      },
      showCount(count) {
          return 'X' + count
      }
  }
};
</script>

<style>
    .cart-good-item {
        width: 100%;
        display: flex;
        padding: 5px;
        border-bottom: 1px solid #ccc;
    }

    .cart-good-check {
        /* width: 15%; */
        display: flex;
        align-items: center;
        justify-items: center;
    }

    .cart-good-img {
        padding: 5px;
    }

    .cart-good-img img{
        display: block;
        width: 80px;
        height: 100px;
        border-radius: 5px;
    }

    .cart-good-title, .cart-good-desc {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .cart-good-info {
        position: relative;
        overflow: hidden;
        margin-top: 10px;
        font-size: 17px;
        color: #333;
    }

    .cart-good-info .cart-good-desc {
        font-size: 14px;
        color: #666;
        padding: 10px 10px;
    }

    .cart-good-bottom {
        position: absolute;
        bottom: 10px;
        right: 10px;
        left: 10px;
    }

    .cart-good-price {
        float: left;
        color: var(--color-tint);
    }

    .cart-good-count {
       float: right;
    }
</style>