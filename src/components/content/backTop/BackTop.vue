<template>
  <div class="back-top">
      <img src="~/assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
    name: 'BackTop',
    methods: {
        backClick() {
            this.$emit('backTopClick')
        }
    }
}
</script>

<style>
    .back-top {
        position: fixed;
        right: 8px;
        bottom: 45px;
    }
    .back-top img {
        width: 48px;
        height: 48px;
    }
</style>