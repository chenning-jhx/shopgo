<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span>店铺</span>
      </div>
      <div class="">
        <i class="icon collection"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="shopcar" @click="shopcarClick">
        <span>加入购物车</span>
      </div>
      <div class="buy">
        <span>购买</span>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "DetailBottomBar",
  data() {
    return {};
  },
  methods: {
    shopcarClick() {
      this.$emit('shopcarClick')
    }
  }
};
</script>
 
<style scoped>
.bottom-bar {
  position: fixed;
  display: flex;
  height: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  text-align: center;
}

.bar-item {
    flex: 1;
    display: flex;
}

.bar-left div{
    flex: 1;
    font-size: 15px;
}

.bar-right div {
    flex: 1;
}

.bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 8px auto 5px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {
    background-position: 0 -54px;
}

.bar-left .shop {
    background-position: 0 -98px;
}

.bar-left .collection {
    background-position: 0 0;
}

.bar-right {
    font-size: 18px;
    line-height: 60px;
}

.bar-right .shopcar {
    background: #ffe817;
    color: #333;
}

.bar-right .buy {
    background: #f69;
    color: #fff;
}
</style>