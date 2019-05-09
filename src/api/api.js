import axios from '../router/httproute'
import qs from 'qs'

// let base = 'http://apitest.brssp.com'
let base = 'http://api.bestdaikuan.com'

// 城市选择
export const getcity = params => {
  return axios.post(`/static/city.json`, qs.stringify(params)).then(res => res.data)
}
// 首页所有数据
export const getrolling = params => {
  return axios.post(`${base}/v3/index/index`, qs.stringify(params)).then(res => res.data)
}

// 产品列表
export const getdetails = params => {
  return axios.post(`${base}/v3/index/chunk-list`, qs.stringify(params)).then(res => res.data)
}

// 系统设置
export const getsearch = params => {
  return axios.post(`${base}/v3/index/get-system-label`, qs.stringify(params)).then(res => res.data)
}

// 用户名验证码登录
export const UserCodeLogin = params => {
  return axios.post(`${base}/v3/user/user-login-by-vcode`, qs.stringify(params)).then(res => res.data)
}

// qq登录
export const qqlogin = params => {
  return axios.post(`${base}/v3/user/qq-login`, qs.stringify(params)).then(res => res.data)
}

// qq登陆第三步
export const qqloginthree = params => {
  return axios.post(`${base}/v3/user/qq-gologin`, qs.stringify(params)).then(res => res.data)
}
// 绑定手机号
export const bindlogin = params => {
  return axios.post(`${base}/v3/user/user-bind`, qs.stringify(params)).then(res => res.data)
}

// 获取验证码
export const getyzm = params => {
  return axios.post(`${base}/v3/user/get-sys-vcode`, qs.stringify(params)).then(res => res.data)
}

// 个人中心
export const usercenter = params => {
  return axios.post(`${base}/v3/user/user-center`, qs.stringify(params)).then(res => res.data)
}

// 申请记录
export const applyrecord = params => {
  return axios.post(`${base}/v3/operation/userview-log`, qs.stringify(params)).then(res => res.data)
}

// 申请&浏览
export const applylook = params => {
  return axios.post(`${base}/v3/operation/apply`, qs.stringify(params)).then(res => res.data)
}

// 微信登录
export const wechatlogin = params => {
  return axios.post(`${base}/v3/user/wx-login`, qs.stringify(params)).then(res => res.data)
}

// 消息列表
export const messageList = params => {
  return axios.post(`${base}/v3/index/message-list`, qs.stringify(params)).then(res => res.data)
}

// 一键已读
export const messageListAllIsread = params => {
  return axios.post(`${base}/v3/index/message-update-all-status`, qs.stringify(params)).then(res => res)
}

// 消息更改状态
export const messageUpdateStatus = params => {
  return axios.post(`${base}/v3/index/message-update-status`, qs.stringify(params)).then(res => res)
}

// 信用卡列表
export const creditlist = params => {
  return axios.post(`${base}/v3/index/creditlist`, qs.stringify(params)).then(res => res.data)
}

// 精准推荐首页或者获取用户资料
export const userRecommend = params => {
  return axios.post(`${base}/v3/user/user-recommend`, qs.stringify(params)).then(res => res.data)
}

// 精准推荐第一步
export const recommendStart = params => {
  return axios.post(`${base}/v3/user/recommend-start`, qs.stringify(params)).then(res => res.data)
}

// 大额精准推荐第二步
export const recommendSecond = params => {
  return axios.post(`${base}/v3/user/recommend-second`, qs.stringify(params)).then(res => res.data)
}

// 吐槽
export const feedBack = params => {
  return axios.post(`${base}/v3/index/feed-back`, qs.stringify(params)).then(res => res.data)
}

// 系统测评
export const systemTesting = params => {
  return axios.post(`${base}/v3/user/system-testing`, qs.stringify(params)).then(res => res.data)
}

// 黑名单查询
export const detetionList = params => {
  return axios.post(`${base}/v3/pay/detetion-list`, qs.stringify(params)).then(res => res.data)
}

//黑名单价格和支付方式列表
export const getPriceAndPaylist = params => {
  return axios.post(`${base}/v3/pay/get-price-and-paylist`, qs.stringify(params)).then(res => res.data)
}

// 黑名单检测
export const blacklistTesting = params => {
  return axios.post(`${base}/v3/pay/blacklist-testing`, qs.stringify(params)).then(res => res.data)
}

// 支付宝发起支付
export const alipay = params => {
  return axios.post(`${base}/v3/pay/alipay`, qs.stringify(params)).then(res => res.data)
}

// 用户退出
export const logout = params => {
  return axios.post(`${base}/v3/user/logout`, qs.stringify(params)).then(res => res.data)
}

// 微信分享
export const wechatshare = params => {
  return axios.post(`${base}/v3/operation/wechat-share`, qs.stringify(params)).then(res => res.data)
}

// 上传头像
export const changeAvatar = params => {
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  } // 添加请求头
  return axios.post(`${base}/v3/user/change-avatar`, params, config).then(res => res.data)
}

// 菜单点击
export const clickMenu = params => {
  return axios.post(`${base}/v3/operation/click-menu`, qs.stringify(params)).then(res => res.data)
}

//渠道停用
export const channelStop = params => {
  return axios.post(`${base}/v3/index/channel-stop`, qs.stringify(params)).then(res => res.data)
}

// 推广页面登录
export const importNewlogin = params => {
  return axios.post(`${base}/v3/user/import-newlogin`, qs.stringify(params)).then(res => res.data)
}

//
export const popupMessage = params => {
  return axios.post(`${base}/v3/index/popup-message`, qs.stringify(params)).then(res => res.data)
}

export const visiterOperation = params => {
  return axios.post(`${base}/v3/user/visiter-operation`, qs.stringify(params)).then(res => res.data)
}
let ua = navigator.userAgent.toLowerCase()
let url = location.href
let channel_name = 'wikiwiki'
let flow_user_id = 'nawf86'
let parseUrl = qs.parse(url.split('?')[1])
if (typeof parseUrl.channelid !== 'undefined') {
  channel_name = parseUrl.channelid
}
if (typeof parseUrl.channel_name !== 'undefined') {
  channel_name = parseUrl.channel_name
}
if (typeof parseUrl.usernum !== 'undefined') {
  sessionStorage.setItem('token', decodeURIComponent(parseUrl.usernum))
}
if (typeof parseUrl.flow_user_id !== 'undefined') {
  flow_user_id = parseUrl.flow_user_id
}
sessionStorage.setItem('channel_name', channel_name)
export let local_baseurl = window.location.protocol + '//' + window.location.host
export let down_url = 'https://zhizidai.oss-cn-beijing.aliyuncs.com/Uploads/app/'
export let paramData = {
  data: {
    type: 1
  },
  protocol: {
    flow_user_id: flow_user_id,
    channel_name: sessionStorage.getItem('channel_name'),
    os: ua.match(/MicroMessenger/i) == 'micromessenger' ? '0004' : '0003',
    token: '',
    userAgent: navigator.userAgent,
    version: '3.0'
  }
}
