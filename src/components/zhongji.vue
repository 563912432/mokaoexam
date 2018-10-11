<template>
  <div class="index">
    <div class="top-tab flex flex-align-center flex-justify-end">
      <div style="padding: 5px 20px">
        <div v-if="parseInt(source) === 1">
          <!--总站-->
          <div v-if="user">
            <span>欢迎你，{{name}}</span>
          </div>
          <div v-else>
            <span class="top-button" @click="toLogin">登录</span>
            <span class="top-button" @click="toRegister">注册</span>
          </div>
        </div>
      </div>
    </div>
    <div class="index1">
      <!--期数-->
      <div class="index1-num">{{currentExam.title}}</div>
    </div>
    <div class="index2"></div>
    <div class="index3">
      <!--时间-->
      <div class="index3-time">{{timeChange(currentExam.start)}} - {{timeChange(currentExam.end)}}</div>
    </div>
    <div class="index4">
      <!--考试说明-->
      <div class="index4-info" v-html="currentExam.rules"></div>
    </div>
    <div class="index5" id="subject">
      <div class="index5-header"></div>
      <!--考试科目-->
      <!--
        1、尚未开考，尚未参加考试，显示‘未开考’
        2、已经开考，尚未参加考试，显示‘进入考试’
        3、已经开考，正在参加考试，显示‘继续答题’
        4、已经开考，考试已打完题，显示‘已完成，查看解析，查看排名’
        5、已过开考期限，尚未答题，显示‘考试已结束，查看解析，查看排名’
      -->
      <!--怎么区分这几个课程-->
      <div class="index5-bottom">
        <div v-for="(paper, index) in currentExam.paper" :key="index">
          <div v-if="parseInt(paper.course_id) === parseInt(course.kuaijishiwu)" class="index5-bottom1">
            <!--会计实务[0]-->
            <div class="index5-div flex flex-column flex-align-center flex-justify-center">
              <div v-if="currentExam.running === -1" class="text-center">
                <div class="margin-top-10">
                  <el-button disabled type="success" round class="button green">未开始</el-button>
                </div>
              </div>
              <div v-else-if="!currentExam.running" class="text-center">
                <div>
                  <el-button disabled type="success" round class="button green">已结束</el-button>
                </div>
                <div class="margin-top-10">
                  <el-button type="warning" round class="button purple" @click="watchScore(paper.id, 0)">
                    查看排名
                  </el-button>
                </div>
                <div class="margin-top-10">
                  <el-button type="primary" round class="button blue" @click="textParse(paper.id)">查看文字解析
                  </el-button>
                </div>
                <div class="margin-top-10">
                  <el-button type="primary" round class="button darkGreen" @click="videoParse(currentExam.liveroom)">
                    查看视频解析
                  </el-button>
                </div>
              </div>
              <div v-else class="text-center">
                <div class="margin-top-10">
                  <el-button v-if="!paper.done" type="success" round class="button green"
                             @click="toExam(paper.id)">进入考试
                  </el-button>
                </div>
                <div>
                  <el-button v-if="!!paper.done" type="success" disabled round class="button green">已完成
                  </el-button>
                </div>
                <div class="margin-top-10">
                  <el-button v-if="!!paper.done" type="warning" round class="button purple"
                             @click="watchScore(paper.id, 0)">查看排名
                  </el-button>
                </div>
                <div class="margin-top-10">
                  <el-button v-if="!!paper.done" type="primary" round class="button blue"
                             @click="textParse(paper.id)">查看文字解析
                  </el-button>
                </div>
                <div class="margin-top-10">
                  <el-button v-if="!!paper.done" type="primary" round class="button darkGreen"
                             @click="videoParse(currentExam.liveroom)">查看视频解析
                  </el-button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="parseInt(paper.course_id) === parseInt(course.jingjifa)" class="index5-bottom2">
            <!--经济法[1]-->
            <div class="index5-div flex flex-column flex-align-center flex-justify-center">
              <div v-if="currentExam.running === -1" class="text-center">
                <el-button disabled type="success" round class="button green">未开始</el-button>
              </div>
              <div v-else-if="!currentExam.running" class="text-center">
                <div class="margin-top-10">
                  <el-button disabled type="success" round class="button green">已结束</el-button>
                </div>
                <div class="margin-top-10">
                  <el-button type="warning" round class="button purple" @click="watchScore(paper.id, 1)">查看排名
                  </el-button>
                </div>
                <div class="margin-top-10">
                  <el-button type="primary" round class="button blue" @click="textParse(paper.id)">查看文字解析</el-button>
                </div>
                <div class="margin-top-10">
                  <el-button type="primary" round class="button darkGreen" @click="videoParse(currentExam.liveroom)">
                    查看视频解析
                  </el-button>
                </div>
              </div>
              <div v-else class="text-center">
                <div class="margin-top-10">
                  <el-button v-if="!paper.done" type="success" round class="button green" @click="toExam(paper.id)">
                    进入考试
                  </el-button>
                </div>
                <div>
                  <el-button v-if="!!paper.done" type="success" disabled round class="button green">已完成</el-button>
                </div>
                <div class="margin-top-10">
                  <el-button v-if="!!paper.done" type="warning" round class="button purple"
                             @click="watchScore(paper.id, 1)">查看排名
                  </el-button>
                </div>
                <div class="margin-top-10">
                  <el-button v-if="!!paper.done" type="primary" round class="button blue" @click="textParse(paper.id)">
                    查看文字解析
                  </el-button>
                </div>
                <div class="margin-top-10">
                  <el-button v-if="!!paper.done" type="primary" round class="button darkGreen"
                             @click="videoParse(currentExam.liveroom)">查看视频解析
                  </el-button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="parseInt(paper.course_id) === parseInt(course.caiwuguanli)" class="index5-bottom3">
            <!--财务管理[2]-->
            <div class="index5-div flex flex-column flex-align-center flex-justify-center">
              <div v-if="currentExam.running === -1" class="text-center">
                <el-button disabled type="success" round class="button green">未开始</el-button>
              </div>
              <div v-else-if="!currentExam.running" class="text-center">
                <div class="margin-top-10">
                  <el-button disabled type="success" round class="button green">已结束</el-button>
                </div>
                <div class="margin-top-10">
                  <el-button type="warning" round class="button purple" @click="watchScore(paper.id, 2)">查看排名
                  </el-button>
                </div>
                <div class="margin-top-10">
                  <el-button type="primary" round class="button" @click="textParse(paper.id)">查看文字解析</el-button>
                </div>
                <div class="margin-top-10">
                  <el-button type="primary" round class="button darkGreen" @click="videoParse(currentExam.liveroom)">
                    查看视频解析
                  </el-button>
                </div>
              </div>
              <div v-else class="text-center">
                <div class="margin-top-10">
                  <el-button v-if="!paper.done" type="success" round class="button green" @click="toExam(paper.id)">
                    进入考试
                  </el-button>
                </div>
                <div>
                  <el-button v-if="!!paper.done" type="success" disabled round class="button green">已完成</el-button>
                </div>
                <div class="margin-top-10">
                  <el-button v-if="!!paper.done" type="warning" round class="button purple"
                             @click="watchScore(paper.id, 2)">查看排名
                  </el-button>
                </div>
                <div class="margin-top-10">
                  <el-button v-if="!!paper.done" type="primary" round class="button blue" @click="textParse(paper.id)">
                    查看文字解析
                  </el-button>
                </div>
                <div class="margin-top-10">
                  <el-button v-if="!!paper.done" type="primary" round class="button darkGreen"
                             @click="videoParse(currentExam.liveroom)">查看视频解析
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="index6" id="history" v-if="historyData.length > 0">
      <!--往期回顾-->
      <div class="index6-card">
        <el-carousel :interval="4000" type="card" :autoplay="false" height="250px">
          <el-carousel-item v-for="item in historyData" :key="item.id">
            <div class="card-item">
              <div class="card-item-num">{{item.title}}</div>
              <div class="card-item-time">{{timeChange(item.start)}} - {{timeChange(item.end)}}</div>
              <div class="card-item-line1">
                <div v-for="(paper, index) in item.paper" :key="index" style="margin-right: 10px">
                  <el-button v-if="parseInt(paper.course_id) === course.kuaijishiwu" type="danger"
                             @click="textParse(paper.id)">会计实务文字解析
                  </el-button>
                  <el-button v-if="parseInt(paper.course_id) === course.jingjifa" type="danger"
                             @click="textParse(paper.id)">经济法文字解析
                  </el-button>
                  <el-button v-if="parseInt(paper.course_id) === course.caiwuguanli" type="danger"
                             @click="textParse(paper.id)">财务管理文字解析
                  </el-button>
                </div>
              </div>
              <div class="card-item-line2">
                <div v-for="(paper, index) in item.paper" :key="index" style="margin-right: 10px">
                  <el-button v-if="parseInt(paper.course_id) === course.kuaijishiwu" type="danger" class="pule"
                             @click="videoHistory">会计实务视频解析
                  </el-button>
                  <el-button v-if="parseInt(paper.course_id) === course.jingjifa" type="danger" class="pule"
                             @click="videoHistory">经济法视频解析
                  </el-button>
                  <el-button v-if="parseInt(paper.course_id) === course.caiwuguanli" type="danger" class="pule"
                             @click="videoHistory">财务管理视频解析
                  </el-button>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!--<div class="aside-nav">-->
    <!--<div class="margin-bottom-5"><a href="#subject"><el-button plain class="nav-button-width">考试入口</el-button></a></div>-->
    <!--<div class="margin-bottom-5"  v-if="historyData.length > 0"><a href="#history"><el-button plain class="nav-button-width">往期回顾</el-button></a></div>-->
    <!--<div class="margin-bottom-5"><el-button plain class="nav-button-width" @click="watchScore(currentExam.paper[0].id, 0)">排行榜</el-button></div>-->
    <!--</div>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'index',
  data () {
    return {
      currentExam: {
        title: '',
        paper: [{id: '0', done: 0}, {id: '0', done: 0}, {id: '0', done: 0}],
        start: '',
        end: '',
        rules: ''
      },
      nowTime: '',
      historyData: [],
      historyRoom: ''
    }
  },
  computed: {
    ...mapState(['subject', 'course']),
    user () {
      return window.userInfo.key
    },
    source () {
      return window.userInfo.source
    },
    name () {
      return window.userInfo.name
    }
  },
  created () {
    this.initData()
  },
  methods: {
    // 跳转登录
    toLogin () {
      location.href = window.host + 'login?fromurl=' + window.host + 'mkindex/zhongjikuaiji'
    },
    toRegister () {
      location.href = window.host + 'register?fromurl=' + window.host + encodeURI('mkindex/zhongjikuaiji')
    },
    initData () {
      this.getCurrentExam()
    },
    getCurrentExam () {
      // 本期模考
      window.axios.get(`api/mokao/index/${window.mokaoType}`).then(res => {
        if (res.data.status) {
          this.currentExam = res.data.resultData
          // console.log(this.currentExam)
          // 处理富文本的不解析转义字符
          this.currentExam.rules = this.currentExam.rules.replace(this.currentExam.rules ? /&(?!#?\w+;)/g : /&/g, '&amp;')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '\'')
            .replace(/&#39;/g, '\'')
          // 考试状态的判断
          // 当前时间
          this.nowTime = Math.round(new Date().getTime() / 1000)
        }
      })
      //  取往期回顾
      this.getHistory(null)
    },
    timeChange (timestamp) {
      // 根据时间戳生成的时间对象
      let date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = this.change(date.getDate()) + ' '
      let h = this.change(date.getHours()) + ':'
      let m = this.change(date.getMinutes())
      // let m = this.change(date.getMinutes()) + ':'
      // let s = this.change(date.getSeconds())
      // return Y + M + D + h + m + s
      return Y + M + D + h + m
    },
    change (t) {
      if (t < 10) {
        return '0' + t
      } else {
        return t
      }
    },
    getHistory (param) {
      if (param === null) {
        param = this.pagination
      }
      window.axios.get(`api/mokao/history/${window.mokaoType}`).then(res => {
        if (res.data.status === 1) {
          // console.log(res.data.resultData)
          this.historyData = res.data.resultData.list
          this.historyRoom = res.data.resultData.liveroom
          // console.log(this.historyData)
        } else {
          this.$message.error('获取失败')
        }
      })
    },
    toExam (id) { // zuoti
      // 跳转做题 首先判断有没有登录
      if (this.user !== '') {
        let routeData = this.$router.resolve(`/exam/${id}`)
        window.open(routeData.href, '_blank')
      } else {
        this.$message.warning('请先登录')
        setTimeout(() => {
          this.toLogin()
        }, 1000)
      }
    },
    textParse (id) { // wenzijiexi
      if (this.user !== '') {
        let routeData = this.$router.resolve(`/ztparse/${id}`)
        window.open(routeData.href, '_blank')
      } else {
        this.$message.warning('请先登录')
        setTimeout(() => {
          this.toLogin()
        }, 1000)
      }
    },
    videoParse (liveUrl) { // shipinjiexi
      if (this.user !== '') {
        let tmpArr = liveUrl.split(',')
        if (tmpArr.length > 1) {
          switch (parseInt(window.userInfo.source)) {
            case 1: // wenyunjy
              window.open(tmpArr[0], '_blank')
              break
            case 2: // wdexam
              window.open(tmpArr[1], '_blank')
              break
            default:
              window.open(tmpArr[0], '_blank')
              break
          }
        } else {
          // 只有一个
          window.open(liveUrl, '_blank')
        }
      } else {
        this.$message.warning('请先登录')
        setTimeout(() => {
          this.toLogin()
        }, 1000)
      }
    },
    watchScore (id, index) { // chakanpaiming
      if (this.user !== '') {
        let routeData = this.$router.resolve(`/score/${id}/${index}`)
        window.open(routeData.href, '_blank')
      } else {
        this.$message.warning('请先登录')
        setTimeout(() => {
          this.toLogin()
        }, 1000)
      }
    },
    videoHistory () { // lishijiludeshipingjiexi
      if (this.user !== '') {
        let tmpArr = this.historyRoom.split(',')
        if (tmpArr.length > 1) {
          switch (parseInt(window.userInfo.source)) {
            case 1: // wenyunjy
              window.open(tmpArr[0], '_blank')
              break
            case 2: // wdexam
              window.open(tmpArr[1], '_blank')
              break
            default:
              window.open(tmpArr[0], '_blank')
              break
          }
        } else {
          // 只有一个
          window.open(this.historyRoom, '_blank')
        }
      } else {
        this.$message.warning('请先登录')
        setTimeout(() => {
          this.toLogin()
        }, 1000)
      }
    }
  }
}
</script>
<style>
  .nav-button-width {
    width: 114px;
    font-size: 18px;
  }

  .card-item-line1 .el-button {
    width: 154px;
  }

  .card-item-line2 .pule {
    width: 154px !important;
    background-color: #4D62F4 !important;
    border-color: #4D62F4 !important;
  }

  .card-item-line2 .pule:hover {
    opacity: 0.9;
  }

  .index5 .el-button + .el-button {
    margin-left: 0 !important;
  }

  .index5-div .green {
    background-color: #0CDE95 !important;
    border-color: #0CDE95 !important;
  }

  .index5-div .green:hover {
    opacity: 0.9;
  }

  .index5-div .purple {
    background-color: #BC69F6 !important;
    border-color: #BC69F6 !important;
  }

  .index5-div .purple:hover {
    opacity: 0.9;
  }

  .index5-div .blue {
    background-color: #1881FE !important;
    border-color: #1881FE !important;
  }

  .index5-div .blue:hover {
    opacity: 0.9;
  }

  .index5-div .darkGreen {
    background-color: #1DD5C7 !important;
    border-color: #1DD5C7 !important;
  }

  .index5-div .darkGreen:hover {
    opacity: 0.9;
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index {
    width: 100%;
    height: auto;
    background-color: #3c2166;
    position: relative;
    z-index: 1;
  }

  .top-tab {
    position: absolute;
    top: 0;
    width: 100%;
    height: auto;
    padding: 5px 0;
    /*height: 30px;*/
    background-color: #333;
    z-index: 3;
    box-sizing: border-box;
    color: #ffffff;
  }

  .top-button {
    color: #FFF;
    border: 1px solid #bcbcbc;
    padding: 4px 10px;
    border-radius: 1px;
    margin-right: 5px;
    font-size: 12px;
    cursor: pointer;
  }

  .index1 {
    width: 1280px;
    height: 230px;
    margin: 0 auto;
    background: url('../assets/index1.png') no-repeat center;
    z-index: 2;
    position: relative;
  }

  .index1-num {
    position: absolute;
    width: 100px;
    height: 78px;
    line-height: 78px;
    left: 590px;
    top: 123px;
    color: #BED4F6;
    /*border: solid 1px white;*/
    font-size: 80px;
    font-weight: bold;
    text-shadow: #91ffff 0 0 10px;
    z-index: 3;
    text-align: center;
  }

  .index2 {
    width: 1280px;
    height: 216px;
    margin: 0 auto;
    background: url('../assets/index2.png') no-repeat center;
    position: relative;
    z-index: 1;
  }

  .index3 {
    height: 190px;
    width: 1280px;
    margin: 0 auto;
    background: url('../assets/index3.png') no-repeat center;
    position: relative;
    z-index: 1;
  }

  .index3-time {
    position: absolute;
    width: 275px;
    height: 43px;
    line-height: 43px;
    left: 505px;
    top: 16px;
    color: #ffffff;
    /*border: solid 1px white;*/
    text-align: center;
    z-index: 2;
  }

  .index4 {
    height: 700px;
    width: 1280px;
    margin: 0 auto;
    background: url('../assets/index4.png') no-repeat center;
    position: relative;
    z-index: 1;
  }

  .index4-info {
    /*
    1105px;
    height: 330px;
    line-height: 43px;
    left: 70px;
    top: 210px;*/
    position: absolute;
    width: 1100px;
    height: 330px;
    line-height: 35px;
    left: 80px;
    top: 180px;
    color: #bdafe8;
    letter-spacing: 1px;
    /*text-indent: 2em;*/
    /*border: solid 1px white;*/
    z-index: 2;
  }

  .index5 {
    height: 657px;
    width: 1280px;
    margin: 0 auto;
    /*background:#3c2166 url('../assets/index5.png') no-repeat center;*/
    z-index: 1;
    position: relative;
  }

  .index5-header {
    width: 1280px;
    height: 135px;
    margin: 0 auto;
    z-index: 1;
    position: relative;
    background: #3c2166 url('../assets/index5_header.png') no-repeat center;
  }

  .index5-bottom {
    width: 1280px;
    height: 519px;
    margin: 0 auto;
    z-index: 1;
    position: relative;
    background-color: #3c2166;
    display: flex;
  }

  .index5-bottom1 {
    width: 400px;
    height: 519px;
    margin-right: 40px;
    background: #3c2166 url('../assets/index5_bottom1.png') no-repeat center;
    z-index: 1;
    position: relative;
  }

  .index5-bottom2 {
    width: 400px;
    height: 519px;
    margin-right: 40px;
    background: #3c2166 url('../assets/index5_bottom2.png') no-repeat center;
    z-index: 1;
    position: relative;
  }

  .index5-bottom3 {
    width: 400px;
    height: 519px;
    background: #3c2166 url('../assets/index5_bottom3.png') no-repeat center;
    z-index: 1;
    position: relative;
  }

  .index5-div {
    position: relative;
    float: left;
    width: 400px;
    height: 260px;
    /*border: solid 1px white;*/
    margin: 235px 0 0 0;
  }

  .index5-div:nth-child(2) {
    margin-left: 40px;
    margin-right: 40px;
  }

  .index6 {
    height: 500px;
    width: 1280px;
    margin: 0 auto;
    background: #3c2166 url('../assets/index6.png') no-repeat center;
    position: relative;
    z-index: 1;
  }

  .index6-card {
    position: absolute;
    width: 1280px;
    height: 280px;
    margin-top: 188px;
    z-index: 2;
    padding: 10px;
    box-sizing: border-box;
  }

  .card-item {
    /*width: 640px;*/
    height: 250px;
    background: url("../assets/index7.png") no-repeat center;
    position: relative;
    z-index: 2;
  }

  .card-item-num {
    position: absolute;
    width: auto;
    height: 30px;
    line-height: 30px;
    top: 34px;
    left: 48px;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: #4371fa;
    z-index: 2;
  }

  .card-item-time {
    position: absolute;
    width: 300px;
    height: 25px;
    line-height: 25px;
    top: 75px;
    left: 25px;
    font-size: 15px;
    color: #999;
    font-weight: bold;
    z-index: 2;
  }

  .card-item-line1 {
    position: absolute;
    top: 110px;
    left: 0;
    height: 50px;
    line-height: 50px;
    padding-left: 25px;
    display: flex;
  }

  .card-item-line2 {
    position: absolute;
    top: 165px;
    height: 50px;
    line-height: 50px;
    padding-left: 25px;
    display: flex;
  }

  .aside-nav {
    position: absolute;
    top: 150px;
    left: 30px;
    z-index: 3;
  }
</style>
