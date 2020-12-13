<template>
  <div class="tabcontrol">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tabcontrol-item"
      :class="{ active: currentIndex === index }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
      itemClick(index) {
          this.currentIndex = index;
          this.$emit('tabClick',index);
      }
  }
};
</script>

<style>
.tabcontrol {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  background: #fff;
}

.tabcontrol-item {
  flex: 1;
}

.tabcontrol-item.active {
  color: var(--color-high-text);
}

.tabcontrol-item span {
    padding: 5px;
}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>