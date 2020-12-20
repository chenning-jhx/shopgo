<template>
  <div class="detail-base-item" v-if="Object.keys(goods).length !== 0">
    <div class="info">
      <div class="info-title">{{ goods.title }}</div>
      <div class="info-price">
        <span>{{ goods.newPrice }}</span>
        <span>{{ goods.oldPrice }}</span>
        <span v-if="goods.discount">{{ goods.discount }}</span>
      </div>
      <div class="info-columns">
          <span>{{ goods.columns[0] }}</span>
          <span>{{ goods.columns[1] }}</span>
          <span>{{ goods.services[goods.services.length-1].name }}</span>
      </div>
      <div class="info-other">
          <div v-for="index in goods.services.length-1" :key="index" class="info-other-item">
              <img :src="goods.services[index-1].icon" alt="">
              <span>{{goods.services[index-1].name}}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
    .info {
        padding: 12px 10px 5px 10px;
        border-bottom: 3px solid #e8e8e8;
    }

    .info-title {
        font-size: 18px;
    }

    .info-price {
        margin-top: 12px;
        position: relative;
    }

    .info-price span:nth-child(1) {
        font-size: 25px;
        color: var(--color-tint);
    }

    .info-price span:nth-child(2) {
        margin-left: 10px;
        font-size: 15px;
        color: #c6c6c6;
        text-decoration: line-through;
    }    

    .info-price span:nth-child(3) {
        position: absolute;
        bottom: 8px;
        padding: 0 5px;
        margin-left: 5px;
        border-radius: 10px;
        background-color: var(--color-high-text);
        text-align: center;
        line-height: 20px;
        font-size: 15px;
        color: #fff;
    }

    .info-columns {
        display: flex;
        margin-top: 20px;
        padding-bottom: 15px;
        font-size: 15px; 
        color: #c6c6c6;
        border-bottom: 1px solid #e8e8e8;  
    }

    .info-columns span {
        flex: 1;
    }

    .info-columns span:nth-child(2) {
        text-align: center;
    }

    .info-columns span:nth-child(3) {
        text-align: right;
    }

    .info-other {
        display: flex;
        margin-top: 10px;
        padding: 15px 0;
        font-size: 15px;
        color: #666;
    }

    .info-other-item {
        flex: 1;
    }

    .info-other div:nth-child(2) {
        text-align: center;
    }
    
    .info-other div:nth-child(3) {
        text-align: right;
    }

    .info-other img {
        width: 15px;
    }

</style>