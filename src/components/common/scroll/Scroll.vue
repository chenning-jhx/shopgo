<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'Scroll',
    props: {
        probeType: {
            type: Number,
            default() {
                return 0
            }
        },
        pullUpload: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    data() {
        return {
            scroll: null
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper,{
            click: true,
            probeType: this.probeType,
            pullUpLoad: true
        })

        this.scroll.on('scroll', (position) => {
            // console.log(position)
            this.$emit('scroll',position)
        })

        this.scroll.on('pullingUp', () => {
            // console.log('-----------')
            this.$emit('pullingUp')
        })
    },
    methods: {
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        scrollTo(x, y, time) {
            this.scroll && this.scroll.scrollTo(x, y, time);
        },
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp();
            // console.log('--------------')
        },
        getScrollY() {
            return this.scroll ? this.scroll.y : 0;
        }
        
    }
}
</script>

<style scoped>
</style>>
</style>