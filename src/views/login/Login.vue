<template>
    <div class="wrapper">
        <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img" alt="">
        <div class="wrapper__input">
            <input type="text" placeholder="请输入手机号" v-model.number="datas.username" class="wrapper__input__content" />
        </div>
        <div class="wrapper__input">
            <input type="password" placeholder="请输入密码" v-model="datas.password" class="wrapper__input__content" />
        </div>
        <div class="wrapper__login-button" @click="handleLogin">登录</div>
        <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
        <Toast v-if="datas.showToast" :message="datas.message"></Toast>
    </div>

</template>
<script>
import { useRouter } from 'vue-router';
import { reactive } from '@vue/reactivity';
import {post} from '@/utils/request'
import Toast from'@/components/Toast.vue'
    export default {
        name:'Login',
        components:{Toast},
        setup(){
            const router=useRouter()
            const datas=reactive({
                username:'',
                password:'',
                showToast:false,
                message:''
            })
            const handleLogin=async ()=>{
                const result=await post('/api/user/login',datas)
                    console.log(result)
                    try{
                        if(result?.data?.error===0){
                            localStorage.isLogin=true
                            router.push({name:'home'})
                        }else{
                            datas.showToast=true
                            datas.message='登录失败'
                            setTimeout(() => {
                                datas.showToast=false
                                datas.message=''
                            }, 2000);
                        }
                    }catch{
                        alert('请求失败')
                    }
            }
            const handleRegisterClick=()=>{
                router.push({name:'register'})
            }
            return {handleLogin,handleRegisterClick,datas}
        }
    }
</script>
 <style lang="scss" scoped>
    .wrapper{
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        &__img{
            display: block;
            margin: 0 auto .4rem auto;
            width: .66rem;
            height: .66rem;
        }
        &__input{
            box-sizing: border-box;
            padding: 0 .16rem;
            height: .48rem;
            margin: 0 .4rem .16rem .4rem;
            background: #f9f9f9;
            border: .01rem solid rgba(0,0,0,.1);
            border-radius: .06rem;
            &__content{
                width: 100%;
                margin-top: .12rem;
                line-height: .22rem;
                border: none;
                outline: none;
                background: none;
                font-size: .16rem;
                color: rgba(0,0,0,.5);
                &::placeholder{
                    color: rgba(0,0,0,.5);
                }
            }
        }
        &__login-button{
            margin: .32rem .4rem .16rem .4rem;
            line-height: .48rem;
            background: #0091ff;
            box-shadow: 0 .04rem .08rem rgba(0,145,255,.32);
            border-radius: .04rem;
            color: #fff;
            font-size: .16rem;
            text-align: center;
        }
        &__login-link{
            text-align: center;
            font-size: .14rem;
            color: rgba(0,0,0,.5);
        }
    }
 </style>