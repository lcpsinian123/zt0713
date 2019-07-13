<template>
<div>
    <el-header class='header el-col el-col-24' style='background-color:rgb(84, 92, 100)'>
            <el-col :span='23' style='color:white; line-height:60px; font-size:30px'>
                <img class='logoImg' src="../img/logo.png"/>
            </el-col>
        

        <el-col :span='1'>

            
            <a style='color:white; line-height:60px;font-size:20px'  @click ="loginout">
            <i class='el-icon-error' style='color:white; font-size:20px'></i>退出
            </a>
        </el-col>
    </el-header>
    <!--头部区域-->
    <el-col :span="2">

        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">

                <router-link slot="title" to='/substa' style="text-decoration: none; color:white;">统计</router-link>
            </el-menu-item>
            <el-menu-item index="1">

                <router-link slot="title" to='/comment' style="text-decoration: none; color:white;">会员中心</router-link>
            </el-menu-item>
            <el-menu-item index="2">
                <router-link slot="title" to='/goods' style="text-decoration: none; color:white;">商品</router-link>
            </el-menu-item>
            <el-menu-item index="2">
                <router-link slot="title" to='/coupon' style="text-decoration: none; color:white;">优惠券</router-link>
            </el-menu-item>
            <el-menu-item index="3">
                <router-link slot="title" to='/ztadmin' style="text-decoration: none; color:white;">管理员</router-link>
            </el-menu-item>
            <el-menu-item index="3">
                <router-link slot="title" to='/make' style="text-decoration: none; color:white;">预约</router-link>
            </el-menu-item>
            <el-menu-item>
                <span slot="title"></span>
            </el-menu-item>
            <el-menu-item>
                <span slot="title"></span>
            </el-menu-item>
            <el-menu-item>
                <span slot="title"></span>
            </el-menu-item>
        </el-menu>
    </el-col>
    <el-col :span="22">
        <router-view></router-view>
    </el-col>
    </el-row>
    <!-- 中间部分 -->
</div>
</template>

<script>
import comments from './comment/comment.vue'
export default {
    components: {
        comments,
    },
    methods: {
        loginout() {
            sessionStorage.removeItem('admin_user');
            this.$router.push({
                path: "/"
            })
        },
    },
}
</script>

<style scoped>
    .logoImg{
        height:80px;
    }
</style>
