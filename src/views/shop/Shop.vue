<template>
    <div class="wrapper">
        <div class="search">
            <div class="search__back iconfont"
                @click="handleBackClick"
            >&#xe662;</div>
            <div class="search__content">
                <span class="search__content__icon iconfont">&#xe8ef;</span>
                <input class="search__content__input" placeholder="请输入商品名称"/>
            </div>
        </div>
        <ShopInfo :item="data.item" :hiddenBorder="true" v-show="data.item.imgUrl"/>
        <Content />
        <Cart />
    </div>
</template>

<script>
import ShopInfo from '@/components/ShopInfo.vue'
import { reactive } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { post } from '@/utils/request'
import Content from '@/views/shop/Content.vue'
import Cart from '@/views/shop/Cart.vue'
export default { 
    name:'Shop',
    components: {
         ShopInfo, Content, Cart
        }, 
    setup(){
        const router=useRouter()
        const route=useRoute()
        const data=reactive({item:''})
        const getItemData= async ()=>{
            const result=await post(`/api/user/shop/${route.params.id}`)
            if(result?.data?.error===0 && result?.data?.data){
                data.item=result.data.data
            }
        }
        getItemData()
        const handleBackClick=()=>{
            router.back()
        }
        return { data ,handleBackClick}
    }
}
</script>

<style lang="scss" scoped>
    .wrapper{
        padding: 0 .18rem;
    }
    .search{
        display: flex;
        margin: .14rem 0 .04rem 0;
        line-height: .32rem;
        &__back{
            font-size: .24rem;
            color: #b6b6b6;
            width: .3rem;
        }
        &__content{
            display: flex;
            flex: 1;
            background: #f5f5f5;
            border-radius: .16rem;
            &__icon{
                width: .44rem;
                text-align: center;
                color: #b7b7b7;
                vertical-align: middle;
                font-size: .18rem;
            }
            &__input{
                display: block;
                flex: 1;
                padding-right: .2rem;
                height: .32rem;
                border: none;
                outline: none;
                font-size: .14rem;
                background: none;
                &::placeholder{
                    color: #333;
                }
            }
        }
    }
</style>