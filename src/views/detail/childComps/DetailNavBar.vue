<template>
    <nav-bar>
      <div slot="left" class="nav-bar-left">
        <img src="~assets/img/common/back.svg" alt="" @click="backClick"/>
      </div>
      <div slot="center" class="nav-bar-center">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="nav-bar-item"
          :class="{ active: index === currentIndex }"
          @click="itemclick(index)">
          {{ item }}
        </div>
      </div>
    </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index;
      this.$emit("itemClick",index);
      // console.log(index);
    },
    backClick() {
        this.$router.back();
    }
  },
};
</script>

<style scoped>
.nav-bar-center {
  display: flex;
  font-size: 14px;
}

.nav-bar-item {
  flex: 1;
}

.nav-bar-left {
  margin: 5px 20px;
}

.active {
  color: var(--color-tint);
}
</style>