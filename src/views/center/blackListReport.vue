<template>
  <div class="blackListreportAll" v-loading="listLoading">
    <div class="newCutTitle">黑名单查询报告<span @click="$router.back(-1)" class="loanTopTitleLeft"><img
      src="../../assets/img/return-icon.png" alt=""></span></div>
    <div class="blackListreport">
      <p class="reportTitle left">{{ blackUsername }}的信用报告</p>
      <h3 class="left">{{ reportList.pass_rate }}</h3>
      <p class="left">申请通过率</p>
    </div>
    <div class="blackListMessage">
      <div class="blackMessageLeft">
        <p>
          <span>借款人：</span>{{ reportList.u_name }}</p>
        <p>
          <span>手机号：</span>{{ reportList.mobile }}</p>
        <p>
          <span>身份证号：</span>{{ reportList.certNo }}</p>
        <p>
          <span>查询时间：</span>{{ reportList.select_time }}</p>
      </div>
      <div class="blackMessageright" @click="goAgain">再次查询</div>
    </div>

    <div class="creditReport">
      <h3>信用报告</h3>
      <div class="creditReportintro">
        <div class="successRate">
          <div class="creditReportBtn">您的申请成功率</div>
          <p class="dark">{{reportList.apply_rate}}</p>
          <p v-show="fengxianShow">{{fengxian}}</p>
        </div>
        <div class="successRate">
          <div class="creditReportBtn creditReportBtnSec">黑名单检测结果</div>
          <p v-for="report in reportList.report">{{ report }}</p>
        </div>
      </div>
    </div>

    <div class="creditReport highdisk">
      <h3>贷款机构安全评级</h3>
      <div class="highRisk"><img src="../../assets/img/high-disk-icon.png" alt=""> {{ reportList.apply_rate }}</div>
    </div>
  </div>
</template>


<script>
  import {paramData, detetionList, blacklistTesting} from '../../api/api'

  export default {
    data () {
      return {
        listLoading: false,
        blackUsername: '',
        blackMobile: '',
        blackIdcard: '',
        tongguo: parseInt(Math.random() * (88 - 75 + 1) + 75, 10),
        reportList: [],
        fengxian: '您当前有黑名单风险，建议您关注还款动向',
        fengxianShow: false,
        report: '',
        style: ''

      }
    },
    created () {
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      this.userRecommendOne(paramData)
      this.$store.state.showBottomNav = false
    },
    methods: {
      // 判断是否登录
      userRecommendOne: function () {
        let _this = this
        _this.blackMobile = this.$route.query.blackMobile //手机号
        _this.blackUsername = this.$route.query.blackUsername  //姓名
        _this.blackIdcard = this.$route.query.blackIdcard  //身份证
        _this.orderNum = this.$route.query.orderNum  //订单号
        _this.style = this.$route.query.blackType

        if (_this.style == 3) {
          let param = {
            u_no: _this.blackIdcard,
            u_name: _this.blackUsername,
            mobile: _this.blackMobile
          }
          paramData['data'] = param
          blacklistTesting(paramData).then(res => {
            if (res.code == 200) {
              this.reportList = res.data
            }
          })
        } else {
          let param = {
            u_no: _this.blackIdcard,
            u_name: _this.blackUsername,
            mobile: _this.blackMobile,
            order_num: _this.orderNum
          }
          paramData['data'] = param
          detetionList(paramData).then(res => {
            if (res.code == 200) {
              _this.reportList = res.data
              if (res.data.apply_rate == '较低') {
                this.fengxianShow = show
              }
            }
          })
        }

      },

      goAgain () {
        this.$router.push({path: '/blackListMobile'})
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common.scss";
  @import "../../assets/scss/blackList.scss";
</style>
