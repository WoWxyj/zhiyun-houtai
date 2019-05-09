import Vue from 'vue'
import Router from 'vue-router'
import PullTo from 'vue-pull-to'
import wx from 'weixin-js-sdk'
import login from '../components/login' //登录
import bindAccount from '../components/bindAccount' //第三方授权后绑定手机号

// qq回调地址
import redirectshare from '../views/qqlogin/shareindex'

import qqlogin from '../views/qqlogin/index'
// 首页入口
import index from '../views/index/index'
import newcutloan from '../views/index/newcutloan' //新口子专区
import search from '../views/index/search' //搜索
import details from '../views/index/details' //产品详情
import message from '../views/index/message'
import city from '../views/index/city'

// 贷款大全
import loan from '../views/loan/loan' //贷款大全
import accurateRecom from '../views/loan/accurateRecom' //精准推荐
import accurateRecomTwo from '../views/loan/accurateRecomTwo' //精准推荐页面2
import accurateRecomThree from '../views/loan/accurateRecomThree' //精准推荐页面3
import applyResults from '../views/loan/applyResults' //申请结果页面
import ApplyProgress from '../views/loan/ApplyProgress' //申请结果页面
import assessment from '../views/loan/assessment' //额度测评
import assessmentData from '../views/loan/assessmentData' //完善资料额度测评

//信用卡
import card from '../views/card/card' //信用卡

// 个人中心入口
import center from '../views/center/center' //个人中心
import share from '../views/center/share' //分享
import teasing from '../views/center/teasing' //吐槽
import bowerLoan from '../views/center/bowerLoan' //贷款浏览记录
import applyLoan from '../views/center/applyLoan' //贷款申请记录
import cardbower from '../views/center/cardbower' //贷款浏览记录
import blackList from '../views/center/blackList' //黑名单检测
import blackListMobile from '../views/center/blackListMobile' //查查我的额度
import blackListReport from '../views/center/blackListReport' //黑名单查询报告
import attention from '../views/center/attention'  //关注公众号
import blackPay from '../views/center/blackPay'  //关注公众号
import setting from '../views/center/setting'  //设置

import none from '../views/none/none'


//首页入口
// import channeloneindex from '../views/index/channeloneindex'




//WIKIWIKI贷款推广页面
import promotion from '../views/promotion/motion'
import zhizipro from '../views/zhizipro/index'
import zhiziapply from '../views/zhiziapply/index'
import zhiziloan from '../views/zhiziloan/index'

import puhuipromotion from '../views/puhuiloan/puhuiloan'

//空页面  无网络页面
import lookno from '../views/none/lookno'

import store from '../store' //贷款申请记录
Vue.use(Router)
let route = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: index,
    },
    {
      path: '/index',
      name: '首页',
      component: index,
    },
    // {
    //   path: '/channeloneindex',
    //   name: '首页',
    //   component: channeloneindex
    // },
    {
      path: '/loan',
      name: '贷款大全',
      component: loan
    },
    {
      path: '/card',
      name: '信用卡',
      component: card
    },
    {
      path: '/center',
      name: '个人中心',
      component: center,
    },
    {
      path: '/setting',
      name: '设置',
      component: setting,
    },
    {
      path: '/usercenter',
      name: '个人中心',
      component: center,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/city',
      name: '选择城市',
      component: city
    },
    {
      path: '/newcutloan',
      name: '新口子专区',
      component: newcutloan
    },
    {
      path: '/search',
      name: '搜索',
      component: search
    },
    {
      path: '/teasing',
      name: '吐槽',
      component: teasing,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/blackList',
      name: '黑名单检测',
      component: blackList,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/blackListMobile',
      name: '查查我的额度',
      component: blackListMobile,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/blackListReport',
      name: '黑名单查询报告',
      component: blackListReport,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/blackPay',
      name: '支付',
      component: blackPay,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/attention',
      name: '关注公众号',
      component: attention
    },
    {
      path: '/details',
      name: '详情',
      component: details
    },
    {
      path: '/applyLoan',
      name: '申请记录',
      component: applyLoan,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/bowerLoan',
      name: '浏览记录',
      component: bowerLoan,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/cardbower',
      name: '信用卡浏览记录',
      component: cardbower,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },

    {
      path: '/login',
      name: '登录',
      component: login
    },
    {
      path: '/qqlogin',
      name: 'QQ登录',
      component: qqlogin
    },
    {
      path: '/bindAccount',
      name: '绑定手机号',
      component: bindAccount
    },
    {
      path: '/accurateRecom',
      name: '精准推荐',
      component: accurateRecom,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/accurateRecomTwo',
      name: '精准推荐页面2',
      component: accurateRecomTwo
    },
    {
      path: '/accurateRecomThree',
      name: '精准推荐页面3',
      component: accurateRecomThree
    },
    {
      path: '/applyResults',
      name: '申请结果',
      component: applyResults
    },
    {
      path: '/ApplyProgress',
      name: '申请进度',
      component: ApplyProgress
    },
    {
      path: '/assessment',
      name: '额度测评',
      component: assessment
    },
    {
      path: '/assessmentData',
      name: '完善资料额度测评',
      component: assessmentData,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/message',
      name: '消息',
      component: message,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/lookno',
      name: '首页',
      component: lookno,
    },
    {
      path: '/share',
      name: '分享',
      component: share,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/redirectshare',
      name: '跳转中',
      component: redirectshare,
    },

    {
      path: '/none',
      name: 'WIKIWIKI贷款',
      component: none,
    },

    //WIKIWIKI贷款推广页面
    {
      path: '/promotion',
      name: 'WIKIWIKI贷款',
      component: promotion,
    },
    {
      path: '/zhizipro',
      name: 'WIKIWIKI贷款',
      component: zhizipro,
    },
    {
      path: '/zhiziapply',
      name: 'WIKIWIKI贷款',
      component: zhiziapply,
    },
    {
      path: '/zhiziloan',
      name: 'WIKIWIKI贷款',
      component: zhiziloan,
    },

    //普惠之家
    {
      path: '/puhui',
      name: '普惠之家',
      component: puhuipromotion,
    }
  ]
})
route.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('token')) { // 通过vuex state获取当前的token是否存在
      let token = sessionStorage.getItem('token')
      let userinfor = token.split('***')
      if (userinfor[0] != '0000' || userinfor[0] != '0001') {
        next({
          query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      } else {
        next()
      }
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default route
