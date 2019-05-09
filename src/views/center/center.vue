<template>
  <div class="person-center" v-loading="listLoading">
    <div class="topbg">
      <img src="../../assets/changeImg/topbg.png" alt="">
    </div>
    <div class="centerSearch">
      <div class="searchAll">
        <span class="setting" @click="setting"><img src="../../assets/img/center-set-icon.png" alt=""></span>
        <h3>个人中心</h3>
        <div v-if="isread == 1">
          <span class="sports" @click="messageGo"><img src="../../assets/changeImg/top-message-icon-no.png" alt=""></span>
        </div>
        <div v-else>
                    <span class="sports" @click="messageGo"><img style="padding-top: 4px;"
                                                                 src="../../assets/changeImg/top-message-icon.png"
                                                                 alt=""></span>
        </div>
      </div>
    </div>
    <div class="person-data-bg">
      <div class="person-data">
        <div class="person-center-img">
          <div v-show="nologin" @click.stop="login">
            <img :src="userhead" alt="">
            <span class="name-center noLoginName">{{username}}</span>
          </div>
          <div v-show="areadyLogin">
            <img :src="userhead" v-model="headIcon" alt="" @click.stop="changeImg">
            <span class="name-center">{{username}}</span>
            <span class="name-span" @click="cardNumber"
                  v-show="nologinStatus">{{authenticationSTatus}}<i></i></span>
          </div>
          <input type="file" accept="image/*" style="display: none;" @change.stop="handleFile" id="HideImg"
                 class="hiddenInput"/>
        </div>
        <!-- <div class="person-name"> -->
        <!-- </div> -->
        <ul class="person-ul">
          <li class="person-ul-li" @click="cardNumber">
            <h4>{{cardnumber}}</h4>
            <span>信用评估
              <i></i>
            </span>
          </li>
          <span class="borde"></span>
          <li @click="login">
            <h4>￥{{havemoney}}</h4>
            <span>账户余额</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="all-icon-router">
      <ul class="first-icon-router">
        <li @click="cardbower">
          <div class="icon-dev"><img src="../../assets/img/person-icon-card.png"></div>
          <span>信用卡浏览</span>
        </li>
        <li @click="applyloan">
          <div class="icon-dev"><img src="../../assets/img/person-icon-apply.png"></div>
          <span>贷款申请</span>
        </li>
        <li @click="bowerloan">
          <div class="icon-dev"><img src="../../assets/img/person-icon-look.png"></div>
          <span>贷款浏览</span>
        </li>
      </ul>

      <ul class="first-icon-router">
        <li @click="blackList">
          <div class="icon-dev"><img src="../../assets/img/black-center-icon.png"></div>
          <!-- <div class="www" v-if="youde">5555555</div> -->
          <span>黑名单校验</span>
        </li>
        <li @click="jsqGo">
          <div class="icon-dev"><img src="../../assets/img/person-icon-calc.png"></div>
          <span>贷款计算器</span>
        </li>
        <li @click="teasing">
          <div class="icon-dev"><img src="../../assets/img/person-icon-device.png"></div>
          <span>吐槽</span>
        </li>
        <li @click="messageGo">
          <div class="icon-dev"><img src="../../assets/img/person-icon-mess.png"></div>
          <span>我的消息</span>
        </li>
      </ul>

      <ul class="first-icon-router">
        <li @click="share">
          <div class="icon-dev"><img src="../../assets/img/person-icon-friend.png"></div>
          <span>邀请好友</span>
        </li>
        <li @click="attention">
          <div class="icon-dev"><img src="../../assets/img/person-icon-wechat.png"></div>
          <span>关注公众号</span>
        </li>
        <li @click="showTel">
          <div class="icon-dev"><img src="../../assets/img/person-icon-tel.png"></div>
          <span>联系我们</span>
        </li>
      </ul>
    </div>
    <!-- 点击联系我们弹出框 -->
    <div class="markDivtel" v-show="markDivtel" @click="markDivno"></div>
    <div class="kefu" v-show="telShow">
      <p class="hotline">WIKIWIKI贷款客服热线</p>
      <p>400-666-1905</p>
      <ul>
        <li class="call"><a href="tel:4006661905">呼叫</a></li>
        <li class="cancel" @click="cancel">取消</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {usercenter, paramData, changeAvatar, local_baseurl} from '../../api/api'
  import axios from '../../router/httproute'

  export default {
    data () {
      return {
        listLoading: false,
        youde: false,
        username: '立即登陆',
        userhead: require('../../assets/img/head.png'),
        cardnumber: '300',
        havemoney: '0.00',
        telShow: false,
        authentication: '',
        authenticationSTatus: '未认证',
        areadyLogin: false,
        nologin: true,
        userCenter: [],
        headIcon: '',
        markDivtel: false,
        isread: '',
        nologinStatus: false
      }
    },
    created () {
      this.$store.state.showBottomNav = true
    },
    mounted () {
      if (sessionStorage.getItem('token')) {
        this.login()
      }
      this.isread = localStorage.getItem('readalread')
    },
    methods: {
      //点击设置
      setting () {
        this.$router.push({path: '/setting'})
      },
      //点击信用评估
      cardNumber () {
        this.$router.push({path: '/assessmentData'})
      },
      //点击贷款计算器
      jsqGo () {
        location.href = '/jsq'
      },
      // 顶部活动icon
      messageGo () {
        this.$router.push({path: '/message'})
      },
      showTel () {
        this.telShow = true
        this.markDivtel = true
      },
      cancel () {
        this.telShow = false
        this.markDivtel = false
      },
      markDivno () {
        this.telShow = false
        this.markDivtel = false
      },
      share () {
        location.href = local_baseurl + '/#/share'
      },
      // 吐槽
      teasing: function () {
        this.$router.push({path: '/teasing'})
      },
      // 贷款申请记录
      applyloan: function () {
        this.$router.push({path: '/applyLoan'})
      },
      //贷款浏览记录
      bowerloan: function () {
        this.$router.push({path: '/bowerLoan'})
      },
      //信用卡浏览记录
      cardbower: function () {
        this.$router.push({path: '/cardbower'})
      },
      //关注公众号
      attention: function () {
        this.$router.push({path: '/attention'})
      },
      // 我的消息
      messageGo () {
        this.$router.push({path: '/message'})
      },
      blackList () {
        if (this.userCenter.free == 2) {
          this.$router.push({path: '/blackList'})
        } else {
          this.$router.push({
            path: '/blackListReport',
            query: {
              blackUsername: this.userCenter.u_name,  //姓名
              blackIdcard: this.userCenter.u_no,  //身份证
              blackMobile: this.userCenter.mobile,  //手机号码
              blackType: 3
            }
          })
        }
        // this.$router.push({path: '/blackList'})
      },
      login: function () {
        if (sessionStorage.getItem('token')) {
          paramData['protocol']['token'] = sessionStorage.getItem('token')
          let parmas = {
            login_type: sessionStorage.getItem('login_type')
          }
          paramData['data'] = parmas
          usercenter(paramData).then(res => {
            if (res.code == 200) {
              this.areadyLogin = true
              this.nologin = false
              this.nologinStatus = true
              this.userCenter = res.data
              this.username = this.userCenter.customer_name
              this.userhead = this.userCenter.customer_head_pic
              this.cardnumber = this.userCenter.customer_score
              this.havemoney = this.userCenter.total_money
              this.authentication = this.userCenter.user_authentication
              sessionStorage.setItem('invite_code', this.userCenter.invite_code)
              if (this.authentication == 0) {
                this.authenticationSTatus = '未认证'
              } else {
                this.authenticationSTatus = '已认证'
              }
              if (this.userhead == '') {
                this.userhead = require('../../assets/img/head.png')
              }
            } else {
              alert(res.message)
            }
          })
        } else {
          this.$router.push({path: '/usercenter'})
        }
      },
      //修改头像
      changeImg: function () {
        this.$el.querySelector('#HideImg').click()

      },

      update (file) {
        let params = new FormData() //创建form对象
        params.append('img', file)//通过append向form对象添加数据
        params.append('img_type', file.split(';')[0].split(':')[1])//通过append向form对象添加数据
        // console.log(param.get('img')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        console.log() //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        params.append('token', sessionStorage.getItem('token'))
        params.append('os', navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger' ? '0004' : '0003')
        // let config = {
        //   headers: {'Content-Type': 'multipart/form-data'}
        // } //添加请求头
        // console.log(param)
        // axios.post('http://testapi.brssp.com/v3/user/change-avatar', param, config).then(response => {
        //     console.log(response.data)
        //   })
        changeAvatar(params).then(res => {
          console.log(res.data)
        })

      },

      // 将头像显示
      handleFile: function (e) {
        var that = this
        let $target = e.target || e.srcElement
        let file = $target.files[0]
        var reader = new FileReader()
        reader.onload = (data) => {
          let res = data.target || data.srcElement
          that.userhead = res.result
          that.update(that.userhead)
        }
        reader.readAsDataURL(file)
        // that.update(file);
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common.scss";
  @import "../../assets/scss/index.scss";
</style>
