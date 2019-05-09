<template>
  <div class="containLogin">
    <div class="loanTopTitle">登录
      <span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../assets/img/return-go-icon.png"
                                                                    alt=""></span>
    </div>
    <div class="login-input login-margin">
      <input type="tel" v-model="username" placeholder="请输入手机号" maxlength="11" id="yzm_phoneuser">
    </div>
    <div class="login-input login-hqyzm">
      <input type="text" v-model="authCode" placeholder="请输入验证码" maxlength="6" id="sign_yzm">
      <button class="login-yzm" v-show="sendAuthCode" @click="getAuthCode">{{yzmModel}}</button>
      <button v-show="!sendAuthCode" class="login-yzm">
        <span>{{auth_time}} </span>s
      </button>

    </div>
    <div class="loginButton">
      <el-button @click.native.prevent="handleSubmit2" style="width: 100%;" :loading="logining">登录</el-button>
    </div>
    <p class="loginServer">点击“登陆”即表示您同意
      <span @click="goService">《WIKIWIKI贷款服务》</span>
    </p>

    <!-- <div class="thrLogin">
  <span id = "qqLoginBtn">点击使用QQ登录</span>
</div> -->
    <div class="thrLogin" v-show="theOtherLogin">
      <p>———— &nbsp;&nbsp;第三方登录&nbsp;&nbsp; ————</p>
      <ul>
        <li @click='wechatToLogin()' v-show="thrLoginShow">
          <img src="../assets/img/thrLogin-wechat-icon.png" alt="">
          <span>微信登录</span>
        </li>
        <div id="qqLoginBtn" @click="qqlogingetauto()" v-show="qqlogingetau">
          <img src="../assets/img/thrLogin-qq-login.png" alt="">
          <span>QQ登录</span>
        </div>
        <li v-show="thrqqLoginShow">
          <img src="../assets/img/thrLogin-qq-login.png" alt="">
          <span>QQ登录</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {UserCodeLogin, paramData, local_baseurl, getyzm, wechatlogin, usercenter} from '../api/api'
  import qs from 'qs'
  import wechatAuth from '../plugins/wechatAuth'//微信登录插件
  //微信登录插件
  export default {
    created () {
      this.$store.state.showBottomNav = false
      let that = this
      if (window.location.href.indexOf('code') > -1) {
        let code = this.GetQueryString('code')
        let param = {'code': code}
        paramData['data'] = param
        wechatlogin(paramData).then(res => {
          that.loginsuccess(res)
        })
      }

      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.thrLoginShow = true
        this.thrqqLoginShow = false
        this.qqlogingetau = false
      } else {
        this.thrLoginShow = false
        this.thrqqLoginShow = true
        this.qqlogingetau = true
      }
    },
    data () {
      return {
        logining: false,
        username: '',
        authCode: '',
        sendAuthCode: true /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
        auth_time: 0 /* 倒计时 计数器 */,
        checked: true,
        unionid: '',
        type: '',
        openid: '',
        nickname: '',
        head_icon: '',
        login_type: '',
        thrLoginShow: false,
        thrqqLoginShow: false,
        yzmModel: '获取验证码',
        qqlogingetau: true,
        theOtherLogin: true
      }
    },
    mounted () {
      this.getusercenter()
      if (paramData.protocol.flow_user_id == 'nawf81') {
        this.theOtherLogin = true
      } else {
        this.theOtherLogin = false
      }
    },
    methods: {
      //判断用户是否登录
      getusercenter(){
        let param = {
          'token': sessionStorage.getItem('token')
        }
        paramData['data'] = param
        usercenter(paramData).then(res => {
          if (res.code == 200) {
            this.$router.push({path: '/'})
          }
        })
      },
      goService () {
        location.href = 'https://www.bestdaikuan.com/site/service?channelid=wikiwiki'
      },
      // 获取验证码
      getAuthCode: function () {
        let reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
        if (this.username == '') {
          alert('请输入手机号码')
        } else if (!reg.test(this.username)) {
          alert('手机格式不正确')
        } else {
          let operation_type
          let ua = navigator.userAgent.toLowerCase()
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            operation_type = '0403'
          } else {
            operation_type = '0105'
          }
          let param = {
            'mobile': this.username,
            'type': 2,
            'operation_type': operation_type
          }
          paramData['data'] = param
          getyzm(paramData).then(res => {
            if (res.code == 200) {
              this.sendAuthCode = false
              this.auth_time = 60
              var auth_timetimer = setInterval(() => {
                this.auth_time--
                if (this.auth_time <= 0) {
                  this.sendAuthCode = true
                  clearInterval(auth_timetimer)
                } else {
                  this.yzmModel = '重新获取'
                }
              }, 1000)
            } else {
              alert(res.message)
            }
          })
        }
      },

      //手机号验证码登录
      handleSubmit2 (ev) {
        let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
        if (this.username == '') {
          alert('请输入手机号码')
        } else if (!reg.test(this.username)) {
          alert('手机格式不正确')
        } else if (this.authCode == '') {
          alert('请输入验证码')
        } else if (this.authCode.length < 4) {
          alert('验证码错误')
        } else {
          let _this = this
          paramData['protocol']['token'] = sessionStorage.getItem('token')
          let operation_type
          let ua = navigator.userAgent.toLowerCase()
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            operation_type = '0403'
          } else {
            operation_type = '0105'
          }
          let param = {
            'mobile': this.username,
            'code': this.authCode,
            'operation_type': operation_type
          }
          paramData['data'] = param
          UserCodeLogin(paramData).then(res => {
            if (res.code == 200) {
              console.log(this.type)
              sessionStorage.setItem('token', res.data.token)
              sessionStorage.setItem('login_type', '0003')
              _this.$router.push({path: '/'})
            } else {
              alert(res.message)
            }
          })
        }
      },
      qqlogingetauto () {
        let url = encodeURIComponent(local_baseurl + '/#/qqlogin')
        location.href = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101511608&redirect_uri=' + url + '&state=test'
      },
      wechatToLogin () {
        //微信未授权登录跳转到授权登录页面
        let url = window.location.href
        //解决重复登录url添加重复的code与state问题
        let parseUrl = qs.parse(url.split('?')[1])
        let loginUrl
        if (parseUrl.code && parseUrl.state) {
          delete parseUrl.code
          delete parseUrl.state
          loginUrl = `${url.split('?')[0]}?${qs.stringify(parseUrl)}`
        } else {
          loginUrl = url
        }
        wechatAuth.setAppId('wx959a3dd350683e28')
        wechatAuth.redirect_uri = loginUrl
        window.location.href = wechatAuth.authUrl
      },
      GetQueryString (name) {
        var url = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var newUrl = window.location.search.substr(1).match(url)
        if (newUrl != null) {
          return unescape(newUrl[2])
        } else {
          return false
        }
      },
      loginsuccess (res) {
        let that = this
        if (res.code == 200) {
          sessionStorage.setItem('token', res.data.token)
          sessionStorage.setItem('login_type', '0001')
          if (res.data.isbind == 1) {
            //微信未授权登录跳转到授权登录页面
            let url = window.location.href
            let parseUrl = qs.parse(url.split('?')[2])
            location.href = '/#' + parseUrl.redirect
            //解决重复登录url添加重复的code与state问题
          } else {
            that.$router.push({path: '/bindAccount'})
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/common.scss";
  @import "../assets/scss/login.scss";
</style>
