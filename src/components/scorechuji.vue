<template>
  <div class="score">
    <div class="top-tab flex flex-align-center flex-justify-between">
      <div style="color: #C0C4CC;padding-left: 15px;font-size: 15px">
        <!--<i class="el-icon-bell"></i> <span>主观题不评分，成绩排行只显示客观题得分排名</span>-->
      </div>
      <div style="padding: 5px 20px">
        <span class="top-button" @click="back">返回</span>
        <!--<span class="top-button">注册</span>-->
      </div>
    </div>
    <div class="header">
      <div class="header1"></div>
      <div class="header2">
        <div class="subject">
          <div v-for="(paper, index) in currentExam.paper" :key="index" style="flex:1;display: flex">
            <div v-if="parseInt(paper.course_id) === course.chujishiwu" class="btn-div"><div class="btn1" @click="tabChange('0', paper.id)"></div></div>
            <div v-if="parseInt(paper.course_id) === course.jingjifajichu" class="btn-div"><div class="btn2" @click="tabChange('1', paper.id)"></div></div>
          </div>
        </div>
      </div>
      <div class="score1-text"><i class="el-icon-bell"></i> <span>主观题不评分，请自行比对，成绩排行只显示客观题得分排名</span></div>
      <div class="content">
        <div v-if="tabIndex === '0'" class="score1-header"></div>
        <div v-if="tabIndex === '1'" class="score1-header1"></div>
        <div v-if="tabIndex === '2'" class="score1-header2"></div>
        <div class="score1-content">
          <el-row style="background-color: #252a67">
            <el-col :span="8"><div class="title">排名</div></el-col>
            <el-col :span="8"><div class="title">昵称</div></el-col>
            <el-col :span="8"><div class="title">总分</div></el-col>
          </el-row>
          <el-row v-for="(item, index) in data" :key="index" :class="index % 2 === 0?'': 'bg-puple'">
            <el-col :span="8"><div :class="['text',item.tel === userTel?'col-yellow':'']"><span v-if="item.tel === userTel"><i class="el-icon-star-on" style="color: #E6A23C"></i></span> <span>{{index + 1}}</span></div></el-col>
            <el-col :span="8"><div :class="['text',item.tel === userTel?'col-yellow':'']">{{item.tel_new}}</div></el-col>
            <el-col :span="8"><div :class="['text',item.tel === userTel?'col-yellow':'']">{{item.score}}</div></el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'score',
  data () {
    return {
      currentExam: {},
      tabIndex: '0',
      data: [],
      userTel: ''
    }
  },
  computed: {
    ...mapState(['course'])
  },
  mounted () {
    this.tabIndex = this.$route.params.index
    this.getCurrentExam()
    this.getData(this.$route.params.id)
    this.userTel = window.userInfo.tel
  },
  methods: {
    tabChange (index, id) {
      this.tabIndex = index
      this.getData(id)
    },
    // ${this.$route.params.id}
    getCurrentExam () {
      // 本期模考
      window.axios.get(`api/mokao/index/${window.mokaoType}`).then(res => {
        if (res.data.status) {
          this.currentExam = res.data.resultData
          // console.log(this.currentExam)
        }
      })
    },
    getData (id) {
      window.axios.get(`api/mokao/rank/${id}`).then(res => {
        if (res.data.status) {
          this.data = res.data.resultData
        } else {
          this.$message.error(res.data.info)
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
      })
    },
    back () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .col-yellow{
    color: #E6A23C!important;
  }
  .flex1{
    flex: 1;
  }
  .btn {
    width: 180px;
    height: 48px;
    z-index: 3;
  }
  .score {
    width: 100%;
    height: 100%;
    background-color: #231f56;
    overflow-y: auto;
  }
  .top-tab{
    position: absolute;
    top: 0;
    width: 100%;
    height: auto;
    padding: 10px 0;
    /*height: 30px;*/
    background-color: #333;
    z-index: 10;
    box-sizing: border-box;
  }
  .top-button{
    color: #FFF;
    border: 1px solid #bcbcbc;
    padding: 4px 10px;
    border-radius: 1px;
    margin-right: 5px;
    font-size: 12px;
    cursor: pointer;
  }
  .header1 {
    width: 1275px;
    height: 279px;
    margin: 0 auto;
    background: url("../assets/score_01.png");
    position: relative;
    z-index: 1;
  }
  .header2 {
    width: 1275px;
    height: 221px;
    margin: 0 auto;
    background: url("../assets/score_02.png");
    position: relative;
    z-index: 1;
    box-sizing: border-box;
  }
  .header2 .subject {
    position: relative;
    width: 1100px;
    height: 48px;
    margin: 0 auto;
    top: 100px;
    z-index: 2;
    display: flex;
  }
  .score1-text {
    width: 1275px;
    height: 80px;
    margin: 0 auto;
    text-align: center;
    color: #D1498C;
  }
  .btn-div{
    flex: 1;
    height: 48px;
    z-index: 3;
    display: flex;
    justify-content: center;
  }
  .btn1 {
    z-index: 4;
    width: 180px;
    height: 48px;
    background: url("../assets/btn4.png") no-repeat center;
    cursor: pointer;
    border-radius: 25px;
  }
  .btn2 {
    width: 180px;
    height: 48px;
    background: url("../assets/btn5.png") no-repeat center;
    z-index: 4;
    cursor: pointer;
    border-radius: 25px;
  }
  .content {
    width: 1275px;
    height: auto;
    margin: 0 auto;
    padding-bottom: 50px;
    z-index: 4;
    position: relative;
  }
  .score1-header {
    width: 340px;
    height: 42px;
    margin: 0 auto;
    background: url("../assets/text4.png") no-repeat center;
  }
  .score1-header1 {
    width: 340px;
    height: 42px;
    margin: 0 auto;
    background: url("../assets/text5.png") no-repeat center;
  }
  .score1-content{
    margin-top: 60px;
    border: solid 1px #398ffe;
    padding: 45px 120px;
    border-radius: 10px;
  }
  .score1-content .title{
    text-align: center;
    color: #fff;
    font-size: 16px;
    padding: 20px 0;
  }
  .score1-content .text{
    text-align: center;
    color: #fff;
    font-size: 15px;
    padding: 20px 0;
  }
  .bg-puple {
    background-color: #252a67;
  }
</style>
