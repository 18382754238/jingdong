<template>
    <div class="toast">{{message}}</div>
</template>
<script>
    export default {
        name:'',
        props:['message']
    }
</script>
<style lang="scss" scoped>
    .toast{
        position: fixed;
        left: 50%;
        top:50%;
        padding: .1rem;
        transform: translate(-50%,-50%);
        background: rgba(0,0,0,.35);
        border-radius: .05rem;
        color: #fff;
    }
</style>