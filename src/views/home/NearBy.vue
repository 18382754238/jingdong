<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link 
      :to="`/shop/${item.id}`"
      v-for="item in nearByList"
      :key="item.id">
      <ShopInfo :item="item"/>
    </router-link>
  </div>
</template>
<script>
import { reactive, ref } from '@vue/reactivity';
import {post} from '@/utils/request'
import ShopInfo from '@/components/ShopInfo'
export default {
  name: "NearBy",
  components:{ ShopInfo },
  setup(){
    const nearByList=ref([])
    const getNearByList=async ()=>{
      const result=await post('/api/user/nearby')
      if(result.data.error===0&&result?.data?.data?.length){
        nearByList.value=result.data.data
      }
    }
    getNearByList()
    return {
        nearByList
    }
  }
};
</script>
<style lang="scss" scoped>
    .nearby{
      &__title{
        margin: .16rem 0 .02rem 0;
        font-size: .18rem;
        font-weight: normal;
        color: #333;
      }
      a{
        text-decoration: none;
      }
    }
</style>