<template>
<el-row>
    <el-col :span='6'>
        <el-row>

            管理员手机:<el-input size="small" placeholder="请输入管理员手机号码" v-model='phone'></el-input>
            <div style="margin: 20px 0;"></div>
            商品名称:<el-input placeholder="请输入商品名称" v-model='goodsTitle'></el-input>
            <div style="margin: 20px 0;"></div>
            商品描述:<el-input placeholder="请输入商品描述" v-model='goodsDec'></el-input>
            <input type="file" ref="file"/>

            <el-button size="small" type="primary" @click='uploadImg'>点击上传</el-button>

        </el-row>
    </el-col>
     
    <el-col :span='14'>
        <table>
            <tr>
                <th width='300'>商品名称</th>
                <th width='300'>商品描述</th>
                <th width='300'>上线时间</th>
                <th width='300'>图片</th>
                <th width='300'>操作</th>
            </tr>
            <tr v-for="(item,index) in imgList">
                <td width='300'>{{item.goods_name}}</td>
                <td width='300'>{{item.capacity_and_price}}</td>
                <td width='300'>{{item.create_time}}</td>

                <td width='300'>
                    <img :src="item.image"/>
                </td>
                <td width='300'>
                    <el-button type='waring' @click="delGoods(item.id)">删除</el-button>
                </td>
            </tr>
        </table>
    </el-col>
   
</el-row>
</template>

<script>
export default {
    data() {
        return {
            fileList: [],
            phone: '',
            goodsTitle: "",
            goodsDec: '',
            imgList: {},
            
        };
    },
    created() {
        this.getGoodlist()
    },
    methods: {
        uploadImg() {
            const url = `api/GoodsTemp/add_goods`

            var formdata = new FormData()

            formdata.append("admin_phone", this.phone)
            formdata.append("file", this.$refs.file.files[0])
            formdata.append("goods_name", this.goodsTitle)
            formdata.append("capacity_and_price", this.goodsDec)

            const instance = this.$axios.create({
                withCredentials: true
            })
            instance.post(url, formdata).then(res => {
                console.log(res)
            })

        },
        getGoodlist() {
            const url = `api/GoodsTemp/find_all_goods`
            this.$axios.post(url, {
                pagesize: 1,
                pagenum: 10,
                condition: '',
            }).then(res => {
                //    console.log(res.data.resultValue)
                this.imgList = res.data.resultValue
                console.log(this.imgList)
                var imgUrl = `http://www.lcpsy.cn/test/public/uploads/`
                //    this.imgList[0].image = imgUrl+this.imgList[0].image
                console.log(this.imgList[0].image)
                if (this.imgList.length > 0) {
                    for (let i = 0; i < this.imgList.length; i++) {
                        this.imgList[i].image = imgUrl + this.imgList[i].image
                    }
                }

            })
        },
        delGoods(id) {
            const url = `api/GoodsTemp/del_goods`
            this.$axios.post(url, {
                id: id
            }).then(res => {
                this.getGoodlist()
            })
        },
        handleChange(value){
            console.log(value)
        }
    }
}
</script>

<style scoped>
.upload-demo {
    margin-left: 100px
}

.subBtn,
.demo-ruleForm {
    margin-top: 20px;
}
</style>
