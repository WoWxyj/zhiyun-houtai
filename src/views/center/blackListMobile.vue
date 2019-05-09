<template>
    <div class="blackList" v-loading="listLoading">
        <div class="markAll" v-show="alipayShow">
            <div class="zhifuBox">
                <img class="blackClose" @click="blackClose" src="../../assets/img/blackList-icon.png" alt="">
                <p class="chooseReport">选择你想获取的报告</p>
                <div class="zhifuReport">
                    <div class="zhifuTop">完整版信用报告</div>
                    <div class="zhifuCont">
                        <p class="shoujia">售价<span>{{MoneyNumber}}</span>元</p>
                        <p><i></i>全网各类黑名单排查</p>
                        <p><i></i>贷款额度预测</p>
                        <p><i></i>精准贷款产品推荐</p>
                    </div>
                    <img class="blackChooseIcon" src="../../assets/img/black-choose-icon.png" alt="">
                </div>
                <div class="tanchuShow" v-show="tanchuShow">支付完成后，返回APP即可查看你的报告</div>
                <p class="chooseReport">选择支付方式</p>
                <ul style="display: flex;">
                    <li v-for="(paylisttype, index) in paylist" class="alipay" :class="{ active:index==current}"
                        @click="pay(index,paylisttype.paytype,paylisttype.sm_paytype)">
                        <img :src="paylisttype.img" alt="">
                    </li>
                </ul>
                <div class="alipayZhiFu" @click="alipayZhiFu">立即支付</div>
                <a :href="zhifuUrl" id="goodssd"></a>
            </div>
        </div>

        <div class="newCutTitle">黑名单检测<span @click="$router.back(-1)" class="loanTopTitleLeft"><img
                src="../../assets/img/return-icon.png" alt=""></span></div>
        <div class="blackListAl">
            <img class="blackListBan" src="../../assets/img/wodeedu-icon.png" alt="">
            <div class="blackListText">
                <img class="blackListpos" src="../../assets/img/black-check-icon.png" alt="">
                <div class="nameinpAll">
                    <div class="nameinp">
                        <img class="blackList-username" src="../../assets/img/blackList-username-icon.png" alt="">
                        <input class="inp" v-model="blackUsername" placeholder="请输入您的姓名" type="text">
                    </div>
                    <div class="nameinp">
                        <img class="blackList-idcard" src="../../assets/img/blackList-idcard-icon.png" alt="">
                        <input class="inp" v-model="blackIdcard" placeholder="请输入您的身份证号" maxlength="18" type="text">
                    </div>
                    <div class="nameinp">
                        <img class="blackList-mobile" src="../../assets/img/blackList-mobile-icon.png" alt="">
                        <input class="inp" style="color: #cccccc" readonly v-model="blackMobile" placeholder="请输入您的手机号"
                               type="text">
                    </div>
                </div>
            </div>
            <div class="inspection" @click="assessment">立即评估</div>
            <div class="accurat-checkbox white-checkbox">
                <input type="checkbox" id="myCheck" v-model="checkboxSure">
                <label for="myCheck"></label>
                <span>我已阅读并同意
                <strong @click="goService">《借贷用户协议》</strong>
            </span>
            </div>
        </div>

    </div>
</template>

<script>
  import {paramData, blacklistTesting, userRecommend, alipay, getPriceAndPaylist} from '../../api/api'

  export default {
    data () {
      return {
        checkboxSure: true,
        listLoading: false,
        blackUsername: '',
        blackIdcard: '',
        blackMobile: '',
        alipayShow: false,
        tanchuShow: false,
        zhifuUrl: '',
        MoneyNumber: '',
        aliPayUrl: '',
        orderNum: '',
        paylist: [],
        current: 0,
        paytypedata: navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger' ? 'weixin' : 'alipay'
      }
    },
    created () {
      this.$store.state.showBottomNav = false
    },
    mounted () {
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      this.userRecommendOne(paramData)
      this.PriceAndPaylist()
    },
    methods: {
      // 借贷用户协议
      goService () {
        location.href = 'https://www.bestdaikuan.com/site/service'
      },

      // 判断是否登录
      userRecommendOne: function () {
        let _this = this
        userRecommend(paramData).then(res => {
          if (res.code == 200) {
            _this.blackUsername = res.data.customer_infor.u_name // 姓名
            _this.blackIdcard = res.data.customer_infor.u_no // 身份证
            _this.blackMobile = res.data.customer_infor.mobile // 手机号码
          } else {
            alert(res.msg)
          }
        })
      },

      blackClose () {
        this.alipayShow = false
      },

      PriceAndPaylist () {
        getPriceAndPaylist(paramData).then(response => {
          if (response.code == 200) {
            this.MoneyNumber = response.data.price
            this.paylist = response.data.paylist
          }
        })
      },

      // 点击立即评估
      assessment () {
        let _this = this
        let idcard = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
        // 区位码校验
        // 出生年月日校验  前正则限制起始年份为1900;
        var year = this.blackIdcard.substr(6, 4), // 身份证年
          month = this.blackIdcard.substr(10, 2), // 身份证月
          date = this.blackIdcard.substr(12, 2), // 身份证日
          time = Date.parse(month + '-' + date + '-' + year), // 身份证日期时间戳date
          now_time = Date.parse(new Date()), // 当前时间戳
          now_time = Date.parse(new Date()), // 当前时间戳
          dates = (new Date(year, month, 0)).getDate()// 身份证当月天数
        // 校验码判断
        var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2) // 系数
        var b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2') // 校验码对照表
        var id_array = this.blackIdcard.split('')
        var sum = 0
        for (var k = 0; k < 17; k++) {
          sum += parseInt(id_array[k]) * parseInt(c[k])
        }
        if (time > now_time || date > dates) {
          alert('身份证号码出生日期不合法')
          return
        }
        if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
          alert('身份证号码不合法')
          return
        }
        if (this.blackUsername == '' || this.blackUsername.length < 2) {
          alert('请填写真实姓名')
        } else if (this.blackIdcard == '' || !idcard.test(this.blackIdcard)) {
          alert('请填写真实身份证号码')
        } else if (this.checkboxSure == false) {
          alert('请同意用户协议')
        } else {
          let param = {
            'u_no': _this.blackIdcard,
            'u_name': _this.blackUsername
          }
          paramData['data'] = param
          blacklistTesting(paramData).then(res => {
            if (res.data.free == 2) {
              this.alipayShow = true
            } else {
              this.$router.push({
                path: '/blackListReport',
                query: {
                  blackIdcard: _this.blackIdcard,
                  blackUsername: _this.blackUsername,
                  blackMobile: _this.blackMobile,
                  blackType: 3
                }
              })
            }
          })
        }
      },
      // 选择支付方式
      // alipay=支付宝扫码 alipaywap=支付宝wap wxnative=微信扫码 wxh5=微信h5
      pay (index, paytype, sm_paytype) {
        this.current = index
        let ua = navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.paytypedata = sm_paytype
        } else {
          this.paytypedata = paytype
        }
      },
      //  点击立即支付
      alipayZhiFu () {
        let that = this
        let param = {
          pay_type: this.paytypedata,
          u_no: this.blackIdcard,
          u_name: this.blackUsername
        }
        paramData['data'] = param
        alipay(paramData).then(response => {
          if (response.code == 512 || response.code == 511) {
            alert(response.message)
          } else {
            // location.href = response.data.url
            that.tanchuShow = true
            this.orderNum = response.data.order_num
            that.$router.push({
              path: '/blackPay',
              query: {
                blackIdcard: that.blackIdcard,
                blackUsername: that.blackUsername,
                blackMobile: that.blackMobile,
                orderNum: that.orderNum
              }
            })

            let open = window.open('about:blank')
            if (open === null || typeof(open) === 'undefined') {
              window.location.href = response.data.url
              return
            }
            setTimeout(() => {
              open.location = response.data.url
            }, 300)
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/blackList.scss";
</style>
