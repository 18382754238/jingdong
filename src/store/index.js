import { createStore } from 'vuex'
import VuexPersistedstate from 'vuex-persistedstate'
export default createStore({
  state: {
    cartList:{
      // shopId:{
      //   productId:{
      //     id:1,
      //     name:'番茄250g/份',
      //     imgUrl:'http://www.dell-lee.com/imgs/vues/tomato.png',
      //     sales:10,
      //     price:33.6,
      //     oldPrice:39.6,
      //     count:1
      //   }
      // }
    // }
  }
      
  },
  getters: {
  },
  mutations: {
    changeCartItemInfo(state,payload){
      const { shopId,productId,item,type}=payload
      let shopInfo=state.cartList[shopId]
      if(!shopInfo) shopInfo={}
      let productInfo=shopInfo[productId]
      if(!productInfo){
        productInfo=item
        productInfo.count=0
      }
      productInfo.count=productInfo.count+type
      if(type>0) productInfo.check=true
      if(productInfo.count<0) productInfo.count=0
      shopInfo[productId]=productInfo
      state.cartList[shopId]=shopInfo
    },
    changeCartItemChecked(state,payload){
      const {shopId,productId}=payload
      const product=state.cartList[shopId][productId]    
      product.check=!product.check
},
    cleanCartProducts(state,payload){
      const {shopId}=payload
      state.cartList[shopId]={}
  },
  setCartItemsChecked(state,payload){
    const {shopId}=payload
    const products=state.cartList[shopId]
    if(products){
      for(let key in products){
        const product=products[key]
        product.check=true
      }
    }
  }
  },
  actions: {
  },
  modules: {
  },
  plugins: [VuexPersistedstate({
    storage: window.sessionStorage,
    // key: 'store'
  })]
})
