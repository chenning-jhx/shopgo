<template>
  <div id="detail">
    <detail-nav-bar @itemClick="itemClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="backTopShow">
      <!-- <div>{{$store.state.carList}}</div> -->
      <detail-swiper :topImages="topImages" class="detail-swiper"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shops="shops" />
      <detail-good-info :detailInfo="detailInfo" @imgLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="params"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list  class="goods-list" :goods="recommend" ref="recommend" :isrecommend='true'/>
    </scroll>
    <detail-bottom-bar @shopcarClick='shopcarClick'/>
    <back-top @click.native="backTopClick" v-show="backTopIsShow"/>
    <toast :message="message" :isShow="isShow"/>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import Toast from "@/components/common/toast/Toast"

import BackTop from '@/components/content/backTop/BackTop'
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodInfo from "./childComps/DetailGoodInfo";
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import GoodsList from "@/components/content/goods/GoodsList"
import DetailBottomBar from "./childComps/DetailBottomBar"

import { getDetailData, Goods, Shops, Params, getRecommend } from "@/network/detail.js";
import { imgListenerMixin } from '@/common/mixin'
import { debounce } from "@/common/utils"

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
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast
  },
  data(){
    return {
      iid: null,
      topImages: [],
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      backTopIsShow: false,
      commentInfo: {},
      recommend: [],
      itemClickYs:[],
      getItemClcikY: null,
      currentIndex: 0,
      message: '',
      isShow: false
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

    getRecommend().then(res => {
      this.recommend = res.data.list;
      // console.log(res)
    })

    this.getItemClcikY = () => {
      this.itemClickYs = [];
      this.itemClickYs.push(0)
      this.itemClickYs.push(this.$refs.params.$el.offsetTop)
      this.itemClickYs.push(this.$refs.comment.$el.offsetTop)
      this.itemClickYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.itemClickYs)
    }
  },
  mixins: [imgListenerMixin],
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getItemClcikY();
    },
    backTopClick() {
        this.$refs.scroll.scrollTo(0,0,200)
    },
    backTopShow(position) {
        const positionY = -position.y
        // console.log(position)
        this.backTopIsShow = positionY > 1000;
        
        // 导航内容联动
        for(let i = 0;i < this.itemClickYs.length;i++) {
          if(this.currentIndex !== i && ((i < this.itemClickYs.length-1 && positionY >=this.itemClickYs[i] &&  positionY < this.itemClickYs[i+1]) || (i == this.itemClickYs.length-1 && positionY >= this.itemClickYs[i]))) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }

    },
    itemClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.itemClickYs[index],200)
    },
    shopcarClick() {
      // console.log('*******')
      //获取购物车产品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //将商品信息添加到购物车
      // this.$store.commit("addCart",product);
      this.$store.dispatch('addCart', product).then(res => {
        this.message = res;
        this.isShow = true;

        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        },1500)
      })

      //弹出添加购物车成功
  
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

.goods-list {
  clear: both;
}


</style>