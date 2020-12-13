<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{ active: !isActive }"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
      path: String
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) ==-1;
    },
  },
  methods: {
    itemClick() {
        // console.log(this.path)
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  font-size: 14px;
}

.tab-bar-item img {
  height: 24px;
  width: 24px;
}

.active {
  color: red;
}
</style>