<template>
    <div class="applyResults" v-loading="listLoading">
        <div class="loanTopTitle">申请结果<span @click="$router.back(-3)" class="loanTopTitleLeft"><img
                src="../../assets/img/return-go-icon.png" alt=""></span></div>
        <img class="applyAreadyOne" src="../../assets/img/apply_aready_ong.png" alt="">
        <img class="applyAreadyTwo" src="../../assets/img/apply_aready_two.png" alt="">
        <div class="applyAreadyIcon">
            <img src="../../assets/img/apply_aready_icon.png" alt="">
            <h3>申请已提交</h3>
        </div>
        <ul class="applyResultsProcess">
            <li>
                <img src="../../assets/img/applyResults-apply-icon.png" alt="">
                <span>提交申请</span>
            </li>
            <li>
                <img src="../../assets/img/applyResults-tel-icon.png" alt="">
                <span>专人电话服务</span>
            </li>
            <li>
                <img src="../../assets/img/applyResults-withdrawal-icon.png" alt="">
                <span>到店提现</span>
            </li>
        </ul>
        <div class="applyResultsNotice">
            <p>专属顾问将在一个工作日内致电给您</p>
            <p>届时为您提供详细指引，请保持电话畅通</p>
        </div>
        <div class="applyResultsRecomm">
            <h3>
                <span class="applyListLeft"><img src="../../assets/img/biaotizhuangshi_1.png" alt=""></span>
                已为您匹配到以下机构
                <span class="applyListRight"><img src="../../assets/img/biaotizhuangshi_2.png" alt=""></span>
            </h3>
            <ul>
                <li v-for="applyProd in applyProdes">
                    <span class="applyNum">{{applyProd.apply_num}}人申请</span>
                    <div class="applyResultsLeft">
                        <p class="applyLeftMoney"><span>{{applyProd.loan_amount}}</span></p>
                        <p>平均可借</p>
                    </div>
                    <div class="applyResultsRight">
                        <p class="applyRightTitle">{{applyProd.client_name}}</p>
                        <p>合作机构：{{applyProd.conperration}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
  import {paramData} from '../../api/api'

  export default {
    data () {
      return {
        listLoading: false,
        applyProdes: []
      }
    },
    created () {
      this.$store.state.showBottomNav = false
    },
    mounted () {
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      let strer = JSON.parse(this.$route.query.tuijiandata)
      this.applyProdes = strer

    },
    methods: {
      // recommendResult: function () {
      //   let param = {
      //     operation_type: '0105', //填写资料申请
      //   }
      //   paramData['data'] = param
      //   recommendSecond(paramData).then(res => {
      //     if (res.code == 200) {
      //           this.applyProdes = res.data;
      //     } else {
      //       alert(res.msg)
      //     }
      //   })
      // },
    }
  }
</script>


<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/loan.scss";
</style>

