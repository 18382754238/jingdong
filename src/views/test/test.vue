<template>
    <div>{{ a }}--{{ b }}</div>
</template>
<script>
import { reactive,toRefs } from 'vue';

    export default {
        setup(){
            const ad=reactive({
                a:1,b:2
            })
            let {a,b}=toRefs(ad)
            setTimeout(()=>{
                a.value=4;
                b.value=6
            },1000)
            return {
                a,b
            }
        }
    }
</script>
<style scoped>
</style>