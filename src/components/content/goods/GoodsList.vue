<template>
  <div class="goods-list">
      <div class="recommend1" v-if="isrecommend">推荐商品</div>
      <goods-list-item v-for="(item,index) in goods" :key="index" :goodItem='item'/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
    name: 'goodsList',
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        },
        isrecommend: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    components: {
        GoodsListItem
    },
    created () {
        // console.log(this.isrecommend)
    }
}
</script>

<style>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
}

.recommend1 {
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    margin: 20px 0 10px 0;
    padding: 15px 0 10px 10px;
    border-top: 5px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
}
</style>