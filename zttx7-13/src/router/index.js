import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import axios from 'axios'
axios.defaults.baseURL = 'http://www.zttxsjls.cn/zhitongAPI/public/index.php'// 生产
// axios.defaults.baseURL = '/api'// 测试  
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true // 让ajax 携带cookie
// axios.defaults.headers['Content-Type'] ='application/x-www-form-urlencoded;charset=UTF-8'
//导入模板

import comment from '../components/comment/comment.vue'
import goods from '../components/goods/goods.vue'
import manage from '../components/adminstrator/ztadmin.vue' 
import login from '../components/login/login.vue'
import coupon from '../components/goods/coupon.vue'
import make from '../components/goods/make.vue'
import substa from '../components/subcom/substatistical.vue'
import main from "../components/index.vue"
import record from '../components/record/record.vue'




const router= new VueRouter({
    routes:[
       
        {path:'/',redirect:'/login'},
        {path:'/login',component:login},
        {path:'/main',component:main,children:[
        {path:"/comment",component:comment,meta:{checkoutlogin:true}},
        {path:'/ztadmin',component:manage,meta:{checkoutlogin:true}},
        {path:'/goods',component:goods,meta:{checkoutlogin:true}},
        {path:'/coupon',component:coupon,meta:{checkoutlogin:true}},
        {path:'/make',component:make,meta:{checkoutlogin:true}},
        {path:'/substa',component:substa,meta:{checkoutlogin:true}},
        {path:'/record',component:record,meta:{checkoutlogin:true}}
        ],meta:{checkoutlogin:true}},

        
        
    ]
})

router.beforeEach((to, from, next) => {
    

    // 判断是否需要登陆
    if(to.meta.checkoutlogin){
        if(JSON.parse(sessionStorage.getItem("admin_user"))){
            next()
        }else{
            router.push({path:'/'})
        }
    }else{
        next()
    }

    })

export default router