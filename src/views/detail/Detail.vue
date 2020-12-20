<template>
  <div id="detail">
    <detail-nav-bar />
    <scroll class="content" ref="scroll" @scroll="backTopShow">
      <detail-swiper :topImages="topImages" class="detail-swiper"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shops="shops" />
      <detail-good-info :detailInfo="detailInfo" @imgLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="backTopIsShow"/>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";

import BackTop from '@/components/content/backTop/BackTop'
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodInfo from "./childComps/DetailGoodInfo";
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"

import { getDetailData, Goods, Shops, Params } from "@/network/detail.js";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodInfo,
    DetailParamInfo,
    Scroll,
    BackTop,
    DetailCommentInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      backTopIsShow: false,
      commentInfo: {}
    };
  },
  created() {
    //获取商品iid
    this.iid = this.$route.query.iid;
    //请求详情数据
    getDetailData(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      //获取轮播图数据
      this.topImages = data.itemInfo.topImages;
      //获取商品基本信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺信息
      this.shops = new Shops(data.shopInfo);
      //获取商品图片
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = new Params(
          data.itemParams.info,
          data.itemParams.rule)
      if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
      }
      
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
    backTopClick() {
        this.$refs.scroll.scrollTo(0,0,200)
    },
    backTopShow(position) {
        // console.log(position)
        this.backTopIsShow = -position.y > 1000;
    }
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 60px;
  left: 0;
  right: 0;
}

.detail-swiper {
    height: 300px;
}
</style>