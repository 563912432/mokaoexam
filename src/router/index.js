import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import exam from '@/components/exam'
import ztparse from '@/components/ztparse'
import score from '@/components/score'
import scorechuji from '@/components/scorechuji'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        needLogin: true
      },
      component: index
    },
    {
      path: '/exam/:id',
      name: 'exam',
      meta: {
        needLogin: true
      },
      component: exam
    },
    {
      path: '/ztparse/:id',
      name: 'ztparse',
      meta: {
        needLogin: true
      },
      component: ztparse
    },
    {
      path: '/score/:id/:index',
      name: 'score',
      meta: {
        needLogin: true
      },
      component: score
    },
    {
      path: '/scorechuji/:id/:index',
      name: 'scorechuji',
      meta: {
        needLogin: true
      },
      component: scorechuji
    }
  ]
})
