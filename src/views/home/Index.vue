<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" v-show='isFixed'/>

    <scroll class="content" ref="scroll" :probe-type='3' @scroll="backTopShow" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showgoods" />
    </scroll>

    <back-top @click.native="backTopClick" v-show="isShow"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop"

import { getHomeMultidata, getHomeData } from "@/network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0
    };
  },
  computed: {
    showgoods() {
      return this.goods[this.currentType].list;
    },
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    //获取多条数据
    this.getMultidata();

    //获取商品数据
    this.getGoodsData("pop");
    this.getGoodsData("new");
    this.getGoodsData("sell");

    
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY)
  },
  mounted() {
    //监听item中图片加载事件
    const refresh =this.debounce(this.$refs.scroll.refresh, 200) 
    this.$bus.$on("itemImgLoad", () => {
      // console.log('---------')
      refresh()
    });
  },

  methods: {
    /**
     * 绑定事件
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          this.currentType = "pop";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backTopClick() {
      this.$refs.scroll.scrollTo(0,0,300)
    },
    backTopShow(position) {
      // console.log(position)
      //backTop是都显示
      this.isShow = -position.y > 1000

      //tabControl是否吸顶
      this.isFixed = -position.y > this.tabOffsetTop
    },
    loadMore() {
      // console.log('------------------')
      this.getGoodsData(this.currentType)
    },

    //防抖函数
    debounce(func, delay) {
      let timer = null
      return function(...args) {
        if(timer) setTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this,args)
        },delay)
      }
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求数据
     */
    getMultidata() {
      // console.log('1111111')
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    getGoodsData(type) {
      const page = this.goods[type].page + 1;
      getHomeData(type, page).then((res) => {
        const goodsList = res.data.list;
        this.goods[type].list.push(...goodsList);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  /* position: fixed;
  right: 0;
  left: 0;
  top: 0;
   z-index: 9; */
  background-color: var(--color-tint);
  color: #fff;
  text-align: center;
}

.tabcontrol {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  overflow: hidden;
  /* height: 300px; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* height: calc(100% - 93px); */
}

</style>