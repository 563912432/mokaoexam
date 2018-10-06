<template>
  <div class="ztparse">
    <div class='header'>
      <span><i class="el-icon-question"></i><span class="ml-10">题目解析</span></span>
      <span @click="exit" style="cursor: pointer">退出</span>
    </div>
    <el-scrollbar class="page-component_scroll">
      <div class="main">
        <a name="top"></a>
        <div class="pd-20 border1 mt-20 border-radius-3 text-center">
          <h1>{{ paperInfo.course.title }}</h1>
          <div class="f12 c-666 line-height25" v-if="paperInfo.course">
            <!--<span><i class="el-icon-location-outline"></i> 课程：{{paperInfo.course}}</span>-->
            <span class="ml-20"><i class="el-icon-time"></i> 时间：<span v-if="paperInfo.time > 60">{{Math.round((paperInfo.time / 60) * 100 / 100)}} 分钟</span><span
              v-else>{{paperInfo.time}} 秒</span></span>
          </div>
          <div v-if="tableData.length > 0">
            <div class="pd-20">
              <el-table
                :data="tableData"
                stripe
                style="width: 80%;margin: 0 auto;text-align: center">
                <el-table-column
                  prop="title"
                  label="题型">
                </el-table-column>
                <el-table-column
                  prop="sub_num"
                  label="总数">
                </el-table-column>
                <el-table-column
                  prop="right_num"
                  label="正确">
                </el-table-column>
                <el-table-column
                  prop="wrong_num"
                  label="错误">
                </el-table-column>
                <el-table-column
                  prop="undone_num"
                  label="未做">
                </el-table-column>
                <el-table-column
                  label="分值/题">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type !== 1 && scope.row.type !== 5 && scope.row.type !== 8"></span>
                    <span v-if="scope.row.type === 15">2</span>
                    <span v-else>{{scope.row.score}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="得分">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type !== 1 && scope.row.type !== 5 && scope.row.type !== 8 && scope.row.type !== 15"></span>
                    <span v-else>{{scope.row.user_score}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-if="courseType !== 'chujikuaiji'" class="f15 c-blue flex flex-align-center flex-justify-center mb-15">
              <span><span><i class="el-icon-warning"></i></span> <span>主观题不评分，请自行比对，成绩排行只显示客观题得分排名</span></span>
            </div>
            <div class="f18 c-red flex flex-align-center flex-justify-center">
              <span>成绩：{{ allData.record ? allData.record.score: ''}} 分</span>
              <span class="ml-20">
                <el-rate
                  disabled
                  :max="5"
                  v-model="percent"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </span>
            </div>
          </div>
        </div>
        <div class="mt-5 border1 pd-30 border-radius-3 mini-height">
          <div class="border1 border-radius-3 pd-20 mini-height">
            <div v-for="tm in regroupAllExam" :key="tm.id">
              <!--单选、多选、判断、简答-->
              <div
                v-if="tm[0].type_cate === 1 || tm[0].type_cate === 2 ||tm[0].type_cate === 3 ||tm[0].type_cate === 4">
                <a :name="tm[0].type"></a>
                <div class="pb-15 pt-15 pl-15 line-height25 f16 c-blue">
                  <i class="el-icon-menu"></i>
                  <span v-if="tm[0].type_name">
                  {{tm[0].type_name}}
                </span>
                  <span v-else>
                  <span v-if="tm[0].type_cate === 1">单选题</span>
                  <span v-if="tm[0].type_cate === 2">多选题</span>
                  <span v-if="tm[0].type_cate === 3">判断题</span>
                  <span v-if="tm[0].type_cate ===4">简答题</span>
                    <!--<span v-if="tm[0].type_cate ===5">不定项选择题</span>-->
                    <!--<span v-if="tm[0].type_cate ===6">综合题</span>-->
                    <!--<span v-if="tm[0].type_cate ===7">配伍题</span>-->
                </span>
                </div>
                <div v-for="(item, index) in tm" :key="index" class="border-bottom-dash mb-10">
                  <div class="flex">
                    <div class="w-80 mini-height40 text-center">
                      <el-tag size="small" class="mini-width66">题目{{ index + 1 }}</el-tag>
                    </div>
                    <span class="flex-1 tm-text c-333 flex">
                    <span>{{ index + 1 }}、</span><span v-html="item.title"></span>
                  </span>
                  </div>
                  <div class="flex" v-if="item.type_cate === tmType.danxuan || item.type_cate === tmType.duoxuan">
                    <div class="w-80 mini-height40 text-center">
                      <el-tag size="small" class="mini-width66">选项</el-tag>
                    </div>
                    <span class="flex-1 tm-option c-333">
                    <span v-for="(option, i) in JSON.parse(item.option)" :key="i" class="option flex flex-align-center">
                      <span>{{toLetter(i)}}、</span><span v-text="option"></span>
                    </span>
                  </span>
                  </div>
                  <div class="flex">
                    <div class="w-80 mini-height40 text-center">
                      <el-tag size="small" type="warning">您的答案</el-tag>
                    </div>
                    <!--<span class="flex-1 tm-text c-red" v-html="userAnswer[item.id]"></span>-->
                    <span v-if="tableData.length > 0">
                      <span v-if="item.type_cate === tmType.danxuan"
                            :class="['flex-1 tm-text',userAnswer[item.number] === item.right_answer?'c-blue':'c-red']"
                            v-html="userAnswer[item.number]?userAnswer[item.number]:'未作答'"></span>
                      <span v-if="item.type_cate === tmType.panduan"
                            :class="['flex-1 tm-text',userAnswer[item.number] === item.right_answer?'c-blue':'c-red']"
                            v-html="userAnswer[item.number]?(userAnswer[item.number] === 'A'?'对':'错'):'未作答'"></span>
                      <span v-if="item.type_cate === tmType.duoxuan"
                            :class="['flex-1 tm-text',JSON.stringify(userAnswer[item.number]) === item.right_answer?'c-blue':'c-red']"
                            v-html="userAnswer[item.number]?strDuoXuan(userAnswer[item.number]):'未作答'"></span>
                      <span v-if="item.type_cate === tmType.jianda" class="flex-1 tm-text c-blue"
                            v-html="userAnswer[item.number]?userAnswer[item.number]:'未作答'"></span>
                    </span>
                    <span v-else class="flex-1 tm-text c-orange">
                      未作答
                    </span>
                  </div>
                  <div class="flex">
                    <div class="w-80 mini-height40 text-center">
                      <el-tag size="small" type="success">正确答案</el-tag>
                    </div>
                    <span v-if="item.type_cate === tmType.panduan" class="flex-1 tm-text"
                          v-html="item.right_answer?item.right_answer === 'A'?'对':'错':'无答案'"></span>
                    <span v-else-if="item.type_cate === tmType.danxuan" class="flex-1 tm-text"
                          v-html="item.right_answer"></span>
                    <span v-else-if="item.type_cate === tmType.duoxuan" class="flex-1 tm-text"
                          v-html="strDuoXuan(JSON.parse(item.right_answer))"></span>
                  </div>
                  <div class="flex">
                    <div class="w-80 mini-height40 text-center">
                      <el-tag size="small" type="info">名师解析</el-tag>
                    </div>
                    <span class="flex-1 tm-text font-parse c-333" v-html="item.parse?item.parse:'暂无解析'"></span>
                  </div>
                  <div class="flex" v-if="item.video">
                    <div class="w-80 mini-height40 text-center">
                      <el-tag size="small" type="info">视频解析</el-tag>
                    </div>
                    <span class="flex-1 tm-text">
                    <el-button size="mini" type="primary" icon="el-icon-view"
                               @click="playVideo(item.video)">视频解析</el-button>
                  </span>
                  </div>
                </div>
              </div>
              <!--不定项、配伍、综合-->
              <div v-if="tm[0].type_cate === 5 || tm[0].type_cate === 6 ||tm[0].type_cate === 7">
                <a :name="tm[0].type"></a>
                <div class="pb-15 pt-15 pl-15 line-height25 f16 c-blue">
                  <i class="el-icon-menu"></i>
                  <span v-if="tm[0].type_name">
                    {{tm[0].type_name}}
                  </span>
                  <span v-else>
                    <span v-if="tm[0].type_cate ===5">不定项选择题</span>
                    <span v-if="tm[0].type_cate ===6">综合题</span>
                    <span v-if="tm[0].type_cate ===7">配伍题</span>
                    </span>
                </div>
                <div v-for="(item, index) in tm" :key="index" class="border-bottom-dash mb-10">
                  <div class="flex">
                    <div class="w-80 mini-height40 text-center">
                      <el-tag size="small" class="mini-width66">题目{{ index + 1 }}</el-tag>
                    </div>
                    <span class="flex-1 tm-text c-333 flex">
                    <!--<span>{{ index + 1 }}、</span><span v-html="item.title"></span>-->
                    <span v-html="item.material"></span>
                  </span>
                  </div>
                  <div v-for="(childItem, i) in item.sub_tk" :key="i">
                    <div class="flex">
                      <!--<div class="w-80 mini-height40 text-center"></div>-->
                      <span class="flex-1 tm-text c-333 flex" style="margin-left: 80px">
                        <span>{{ i + 1 }}、</span><span v-html="childItem.title"></span>
                      </span>
                    </div>
                    <div class="flex">
                      <div class="w-80 mini-height40 text-center">
                        <el-tag size="small" type="warning">您的答案</el-tag>
                      </div>
                      <!--<span class="flex-1 tm-text c-red" v-html="userAnswer[item.id]"></span>-->
                      <span v-if="tableData.length >= 0">
                        <span v-if="item.type_cate !== tmType.bdxxuanze" class="flex-1 tm-text c-blue" style="display: inline-block"
                              v-html="userAnswer[item.number]?userAnswer[item.number][i]?userAnswer[item.number][i]['val']?userAnswer[item.number][i]['val']:'未作答':'未作答':'未作答'">
                        </span>
                        <span v-else  style="display: inline-block"
                              :class="['flex-1 tm-text',userAnswer[item.number]?userAnswer[item.number][i]?userAnswer[item.number][i]['val']?(JSON.stringify(userAnswer[item.number][i]['val']) === JSON.stringify(item.right_answer[i])?'c-blue':'c-red'):'':'':'']"
                              v-html="userAnswer[item.number]?userAnswer[item.number][i]?userAnswer[item.number][i]['val']?strDuoXuan(userAnswer[item.number][i]['val']):'未作答':'未作答':'未作答'">
                        </span>
                      </span>
                    </div>
                    <div class="flex" v-if="item.type_cate === tmType.bdxxuanze">
                      <div class="w-80 mini-height40 text-center">
                        <el-tag size="small" type="success">正确答案</el-tag>
                      </div>
                      <span class="flex-1 tm-text"
                            v-html="strDuoXuan(item.right_answer[i])"></span>
                    </div>
                    <div class="flex">
                      <div class="w-80 mini-height40 text-center">
                        <el-tag size="small" type="info">名师解析</el-tag>
                      </div>
                      <span class="flex-1 tm-text font-parse c-333" v-html="childItem.parse?childItem.parse:'暂无解析'"></span>
                    </div>
                    <div class="flex" v-if="item.video">
                      <div class="w-80 mini-height40 text-center">
                        <el-tag size="small" type="info">视频解析</el-tag>
                      </div>
                      <span class="flex-1 tm-text">
                        <el-button size="mini" type="primary" icon="el-icon-view"
                                   @click="playVideo(item.video)">视频解析</el-button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="aside-nav">
      <div v-for="(tm, index) in regroupAllExam" :key="index" class="mb-5">
        <a :href="'#'+ tm[0].type">
          <el-button plain class="nav-button-width" v-if="tm[0].type_name">{{tm[0].type_name}}</el-button>
          <el-button plain class="nav-button-width" v-else>
            <span v-if="tm[0].type_cate === 1">单选题</span>
            <span v-if="tm[0].type_cate === 2">多选题</span>
            <span v-if="tm[0].type_cate === 3">判断题</span>
            <span v-if="tm[0].type_cate === 4">简答题</span>
            <span v-if="tm[0].type_cate === 5">不定项选择题</span>
            <span v-if="tm[0].type_cate === 6">综合题</span>
            <span v-if="tm[0].type_cate === 7">配伍题</span>
          </el-button>
        </a>
      </div>
      <div class="mb-5"><a href="#top">
        <el-button plain class="nav-button-width">顶层</el-button>
      </a></div>
    </div>
    <el-dialog
      title="视频解析"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <div id="showVideo" style="width: 100%;height: 500px;"></div>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ztparse',
  data () {
    return {
      status: '', // 判断是否答过卷
      percent: 0,
      tableData: [],
      allData: {},
      paperInfo: {course: {title: ''}},
      allTiMu: [],
      regroupAllExam: [],
      userAnswer: {},
      dialogVisible: false,
      videoPlayer: null,
      courseType: window.tag
    }
  },
  computed: {
    ...mapState(['tmType'])
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      // ${this.$route.params.id}
      window.axios.get(`api/mokao/record/${this.$route.params.id}`).then(res => {
        if (res.data.status) {
          // this.status = res.data.resultData.status
          // console.log(res.data.resultData)
          this.allData = res.data.resultData // 全部信息
          if (res.data.resultData.record) {
            this.tableData = res.data.resultData.record.statis // 得分状态
            this.percent = (this.allData.record.score * 5) / (this.allData.paper.fullmarks)
            this.userAnswer = res.data.resultData.record.record_new
          } else {
            this.tableData = []
            this.percent = ''
            this.userAnswer = {}
          }
          this.paperInfo = res.data.resultData.paper // 试卷信息
          this.allTiMu = res.data.resultData.allTkInfo // 题目信息
          if (this.regroupAllExam.length < 1) {
            this.regroupTiMu()
          }
        } else {
          this.$message.error('error')
        }
      })
    },
    // 重组题目 按type分类
    regroupTiMu () {
      let tmp = {}
      for (let i in this.allTiMu) {
        if (typeof this.allTiMu[i] === 'object') {
          if (tmp[this.allTiMu[i].type]) {
            tmp[this.allTiMu[i].type].push(this.allTiMu[i])
          } else {
            tmp[this.allTiMu[i].type] = []
            tmp[this.allTiMu[i].type].push(this.allTiMu[i])
          }
        }
      }
      this.regroupAllExam = tmp
    },
    /* eslint-disable */
    playVideo(vid) {
      window.axios.post('api/mokao/videoH5 ', {vid: vid}).then(res => {
        if (res.data.status === 1) {
          this.videoPlayer = polyvObject('#showVideo').videoPlayer({
            'width': '100%',
            'height': '100%',
            'forceH5': true,
            'playsafe': res.data.resultData,
            'vid': vid
          });
        } else {
          this.videoPlayer = polyvObject('#showVideo').videoPlayer({
            'width': '100%',
            'height': '100%',
            'vid': vid
          });
        }
      }).catch(() => {
        this.videoPlayer = polyvObject('#showVideo').videoPlayer({
          'width': '100%',
          'height': '100%',
          'vid': vid
        })
      })
      // player.j2s_resumeVideo()
      this.dialogVisible = true
    },
    strDuoXuan(objDuoXuan) {
      if (objDuoXuan && objDuoXuan.length > 0) {
        let arrTpm = []
        let strTpm = ''
        for (let i in objDuoXuan) {
          arrTpm.push(objDuoXuan[i])
        }
        arrTpm = arrTpm.sort()
        strTpm = arrTpm.toString()
        return strTpm
      } else {
        return objDuoXuan
      }
    },
    strSortDuoXuan(str) {
      let tmpArr = []
      let tmpStr = ''
      tmpArr = str.split(',')
      tmpStr = tmpArr.sort().toString()
      return tmpStr
    },
    handleClose() {
      if (this.videoPlayer !== null && this.videoPlayer !== 'undefined') {
        this.videoPlayer.j2s_pauseVideo()
      }
      this.videoPlayer = null
      this.dialogVisible = false
    },
    exit() {
      this.$router.push('/')
    }
  }
}
</script>
<style>
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }

  .main .el-table__header th {
    text-align: center !important;
  }
  .w-80{
    width: 80px;
  }
  .mini-height40{
    min-height: 40px;
  }
  .text-center{
    text-align: center;
  }
</style>
<style rel="stylesheet/css" lang="css" scoped>
  .border-bottom-dash {
    border-bottom: dashed 1px #E6E6E6;
  }

  .nav-button-width {
    width: 112px;
  }

  .page-component_scroll {
    height: 100% !important;
    overflow-x: hidden;
  }

  .mini-height {
    min-height: 620px;
  }

  .ztparse {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .header {
    width: 100%;
    height: 50px;
    background-color: #447ED9;
    color: #ffffff;
    font-size: 18px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .main {
    box-sizing: border-box;
    margin: 0 auto;
    width: 1100px;
    padding: 20px;
  }

  .tm-option .option {
    padding: 10px 0;
  }

  .aside-nav {
    position: absolute;
    bottom: 40px;
    right: 90px;
  }
</style>
