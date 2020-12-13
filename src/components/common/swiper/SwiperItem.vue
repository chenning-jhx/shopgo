<template>
  <div class="slide">
      <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .slide {
        flex-shrink: 0;
        width: 100%;
    }

    .slide img {
        width: 100%;
    }
</style>