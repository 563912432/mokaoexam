<template>
  <div class="unrunningbtn">
    <div class="margin-top-10" style="margin-bottom: 20px;">
      <div style="color: #fff;text-align: center;">考试将于 {{timeChange(currentExam.start)}} 开始</div>
    </div>
    <div v-if="source == 1" class="margin-top-10" style="margin-bottom: 50px;">
      <el-button v-if="currentExam.appointed===1" type="primary" round class="button purple">您已预约</el-button>
      <el-button v-else type="primary" @click="appoint" round class="button green">预约提醒</el-button>
    </div>
    <div v-else class="margin-top-10" style="margin-bottom: 50px;">
      <el-button type="primary" round class="button green">未开始</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'unrunningbtn',
  data () {
    return {}
  },
  props: ['currentExam'],
  computed: {
    source () {
      return parseInt(window.userInfo.source)
    }
  },
  methods: {
    toLogin () {
      location.href = window.host + 'login?fromurl=' + window.host + encodeURI('mkindex/' + window.tag)
    },
    appoint () {
      // 判断是否登陆，没登陆的跳转到登陆页面
      if (!window.userInfo.key) {
        this.$message.warning('请先登录')
        setTimeout(() => {
          this.toLogin()
        }, 1000)
      } else {
        // 提交请求
        window.axios.post('api/mokao/appoint/' + this.currentExam.id).then(res => {
          if (res.data.status) {
            this.currentExam.appointed = 1
            this.$message.success('您已预约成功')
          } else {
            this.$message.error('预约失败')
          }
        })
      }
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
    }
  }
}
</script>
<style>
.unrunningbtn{
  text-align: center;
}
</style>
