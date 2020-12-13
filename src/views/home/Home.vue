<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
      <goods-list :goods="showgoods" />
    </scroll>

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
      courrentType: "pop",
    };
  },
  computed: {
    showgoods() {
      return this.goods[this.courrentType].list;
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
  },
  created() {
    //获取多条数据
    this.getMultidata();

    //获取商品数据
    this.getGoodsData("pop");
    this.getGoodsData("new");
    this.getGoodsData("sell");

    //监听item中图片加载事件
    this.$bus.$on('itemImgLoad',() => {
      // console.log('---------')
      this.$refs.scroll.refresh();
    })
  },
  methods: {
    /**
     * 绑定事件
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.courrentType = "pop";
          break;
        case 1:
          this.courrentType = "new";
          break;
        case 2:
          this.courrentType = "sell";
          break;
        default:
          this.courrentType = "pop";
          break;
      }
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
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh; 
  position: relative;
}

.home-nav {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  background-color: var(--color-tint);
  color: #fff;
  text-align: center;
  z-index: 9;
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