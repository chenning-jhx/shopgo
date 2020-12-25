<template>
    <div class="cart-bottom-bar">
        <div class="cart-all-select">
            <check-button :isChecked="isSelectAll" @click.native="SelectAll"/>
            <span>全选</span>
        </div>
        <div class="cart-total">
            <span>合计：{{totalPrice}}</span>
        </div>
        <div class="cart-sale" @click="saleClick">
            <span>去结算({{saleCount}})</span>
        </div>
        <toast :message="message" :isShow="isShow"/>
    </div>
</template>

<script>
import Toast from "@/components/common/toast/Toast"

import CheckButton from "./CheckButton"


export default {
    name: "CartBottomBar",
    data () {
        return {
            message: '',
            isShow: false
        }
    },
    components: {
        CheckButton,
        Toast
    },
    computed: {
        isSelectAll() {
            if(this.$store.state.carList.length === 0 ) return false;
        //  return !(this.$store.state.carList.filter( item => !item.checked).length)
            // return !(this.$store.state.carList.find( item => !item.checked ))
            
            for (let item of this.$store.state.carList) {
                if( !item.checked ) {
                    return false;
                }
            }
            return true
        },
        totalPrice() {
            return '￥' + this.$store.state.carList.filter( item => item.checked ).reduce(function(preValue,item){
                return preValue + item.count * item.price
            },0).toFixed(2)
        },
        saleCount() {
            return this.$store.state.carList.filter( item => item.checked ).length
        }

    },
    methods: {
        SelectAll() {
            // console.log("----------")
            if(this.isSelectAll) {//全部选中
                this.$store.state.carList.forEach( item => item.checked = false);
            } else {//全不选或部分选中
                this.$store.state.carList.forEach( item => item.checked = true);
            }
        },
        saleClick() {
            if(!this.isSelectAll) {
                this.message = "请先选择商品",
                this.isShow = true,

                setTimeout(() => {
                    this.isShow = false,
                    this.message = ''
                },1500)
            }
        }
    }
}
</script>

<style>
    .cart-bottom-bar {
        display: flex;
        position: fixed;
        bottom: 60px;
        left: 0;
        right: 0;
        height: 44px;
        font-size: 16px;
        background: #e8e8e8;
        box-shadow: 0 -1px 0 rgba(100, 100, 100, .2);
    }

    .cart-bottom-bar>div {
        flex: 1;
    }
    
    .cart-total, .cart-sale{
        line-height: 44px;
        text-align: center;
    }
    
    .cart-all-select {
        display: flex;
        justify-items: center;
        align-items: center;
        padding: 5px;
    }

    .cart-all-select span {
        margin-left: 5px;
    }

    .cart-sale {
        background: #ff8198;
    }

</style>