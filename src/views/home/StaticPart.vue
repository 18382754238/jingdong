<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe7f1;</span>
    北京理工大学国防科技园2号楼十层
    <span class="iconfont position__notice">&#xe887;</span>
  </div>
  <div class="searchBox">
    <input
      class="searchBox__input"
      type="text"
      placeholder="山姆会员商店优惠商品"
    />
    <span class="iconfont searchBox__icon">&#xe8ef;</span>
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      alt=""
    />
  </div>
  <div class="icons">
    <div class="icons__item" 
      v-for="item in iconList"
      :key="item.imgName"
    >
      <img
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
        alt=""
        class="icons__item__img"
      />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>
<script>
export default {
  name: "StaticPart",
  setup(){
    const iconList=[
      {imgName:'超市',desc:'超市便利'},
      {imgName:'菜市场',desc:'菜市场'},
      {imgName:'水果店',desc:'水果店'},
      {imgName:'鲜花',desc:'鲜花绿植'},
      {imgName:'医药健康',desc:'医药健康'},
      {imgName:'家居',desc:'家居时尚'},
      {imgName:'蛋糕',desc:'烘焙蛋糕'},
      {imgName:'签到',desc:'签到'},
      {imgName:'大牌免运',desc:'大牌免运'},
      {imgName:'红包',desc:'红包套餐'},
    ]
    return {
      iconList
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/style/mixins.scss';
    .position{
      @include ellipses;
      color: #333;
      position: relative;
      padding: .16rem .24rem .16rem 0;
      line-height: .22rem;
      font-size: .16rem;
      .position__icon{
        font-size: .2rem;
      }
      .position__notice{
        position: absolute;
        right: 0;
        font-size: .2rem;
      }
    }
    .icons{
      display: flex;
      flex-wrap: wrap;
      margin-top: .16rem;
      &__item{
        width: 20%;
        &__img{
          width:.4rem;
          display: block;
          margin: 0 auto;
          height: .4rem;
        }
        &__desc{
          margin: .06rem 0 .16rem 0;
          text-align: center;
          color: #333;
        }
      }
    }
    .gap{
      height: .1rem;
      background: #f1f1f1;
      margin:0 -.18rem ;
    }
  .banner{
      height: 0;
      overflow: hidden;
      padding-bottom: 25.4%;
      &__img{
        width: 100%;
      }
    }
    .searchBox{
      position: relative;;
      width:100% ;
      &__input{
        background-color: #f5f5f5;
        box-sizing: border-box;
        width: 100%;
        line-height: .32rem;
        color: #b7b7b7;
        border-radius: .16rem;
        font-size: .14rem;
        margin-bottom: .12rem;
        padding: 0 .45rem;
      }
      .searchBox__icon{
        display: inline-block;
        position: absolute;
        top: .05rem;
        left: .2rem;
        font-size: .24rem;
      }
    }
</style>