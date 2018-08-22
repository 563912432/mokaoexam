<template>
  <div class="jianda flex-1 flex flex-column">
    <el-scrollbar class="page-component_scroll">
      <div class="jianda-top mt-15 pd-left-right-10">
        <div class="mb-12 pl-15 line-height25 f14">
          <!--（本类题共{{jiandaTi.tid.length}}个小题，每小题{{jiandaTi.score}}分，共{{(jiandaTi.tid.length) * (jiandaTi.score) }}分，每小题备选答案中，只有一个符合题意的正确答案，多选、错选、不选均不得分。）-->
          <i class="el-icon-menu"></i> <span>{{jiandaTi.remark?jiandaTi.remark:''}}</span>
        </div>
        <div class="flex">
          <div class="w-80 text-center"><el-tag size="small">材料</el-tag></div>
          <span class="flex-1 tm-text" v-html="timu.material"></span>
        </div>
      </div>
    </el-scrollbar>
    <div style="height:5px;width: 100%;background-color: #F2F6FC"></div>
    <el-scrollbar class="page-component_scroll">
      <div class="pd-10" style="height: 50%;box-sizing: border-box;overflow-y: auto">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in handleTiMu" :key="index" :name="index + ''" :label="'第' + (index + 1) + '题'">
          <div class="flex flex-column">
            <div class="flex">
              <div class="w-80 text-center"><el-tag size="small">题目</el-tag></div>
              <span class="flex-1 tm-text c-red" v-html="item"></span>
            </div>
            <div>
              <div class="mt-10 mb-12">
                <i class="el-icon-edit"></i> <span>答题区</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <div class="jianda-answer">
          <!--<el-input type="textarea" :rows="3" maxlength="800" placeholder="主观题暂不进行评分，请在交卷后查看本题解析" resize="none" v-model="answer"></el-input>-->
          <UE :defaultMsg='answer' :config='config' ref="ue"></UE>
        </div>
        <!--<div class="jianda-answer">-->
          <!--<el-button type="primary" size="mini" @click="saveAnswer(tabIndex)">保存答案</el-button>-->
        <!--</div>-->
      </el-tabs>
    </div>
    </el-scrollbar>
  </div>
</template>

<script>
// eslint-disable-next-line
// import VueUeditorWrap from 'vue-ueditor-wrap'
import UE from '../components/ue'
export default {
  name: 'ztjianda',
  components: {
    UE
  },
  props: {
    timu: {
      type: Object,
      require: true
    },
    jiandaTi: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      chose: false,
      answer: '',
      activeName: '0',
      tabIndex: '0',
      handleTiMu: [],
      config: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        // serverUrl: 'http://api.demo.com/ueditor/upload',
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: './static/UEditor/',
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 关闭自动保存
        enableAutoSave: false,
        toolbars: [
          ['fullscreen', 'source', 'undo', 'redo', 'bold', 'kityformula']
        ]
      },
      timer: null
    }
  },
  created () {
    this.findAnswer(0)
    this.handleTiMu = this.timu.title
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.answer = this.$refs.ue.getUEContent()
      let data = this.$store.state.examState.userAnswer
      let change = false
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === this.timu.number) {
          data[i].val[this.tabIndex] = {key: this.tabIndex, val: this.answer}
          change = true
        }
      }
      if (!change) {
        // 初始化[{},{}]
        data.push({
          id: this.timu.number,
          val: [
            {key: this.tabIndex, val: this.answer}
          ]
        })
      }
      this.$store.commit('saveAnswer', data)
      // this.$message.success('保存成功')
    }, 1000)
  },
  methods: {
    findAnswer (index) {
      let data = this.$store.state.examState.userAnswer
      let bool = false
      if (data.length > 0) {
        for (let i in data) {
          if (this.timu.number === data[i].id) {
            for (let j in data[i]['val']) {
              if (parseInt(data[i]['val'][j]['key']) === parseInt(index)) {
                this.answer = data[i]['val'][j]['val']
                bool = true
              }
            }
          }
        }
      }
      if (bool === false) {
        this.answer = ''
      }
      if (this.$refs.ue) {
        this.$refs.ue.setUEContent(this.answer)
      }
    },
    handleClick (tab, event) {
      this.tabIndex = tab.index
      this.findAnswer(tab.index)
    },
    saveAnswer (index) {
      this.answer = this.$refs.ue.getUEContent()
      if (this.answer !== '') {
        let data = this.$store.state.examState.userAnswer
        let change = false
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === this.timu.number) {
            data[i].val[index] = {key: index, val: this.answer}
            change = true
          }
        }
        if (!change) {
          // 初始化[{},{}]
          data.push({
            id: this.timu.number,
            val: [
              {key: index, val: this.answer}
            ]
          })
        }
        this.$store.commit('saveAnswer', data)
        this.$message.success('保存成功')
      } else {
        this.$message.error('请先填写答案')
      }
    }
  },
  watch: {
    // answer (newAnswer) {
    //   console.log('12312312')
    // },
    timu () {
      this.answer = ''
      this.handleTiMu = this.timu.title
      this.findAnswer(0)
      this.activeName = '0'
      this.tabIndex = '0'
    }
  }
}
</script>
<style>
  .el-scrollbar__wrap{
    overflow-x: hidden!important;
  }
</style>
<style scoped>
  .page-component_scroll{
    height: 50%!important;
    overflow-x: hidden;
  }
  .jianda-top{
    height: 50%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .jianda-answer{
    padding: 10px 50px;
  }
</style>
