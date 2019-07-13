<template>
<div>
    <el-form  status-icon label-width="100px" class="demo-ruleForm addAmin">
        <el-form-item label="姓名" prop="manageUser">
            <el-input type="text" v-model='brand' placeholder="品牌"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input type="text" v-model='phonemodel' placeholder="机型" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
            <el-input type="text"  v-model='phoneconfig' placeholder="配置" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员等级" prop="admin_role">
            <el-input type="text" v-model='price' autocomplete="off" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addmanage()">提交</el-button>

        </el-form-item>
    </el-form>
</div>
</template>
<script>
export default {
    props: ['adminStarator'],
    data() {
        return {
            address:'',
            price:"",
            phonemodel:'',
            brand:"",  
            phoneconfig:'' 

        }
    },
}
</script>
