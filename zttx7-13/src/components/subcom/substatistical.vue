<template>
<div>
    <subnum :regist='subobj.regist' :ordernum='subobj.ordernum' ></subnum>

</div>
</template>

<script>
import subnum from './substa.vue'
export default {
    components:{
        subnum
    },
    data() {
        return {
            subobj: {
                regist: "",
                ordernum: "",
            }

        }
    },
    created() {
        this.getregist()
        this.getorder()
    },
    methods: {
        getregist() {
            const url = `api/Count/yesterday_regist`
            this.$axios.post(url).then(res => {
                this.subobj.regist = res.data.yesterdayRegist
               
            })
        },
        getorder() {
            const url = `api/Apply/count_apply`
            this.$axios.post(url).then(res => {
                
                this.subobj.ordernum = res.data.yesterdayApply
             
            })
        },
    },
}
</script>

<style>
.substa{
    color:red;
    
    -webkit-text-fill-color: red;

}


table tr {
    line-height: 30px;
    border-bottom: 1px solid #e5e5e5;
}

table tr td {
    text-align: center;
}
</style>
