<template>
  <div class="detail-shop-info">
    <div class="shop-logo">
      <img :src="shops.logo" alt="" />
      <span>{{ shops.name }}</span>
    </div>
    <div class="shop-other">
      <div class="shop-left">
        <table>
          <tr>
            <td>{{ newSells }}</td>
            <td>{{ shops.goodsCount }}</td>
          </tr>
          <tr>
            <td>总销量</td>
            <td>全部宝贝</td>
          </tr>
        </table>
      </div>
      <div class="shop-right">
          <table>
              <tr v-for="(item, index) in shops.score" :key="index">
                  <td>{{ item.name }}</td>
                  <td class="score" :class="{ 'score-better' : item.isBetter }">{{ item.score }}</td>
                  <td class="isBetter" :class="{ 'active-better': item.isBetter }" >{{item.isBetter ? '高' : '低'}}</td>
              </tr>
          </table>
      </div>
    </div>
    <div class="shop-index" @click="shopClick">进店逛逛</div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shops: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      oldSells: 0,
      oldIsBetter: false,
      shopUrl: null,
    };
  },
  computed: {
    newSells() {
      this.oldSells = this.shops.sells;
      const newSells = this.oldSells / 10000;
      return newSells.toFixed(2) + '万'
    },
  },
  methods: {
      shopClick() {
          this.shopUrl = this.shops.url;
          window.location.href = this.shops.url;
      }
  }
};
</script>

<style>
.detail-shop-info {
  margin: 30px 10px;
}

.shop-logo {
  font-size: 18px;
}

.shop-logo img {
  width: 60px;
  height: 60px;
  vertical-align: middle;
}

.shop-logo span {
  margin-left: 15px;
}

.shop-other {
  display: flex;
  text-align: center;
  font-size: 15px;
}

.shop-other div {
  flex: 1;
}

.shop-left {
  margin: 45px 0px 15px 20px;
}

.shop-left table {
    border-right: 1px solid #e8e8e8;
}

.shop-left td {
  height: 30px;
  padding: 0 15px 0 10px;
}

.shop-left tr:nth-child(1) {
    font-size: 20px;
    font-weight: 700;
}

.shop-right {
    margin: 30px 0 15px 10px;
}

.shop-right td {
    padding:5px 10px 5px 5px;
}

.shop-right .score {
    color: red
}

.shop-right .score-better {
    color: green
}

.shop-right .isBetter {
    background: red;
    color: #fff;
}

.shop-right .active-better {
    background: green;
    color: #fff;
}

.shop-index {
    margin: 0 auto;
    width: 140px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: #e8e8e8;
    border-radius: 15px;
}
</style>