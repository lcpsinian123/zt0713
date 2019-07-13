<template>
<div>
    <div class='section'>
        <div class='search' style='width:400px'>
            <el-input placeholder="请输入内容" v-model="keyWords" class="input-with-select">
                <el-button slot="append" @click="getOrderlist()" icon="el-icon-search"></el-button>
            </el-input>

        </div>

    </div>
    <div class='section clientList'>
        <table>
            <tbody>
                <tr>
                    <th width="200">姓名</th>

                    <th width="200">手机号</th>

                    <th width="200">预约时间</th>
                    <th width="200">预约机型</th>
                    <th width="200">住址</th>

                    <th width="200">操作</th>
                </tr>
                <tr v-for='item in vipList' :key='item.user_id'>
                    <td width="200"> {{item.user_name}}</td>

                    <td width="200"> {{item.user_phone}}</td>

                    <td width="200">{{item.create_time}}</td>
                    <td width="200">{{item.want_phone_model}}</td>

                    <td width="300">
                        {{item.user_address}}
                    </td>

                    <td  width="300">
                        <div v-if=" isOk == true ">
                            <el-button type="danger" size="mini" @click="dispose(item.id)" plain>处理</el-button>
                        </div>
                        <div v-else>
                            <el-button type="danger" size="mini" :disabled="true" plain>处理</el-button>
                        </div>

                    </td>

                </tr>
            </tbody>
        </table>

    </div>
    <div class='section pageright'>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 50]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            isOk: true,
            vipList: {},
            pageIndex: 1,
            pagesize: 10,
            total: 0,
            keyWords: '',
        }
    },
    created() {
        this.getOrderlist()
    },
    methods: {
        getOrderlist() {
            const url = `api/Apply/find_apply`
            this.$axios.post(url, {

                pagesize: this.pagesize,
                pagenum: this.pageIndex,
                condition: this.keyWords
            }).then(res => {
                console.log(res)
                this.vipList = res.data.resultValue
                this.total = res.data.total

                
            })
        },
        dispose(id) {
            const url = `api/Apply/handel`
            this.$axios.post(url, {
                id: id
            }).then(res => {
               console.log(res)
                
            })

        },
        // 页容量
        handleSizeChange(pagesize) {
            this.pagesize = pagesize

            this.pageIndex = 1

            this.getOrderlist()

        },
        handleCurrentChange(pageindex) {
            this.pageIndex = pageindex

            this.getOrderlist()
        }
    },
}
</script>

<style scoped>
.pageright{
    float:right;
}
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
