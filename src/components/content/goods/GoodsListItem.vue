<template>
  <div class="goods-list-item">
      <img :src="goodItem.show.img" alt="" @load="imgLoad">
      <div class="good-info"> 
          <p>{{goodItem.title}}</p>
          <span class="price">￥{{goodItem.price}}</span>
          <span class="cfav">{{goodItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'goodsListItem',
    props: {
        goodItem: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        imgLoad() {
            this.$bus.$emit('itemImgLoad')
            // console.log(this.$bus);
        }
    }
}
</script>

<style>
.goods-list-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
}

.goods-list-item img {
    width: 100%;
}

.good-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    overflow: hidden;
    font-size: 12px;
    text-align: center;
}

.good-info p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 3px;
}

.good-info .price {
    color: var(--color-high-text);
    margin-right: 30px;
}

.good-info .cfav {
    position: relative;
}

.good-info .cfav::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg')  0 0/14px;
}
</style>