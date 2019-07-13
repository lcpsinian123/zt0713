<template>
<div>
    <div class='section'>
        <div class='search' style='width:400px'>
            <el-input placeholder="请输入内容" v-model="keyWords" class="input-with-select">
                <el-button slot="append" @click="getclient()" icon="el-icon-search"></el-button>
            </el-input>

        </div>
        <div>
            <el-popover placement="" width="1000" trigger="click">
                <div>
                    <el-form :model='addUser' status-icon label-width="100px" class="demo-ruleForm">
                        <el-form-item label="姓名" prop="user_name">
                            <el-input type="text" v-model="addUser.user_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="create_time">
                            <el-input type="password" v-model="addUser.psd" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="addUser.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="生日" prop="birthday">
                            <el-input type="text" v-model="addUser.birthday" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="管理员手机号" prop="belongto_admin">
                            <el-input type="text" v-model="addUser.belongto_admin" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="标签" prop="user_tags">
                            <el-input type="text" v-model="addUser.user_tags" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addClients()">提交</el-button>

                        </el-form-item>
                    </el-form>
                </div>
                <el-button type="primary" size="mini" plain slot="reference">添加</el-button>
            </el-popover>
        </div>
    </div>
    <div class='section clientList'>
        <table>
            <tbody>
                <tr>
                    <th width="200">姓名</th>
                    <th width="200">注册人员</th>
                    <th width="200">手机号</th>
                    <th width="200">生日</th>
                    <th width="200">注册于</th>
                    <th width="200">会员等级</th>
                    <th width="200">积分</th>
                    <th width="200">标签</th>
                    <th width="200">操作</th>
                </tr>
                <tr v-for='item in vipList' :key='item.user_id'>
                    <td width="200"> {{item.user_name}}</td>
                    <td width="200"> {{item.belongto_admin}}</td>
                    <td width="200"> {{item.phone}}</td>
                    <td width="200">{{item.birthday}}</td>
                    <td width="200">{{item.create_time}}</td>

                    <td width="200">
                        <div v-for='subitem in item.children'>

                            <div v-if="subitem.user_integral>10000">
                                黄金会员
                            </div>
                            <div v-else>
                                <div>普通会员</div>
                            </div>
                        </div>
                    </td>
                    <td width="200">
                        <div v-for='subitem in item.children'> {{subitem.user_integral}}</div>
                    </td>
                    <td width="200">
                        <div v-for='subitem in item.children'> {{subitem.user_tags}}</div>
                    </td>
                    <td width="200">
                        <el-popover placement="left" width="800" trigger="click">
                            <div>
                                <el-form :model='clientDetail' status-icon label-width="80px" class="demo-ruleForm">
                                    <el-form-item label="姓名" prop="user_name">
                                        <el-input :disabled="true" type="text" v-model="clientDetail.user_name" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="注册人员" prop="belongto_admin">
                                        <el-input :disabled="true" type="text" v-model="clientDetail.belongto_admin" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号" prop="phone">
                                        <el-input :disabled="true" v-model="clientDetail.phone"></el-input>
                                    </el-form-item>
                                    <el-form-item label="生日" prop="birthday">
                                        <el-input type="text" :disabled="true" v-model="clientDetail.birthday" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="注册于" prop="create_time">
                                        <el-input type="text" :disabled="true" v-model="clientDetail.create_time" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="会员等级" prop="vipGrade">
                                        <el-input type="text" :disabled="true" v-model="clientDetail.vipGrade" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="标签" prop="user_tags">
                                        <el-input type="text" v-model="clientDetail.user_tags" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="积分" prop="integral">
                                        <el-input v-model="clientDetail.user_integral"></el-input>
                                    </el-form-item>
                          
                                    
                                    <el-form-item>
                                        <el-button type="primary" @click="submitvip(item.phone)">提交</el-button>

                                    </el-form-item>
                                </el-form>
                            </div>
                            <el-button type="primary" size="mini" @click="editClient(item.phone)" plain slot="reference">编辑</el-button>
                        </el-popover>

                        <el-button type="danger" size="mini" @click="delClient(item.phone)" plain>删除</el-button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
    <div class='section pageright'>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[10, 20, 50]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            getclients: {}, //  获取用户信息
            pagesize: 10, //页容量
            pagenum: 1, //页码
            vipList: [],
            clientDetail: {},
            total: 0,
            keyWords: '',
            userInfo: {},
            user_list: {},
            addUser: {
                psd: '',
                phone: '',
                id_card_no: '',
                user_tags: "",
                belongto_admin: "",
                user_name: "",
                birthday: "",
            },
         

        }
    },
    created() {
        this.getclient()

        // this.addClients()
    },
    methods: {
        getclient() {
            const url = `/api/admin/findMember`
            this.$axios.post(url, {
                pagesize: this.pagesize, // 页容量
                pagenum: this.pagenum, //页码
                condition: this.keyWords,
            }).then(res => {

                // this.getUserinfo()
                this.vipList = res.data.resultValue
                this.total = res.data.total

            })
        },

        addClients() {
            const url = `api/User/user_regist`
            this.$axios.post(url, {
                phone: this.addUser.phone,
                id_card_no: '',
                birthday: this.addUser.birthday,
                user_name: this.addUser.user_name,
                password: this.$md5(this.addUser.psd + '0xz765nb'),
                user_tags: this.addUser.user_tags,
                belongto_admin: this.addUser.belongto_admin,

            }).then(res => {

                this.getclient()
            })
        },
        editClient(phone) {
            const url = `/api/admin/find_by_user_phone`
            this.$axios.post(url, {
                user_phone: phone
            }).then(res => {

                this.clientDetail = res.data.resultValue[0]

                this.clientDetail.vipGrade = '普通会员'

            })
        },
        // 提交编辑
        submitvip(phone) {
            if(this.clientDetail.belongto_admin == null){
                this.clientDetail.belongto_admin = 13559128728
            }
            const url = `/api/admin/update_userinfo`
            this.$axios.post(url, {
                user_phone: phone,
                birthday: this.clientDetail.birthday,
                user_name: this.clientDetail.user_name,
                user_integral: this.clientDetail.user_integral,
                user_tags: this.clientDetail.user_tags,
                user_role: this.clientDetail.vipGrade,
                belongto_admin: this.clientDetail.belongto_admin,
                id_card_no: "",

            }).then(res => {

                this.getclient()
            })
        },

        // 删除
        delClient(phone) {
            const url = `api/admin/admin_del_member`
            this.$axios.post(url, {
                user_phone: phone
            }).then(res => {
                this.getclient()
            })
        },
        // 页容量
        handleSizeChange(pagesize) {
            this.pagesize = pagesize //页码
            this.pagenum = 1

            console.log('页容量' + this.pagenum)
            this.getclient()

        },
        //当前页
        handleCurrentChange(pagenum) {
            console.log(pagenum)
            this.pagenum = pagenum

            this.getclient()
        }

    },
}
</script>

<style scoped>
table {
    border-collapse: collapse;
}

table tr {
    line-height: 30px;
    border-bottom: 1px solid #e5e5e5;
}

table tr td {
    text-align: center;
}

.clientList li {
    line-height: 30px;
    height: 36px;
    border-top: 1px solid red;
}

.clientList li:last-child {
    border-bottom: 1px solid red;
}

.el-pager {
    border: none;
}

.commentlist li {
    border-top: 1px solid #909399;
}

.pageright {
    float: right;
}

.listhg {
    line-height: 36px;
}

.el-row {

    &:last-child {
        margin-bottom: 0;
    }
}

.inputwidth {

    width: 400px;
}

.el-col {}

.lh {
    text-align: center;
    line-height: 36px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {

    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
