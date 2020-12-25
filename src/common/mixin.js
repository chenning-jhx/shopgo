import { debounce } from './utils'

export const imgListenerMixin = {
    data() {
        return {
            imgListener: null
        }
    },
    mounted() {
        // 给防抖函数赋值一个新的函数
        const refresh = debounce(this.$refs.scroll.refresh, 200);

        // 接收发射的事件总线,并用监听图片变量保存
        this.imgListener = () => {
            refresh();
        };
        this.$bus.$on("imgLoad", this.imgListener);
    }
}
