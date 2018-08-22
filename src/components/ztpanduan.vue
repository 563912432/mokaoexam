<template>
  <div class="panduan flex-1 flex flex-column">
    <el-scrollbar class="page-component_scroll">
      <div class="panduan-top mt-15 pd-left-right-10">
        <div class="mb-12 pl-15 line-height25 f14">
          <!--（本类题共{{panduanTi.tid.length}}个小题，每小题{{panduanTi.score}}分，共{{(panduanTi.tid.length) * (panduanTi.score) }}分，每小题备选答案中，只有一个符合题意的正确答案，多选、错选、不选均不得分。）-->
          <i class="el-icon-menu"></i> <span>{{panduanTi.remark?panduanTi.remark:'判断题'}}</span>
        </div>
        <div class="flex">
          <div class="w-80 text-center"><el-tag size="small">题目</el-tag></div>
          <span class="flex-1 tm-text c-red" v-html="timu.title"></span>
        </div>
      </div>
    </el-scrollbar>
    <div style="height:5px;width: 100%;background-color: #F2F6FC"></div>
    <div class="flex-1 pd-left-right-10">
      <div class="mt-10 mb-12 pl-15">
        <i class="el-icon-edit"></i> <span>答题区</span>
      </div>
      <div class="panduan-answer">
        <el-radio-group v-model="answer">
          <el-radio-button :label="answerOption.A" @click="choseAnswer(answerOption.A)"><i class="el-icon-check"></i></el-radio-button>
          <el-radio-button :label="answerOption.B" @click="choseAnswer(answerOption.B)"><i class="el-icon-close"></i></el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ztpanduan',
  props: {
    timu: {
      type: Object,
      require: true
    },
    panduanTi: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      chose: false,
      answerOption: {
        A: 'A',
        B: 'B'
      },
      answer: ''
    }
  },
  created () {
    this.findAnswer()
  },
  methods: {
    choseAnswer (option) {
      this.answer = option
    },
    findAnswer () {
      let data = this.$store.state.examState.userAnswer
      for (let i in data) {
        if (this.timu.number === data[i].id) {
          this.answer = data[i]['val']
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
      this.answer = []
      this.findAnswer()
    }
  }
}
</script>
<style>
  .el-scrollbar__wrap{
    overflow-x: hidden!important;
  }
  .panduan-answer .el-radio-button__inner{
    padding: 25px 25px!important;
    font-size: 24px;
    border: solid 1px #dcdfe6!important;
    box-shadow: none!important;
    border-radius: 50%;
    margin-right: 25px
  }
  .panduan-answer .el-radio-button:first-child .el-radio-button__inner{
    border-radius: 50%!important;
  }
  .panduan-answer .el-radio-button:last-child .el-radio-button__inner{
    border-radius: 50%!important;
  }
</style>
<style scoped>
  .page-component_scroll{
    height: 50%!important;
    overflow-x: hidden;
  }
  .panduan-top{
    height: 50%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .panduan-answer{
    margin: 50px 0 0 50px;
  }
</style>
