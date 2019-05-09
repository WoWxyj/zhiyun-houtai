<template>
  <div class="container">
    <div class="banner">
      <img src="./images/banner.jpg" alt="">
    </div>
    <div class="step">
      <p class="steptxt">关注微信公众号：“<span>质云金服</span>”，获取更多贷款信息</p>
      <ul class="stepul allfloat">
        <li>
          <img src="./images/icon1.png" alt="">
          <span>1.输入金额</span>
        </li>
        <span>---</span>
        <li>
          <img src="./images/icon2.png" alt="">
          <span>2.智能匹配</span>
        </li>
        <span>---</span>
        <li>
          <img src="./images/icon3.png" alt="">
          <span>3.填写资料</span>
        </li>
        <span>---</span>
        <li>
          <img src="./images/icon4.png" alt="">
          <span>4.审批放款</span>
        </li>
      </ul>
    </div>
    <div class="message">
      <p><i></i><input type="tel" v-model="username" maxlength="11" class="tel_phone" placeholder="请输入您的手机号"></p>
      <h3 class="cece" @click="getAuthCode">测测我能借多少</h3>
    </div>


    <div class="notice">
      <p>点击"测测我能借多少"表示阅读并同意<span @click="goService">《服务条款》</span></p>
    </div>
    <div class="footer">
      <p class="typeban">版权所有@河南爱存金融服务有限公司</p>
      <p class="typeban">豫ICP备17050434号-1</p>
      <p class="typeban">投资有风险，投入需谨慎，具体到款时间视个人情况而定</p>
    </div>


    <div class="mask" v-show="maskShow"></div>
    <div class="maskkkkk" v-show="maskkkkkShow"></div>
    <!-- 验证码 -->
    <div class="zhezhaoone" v-show="maskDivShow">
      <div class="close" @click="close">+</div>
      <p class="zhezhaopp">
        <input class="txyzm" v-model="authCode" maxlength="6" placeholder="请输入验证码" id="txyzm" type="text">
        <button id="hqyzm" class="hqyzm" v-show="sendAuthCode" @click="getAuthCode">60s</button>
        <button class="hqyzm" v-show="!sendAuthCode">
          <span>{{auth_time}} </span>s
        </button>
      </p>
      <h3 class="zhezhaoh3" @click="handleSubmit2">确认</h3>
    </div>

    <div class="wechatcenter" v-show="wechatcenterShow">
      <img src="./images/live_weixin.png">
    </div>


    <!-- 注册成功 -->
    <div class="zhezhaotwo" v-show="loginSucces">
      <div class="close" @click="close">+</div>
      <img src="./images/success.png" alt="">
      <h3 class="congra">{{ successMess }}</h3>
      <p>最高享贷50w元额度</p>
      <h3 class="downloadapp" @click="downloadapp"><a>下载质子贷APP</a></h3>
    </div>


  </div>
</template>


<script>
  import {getyzm, importNewlogin, paramData, down_url, visiterOperation, local_baseurl, channelStop} from '../../api/api'
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
        successMess: '恭喜您注册成功！',
        maskShow: false,
        maskDivShow: false,
        loginSucces: false,
        wechatcenterShow: false,
        maskkkkkShow: false,
        invite_code: this.$route.query.invite_code ? this.$route.query.invite_code : '',
        share_flow_user_id: this.$route.query.share_flow_user_id ? this.$route.query.share_flow_user_id : '',
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
          if (res.code == 514) {
            this.$router.push({path: '/none'})
          } else {
            //访问pv
            this.getVisiter()
          }
        })
      },

      goService () {
        location.href = 'https://www.bestdaikuan.com/site/service'
      },
      close () {
        this.maskDivShow = false
        this.maskShow = false
        this.loginSucces = false
      },
      //访问页面记录pv
      getVisiter: function () {
        sessionStorage.setItem('motion', 'promotion')
        paramData['protocol']['token'] = sessionStorage.getItem('token')
        let param = {
          share_flow_user_id: this.share_flow_user_id,
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
            invite_code: this.invite_code,
            share_flow_user_id: this.share_flow_user_id,
            locationweb: local_baseurl,
            'mobile': this.username,
            'type': 3,
            'operation_type': '0105'
          }
          paramData['data'] = param
          let that = this
          getyzm(paramData).then(res => {
            if (res.code == 200) {
              this.maskDivShow = true
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
              let u = navigator.userAgent
              let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
              if (isiOS) {   //ios直接跳转到h5
                this.getTokenUrlMotion(res.message, that.username)
              } else {    //其他设备弹出下载app
                this.maskShow = true  //遮罩弹层
                this.loginSucces = true  //注册成功
                this.successMess = '您已经注册过质子贷'
              }
            } else {
              alert(res.message)
            }
          })
        }
      },

      getTokenUrlMotion (message, username) {
        console.log(message)
        window.location.href = message + '&phone=' + username + '&motion=motion'
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
            'mobile': this.username,
            'code': this.authCode,
            locationweb: local_baseurl,
            'operation_type': '0105',
            'invite_code': this.invite_code,
            'share_flow_user_id': this.share_flow_user_id,
          }
          paramData['data'] = param
          let that = this
          importNewlogin(paramData).then(res => {
            if (res.code == 200) {
              sessionStorage.setItem('loginType', '0003')
              var u = navigator.userAgent
              var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
              if (isiOS) {   //ios直接跳转到h5
                that.getTokenUrlMotion(res.data.url, that.username)
              } else {    //其他设备弹出下载app
                that.maskShow = true  //遮罩弹层
                that.loginSucces = true  //注册成功
              }
            } else {
              alert(res.message)
            }
          })
        }
      },

      //点击下载质子贷
      downloadapp () {
        let param = {
          operation_type: '0203',
          mobile: this.username,
          locationweb: local_baseurl,
          'share_flow_user_id': this.share_flow_user_id,
        }
        paramData['data'] = param
        visiterOperation(paramData).then(res => {
          if (res.code == 200) {
            let channel_name = sessionStorage.getItem('channel_name')
            let business_name = res.business_name
            let url = down_url + business_name + '-' + channel_name + '.apk'
            window.location.href = 'https://88.q15od2.cn?channelid=' + channel_name + '&phone=' + this.username + '&url=' + url
          }
        })
      },
    },

  }
</script>

<style lang="scss">
  @import "../../assets/scss/common.scss";
  @import "./zhizipro.scss";
</style>
