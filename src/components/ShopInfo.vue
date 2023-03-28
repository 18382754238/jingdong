<template>
  <div class="shop">
    <img :src="item.imgUrl" class="shop__img" alt="" />
    <div
        :class="{'shop__content':true,'shop__content--bordered':hiddenBorder?false:true}"
    >
      <div class="shop__content__title">{{ item.title }}</div>
      <div class="shop__content__tags">
        <span
          class="shop__content__tag"
          v-for="(itemInner, itemIndex) in item.tags"
          :key="itemIndex"
        >
          {{ itemInner }}
        </span>
      </div>
      <p class="shop__content__heighlight">
        {{ item.desc }}
      </p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ShopInfo",
        props:['item','hiddenBorder']
    };
</script>

<style lang="scss" scoped>
.shop {
  display: flex;
  padding-top: 0.12rem;
  &__img {
    margin-right: 0.16rem;
    width: 0.56rem;
    height: 0.56rem;
  }
  &__content {
    flex: 1;
    padding-bottom: 0.12rem;
    &--bordered{
        border-bottom: .01rem solid #f1f1f1;
    }
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: #333;
    }
    &__tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #333;
    }
    &__tag {
      margin-right: 0.16rem;
    }
    &__heighlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #e93b3b;
    }
  }
}
</style>