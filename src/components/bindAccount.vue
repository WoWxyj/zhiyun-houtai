<template>
    <div class="containLogin">
        <p class="bindNotice">为确保您的账户安全，请绑定手机号码，绑定后您可使用手机号码作为账号登录</p>
        <div class="login-input">
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
            <el-button @click.native.prevent="handleSubmit2" style="width: 100%;" :loading="logining">下一步</el-button>
        </div>
        <p class="loginServer">点击“下一步”即表示您同意<span>《质子贷服务》</span></p>
    </div>
</template>

<script>
  import {UserCodeLogin, bindlogin, getyzm, paramData} from '../api/api'

  export default {
    created () {
      this.$store.state.showBottomNav = false
    },
    data () {
      return {
        logining: false,
        username: '',
        authCode: '',
        sendAuthCode: true /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
        auth_time: 0 /* 倒计时 计数器 */,
        yzmModel:'获取验证码'
      }
    },
    methods: {
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
            'type': 4,
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
          paramData['protocol']['token'] = sessionStorage.getItem('token')
          let param = {
            'mobile': this.username,
            'code': this.authCode,
            'operation_type': '0105'
          }
          paramData['data'] = param
          bindlogin(paramData).then(res => {
            if (res.code == 200) {
              sessionStorage.setItem('token', res.data.token)
              sessionStorage.setItem('login_type', '0000')
              this.$router.push({path: '/'})
            } else {
              alert(res.message)
            }
          })
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/common.scss";
    @import "../assets/scss/login.scss";
</style>
