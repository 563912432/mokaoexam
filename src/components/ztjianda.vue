<template>
  <div class="jianda flex-1 flex flex-column">
    <el-scrollbar class="page-component_scroll">
      <div class="jianda-top mt-15 pd-left-right-10">
        <div class="mb-12 pl-15 line-height25 f14">
          <!--（本类题共{{jiandaTi.tid.length}}个小题，每小题{{jiandaTi.score}}分，共{{(jiandaTi.tid.length) * (jiandaTi.score) }}分，每小题备选答案中，只有一个符合题意的正确答案，多选、错选、不选均不得分。）-->
          <i class="el-icon-menu"></i> <span>{{jiandaTi.remark?jiandaTi.remark:'简答题'}}</span>
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
      <div class="jianda-answer">
        <el-input type="textarea" :rows="10" maxlength="800" placeholder="请输入答题内容" resize="none" v-model="answer"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
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
      answer: ''
    }
  },
  created () {
    this.findAnswer()
  },
  methods: {
    findAnswer () {
      let data = this.$store.state.examState.userAnswer
      for (let i in data) {
        if (this.timu.id === data[i].id) {
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
          if (data[i].id === this.timu.id) {
            data[i].val = newAnswer
            change = true
          }
        }
        if (!change) {
          data.push({ id: this.timu.id, val: newAnswer })
        }
        this.$store.commit('saveAnswer', data)
      }
    },
    timu () {
      this.answer = ''
      this.findAnswer()
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
