<style lang="less" scoped>
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.weui-grids {
  background-color: #fff;
}
.resource .imgWrap{
    padding: .2rem;
    .text{
        font-size:1.2rem;
    }
}
</style>
<style lang="less">
.imgWrap{
    .weui-grid__icon{        
        width: 100%;
        height: 8rem;
    }
    &.weui-grid:after{
        content:none
    }
}

</style>

<template>
    <div class="resource">
        <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="2">
            <grid-item class="imgWrap" v-for="(item,index) in list" :key="index" @on-item-click="onItemClick(item.url)">
                <img  slot="icon" :src="item.src">
                <span slot="label" class="text">{{ item.label}}</span>
            </grid-item>
        </grid>
    </div>
</template>
<script>
import { Grid, GridItem, GroupTitle } from 'vux'
import {gotoBrowserFun} from '@/utils/jump'
export default {
    components: {
        Grid,
        GridItem,
        GroupTitle
    },
    data() {
        return {
            list:[
                {
                    url:'https://www.icve.com.cn/portal/courseinfo?courseid=b02aavwpsqri1arzo0ymq',
                    label:"临床检验基础技术",
                    src:require('../assets/images/lichuangjianyanjichu.jpg')
                },
                {
                    url:'https://www.icve.com.cn/portal/courseinfo?courseid=wttyaicpuolh9m8oqg2fxa',
                    label:"微生物检验技术",
                    src:require('../assets/images/weishengwujianyanjishu.jpg')
                },
                {
                    url:'https://www.icve.com.cn/portal/courseinfo?courseid=kcgqatinfk5gv915dfcizq',
                    label:"免疫学检验技术",
                    src:require('../assets/images/mianyixue.jpg')
                },
                {
                    url:'https://www.icve.com.cn/portal/courseinfo?courseid=finjafapnjpj4u2sxewgjw',
                    label:"生物化学检验技术",
                    src:require('../assets/images/shengwuhuaxue.png')
                },
                {
                    url:'https://www.icve.com.cn/portal_new/courseinfo/courseinfo.html?courseid=dmv5agyp379kyn9lyv4okq',
                    label:"血液学检验技术",
                    src:require('../assets/images/xueyexue.png')
                },
                {
                    url:'https://www.icve.com.cn/portal_new/courseinfo/courseinfo.html?courseid=uv-3ah6k-5pkwfw0pgxpdw',
                    label:"寄生虫学检验技术",
                    src:require('../assets/images/jishengchong.jpg')
                },
            ]
        }
    },
    methods: {
        onItemClick (url) {
            console.log('on item click')
            gotoBrowserFun(url);
            debugger
        }
    }
}
</script>
