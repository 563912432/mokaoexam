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
              <span class="flex-1 tm-text c-red" v-html="item.title"></span>
            </div>
            <div class="flex">
              <div class="w-80 text-center"><el-tag size="small">选项</el-tag></div>
              <span class="flex-1 tm-option">
                <span v-for="(value, index) in item.option" :key="index" class="flex flex-align-center">
                  <span v-html="toLetter(index) + '、' + value"></span>
                </span>
              </span>
            </div>
            <div>
              <div class="mt-10 mb-12">
                <i class="el-icon-edit"></i> <span>答题区</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <div class="answer">
          <el-checkbox-group v-model="answer">
            <el-checkbox-button v-for="(option, index) in answerOption" :label="option" :key="index">{{option}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </el-tabs>
    </div>
    </el-scrollbar>
  </div>
</template>

<script>
// eslint-disable-next-line
export default {
  name: 'ztjianda',
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
      answer: [],
      activeName: '0',
      tabIndex: '0',
      handleTiMu: [],
      timer: null,
      answerOption: ['A', 'B', 'C', 'D']
    }
  },
  created () {
    this.initTimu()
    this.findAnswer(0)
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    initTimu () {
      let tmpArr = []
      if (this.timu.title.length > 0) {
        for (let i in this.timu.title) {
          tmpArr.push({title: this.timu.title[i]})
        }
      }
      if (this.timu.option.length > 0) {
        for (let i in this.timu.option) {
          tmpArr[i].option = this.timu.option[i]
        }
      }
      this.handleTiMu = tmpArr
    },
    handleClick (tab, event) {
      this.tabIndex = tab.index
      this.findAnswer(tab.index)
    },
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
        this.answer = []
      }
    }
  },
  watch: {
    answer (newAnswer) {
      let data = this.$store.state.examState.userAnswer
      let change = false
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === this.timu.number) {
          data[i].val[this.tabIndex] = {key: this.tabIndex, val: newAnswer}
          change = true
        }
      }
      if (!change) {
        // 初始化[{},{}]
        data.push({
          id: this.timu.number,
          val: [
            {key: this.tabIndex, val: newAnswer}
          ]
        })
      }
      this.$store.commit('saveAnswer', data)
    },
    timu () {
      this.answer = []
      // this.handleTiMu = this.timu.title
      this.initTimu()
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
  .answer .el-checkbox-button__inner{
    padding: 25px 29px!important;
    font-size: 24px;
    border: solid 1px #dcdfe6!important;
    box-shadow: none!important;
    border-radius: 50%;
    margin-right: 25px
  }
  .answer .el-checkbox-button:first-child .el-checkbox-button__inner{
    border-radius: 50%!important;
  }
  .answer .el-checkbox-button:last-child .el-checkbox-button__inner{
    border-radius: 50%!important;
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
  .answer{
    margin: 20px 0 0 50px;
  }
</style>
