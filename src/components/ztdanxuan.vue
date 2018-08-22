<template>
  <div class="danxuan flex-1 flex flex-column">
    <el-scrollbar class="page-component_scroll">
      <div class="danxuan-top mt-15 pd-left-right-10">
        <div class="mb-12 pl-15 line-height25 f14">
          <!--（本类题共{{danxuanTi.tid.length}}个小题，每小题{{danxuanTi.score}}分，共{{(danxuanTi.tid.length) * (danxuanTi.score) }}分，每小题备选答案中，只有一个符合题意的正确答案，多选、错选、不选均不得分。）-->
          <i class="el-icon-menu"></i> <span>{{danxuanTi.remark?danxuanTi.remark:'单选题'}}</span>
        </div>
        <div class="flex">
          <div class="w-80 text-center"><el-tag size="small">题目</el-tag></div>
          <span class="flex-1 tm-text c-red" v-html="timu.title"></span>
        </div>
        <div class="flex">
          <div class="w-80 text-center"><el-tag size="small">选项</el-tag></div>
          <span class="flex-1 tm-option">
            <span v-for="(option, index) in options" :key="index" class="option flex flex-align-center">
              {{ toLetter(index) }}、 <span v-text="option"></span>
            </span>
          </span>
        </div>
      </div>
    </el-scrollbar>
    <div style="height:5px;width: 100%;background-color: #F2F6FC"></div>
    <div class="flex-1 pd-left-right-10">
      <div class="mt-10 mb-12 pl-15">
        <i class="el-icon-edit"></i> <span>答题区</span>
      </div>
      <div class="danxuan-answer">
        <el-radio-group v-model="answer">
          <el-radio-button  autocomplete="false" v-for="(option, index) in answerOption" :key="index" :label="option" @click="choseAnswer(option)"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ztdanxuan',
  props: {
    timu: {
      type: Object,
      require: true
    },
    danxuanTi: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      chose: false,
      answerOption: ['A', 'B', 'C', 'D'],
      answer: '',
      options: []
    }
  },
  created () {
    // console.log(this.timu)
    this.findAnswer()
    this.options = JSON.parse(this.timu.option)
  },
  destroyed () {
    this.answer = ''
  },
  methods: {
    choseAnswer (option) {
      this.answer = option
    },
    findAnswer () {
      let data = this.$store.state.examState.userAnswer
      if (data.length > 0) {
        for (let i in data) {
          if (this.timu.number === data[i].id) {
            this.answer = data[i]['val']
          }
        }
      }
    }
  },
  watch: {
    answer (newAnswer) {
      if (newAnswer) {
        let data = this.$store.state.examState.userAnswer
        let change = false
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === this.timu.number) {
            data[i].val = newAnswer
            change = true
          }
        }
        if (!change) {
          data.push({ id: this.timu.number, val: newAnswer })
        }
        this.$store.commit('saveAnswer', data)
      }
    },
    timu () {
      this.answer = ''
      this.options = JSON.parse(this.timu.option)
      this.findAnswer()
    }
  }
}
</script>
<style>
  .el-scrollbar__wrap{
    overflow-x: hidden!important;
  }
  .danxuan-answer .el-radio-button__inner{
    padding: 25px 29px!important;
    font-size: 24px;
    border: solid 1px #dcdfe6!important;
    box-shadow: none!important;
    border-radius: 50%;
    margin-right: 25px
  }
  .danxuan-answer .el-radio-button:first-child .el-radio-button__inner{
    border-radius: 50%!important;
  }
  .danxuan-answer .el-radio-button:last-child .el-radio-button__inner{
    border-radius: 50%!important;
  }
</style>
<style scoped>
  .page-component_scroll{
    height: 50%!important;
    overflow-x: hidden;
  }
  .danxuan-top{
    height: 50%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .danxuan-answer{
    margin: 50px 0 0 50px;
  }
  .tm-option .option{
    padding: 10px 0;
  }
</style>
