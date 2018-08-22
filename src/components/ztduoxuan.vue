<template>
  <div class="duoxuan flex-1 flex flex-column">
    <el-scrollbar class="page-component_scroll">
      <div class="duoxuan-top mt-15 pd-left-right-10">
        <div class="mb-12 pl-15 line-height25 f14">
          <!--（本类题共{{duoxuanTi.tid.length}}个小题，每小题{{duoxuanTi.score}}分，共{{(duoxuanTi.tid.length) * (duoxuanTi.score) }}分，每小题备选答案中，有两个或两个以上符合题意的正确答案，每小题全部选对得满分，多选、少选、错选、不选均不得分。）-->
          <i class="el-icon-menu"></i> <span>{{duoxuanTi.remark?duoxuanTi.remark:'多选题'}}</span>
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
      <div class="answer">
        <el-checkbox-group v-model="answer">
          <el-checkbox-button v-for="(option, index) in answerOption" :label="option" :key="index">{{option}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ztduoxuan',
  props: {
    timu: {
      type: Object,
      require: true
    },
    duoxuanTi: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      chose: false,
      answerOption: ['A', 'B', 'C', 'D'],
      answer: [],
      options: []
    }
  },
  created () {
    this.findAnswer()
    this.options = JSON.parse(this.timu.option)
  },
  methods: {
    choseAnswer (option) {
      this.answer = option
    },
    findAnswer () {
      let data = this.$store.state.examState.userAnswer
      for (let i in data) {
        if (this.timu.number === data[i].id) {
          // console.log(data[i])
          this.answer = data[i]['val']
        }
      }
    }
  },
  watch: {
    answer (newAnswer) {
      let data = this.$store.state.examState.userAnswer
      let change = false
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === this.timu.number) {
          data[i].val = newAnswer
          change = true
        }
      }
      if (change === false) {
        data.push({id: this.timu.number, val: newAnswer})
      }
      // 如果清空选项，删除数组的最后一个元素
      if (newAnswer.length === 0) {
        data.pop()
      }
      this.$store.commit('saveAnswer', data)
      // console.log(this.$store.state.examState.userAnswer)
    },
    timu () {
      this.answer = []
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
  .duoxuan-top{
    height: 50%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .answer{
    margin: 50px 0 0 50px;
  }
  .answer-button{
    width: 80px;
    height: 80px;
    font-size: 24px!important;
    font-weight: 400;
    margin-right: 10px;
  }
  .tm-option .option{
    padding: 10px 0;
  }
</style>
