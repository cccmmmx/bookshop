<template>
  <div class="hotTags">
      <h2 style="font-size:20px;font-weight:700">热门标签</h2>
      <hr>
      <div class="hot-tags-box">
          <div class="hot-tags-item" v-for="(item,index) in tags" :key="index">
            <p class="firstTag">{{item}}</p>
            <div class="secondTags">
              <div v-for="item1 in secondTitle(index)" :key="item1.id" class="tagLink"
              @click="handleCategory(item1)">{{item1.text}}</div>
            </div>
          </div>
      </div>
  </div>
</template>
<script>
import {getCategoryAll} from '../../js/api'

  export default {
    name: 'hotTags',
    data(){
      return{
        categoryAll:[],
        // tags:[
        //   {firstTitle:'文学',secondTitle:['小说','随笔','日本文学','散文','诗歌','童话','名著']},
        //   {firstTitle:'流行',secondTitle:['小说','随笔','日本文学','散文','诗歌','童话','名著']},
        //   {firstTitle:'文化',secondTitle:['小说','随笔','日本文学','散文','诗歌','童话','名著']},
        //   {firstTitle:'生活',secondTitle:['小说','随笔','日本文学','散文','诗歌','童话','名著']},
        //   {firstTitle:'经管',secondTitle:['小说','随笔','日本文学','散文','诗歌','童话','名著']},
        //   {firstTitle:'科技',secondTitle:['小说','随笔','日本文学','散文','诗歌','童话','名著']},
        // ]
        tags:['文学','流行','文化','生活','经管','科技']
      }
    },
    created(){
       getCategoryAll().then(res=>{
          this.categoryAll=res.data
      })
    },
    computed:{
      // 二级标签
      secondTitle(){
           return function(index){
             return this.categoryAll.filter(item=>item.parent==index)
           }
      }
    },
    methods:{
      // 点击进入标签页
     handleCategory(item){
       this.$router.push({name:'bookTag',params:{name:item.text},query:{id:item.id}})
     }
    }
  }
</script>
<style lang="less" scoped>
  .hotTags{
      width: 100%;
      background: #fff;
      padding: 20px;
  }
  .hot-tags-box{
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    .hot-tags-item{
      flex: 1;
      width: 100%;
      border-bottom: 2px dashed #ccc;
      margin-bottom: 10px;
      cursor: pointer;
      p{height: 30px;line-height: 30px}
      .secondTags{
        display: flex;
        flex-wrap: wrap;
        line-height: 25px;
        .tagLink{
          border:1px solid #ccc;
          padding: 3px 10px;
          margin-right: 5px;
          margin-bottom: 5px;
          color: #37A;
          display: inline-block;

        }
        .tagLink:hover{
          background: rgba(0, 0, 0, 0.2)
        }
      }
    }
  }
</style>