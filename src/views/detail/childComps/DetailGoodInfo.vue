<template>
  <div class="detail-good-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="detail-desc">
      <div class="start"></div>
      <div class="info-desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div v-if="detailInfo.detailImage" class="detail-image">
      <div>{{ detailInfo.detailImage[0].key }}</div>
      <div class="good-info-image">
        <img
          v-for="(item, index) in detailInfo.detailImage[0].list"
          :key="index"
          :src="item"
          alt=""
          @load="imgLoad"
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
  methods: {
    imgLoad() {
      this.$emit('imgLoad')
      // console.log('******')
    }
  }
};
</script>

<style>
  .detail-good-info {
    padding: 20px 10px 0 10px;
    border-top: 5px solid #e8e8e8;
  }

  .detail-desc .start,.detail-desc .end {
    position: relative;
    height: 1px;
    width: 100px;
    background: black;
    margin: 15px 0;
  }

  .detail-desc .start::before,.detail-desc .end::after {
    content: '';
    position: absolute;
    height: 8px;
    width: 8px;
    background-color: black;
    bottom: 0;
    border-radius: 8px;
  }

  .detail-desc .start {
    float: left;
  }

  .detail-desc .end {
    float: right;
  }

  .info-desc {
    clear: both;
    font-size: 15px;
  }

  .detail-image div:nth-child(1) {
    margin: 25px 0 10px 0;
    font-size: 18px;
    font-weight: 600;
  }
  .good-info-image img{
    width: 100%;
  }


</style>