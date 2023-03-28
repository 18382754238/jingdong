<template>
    <div class="wrapper">
        <div class="top">
            <div class="top__header">
                <div class="iconfont top__header__back" @click="handleBtnclick">&#xe662;</div>
                确认订单
            </div>
            <div class="top__receiver">
                <div class="top__receiver__title">收货地址</div>
                <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
                <div class="top__receiver__info">
                    <span class="top__receiver__info__name">瑶妹（先生）</span>
                    <span class="top__receiver__info__name">18929393939</span>
                </div>
                <div class="iconfont top__receiver__icon">&#xe662;</div>
            </div>
        </div>
        <div class="products">
            <div class="products__title"></div>
            <div class="products__list">
                <div class="products__item"
                v-for="item in productList"
                :key="item.id"
                >
                <template v-if="item.count>0">
                    <img class="products__item__img" src="http://www.dell-lee.com/imgs/vue3/near.png" alt="">
                    <div class="products__item__detail">
                        <h4 class="products__item__title">{{ item.name }}</h4>
                        <p class="products__item__price">
                            <span class="products__item__yen">&yen;{{item.price}} x {{ item.count }}</span>
                            <span class="products__item__yen right">&yen;{{(item.price*item.count).toFixed(2)}}</span>
                        </p>
                    </div>
                </template>
                </div>
            </div>
        </div>
        <div class="order">
            <div class="order__price"><b>付金额￥{{price}}</b></div>
            <div class="order__btn" @click="handleCommit">提交订单</div>
        </div>
        <div class="mask" v-if="isShow"  @click="handleCancelOrder">
            <div class="mask__content" @click.stop>
                <h3 class="mask__content__title">确认要离开收银台？</h3>
                <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
                <div class="mask__content__btns">
                    <div class="mask__content__btn mask__content__btn--first" @click="handleCancelOrder">取消订单</div>
                    <div class="mask__content__btn mask__content__btn--second" @click="handleCancelOrder(1)">确认支付</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router'
import { computed } from '@vue/runtime-core'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
    export default {
        name:'orderConfirmation',
        setup(){
            const route=useRoute()
            const store=useStore()
            const cartList = store.state.cartList;
            const shopId=route.params.id
            const productList=computed(()=>{
                const productList=cartList[shopId]
                return productList
        })
        const price = computed(() => {
        const productList = cartList[shopId];
        let count = 0;
        if (productList) {
            for (let i in productList) {
            const product = productList[i];
            if(product.check) count += product.count * product.price;
            
            }
        }
        return count.toFixed(2);
        });
        const handleBtnclick=()=>{
            router.back()
        }
        let isShow=ref(false)
        const handleCancelOrder=(param)=>{
            isShow.value=false
            if(param===1){
                router.push('/orderList')
            }

        }
        const handleCommit=()=>{
            isShow.value=true
        }
        return {productList,price,handleBtnclick,handleCancelOrder,isShow,handleCommit}
    }
}
</script>
<style lang="scss" scoped>

@import '@/style/mixins.scss';
.wrapper{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #eee;
    overflow-y: scroll;
}
    .top{
        height: 1.96rem;
        position: relative;
        background-size: 100% 1.59rem;
        background-image: linear-gradient(0deg,rgba(0,145,225,0.00) 4%, #0091ff 50%);
        background-repeat: no-repeat;
        &__header{
            padding-top: .26rem;
            position: relative;
            line-height: .24rem;
            color:#fff;
            text-align: center;
            font-size: .16rem;
            &__back{
                position: absolute;
                left: .18rem;
                font-size: .22rem;
            }
        }
        &__receiver{
            position: absolute;
            left: .18rem;
            right: .18rem;
            bottom: 0;
            height: 1.11rem;
            background: #fff;
            border-radius: .04rem;
            &__title{
                line-height: .22rem;
                padding: .16rem 0 .14rem .16rem;
                font-size: .16rem;
                color: #333;
            }
            &__address{
                line-height: .2rem;
                padding: 0 .4rem 0 .16rem;
                font-size:.14rem;
                color: #333;
            }
            &__info{
                padding: .06rem 0 0 .16rem;
                &__name{
                    margin-right: .06rem;
                    line-height: .18rem;
                    font-size: .12rem;
                    color: #666;
                }
            }
            &__icon{
                transform: rotate(180deg);
                position: absolute;
                right: .16rem;
                top: .5rem;
                color: #666;
                font-size: .2rem;
            }
        }
    }
    .products{
        margin:.16rem .18rem .55rem .18rem;
        background: #fff;
        &__list{
            max-height: 4rem;
            overflow-y: scroll;
        }
        &__item{
            position: relative;
            display: flex;
            padding: .16rem;
            &__img{
                width: .46rem;
                height: .46rem;
                margin-right: .16rem;
            } 
            &__detail{
                flex: 1;
            }
            &__title{
                margin: 0;
                line-height: .2rem;
                font-size: .14rem;
                color: #333;
                @include ellipses;
            }
            &__price{
                margin: .0.06rem 0 0 0;
                line-height: .2rem;
                font-size: .14rem;
                color: #e93b3b;
            }
            &__yen{
                font-size: .12rem;
            }
        }
    }
    .right{
        float: right;
        color: #000;
    }
    .order{
        display: flex;
        height: .49rem;
        line-height: .49rem;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        &__price{
            flex: 1;
            text-indent: .24rem;
            font-size: .14rem;
            color: #333;
        }
        &__btn{
            width: .98rem;
            background: #4fb0f9;
            color: #fff;
            text-align: center;
            font-size: .14rem;
        }
    }
    .mask{
        z-index: 1;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0 ,0,.5);
        &__content{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width:3rem ;
            height: 1.56rem;
            background: #fff;
            border-radius: .04rem;
            text-align: center;
            &__title{
                margin: .24rem 0 0 0;
                line-height: .26rem;
                font-size: .18rem;
                color: #333;
            }
            &__desc{
                margin:.08rem 0 0 0;
                font-size: .14rem;
                color: #666666;

            }
            &__btns{
                display: flex;
                margin: .24rem .58rem;
            }
            &__btn{
                flex:1;
                width:.8rem;
                line-height: .32rem;
                border-radius: .16rem;
                &--first{
                    margin-right: .24rem;
                    border: .01rem solid #4fb0f9;
                    color: #4fb0f9;
                }
                &--second{
                    background: #4fb0f9;
                    color:#fff;
                    margin-left: .12rem;
                }
            }
        }
    }
</style>