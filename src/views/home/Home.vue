<template>
    <div>
      <div class="wrapper">
        <StaticPart />
        <NearBy />
      </div>
      <Docker :currentIndex="0"/>
    </div>
  </template>
  <script>
  import StaticPart from '@/views/home/StaticPart.vue'
  import NearBy from '@/views/home/NearBy.vue';
  import Docker from '@/views/home/Docker.vue';
    export default {
        name:'Home',
        components:{
          StaticPart,
          NearBy,
          Docker
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
      padding: 0 .18rem .1rem .18rem;
      overflow-y: auto;
    }
  </style>
  