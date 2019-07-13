<template>
<div class="mainlogin">
    <div class="section1">
        <div class='logo'>

            智通天下客户管理系统
        </div>
        <div class='loginform'>
            <el-form :model="admin_user" status-icon label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="pass">
                    <el-input type="text" v-model="admin_user.login_phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="checkPass">
                    <el-input type="password" v-model="admin_user.login_pas" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            admin_user: {
                login_phone: '',
                login_pas: '',
            },
            userInfo: {},
            user: {}
        };
    },
    methods: {
        //    submitForm(){
        //        const url =`/api/api/admin/admin_login`
        //        this.$axios.post(url,{
        //            admin_phone:this.admin_user.login_phone,
        //            admin_password:this.$md5(this.admin_user.pas+'0xz765nb')
        //        }).then(res=>{
        //            console.log(this.login_phone)
        //            console.log(res)
        //        })
        //    }
        submitForm() {
            const KEY = 'admin_user'
            const url = `api/admin/admin_login?admin_phone=${this.admin_user.login_phone}&admin_password=${this.$md5(this.admin_user.login_pas+'0xz765nb')}`
            this.$axios.post(url).then(res => {
                console.log(res)
                if (res.data.code === 0) {
                    this.user = res.data.resultValue[0]
                    this.$message("登陆成功")
                    sessionStorage.setItem(KEY, JSON.stringify(this.user))

                    this.$router.push({
                        path: '/substa'
                    })

                } else {
                    this.$message("登陆失败,账号或密码错误!")
                }

            })
        },

    }
}
</script>

<style> 
.mainlogin {
    width: 100%;
    height:968px;
    background: #555;   
}

.section1 {

    width: 600px;
    height: 360px;
    border: 1px solid #ccc;
    background: white;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}

.logo {
    width: 100%;
    line-height: 80px;
    text-align: center;
    font-size: 30px;
}

.loginform {
    padding-top: 30px;
    width: 500px;
}
</style>
