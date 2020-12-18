<template>
  <div>
      <detail-nav-bar />
      <detail-swiper :topImages='topImages' class="detail-swiper"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shops="shops"/>
      <detail-good-info :detailInfo="detailInfo"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodInfo from './childComps/DetailGoodInfo'


import { getDetailData, Goods, Shops } from '@/network/detail.js'

export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodInfo
    },
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shops: {},
            detailInfo: {}
        }
    },
    created() {
        //获取商品iid
        this.iid = this.$route.query.iid;
        //请求详情数据
        getDetailData(this.iid).then(res => {
            // console.log(res);
            const data = res.result;
            //获取轮播图数据
            this.topImages = data.itemInfo.topImages;
            //获取商品基本信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
            //获取店铺信息
            this.shops = new Shops(data.shopInfo);
            //获取商品图片
            this.detailInfo = res.result.detailInfo;

        })
    }
}
</script>

<style>
    .detail-swiper {
        height: 300px;
    }
</style>