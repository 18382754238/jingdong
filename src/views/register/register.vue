<template>
    <div class="wrapper">
        <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img" alt="">
        <div class="wrapper__input">
            <input type="text" placeholder="请输入手机号" v-model="datas.username" class="wrapper__input__content" />
        </div>
        <div class="wrapper__input">
            <input type="password" placeholder="请输入密码" v-model="datas.password" class="wrapper__input__content" />
        </div>
        <div class="wrapper__input">
            <input type="password" placeholder="确认密码" v-model="datas.passwordOk" class="wrapper__input__content" />
        </div>
        <div class="wrapper__register-button" @click="handleRegister">注册</div>
        <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
        <Toast v-if="datas.showToast" :message="datas.message"></Toast>
    </div>

</template>
<script>
import { reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import {post} from '@/utils/request'
import Toast from '@/components/Toast.vue'
    export default {
        name:'Register',
        components:{Toast},
        setup(){
            const router=useRouter()
            const datas=reactive({
                username:'',
                password:'',
                passwordOk:'',
                showToast:false,
                message:''
            })
            const handleLoginClick=()=>{
                router.push({name:'login'})
            }
            const handleRegister=async ()=>{
                let result=await post('/api/user/register',datas)
                console.log(result)
                try{
                    if(result?.data?.error===0){
                        router.push({name:'login'})
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
            return {handleLoginClick,handleRegister,datas}
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
                line-height: .48rem;
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
        &__register-button{
            margin: .32rem .4rem .16rem .4rem;
            line-height: .22rem;
            margin-top: .12rem;
            background: #0091ff;
            box-shadow: 0 .04rem .08rem rgba(0,145,255,.32);
            border-radius: .04rem;
            color: #fff;
            font-size: .16rem;
            text-align: center;
        }
        &__register-link{
            text-align: center;
            font-size: .14rem;
            color: rgba(0,0,0,.5);
        }
    }
 </style>