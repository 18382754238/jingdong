<template>
    <div class="docker">
        <div
            v-for="(item,index) in dockerList"
            :class="{docker__item:true,'docker__item--active':index===currentIndex}"
            :key="item.icon"
        >
        <router-link :to="item.to">
          <div class="iconfont" v-html="item.icon"/>
          <div class="docker__title">{{item.text}}</div>
        </router-link>
        </div>
      </div>
</template>
<script>
    export default {
        name:'Docker',
        props:['currentIndex'],
        setup(){
            const dockerList=[
                {icon:'&#xe69b;',text:'首页',to:{name:'home'}},
                {icon:'&#xe6e6;',text:'购物车',to:{name:'cartList'}},
                {icon:'&#xe713;',text:'订单',to:{name:'OrderList'}},
                {icon:'&#xe78b;',text:'我的',to:{name:'home'}}
            ]
            return {
                dockerList
            }
        }
    }
</script>
<style lang="scss" scoped>
    .docker{
      position: absolute;
      display: flex;
      left: 0;
      bottom: 0;
      box-sizing: border-box;
      padding: 0 .18rem;
      width: 100%;
      height: .49rem;
      border-top: .01rem solid #f1f1f1;
      &__item{
        flex: 1;
        text-align: center;
        a{
            color: #333;
            text-decoration: none;
          }
        &--active{
          a{
            color: #1fa4fc;
          }
        }
        .iconfont{
          font-size: .18rem;
          margin: .07rem 0 .02rem 0;
        }
      }
      &__title{
        font-size: .2rem;
        transform: scale(.5 , .5);
        transform-origin: center top;
      }
    }
</style>