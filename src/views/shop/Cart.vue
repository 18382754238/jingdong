<template>
  <div class="mask" v-if="showCart" @click="handleCartShowChange"></div>
  <div class="cart" >
    <div class="product" v-if="showCart">
        <div class="product__header">
            <div class="product__header__all" @click="setCartItemsChecked(shopId)">
                <span :class="{'product__header__icon':true,'iconfont':true,
                'product__header__icon--active':allChecked
            }">&#xe70f;</span>全选</div>
            <div class="product__header__clear">
              <span class="product__header__clear__active" @click="cleanCartProducts(shopId)">清空购物车</span>
            </div>
        </div>
      <template  v-for="item in productList">
        <div v-if="item.count>0" class="product__item" :key="item.id">
            <div :class="{'product__item__checked':true, 'iconfont':true,
            'product__item__checked--active':item.check}" 
            @click="changeCartItemChecked(shopId,item.id)"
            >&#xe70f;</div>
            <img
            class="product__item__img"
            src="http://www.dell-lee.com/imgs/vue3/near.png"
            alt=""
            />
            <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
                <span class="product__item__yen">&yen;</span>{{ item.price }}
                <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
            </p>
            </div>
            <div class="product__number">
            <span
                class="product__number__minus"
                @click="() => changeCartItemInfo(shopId, item.id, item, -1)"
                >-</span
            >
            {{ item.count || 0 }}
            <span
                class="product__number__plus"
                @click="() => changeCartItemInfo(shopId, item.id, item, 1)"
                >+</span
            >
            </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          class="check__icon__img"
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt=""
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ total }}</div>
      </div>
      <div class="check__info">
        总计: <span class="check__info__price">&yen;{{ price }}</span>
      </div>
      <div class="check__btn">
        <router-link :to="{path:`/OrderConfirmation/${shopId}`}">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { computed,ref} from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Cart",
  setup() {
    const store = useStore();
    const route = useRoute();
    const shopId = route.params.id;
    const cartList = store.state.cartList;
    const total = computed(() => {
      const productList = cartList[shopId];
      let count = 0;
      if (productList) {
        for (let i in productList) {
          const product = productList[i];
          count += product.count;
        };
      };
      return count;
    });
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
    const productList=computed(()=>{
        const productList=cartList[shopId];
        return productList;
    });
    const changeCartItemInfo=(shopId,productId,item,type)=>{
                store.commit('changeCartItemInfo',{
                    shopId,productId,item,type
                });
            };
    const changeCartItemChecked=(shopId,productId)=>{
        store.commit('changeCartItemChecked',{
            shopId,productId
        })
    };
    const cleanCartProducts=(shopId)=>{
        store.commit('cleanCartProducts',{shopId})
    };
    const setCartItemsChecked=(shopId)=>{
        store.commit('setCartItemsChecked',{shopId})
    };
    const allChecked=computed(()=>{
        const productList = cartList[shopId];
        let result = true;
        if (productList) {
            for (let i in productList) {
          const product = productList[i];
          if(product.count>0&&!product.check){
            result=false;
          };
        };
        return result;
      };
    });
    const showCart=ref(false);
    const handleCartShowChange=()=>{
        showCart.value=!showCart.value;
    };
    return { total, price ,productList,changeCartItemInfo,showCart,
        handleCartShowChange,shopId,changeCartItemChecked,cleanCartProducts,allChecked,setCartItemsChecked
      };
  },
};
</script>
<style lang="scss" scoped>
@import '@/style/mixins.scss';
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;
}
.mask{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0,0,0,.5);
    z-index: 1;
}
.product {
  overflow-y: scroll;
  background: #fff;
  flex: 1;
  &__header{
    display: flex;
    line-height: .52rem;
    border-bottom: .01rem solid #f1f1f1;
    font-size: .14rem;
    color: #333;
    &__all{
        width: .64rem;
        margin-left: .18rem;
    }
    &__icon{
        font-size: .2rem;
        vertical-align: top;
        &--active{
            color: #0091ff;
        }
    }
    &__clear{
        flex:1;
        margin-right: .16rem;
        text-align: right;
        &__active{
          display: inline-block;
        }
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f1f1f1;
    &__checked{
        font-size: .2rem;
        line-height: .5rem;
        margin-right: .2rem;
        &--active{
            color: #0091ff;
        }
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #333;
      @include ellipses;
    }
    &__price {
      margin: .06rem 0 0 0 ;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #e93b3b;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: #999;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.16rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
      }
      &__minus {
        border: 0.01rem solid #666;
        color: #666;
        margin-right: 0.05rem;
      }
      &__plus {
        background: #0091ff;
        color: #fff;
        margin-left: 0.05rem;
      }
    }
  }
}
.check {
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  border-top: 0.01rem solid #f1f1f1;
  &__icon {
    width: 0.84rem;
    position: relative;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      left: 0.46rem;
      top: 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: #e93b3b;
      border-radius: 0.2rem;
      font-size: 0.12rem;
      text-align: center;
      color: #fff;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: #333;
    font-size: 0.12rem;
    &__price {
      color: #e93b3b;
      font-size: 0.18rem;
      line-height: 0.49rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    color: #fff;
    font-size: 0.14rem;
    text-align: center;
    a{
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>