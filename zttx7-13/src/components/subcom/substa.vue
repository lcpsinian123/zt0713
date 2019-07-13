<template>
<div>
 
    <div class='record'>
        <p><span>前一天注册量:</span><span>{{regist}}</span></p>
        <p><span>前一天预约量:</span><span>{{ordernum}}</span></p>
    </div>
</div>
</template>

<script>
export default {
    props: ['regist', 'ordernum']
}
</script>
