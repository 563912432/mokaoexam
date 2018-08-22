import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 中级相关科目
    subject: {
      kuaijishiwu: 1,
      jingjifa: 2,
      caiwuguanli: 3
    },
    course: {
      kuaijishiwu: 23,
      jingjifa: 24,
      caiwuguanli: 25
    },
    /*
    * 做题相关
    */
    // 题目类型映射
    tmType: {
      danxuan: 1,
      duoxuan: 2,
      panduan: 3,
      jianda: 4,
      bdxxuanze: 5,
      bdxjianda: 6,
      peiwu: 7
    },
    // 当前试卷信息
    examState: {
      // 学员做题答案
      userAnswer: []
    }
  },
  getters: {
    host () {
      return window.host
    },
    userAnswer (state) {
      let data = state.examState.userAnswer
      if (data && data.length > 0) {
        return data.filter(v => {
          if (typeof v.val === 'object') {
            return v.val.length > 0
          }
          return v.val !== null
        })
      }
      return []
    }
  },
  mutations: {
    // 保存做题答案
    saveAnswer (state, data) {
      state.examState.userAnswer = data
    },
    // 清除学员做题答案
    clearUserAnswer (state) {
      state.examState.userAnswer = []
    }
  },
  actions: {}
})

export default store
