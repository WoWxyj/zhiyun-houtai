<template>
    <div class="promotion">
        <div class="promotion_ban_div">
            <img class="promotion_ban" src="../../assets/img/promotion-ban.jpg" alt="">
            <div class="promotion_ban_phone">
                <div class="promotion-login-input login-margin">
                    <input type="tel" v-model="username" placeholder="请输入手机号" maxlength="11" id="yzm_phoneuser">
                </div>
                <div class="promotion-login-input login-hqyzm">
                    <input type="text" v-model="authCode" placeholder="请输入验证码" maxlength="6" id="sign_yzm">
                    <button class="login-yzm" v-show="sendAuthCode" @click="getAuthCode">{{yzmModel}}</button>
                    <button v-show="!sendAuthCode" class="login-yzm">
                        <span>{{auth_time}} </span>s
                    </button>
                </div>
                <div class="loginButton">
                    <el-button @click.native.prevent="handleSubmit2" style="width: 100%;" :loading="logining">看看我能借多少
                    </el-button>
                </div>
            </div>
        </div>
        <div class="promotion_footer_div">
            <img class="promotion_footer" src="../../assets/img/promotion-footer.jpg" alt="">
            <div class="promotion_footer_text">
                <p>版权所有&copy;河南爱存金融服务有限公司</p>
                <p>未经许可，不得复制，转载或编辑，违者必究</p>
            </div>
        </div>
    </div>
</template>

<script>
  import {getyzm, importNewlogin, paramData, visiterOperation, local_baseurl, channelStop} from '../../api/api'
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
        yzmModel: '获取验证码'
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

      // 获取验证码
      getAuthCode: function () {
        let reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
        if (this.username == '') {
          alert('请输入手机号码')
        } else if (!reg.test(this.username)) {
          alert('手机格式不正确')
        } else {
          paramData['protocol']['token'] = sessionStorage.getItem('token')
          let param = {
            locationweb: local_baseurl,
            'mobile': this.username,
            'type': 3,
            'operation_type': '0105'
          }
          paramData['data'] = param
          let that = this
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
            } else if (res.code == 510) {
              sessionStorage.setItem('login_type', '0003')
              this.getTokenUrlMotion(res.message, that.username)
            } else {
              alert('发送失败')
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
      handleSubmit2 (ev) {
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
            locationweb: local_baseurl,
            'mobile': this.username,
            'code': this.authCode,
            'operation_type': '0105'
          }
          paramData['data'] = param
          let that = this
          importNewlogin(paramData).then(res => {
            if (res.code == 200) {
              sessionStorage.setItem('loginType', '0003')
              this.getTokenUrlMotion (res.data.url, that.username)
            } else {
              console.log(res.message)
            }
          })
        }
      },
    },

  }
</script>

<style lang="scss">
    @import "../../assets/scss/common.scss";
    @import "./motion.scss";
</style>