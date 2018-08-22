<template>
  <div class="djs c-red">
    剩余时间: {{ leftTime }}
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'djs',
  props: {
    time: {
      type: Number,
      required: true
    }
  },
  watch: {
    time (value) {
      let cookTime = window.cookie.get('leftTime')
      if (cookTime) {
        this.initTime = cookTime
      } else {
        this.initTime = value
      }
      this.calcLeftTime()
      this.setCookieTime()
    }
  },
  destroyed () {
    clearInterval(this.timer)
    clearInterval(this.cookieTime)
  },
  data () {
    return {
      text: '',
      leftTime: '00 : 00 : 00',
      timer: null,
      initTime: 0,
      cookieTime: null,
      oTime: 0
    }
  },
  methods: {
    calcLeftTime () {
      this.oTime = this.initTime
      this.timer = setInterval(() => {
        this.oTime--
        this.leftTime = this.transSeconds(this.oTime, this)
      }, 1000)
    },
    transSeconds (time, obj) {
      let day = 0
      let hour = 0
      let minute = 0
      let second = 0
      if (time > 0) {
        day = Math.floor(time / (60 * 60 * 24))
        hour = Math.floor(time / (60 * 60)) - (day * 24)
        minute = Math.floor(time / 60) - (day * 24 * 60) - (hour * 60)
        second = Math.floor(time - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60))
      }
      if (time === 300) {
        this.$message.warning('还有最后5分钟，加油哦')
      }
      if (time === 0) {
        this.$message.error('时间到了，即将交卷……')
        setTimeout(() => {
          this.$parent.autoSubmit()
        }, 1000)
      }
      // if (time > 300) {
      //   this.$parent.autoSubmit()
      // }
      if (hour <= 9) hour = '0' + hour
      if (minute <= 9) minute = '0' + minute
      if (second <= 9) second = '0' + second
      return (hour + ' : ' + minute + ' : ' + second)
    },
    setCookieTime () {
      // 每秒往cookie里面存一次剩余时间
      this.cookieTime = setInterval(() => {
        window.cookie.set('leftTime', this.oTime)
      }, 1000)
    }
  }
}
</script>
