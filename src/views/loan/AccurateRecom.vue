<template>
    <div class="accurateRecom" v-loading="listLoading">
        <div class="newCutTitle">精准推荐
            <span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../../assets/img/return-icon.png" alt=""></span>
        </div>
        <img class="accurateRecomBan" src="../../assets/img/loan_AccurateRecom_banner.png" alt="">
        <div class="accuratPhoneYzm">
            <p class="accuratPhone">
                <span>手机号</span>
                <input class="accuratPhone-input" v-model="username" type="text" name="" readonly placeholder="请填写手机号码">
            </p>
        </div>
        <ul class="select-money-time">
            <li>
                <p>最低借款额度</p>
                <div>
                    <select name="public-choice" v-model="selectmodelCoupon" @change="getCouponSelected()">
                        <option v-model="selectMoney" v-for="minimum in minimumLoans" :value="minimum.id" ref="newText">
                            {{ minimum.module_name }}
                        </option>
                    </select>
                    <span>
                        <img src="../../assets/img/select-icon-bg.png" alt="">
                    </span>
                </div>

            </li>
            <li>
                <p>借款期限</p>
                <div>
                    <select name="" v-model="selectmodeltime">
                        <option v-for="(borrow, index) in ToBorrows" :value="index">{{ borrow.module_name }}</option>
                    </select>
                    <span>
                        <img src="../../assets/img/select-icon-bg.png" alt="">
                    </span>
                </div>
            </li>
        </ul>
        <div class="accuratPhoneYzm">
            <p class="accuratPhone">
                <span>姓名</span>
                <input class="accuratPhone-input" v-model="realname" type="text" name="" placeholder="请填写您的姓名">
            </p>
            <p class="accuratPhone">
                <span>身份证号</span>
                <input class="accuratPhone-input" v-model="idcardnum" type="text" name="" placeholder="请填写18位身份证号">
            </p>
        </div>
        <ul class="accurat-redio">
            <li class="normal-show">
                <div class="accurat-redio-div">是否有信用卡</div>
                <div class="accurat-redio-right">
                    <label v-for="(item,index) in cardcheckList">
                        <input name="cardyes" type="radio" :value="item.value" v-model="cardchecked">
                        <span>{{item.name}}</span>
                    </label>
                </div>
            </li>
            <li class="normal-show">
                <div class="accurat-redio-div">是否有社保</div>
                <div class="accurat-redio-right">
                    <label v-for="(item,index) in securitycheckList">
                        <input name="security" type="radio" :value="item.value" v-model="securchecked">
                        <span>{{item.name}}</span>
                    </label>
                </div>
            </li>
            <li class="normal-show">
                <div class="accurat-redio-div">是否有微粒贷</div>
                <div class="accurat-redio-right">
                    <label v-for="(item,index) in weilidaicheckList">
                        <input name="weilidai" type="radio" :value="item.value" v-model="weilichecked">
                        <span>{{item.name}}</span>
                    </label>
                </div>
            </li>
        </ul>
        <ul class="accurat-redio" v-show="accuratShow">
            <li class="big-small-show">
                <div class="accurat-redio-div">是否接受7-14天贷款
                    <span>选择“是”，您的申请通过率可大幅提升哦</span>
                </div>
                <div class="accurat-redio-right">
                    <label v-for="(item,index) in acceptyescheckList">
                        <input name="acceptyes" type="radio" :value="item.value" v-model="accechecked">
                        <span>{{item.name}}</span>
                    </label>
                </div>
            </li>
        </ul>
        <div class="accurat-checkbox white-checkbox" v-show="serviceShow">
            <input type="checkbox" id="myCheck" v-model="checkboxSure">
            <label for="myCheck"></label>
            <span>我已阅读并同意
                <strong @click="goService">《借贷用户协议》</strong>
            </span>
        </div>
        <div style="height: 2rem;"></div>
        <div class="accurat-position">
            <p>真实的资料信息可以提高您的贷款成功率</p>
            <div class="accurat-btn" @click="accuratBtnLocal">下一步</div>
        </div>

    </div>
</template>

<script>
  import {paramData, getyzm, userRecommend, getsearch, recommendStart} from '../../api/api'

  export default {
    data () {
      return {
        checkboxSure: true,
        accuratShow: true,
        listLoading: false,
        serviceShow: true,
        username: '', //手机号
        authCode: '', //验证码
        sendAuthCode: true /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
        auth_time: 0 /* 倒计时 计数器 */,
        realname: '', //真实姓名
        idcardnum: '',
        cardchecked: '1',
        securchecked: '1',
        weilichecked: '1',
        accechecked: '1',
        selectmodelCoupon: 111,
        selectmodeltime: 0,
        cardcheckList: [{value: 0, name: '是'}, {value: 1, name: '否'}],
        securitycheckList: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],
        weilidaicheckList: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],
        acceptyescheckList: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],
        minimumLoans: [],
        ToBorrows: [],
        selectMoney: '',
        registerAgreement:''
      }
    },
    mounted () {
      this.registerAgreement = localStorage.getItem('registerAgree')
      console.log(this.registerAgreement)
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      this.userRecommendOne(paramData)
      this.getmoneytime(paramData)
    },
    created () {
      this.$store.state.showBottomNav = false
    },
    methods: {
      //借贷用户协议
      goService () {
        location.href = this.registerAgreement
      },

      // 判断是否登录
      userRecommendOne: function () {
        let _this = this
        userRecommend(paramData).then(res => {
          if (res.code == 200) {
            _this.username = res.data.customer_infor.mobile  //手机号码
            _this.realname = res.data.customer_infor.u_name  //真实姓名
            _this.idcardnum = res.data.customer_infor.u_no  //身份证
            _this.cardchecked = res.data.customer_infor.u_card //信用卡
            _this.securchecked = res.data.customer_infor.u_security  //社保
            _this.weilichecked = res.data.customer_infor.u_wld   //微粒贷
            _this.selectmodelCoupon = res.data.customer_infor.loan_amount_id
            if (res.data.customer_infor.loan_term == null) {
              _this.selectmodeltime = 0
            } else {
              _this.selectmodeltime = res.data.customer_infor.loan_term
            }
            _this.accechecked = res.data.customer_infor.u_paystatus  //是否接受7-14天贷款
            if (res.data.customer_infor.loan_amount_id == null) {
              _this.selectmodelCoupon = 111
            }
            if (_this.selectmodelCoupon > 113) {
              this.accuratShow = false
            }
          } else {
            alert(res.msg)
          }
        })
      },

      //
      getmoneytime: function () {
        let _this = this
        let param = {
          param_type: ['0014', '0001']
        }
        paramData['data'] = param
        getsearch(paramData).then(res => {
          if (res.code == 200) {
            let ToBorrowsList = res.data
            ToBorrowsList.forEach((item, index) => {
              if (item.param_type === '0001') {
                this.ToBorrows.push(item)
              } else {
                this.minimumLoans.push(item)
              }
            })
          } else {
            alert(res.msg)
          }
        })
      },

      getCouponSelected () {
        if (this.selectmodelCoupon > 113) {
          this.accuratShow = false
          this.serviceShow = false
        } else {
          this.accuratShow = true
          this.serviceShow = true
        }
      },

      // 获取验证码
      getAuthCode: function () {
        let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
        if (this.username == '') {
          alert('请输入手机号码')
        } else if (!reg.test(this.username)) {
          alert('手机格式不正确')
        } else {
          let param = {
            mobile: this.username,
            type: 4,
            operation_type: '0105'
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
                }
              }, 1000)
            } else {
              alert(res.msg)
            }
          })
        }
      },
      accuratBtnLocal () {
        let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
        let idcard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
        if (this.realname == '' || this.realname.length < 2) {
          alert('请填写真实姓名')
        } else if (this.idcardnum == '' || !idcard.test(this.idcardnum)) {
          alert('请填写真实身份证号码')
        } else if (this.username == '' || !reg.test(this.username)) {
          alert('请填写真实手机号码')
        } else if (this.checkboxSure == false) {
          alert('请同意借贷用户协议')
        } else {
          let _this = this
          let operation_type
          let ua = navigator.userAgent.toLowerCase()
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            operation_type = '0404'
          } else {
            operation_type = '0104'
          }
          let param = {
            operation_type: '0105', //填写资料申请
            u_card: _this.cardchecked, //信用卡
            u_security: _this.securchecked, //社保
            u_wld: _this.weilichecked, //微粒贷
            server_fourteen_loan: _this.accechecked, //7-14天
            mobile: _this.username, //手机号码
            u_name: _this.realname, //真实姓名
            u_no: _this.idcardnum, //身份证
            loan_amount_id: _this.selectmodelCoupon,
            loan_term: _this.selectmodeltime,
            loan_money: this.minimumLoans.find(item => item.id == this.selectmodelCoupon)['module_name']
          }

          paramData['data'] = param
          recommendStart(paramData).then(res => {
            if (res.code == 200) {
              if (res.data.next_step == 0) {
                let userdata = JSON.stringify(param)
                let str = JSON.stringify(res.data.loan_infor)
                _this.$router.push({
                  path: '/accurateRecomTwo',
                  query: {
                    str: str
                  }
                })
                localStorage.setItem('userdata', userdata)
              } else {
                _this.$router.push({path: '/accurateRecomThree'})
              }
            } else {
              alert(res.message)
            }
          })
          // this.$router.push({ path: "/accurateRecomTwo" });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/loan.scss";
</style>

