<template>
  <div class="detail-good-info" v-if="Object.keys(detailInfo).length !== 0">
    <div>
      <div class="start"></div>
      <div>{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div v-if="detailInfo.detailImage">
      <div>{{ detailInfo.detailImage[0].key }}</div>
      <div>
        <img
          v-for="(item, index) in detailInfo.detailImage[0].list"
          :key="index"
          :src="item"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {};
  },
  computed: {},
  mounted() {
    //   console.log(this.detailInfo)
  },
};
</script>

<style>
</style>