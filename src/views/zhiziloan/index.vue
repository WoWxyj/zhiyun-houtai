<template>
    <div class="promotion zhiziloan">
        <div class="promotion_ban_div">
            <img class="promotion_ban" src="./images/hand.png" alt="">
            <div class="zhiziloan_ban_phone">
                <div class="promotion-login-input login-margin">
                    <i><img src="./images/phone.png" alt=""></i>
                    <input type="tel" v-model="username" placeholder="请输入手机号码" maxlength="11" id="yzm_phoneuser">
                </div>
                <div class="promotion-login-input login-hqyzm">
                    <i><img src="./images/code.png" alt=""></i>
                    <input type="text" v-model="authCode" placeholder="请输入验证码" maxlength="6" id="sign_yzm">
                    <button class="login-yzm" v-show="sendAuthCode" @click="getAuthCode">{{yzmModel}}</button>
                    <button v-show="!sendAuthCode" class="login-yzm">
                        <span>{{auth_time}} </span>s
                    </button>
                </div>
                <div class="loginButton">
                    <el-button @click.native.prevent="handleSubmit2" :loading="logining">立即拿钱
                    </el-button>
                </div>
            </div>
            <img class="promotion_footer" src="./images/foot.png" alt="">
        </div>

        <div class="markDiv" v-show="loginSucces">
            <div class="markDivTit">
                <img src="./images/success.png" alt="">
                <p>{{ successMess }}</p>
                <p class="clickdown" v-show="downshow" @click="downloadapp">请点击下载WIKIWIKI贷款</p>
            </div>
        </div>
    </div>
</template>

<script>
  import {getyzm, importNewlogin, paramData, down_url, visiterOperation, local_baseurl, channelStop} from '../../api/api'
  // import Cookies from 'js-cookie' //引入Cookies
  import qs from 'qs'
  export default {
    data () {
      return {
        logining: false,
        username: '',
        authCode: '',
        sendAuthCode: true /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
        auth_time: 0 /* 倒计时 计数器 */,
        yzmModel: '获取验证码',
        successMess:'注册成功',
        loginSucces: false,
        downshow: true
      }
    },
    created () {
      this.$store.state.showBottomNav = false
    },
    mounted () {
      //渠道停用
      this.getchannelStop()
    },
    methods: {
      //渠道停用
      getchannelStop () {
        channelStop(paramData).then(res => {
          if(res.code == 514){
            this.$router.push({path: '/none'})
          }else{
            //访问pv
            this.getVisiter()
          }
        })
      },
      goService () {
        location.href = 'https://www.bestdaikuan.com/site/service'
      },
      //访问页面记录pv
      getVisiter: function () {
        sessionStorage.setItem('motion', 'promotion')
        paramData['protocol']['token'] = sessionStorage.getItem('token')
        let param = {
          'operation_type': '0101'
        }
        paramData['data'] = param
        visiterOperation(paramData).then(res => {
        })
      },

      // 测测我能借多少
      getAuthCode: function () {
        let reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
        if (this.username == '') {
          alert('请输入手机号码')
        } else if (!reg.test(this.username)) {
          alert('手机格式不正确')
        } else {
          paramData['protocol']['token'] = sessionStorage.getItem('token')
          let param = {
            local_baseurl: local_baseurl,
            'mobile': this.username,
            'type': 3,
            'operation_type': '0105'
          }
          paramData['data'] = param
          let that = this
          getyzm(paramData).then(res => {
            if (res.code == 200) {
              this.maskShow = true
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
            } else if (res.code == 510) {
              sessionStorage.setItem('login_type', '0003')
              let u = navigator.userAgent;
              let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
              if(isiOS){   //ios直接跳转到h5
                that.loginSucces = true  //遮罩弹层
                that.downshow = false
                that.successMess = "您已是注册用户"
                setTimeout(function () {
                  that.getTokenUrlMotion (res.message, that.username)
                }, 800)
              }else{    //其他设备弹出下载app
                that.loginSucces = true  //注册成功
                that.successMess = "您已是注册用户"
              }
            } else {
              console.log(res.message)
            }
          })
        }
      },

      getTokenUrlMotion (message, username) {
        console.log(message)
        window.location.href = message + '&phone=' + username +'&motion=motion'
      },

      //手机号验证码登录
      handleSubmit2 () {
        let reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
        if (this.username == '') {
          alert('请输入手机号码')
        } else if (!reg.test(this.username)) {
          alert('手机格式不正确')
        } else if (this.authCode == '') {
          alert('请输入验证码')
        } else if (this.authCode.length < 4) {
          alert('验证码错误')
        } else {
          paramData['protocol']['token'] = sessionStorage.getItem('token')
          let param = {
            local_baseurl: local_baseurl,
            'mobile': this.username,
            'code': this.authCode,
            'operation_type': '0105'
          }
          paramData['data'] = param
          let that = this
          importNewlogin(paramData).then(res => {
            if (res.code == 200) {
              sessionStorage.setItem('loginType', '0003')
              var u = navigator.userAgent;
              var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
              if(isiOS) {   //ios直接跳转到h5
                that.getTokenUrlMotion (res.data.url, that.username)
              }else{    //其他设备弹出下载app
                that.maskShow = true  //遮罩弹层
                that.loginSucces = true  //注册成功
              }
            } else {
              console.log(res.message)
            }
          })
        }
      },

      //点击下载质子贷
      downloadapp () {
        let param = {
          operation_type: '0203',
          mobile: this.username,
          local_baseurl: local_baseurl
        }
        paramData['data'] = param
        visiterOperation(paramData).then(res => {
        })
        let channel_name = sessionStorage.getItem('channel_name')
        let url = down_url + 'wikiwiki/'+ 'wikiwiki-' + channel_name + '.apk'
        window.location.href = 'https://88.q15od2.cn?channelid=' + channel_name + '&phone=' + this.username + '&url=' + url
      },
    },

  }
</script>

<style lang="scss">
    @import "../../assets/scss/common.scss";
    @import "../promotion/motion.scss";
</style>