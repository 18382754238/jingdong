<template>
    <div class="wrapper">
        <div class="title">我的订单</div>
        <div class="orders">
            <div class="order">
                <div class="order__title">
                    沃尔玛
                    <span class="order__status">已支付</span>
                </div>
                <div class="order__content">
                    <div class="order__content__imgs">
                        <img class="order__content__img" src="http://www.dell-lee.com/imgs/vue3/tomato.png" alt="">
                        <img class="order__content__img" src="http://www.dell-lee.com/imgs/vue3/tomato.png" alt="">
                        <img class="order__content__img" src="http://www.dell-lee.com/imgs/vue3/tomato.png" alt="">
                        <img class="order__content__img" src="http://www.dell-lee.com/imgs/vue3/tomato.png" alt="">
                    </div>
                    <div class="order__content__info">
                        <div class="order__content__price">￥36.88</div>
                        <div class="order__content__count">共2件</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Docker :currentIndex="2"/>
</template>
<script>
import Docker from '@/views/home/Docker.vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core'
 export default {
    name:'OrderList',
    components:{
        Docker
    },
    setup(){
        const route=useRoute()
        const store=useStore()
        const cartList = store.state.cartList;
        const shopId=1
        const productList=computed(()=>{
            const productList=cartList[shopId]
            return productList
        })
        return {productList}
    }
 }
</script>
<style lang="scss" scoped>
.wrapper{
    position: absolute;
    top: 0;
    left: 0;
    bottom: .5rem;
    right: 0;
    background: #eee;
    overflow-y: auto;
}
.title{
    line-height: .44rem;
    background: #fff;
    color: #333;
    font-size: .16rem;
    text-align: center;
}
.order{
    margin: .16rem .18rem;
    padding: .16rem;
    background: #fff;
    &__title{
        line-height: .22rem;
        font-size: .16rem;
        color: #333;
        margin-bottom: .16rem;
    }
    &__status{
        float: right;
        font-size: .14rem;
        color: #999;
    }
    &__content{
        display: flex;
        justify-content: space-between;
        &__imags{
            flex: 1;
        }
        &__img{
            width: .4rem;
            height: .4rem;
            margin-right: .12rem;
        }
        &__info{
            width: .7rem;
        }
        &__price{
            margin-bottom: .04rem;
            line-height: .2rem;
            font-size: .14rem;
            color: #e93b3b;
            text-align: right;
        }
        &__count{
            line-height: .14rem;
            font-size: .12rem;
            color: #333;
            text-align: right;
        }
    }
}
</style>