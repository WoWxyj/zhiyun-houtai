<template>
    <div class="recomTwo" v-loading="listLoading">
        <div class="newCutTitle">精准推荐
            <span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../../assets/img/return-icon.png"
                                                                          alt=""></span>
        </div>
        <img class="chooseLoan" src="../../assets/img/loan_AccurateRecom_banner2.png" alt="">
        <div class="recomTwoDiv">
            <!-- 意向金额 -->
            <div class="intentionMoney">
                <p>您的意向金额</p>
                <h3>{{ loanAmountId }}</h3>
                <span @click="goRrecom">修改意向<img src="../../assets/img/intentionMoney-icon-jiantou.png" alt=""></span>
            </div>
            <div class="fff"></div>
            <!-- 马上投递 -->
            <div class="delivery" @click="deliveryGo">
                <p>为您匹配100%合适的收款方</p>
                <img src="../../assets/img/delivery-ban-icon.png" alt="">
                <p class="deliveryNumber">通过率高达80%以上</p>
            </div>
            <!-- 更多专属推荐 -->
            <div class="recommendMore">
                <h3 class="recommendMoreTitle">
                    <span class="applyListLeft"><img src="../../assets/img/biaotizhuangshi_1.png" alt=""></span>
                    更多专属推荐
                    <span>跟您意向相近的人也在看</span>
                    <span class="applyListRight"><img src="../../assets/img/biaotizhuangshi_2.png" alt=""></span>
                </h3>
                <ul>
                    <li v-for="recomProduct in recommendList" @click.stop="goProduct(recomProduct.id)">
                        <img :src="recomProduct.loan_logo" alt="">
                        <h3>{{recomProduct.loan_name}}</h3>
                        <span class="canBorrowLines">可借额度</span>
                        <span class="borrowLines">{{recomProduct.loan_small / 10000}}-{{recomProduct.loan_big / 10000}}万</span>
                        <span class="borrowPerson">{{recomProduct.applyfornum}}人已申请</span>
                        <div class="recommendApply" @click.stop="gothreeProduct(recomProduct)">立即申请</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
  import {
    paramData,
    getyzm,
    userRecommend,
    getsearch,
    recommendStart
  } from '../../api/api'

  export default {
    data () {
      return {
        listLoading: false,
        loanAmountId: '',
        recommendList: [],
        obType: '',
        monNumber: '',
        userData: {}
      }
    },
    mounted () {
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      this.loanAmountId = this.$route.query.money
      this.userData = JSON.parse(localStorage.getItem('userdata'))
      console.log(this.userData)
      this.loanAmountId =  this.userData.loan_money
      this.getTuijian(1)
      this.obType = this.$route.query.type
      if (this.obType == 'ob') {
        this.loanAmountId = this.$route.query.monNumber
      }
    },
    methods: {
      deliveryGo () {
        // let str = JSON.stringify(this.$route.query)
        if (JSON.stringify(this.$route.query) == '{}') {
          let _this = this
          let operation_type
          let ua = navigator.userAgent.toLowerCase()
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            operation_type = '0404'
          } else {
            operation_type = '0104'
          }

          paramData['data'] = this.userData
          recommendStart(paramData).then(res => {
            if (res.code == 200) {
              _this.goApplyProgress(res.data.loan_infor)
            } else {
              alert(res.message)
            }
          })
        } else {
           this.goApplyProgress( JSON.parse(this.$route.query.str))
        }
      },
      //跳转到申请产品页面
      goApplyProgress (loan) {
        console.log(loan)
        this.$router.push({
          path: '/applyProgress',
          query: {
            loan_name: loan.loan_name,
            loan_url: loan.app_url,
            loan_id: loan.id,
            loan_money:loan.loan_money
          }
        })
      },
      //点击修改意向
      goRrecom () {
        this.$router.push({path: '/accurateRecom'})
      }
    },
    created () {
      this.$store.state.showBottomNav = false
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/loan.scss";
</style>
