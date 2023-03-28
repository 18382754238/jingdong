<template>
    <div class="content">
        <div class="category">
            <div  
                v-for="item in categories"
                :key="item.name"
                :class="{'category__item':true,'category__item--active':item.tab===current}"
                @click="handleCategoryClick(item.tab)"
            >{{item.name}}</div>
        </div>
        <div class="product">
            <div class="product__item" 
                v-for="item in data"
                :key="item.id"
                >
                <img class="product__item__img" src="http://www.dell-lee.com/imgs/vue3/near.png" alt="">
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{item.name}}</h4>
                    <p class="product__item__sales">月售{{item.sales}}件</p>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;</span>{{item.price}}
                        <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                    </p>
                </div>
                <div class="product__number">
                    <span class="product__number__minus" 
                    @click="()=>changeCartItemInfo(shopId,item.id,item,-1)">-</span>
                    {{cartList?.[shopId]?.[item.id]?.count || 0}}
                    <span class="product__number__plus"
                    @click="()=>changeCartItemInfo(shopId,item.id,item,1)">+</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { post } from '@/utils/request';
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

    export default {
        name:'content',
        setup(){
            const store=useStore()
            const data=ref([])
            let current=ref(1)
            const route=useRoute()
            const shopId=route.params.id
            const categories=[
                { name:'全部商品',tab:1},
                { name:'秒杀',tab:2},
                { name:'新鲜水果',tab:3},
                { name:'休闲食品',tab:4},
                { name:'时令蔬菜',tab:5},
                { name:'肉蛋家禽',tab:6},
            ]
            const getContentData=async (tab)=>{
                const result=await post(`/api/shop/${route.params.id}/item`,tab)
                if(result.data.error===0&&result?.data?.data?.length){
                    data.value=result.data.data
                }
            }
            const changeCartItemInfo=(shopId,productId,item,type)=>{
                store.commit('changeCartItemInfo',{
                    shopId,productId,item,type
                })
            }
            const useCartEffect=()=>{
                const cartList=store.state.cartList
                return { cartList }
            }
            const cartList=useCartEffect().cartList
            const handleCategoryClick=(tab)=>{
                getContentData(tab)
                current.value=tab
            }
            getContentData()
            return { data,categories,handleCategoryClick,
                current,cartList,shopId,changeCartItemInfo}
        }
    }
</script>
<style lang="scss" scoped>
@import '@/style/mixins.scss';
    .content{
        display: flex;
        position: absolute;
        left: 0;
        right: 0;
        top: 1.5rem;
        bottom: .5rem;
    }
    .category{
        overflow-y: scroll;
        height: 100%;
        width: .76rem;
        background: #f5f5f5;
        &__item{
            line-height: .4rem;
            text-align: center;
            font-size: .14rem;
            background: #f5f5f5;
            &--active{
                background: #fff;
            }
        }
    }
    .product{
        overflow-y: scroll;
        flex: 1;
        &__item{
            position: relative;
            display: flex;
            padding: .12rem 0;
            margin: 0 .16rem;
            border-bottom: .01rem solid #f1f1f1;
            &__detail{
                overflow: hidden;
            }
            &__img{
                width: .68rem;
                height: .68rem;
                margin-right: .16rem;
            }
            &__title{
                margin: 0;
                line-height: .2rem;
                font-size: .14rem;
                color: #333;
                @include ellipses;
            }
            &__sales{
                margin: .06rem 0;
                line-height: .16rem;
                font-size: .12rem;
                color: #333;
            }
            &__price{
                margin: 0;
                line-height: .2rem;
                font-size: .14rem;
                color: #e93b3b;
            }
            &__yen{
                font-size: .12rem;
            }
            &__origin{
                margin-left: .06rem;
                line-height: .2rem;
                font-size: .12rem;
                color: #999;
                text-decoration: line-through;
            }
            .product__number{
            position: absolute;
            right: 0;
            bottom: .12rem;
            &__minus,&__plus{
                display: inline-block;
                width: .2rem;
                height: .2rem;
                line-height: .16rem;
                border-radius: 50%;
                font-size: .2rem;
                text-align: center;
            }
            &__minus{
                border: .01rem solid #666;
                color:#666;
                margin-right: .05rem;
            }
            &__plus{
                background: #0091ff;
                color:#fff;
                margin-left: .05rem;
            }
        }
        }
        
    }
</style>