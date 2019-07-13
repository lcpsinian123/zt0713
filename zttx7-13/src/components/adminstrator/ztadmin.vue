<template>
<div>
    <div class='section'>
        <div class='el-row'>
            <el-col :span='6'>
                <el-form :model="adminStarator" status-icon label-width="100px" class="demo-ruleForm addAmin">
                    <el-form-item label="姓名" prop="manageUser">
                        <el-input type="text" v-model="adminStarator.manageUser" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input type="text" v-model="adminStarator.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="passWord">
                        <el-input type="password" v-model="adminStarator.passWord" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员等级" prop="admin_role">
                        <el-input type="text" v-model="adminStarator.admin_role" autocomplete="off" placeholder="输入0表示普通管理员,1表示超级管理员"></el-input>
                    </el-form-item>

                    <el-form-item label="门店" prop="address">
                        <el-input type="text" v-model="adminStarator.address"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addmanage()">提交</el-button>

                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span='18'>
                <table class='adminList'>
                    <tbody>
                        <tr>
                            <th width="200">姓名</th>
                            <th width="200">电话</th>
                            <th width="200">门店</th>
                            <th width="300">操作</th>
                        </tr>
                        <tr v-for="(item,index) in manageList" :key="item.id">
                            <td width="200" align="center">
                                {{item.admin_name}}
                            </td>
                            <td width="200" align="center">
                                {{item.admin_phone}}
                            </td>
                            <td width="200" align="center">
                                {{item.shop_address}}
                            </td>
                            <td width="300" align="center">
                                <el-button size="mini" @click="delManege(item.id)" type="danger">删除</el-button>
                            </td>
                        </tr>

                    </tbody>
                </table>

            </el-col>
        </div>
        <div class='section pageright'>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageindex" :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {

        return {
            pagesize: 10    , // 页容量
            pageindex: 1, // 页码
            admin_user: {},
            adminStarator: {
                manageUser: '',
                phone: '',
                address: '',
                passWord: '',
                admin_role: ''

            },
            manageList: {},
            my_phone: '',
            totao:0,

        };
    },
    created() {
        this.getManage()
    },
    methods: {
        addmanage() {
            const url = `/api/admin/add_admin`
            this.$axios.post(url, {
                my_phone: this.my_phone,
                admin_name: this.adminStarator.manageUser,
                admin_password: this.$md5(this.adminStarator.passWord + '0xz765nb'),
                admin_phone: this.adminStarator.phone,
                shop_address: this.adminStarator.address,
                admin_role: '',
            }).then(res => {

                this.getManage()
            })

        },

        getManage() {

            this.admin_info = JSON.parse(sessionStorage.getItem('admin_user'))
            this.my_phone = this.admin_info.admin_phone

            const url = `/api/admin/findAdmin`
            this.$axios.post(url, {
                admin_phone: this.my_phone,
                pagesize: this.pagesize,
                pagenum: this.pageindex, //页容量
                condition: '',
            }).then(res => {
                this.total =res.data.total
                this.manageList = res.data.resultValue
            })
        },
        delManege(id) {
            // console.log(id)
            // const url = `/api/Apply/handel`
            // this.$axios.post(url,{
            //     id:id
            // }).then(res=>{
            //     console.log(res)
            // })
          this.$message({
                message: '暂未开放',
                type: 'success'
            });
        },
        open() {
            this.$confirm('此操作将删除改管理员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delManege(phone)
                this.$message({
                    type: 'success',
                    message: '暂未开放!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        open2() {
            this.$message({
                message: '添加成功',
                type: 'success'
            });
        },
        handleSizeChange(pagesize){
            this.pagesize= pagesize
            this.pageindex = 1
            this.getManage()
        },
        handleCurrentChange(pageindex){
            this.pageindex = pageindex
            this.getManage()
        }
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
}

table tr {
    border-bottom: 1px solid #e5e5e5;
}

.adminList {
    padding-left: 20px;
}

.adminList tr {
    line-height: 30px;
    height: 36px;
    border-top: 1px solid red;
}

.pageright {
    float: right;
}

.addAmin {
    padding-top: 30px;
}
</style>
