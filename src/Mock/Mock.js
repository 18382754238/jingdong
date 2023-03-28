import Mock from 'mockjs'
Mock.mock('/api/user/login','post',function(req){
    return {
        error:0,
        message:'error !==0 时的错误信息'
    }
})
Mock.mock('/api/user/register','post',function(req){
    return {
        error:0,
        message:'error !==0 时的错误信息'
    }
})
Mock.mock('/api/user/nearby','post',function(req){
    return {
        error:0,
        message:'error !==0 时的错误信息',
        data:[
            {
                id:1,
                imgUrl:'http://www.dell-lee.com/imgs/vue3/near.png',
                title:'沃尔玛',
                tags:['月售一万+','月售一万+','月售一万+'],
                desc:' VIP尊享满89元减4元运费劵(每月3元)'
            },
            {
                id:2,
                imgUrl:'http://www.dell-lee.com/imgs/vue3/near.png',
                title:'沃尔玛',
                tags:['月售一万+','月售一万+','月售一万+'],
                desc:' VIP尊享满89元减4元运费劵(每月3元)'
            },
            {
                id:3,
                imgUrl:'http://www.dell-lee.com/imgs/vue3/near.png',
                title:'沃尔玛',
                tags:['月售一万+','月售一万+','月售一万+'],
                desc:' VIP尊享满89元减4元运费劵(每月3元)'
            },
            {
                id:4,
                imgUrl:'http://www.dell-lee.com/imgs/vue3/near.png',
                title:'沃尔玛',
                tags:['月售一万+','月售一万+','月售一万+'],
                desc:' VIP尊享满89元减4元运费劵(每月3元)'
            },
            {
                id:5,
                imgUrl:'http://www.dell-lee.com/imgs/vue3/near.png',
                title:'沃尔玛',
                tags:['月售一万+','月售一万+','月售一万+'],
                desc:' VIP尊享满89元减4元运费劵(每月3元)'
            }
        ]
    }
})

const reg_shop=/\/api\/user\/shop\/(\d+)/
Mock.mock(reg_shop,'post',function(req){
    const res=req.url.match(reg_shop)
    const urlParam=RegExp.$1
    return {
        error:0,
        message:'error !==0 时的错误信息',
        data:{
            id:1,
            imgUrl:'http://www.dell-lee.com/imgs/vue3/near.png',
            title:'沃尔玛',
            tags:['月售一万+','月售一万+','月售一万+'],
            desc:' VIP尊享满89元减4元运费劵(每月3元)'
        }
    }
})
const reg_shop_item=/\/api\/shop\/(\d+)\/item/
Mock.mock(reg_shop_item,'post',function(req){
    const res=req.url.match(reg_shop_item)
    const urlParam=RegExp.$1
    return {
        error:0,
        message:'error !==0 时的错误信息',
        data:[{
            id:1,
            name:'番茄250g/份',
            imgUrl:'xxx.png',
            sales:10,
            price:33.6,
            oldPrice:39.6
        },{
            id:2,
            name:'草莓250g/份',
            imgUrl:'xxx.png',
            sales:10,
            price:33.6,
            oldPrice:39.6
        },{
            id:3,
            name:'提子250g/份',
            imgUrl:'xxx.png',
            sales:10,
            price:33.6,
            oldPrice:39.6
        },{
            id:4,
            name:'梨子250g/份',
            imgUrl:'xxx.png',
            sales:10,
            price:33.6,
            oldPrice:39.6
        }]
    }
})