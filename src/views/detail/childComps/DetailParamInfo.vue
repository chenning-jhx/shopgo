<template>
  <div class="detail-param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table
      v-for="(table, index) in paramInfo.sizes"
      :key="index"
      class="param-rule"
    >
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
      </tr>
    </table>
    <table class="param-info">
      <tr v-for="(info, index) in paramInfo.infos" :key="index">
        <td class="param-info-key">{{ info.key }}</td>
        <td>{{ info.value }}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
.detail-param-info {
  padding: 30px 10px;
  border-top: 5px solid #e8e8e8;
  font-size: 18px;
  line-height: center;
}

.param-rule,
.param-info {
  width: 100%;
  border-collapse: collapse;
}

.param-rule tr,
.param-info tr {
  height: 42px;
  line-height: 42px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.3);
}

.param-info {
  border-top: 3px solid rgba(100, 100, 100, 0.3);
}

.param-info tr:nth-last-child(1) {
  border-bottom: 1px solid transparent;
}

.param-info-key {
  width: 95px;
}

.nfo-img {
    width: 100%;
}
</style>