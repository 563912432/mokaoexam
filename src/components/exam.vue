<template>
  <div class="zt">
    <div class="zt-header pd-left-right-10" style="background-color: #409EFF;">
      <h4 style="color: #fff;letter-spacing: 2px">
        <span v-if="tag === 'chujikuaiji'">初级会计职称万人模考</span>
        <span v-if="tag === 'zhongjikuaiji'">中级会计职称万人模考</span>
        【第{{num}}期】
      </h4>
    </div>
    <div class="border-bottom-line pd-15 flex flex-justify-between flex-align-center">
      <span class="f20">
        <i class="el-icon-edit-outline ml-20"></i>
        <span>{{ paperInfo.course.title}}</span>
      </span>
      <el-button type="primary" size="small" @click="back">退出</el-button>
    </div>
    <div class="main">
      <div class="main-left flex flex-column">
        <div class="card-top f18">
          <i class="el-icon-tickets"></i> <span>答题卡 {{ curr_index + 1}} / {{ exam_length }} </span>
        </div>
        <div class="card-middle flex-1 flex flex-column">
          <div v-for="tm in regroupAllExam" :key="tm.id">
            <div class="card-title">
              <i class="el-icon-menu"></i> <span>{{ tm[0].type_name }}</span>
            </div>
            <div>
              <span v-for="(item, index) in tm" :key="index"  @click='chose(item.id)'
                    :class="['card-icon',currTiMu.id ===item.id ? 'icon-active': '',item.done?'icon-done':'']">
                {{ index + 1 }}
              </span>
            </div>
          </div>
        </div>
        <div class="card-bottom flex flex-align-center">
          <div class="flex-1 flex flex-justify-center flex-align-center"><span>当前</span><span class="ml-5 icon-bottom icon-active"></span></div>
          <div class="flex-1 flex flex-justify-center flex-align-center"><span>已做</span><span class="ml-5 icon-bottom icon-done"></span></div>
        </div>
      </div>
      <div class="main-right flex flex-column">
        <div class="card-top flex flex-align-center f18 c-red">
          <div class="flex-1 flex flex-align-center flex-start">
            <span class="ml-5">
              <daojishi :time="parseInt(leftTime)"></daojishi>
            </span>
          </div>
          <!--<div class="flex-1 flex flex-align-center flex-justify-center">-->
          <!--<el-button-group>-->
          <!--<el-button type="primary" size="small" icon="el-icon-arrow-left">上一题</el-button>-->
          <!--<el-button type="primary" size="small">下一题<i class="el-icon-arrow-right el-icon&#45;&#45;right"></i></el-button>-->
          <!--</el-button-group>-->
          <!--</div>-->
          <div class="flex-1 flex flex-align-center flex-end">
            <el-button size="small" type="danger" @click="submit($route.params.id)">交卷</el-button>
          </div>
        </div>
        <div class="flex-1 flex" style="position: relative">
          <danxuan v-if="parseInt(currTiMu.type_cate) === tmType.danxuan" :timu="currTiMu" :danxuanTi="paperInfo['info'][currTiMu.type]"></danxuan>
          <duoxuan v-if="parseInt(currTiMu.type_cate) === tmType.duoxuan" :timu="currTiMu" :duoxuanTi="paperInfo['info'][currTiMu.type]"></duoxuan>
          <panduan v-if="parseInt(currTiMu.type_cate) === tmType.panduan" :timu="currTiMu" :panduanTi="paperInfo['info'][currTiMu.type]"></panduan>
          <jianda v-if="parseInt(currTiMu.type_cate) === tmType.jianda" :timu="currTiMu" :jiandaTi="paperInfo['info'][currTiMu.type]"></jianda>
          <ztjisuanfenxi v-if="parseInt(currTiMu.type_cate) === tmType.bdxjianda" :timu="currTiMu" :jiandaTi="paperInfo['info'][currTiMu.type]"></ztjisuanfenxi>
          <ztbudingxiang v-if="parseInt(currTiMu.type_cate) === tmType.bdxxuanze" :timu="currTiMu" :jiandaTi="paperInfo['info'][currTiMu.type]"></ztbudingxiang>
          <el-button class="jisuanqi" size="small" type="primary" @click="openCalculator">计算器</el-button>
        </div>
        <div class="card-bottom flex">
          <div class="flex-1 flex flex-justify-center flex-align-center">
            <!--<el-button size="small" icon="el-icon-view" type="primary">文字解析</el-button>-->
            <!--<el-button size="small" icon="el-icon-view" type="primary" style="justify-self: flex-start">视频解析</el-button>-->
            <el-button-group>
              <el-button type="primary" size="medium" icon="el-icon-arrow-left" @click="pre">上一题</el-button>
              <el-button type="primary" size="medium" @click="next">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogTableVisible"
      :modal="false"
      v-dialogDrag
      ref="dialog__wrapper"
      width="450px">
      <iframe src="/static/calc_easy/jisuanqi.html" frameborder="0" style="width: 400px;height: 350px"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import daojishi from './daojishi'
import danxuan from './ztdanxuan'
import duoxuan from './ztduoxuan'
import panduan from './ztpanduan'
import jianda from './ztjianda'
import ztjisuanfenxi from './ztjisuanfenxi'
import ztbudingxiang from './ztbudingxiang'
import {mapState, mapGetters} from 'vuex'
export default {
  name: 'homework',
  components: {
    'daojishi': daojishi,
    'danxuan': danxuan,
    'duoxuan': duoxuan,
    'panduan': panduan,
    'jianda': jianda,
    'ztjisuanfenxi': ztjisuanfenxi,
    'ztbudingxiang': ztbudingxiang
  },
  computed: {
    ...mapState(['tmType']),
    ...mapGetters(['userAnswer']),
    // 总题目数量
    exam_length () {
      return this.allExam.length
    },
    host () {
      return window.host
    },
    tag () {
      return window.tag
    }
  },
  data () {
    return {
      dialogTableVisible: false,
      paperInfo: {course: {title: ''}},
      allExam: [],
      leftTime: 0,
      running: 1,
      // 重组后的全部题目【答题卡】
      regroupAllExam: [],
      // 重组后的全部题目【答题区】
      showAllExam: [],
      // 当前题目
      currTiMu: {},
      // 当前题目的index
      curr_index: 0,
      // 已做题目
      done: [],
      timer: null,
      num: '',
      hasFinish: false
    }
  },
  created () {
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
    }
    // this.removeCookieTime()
  },
  mounted () {
  },
  beforeRouteEnter (to, from, next) {
    // 考试
    if (from.path === '/') {
      next((vm) => {
        vm.$store.commit('clearUserAnswer')
        vm.setPaperAndExamInfo(vm.$route.params.id)
      })
    } else {
      next((vm) => {
        vm.$router.replace('/')
      })
    }
    // next((vm) => {
    //   vm.$store.commit('clearUserAnswer')
    //   vm.setPaperAndExamInfo(vm.$route.params.id)
    // })
  },
  methods: {
    openCalculator () {
      this.dialogTableVisible = true
      // this.$notify({
      //   title: '',
      //   duration: 0,
      //   dangerouslyUseHTMLString: true,
      //   message: '<iframe src="/static/calc_easy/jisuanqi.html" frameborder="0" style="width: 270px;height: 320px"></iframe>'
      // })
    },
    // 试卷和作业获取数据
    setPaperAndExamInfo (id) {
      window.axios.get(window.host + `api/mokao/paper/${id}`).then(res => {
        if (res.data.status) {
          // console.log(res.data.resultData)
          this.paperInfo = res.data.resultData
          this.num = this.paperInfo.mokao.title
          this.allExam = res.data.resultData.allTkInfo
          this.leftTime = res.data.resultData.time // time_left => time
          this.running = res.data.resultData.running
          this.hasFinish = res.data.resultData.done
          // // 有做题记录【作业】
          // let record = res.data.resultData.record
          // if (record && Array.isArray(record) && record.length > 0) {
          //   this.$store.commit('saveAnswer', res.data.resultData.record)
          //   this.doneTiMu()
          // } else {
          //   this.regroupTiMu()
          // }
          if (!this.running) {
            this.$message.error('当前考试已结束')
            this.$router.go(-1)
          }
          if (this.hasFinish) {
            this.$message.error('考试已完成')
            this.$router.go(-1)
          }
          this.regroupTiMu()
        } else {
          this.$message.error(res.data.info)
          this.$router.push('/')
        }
      })
    },
    // 原生post请求
    post (url, data, fn) { // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
      let obj = new XMLHttpRequest()
      obj.open('POST', url, true)
      obj.setRequestHeader('content-type', 'application/json')
      obj.setRequestHeader('token', this.$store.state.access_token_student)
      obj.send(JSON.stringify(data))
    },
    chose (id) {
      this.showAllExam.map((value, index) => {
        if (value.id === id) {
          this.currTiMu = value
          this.curr_index = index
        }
      })
    },
    // 重组题目 按type分类
    regroupTiMu () {
      let tmp = {}
      for (let i in this.allExam) {
        if (typeof this.allExam[i] === 'object') {
          this.allExam[i]['index'] = +i
          if (this.done.length > 0 && this.done.indexOf(this.allExam[i].number) > -1) {
            this.allExam[i].done = 1
          } else {
            this.allExam[i].done = 0
          }
          if (tmp[this.allExam[i].type]) {
            tmp[this.allExam[i].type].push(this.allExam[i])
          } else {
            tmp[this.allExam[i].type] = []
            tmp[this.allExam[i].type].push(this.allExam[i])
          }
        }
      }
      this.regroupAllExam = tmp
      // console.log(tmp)
      // 重组分类后的题目【按顺序】
      let tmpArr = []
      for (let i in tmp) {
        tmpArr = tmpArr.concat(tmp[i])
      }
      this.showAllExam = tmpArr
    },
    // 初始化当前题目
    initData () {
      this.currTiMu = this.showAllExam[this.curr_index]
      // console.log(this.currTiMu)
    },
    // 上一题
    pre () {
      if (this.curr_index <= 0) {
        this.$message.warning('已经是第一题了！')
        return
      }
      this.curr_index--
    },
    // 下一题
    next () {
      if (this.curr_index >= this.allExam.length - 1) {
        this.$message.warning('已经是最后一题了！')
        return
      }
      this.curr_index++
    },
    // 所有已做题
    doneTiMu () {
      this.done = []
      let userAnswer = this.$store.getters.userAnswer
      // console.log(userAnswer)
      if (userAnswer && userAnswer.length > 0) {
        userAnswer.forEach(v => {
          this.done.push(v.id)
        })
        // console.log(this.done)
        this.regroupTiMu()
      }
    },
    // 手动交卷
    submit (id) {
      let userAnswer = this.$store.getters.userAnswer
      if (userAnswer.length === 0) {
        this.$message.error('您尚未答题，请作答后交卷')
        return false
      }
      this.$confirm('确定要交卷吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.axios.post(`api/mokao/answer/${id}`, {'record': userAnswer}).then(res => {
          if (res.data.status) {
            this.$message.success('交卷成功')
            setTimeout(() => {
              this.$router.push(`/ztparse/${id}`)
              this.removeCookieTime()
            }, 2000)
          } else {
            this.$message.error('交卷失败')
          }
        })
      }).catch(() => {
        this.$message.warning('已取消交卷，请继续作答')
      })
    },
    // 自动交卷
    autoSubmit () {
      let userAnswer = this.$store.getters.userAnswer
      let url = 'api/mokao/answer/' + this.$route.params.id
      window.axios.post(url, {'record': userAnswer}).then(res => {
        if (res.data.status) {
          this.$message.success('交卷成功')
          setTimeout(() => {
            this.$router.push(`/ztparse/${this.$route.params.id}`)
            this.removeCookieTime()
          }, 2000)
        } else {
          this.$message.error('交卷失败')
        }
      })
    },
    // 清掉cookie里面的倒计时
    removeCookieTime () {
      if (window.cookie.get('leftTime')) {
        window.cookie.remove('leftTime')
      }
    },
    back () {
      this.$confirm('退出后无法再次进入当前考试，确定吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let userAnswer = this.$store.getters.userAnswer
        let url = 'api/mokao/answer/' + this.$route.params.id
        window.axios.post(url, {'record': userAnswer}).then(res => {
          if (res.data.status) {
            this.$router.push('/')
            this.removeCookieTime()
          } else {
            this.$message.error('')
          }
        })
        this.removeCookieTime()
      }).catch(() => {
        console.log('cancel')
      })
    }
  },
  watch: {
    curr_index () {
      this.doneTiMu()
      this.initData()
    },
    regroupAllExam () {
      this.initData()
    }
  }
}
</script>

<style>

</style>
<style rel="stylesheet/css" scoped>
  .zt{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .zt .zt-header {
  }
  .zt .main{
    flex: 1;
    display: flex;
    flex-direction: row;
  }
  .zt .main .main-left{
    width: 350px;
    height: 100%;
    border-right: solid 1px #EBEEF5;
  }
  .zt .main .main-right{
    flex: 1;
    width: 100%;
    background-color: #ffffff;
    box-sizing: border-box;
  }
  .card-top{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: solid 1px #EBEEF5;
    background-color: #F2F6FC;
    box-sizing: border-box;
    padding: 0 15px;
  }
  .card-middle{
    padding: 0 10px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .card-middle .card-title{
    height: 45px;
    line-height: 45px;
    color: #447ED9;
  }
  .card-middle2{
    border-top: solid 1px #EBEEF5;
  }
  .card-bottom{
    height: 50px;
    line-height: 50px;
    background-color: #F2F6FC;
    border-top: solid 1px #EBEEF5;
    padding: 0 15px;
  }
  .icon-bottom{
    width: 20px;
    height: 20px;
    border-radius: 3px;
    outline: none;
  }
  .card-icon{
    float: left;
    cursor: pointer;
    margin: 0 1px 5px 0;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #EBEEF5;
    border-radius: 3px;
    outline: none;
    text-align: center;
    font-size: 14px;
    font-family: 'Arial'
  }
  .icon-done{
    background-color: #409EFF;
    color: #ffffff;
  }
  .icon-active{
    background-color: #F37B1D;
    color: #ffffff;
  }
  .jisuanqi{
    position: absolute;
    right: 0px;
    top: 10%;
  }
</style>
