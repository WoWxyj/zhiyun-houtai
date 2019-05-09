<template>
    <div class="assessment" v-loading="listLoading">
        <div class="loanTopTitle" style="margin-bottom: 88px;">额度测评
            <span @click="$router.back(-3)" class="loanTopTitleLeft"><img src="../../assets/img/return-go-icon.png"
                                                                          alt=""></span>
        </div>
        <div class="scoringAll">
            <div class="scoring">
                <img class="scoringImg" :src="assessmentIconImg" alt="">
                <div class="scoringText">
                    <p>测评得分</p>
                    <h3>{{ score }}</h3>
                    <span>额度{{ loanMoney }}元</span>
                </div>
            </div>
            <div class="borrowMoney" @click="borrowMoney">立即借款</div>
        </div>

        <ul class="loanContDiv">
            <h3 class="loanContDivScorNotice">
                <span class="applyListLeft"><img src="../../assets/img/biaotizhuangshi_1.png" alt=""></span>
                匹配极高产品推荐
                <span class="applyListRight"><img src="../../assets/img/biaotizhuangshi_2.png" alt=""></span>
            </h3>
            <li v-for="loanprot in recommendList" @click.stop="goProduct(loanprot.id)">
                <div class="loanContDivTop">
                    <div class="loanContDivTopImg">
                        <img :src="loanprot.loan_logo" alt="">
                    </div>
                    <div class="loanContDivTopTitlt">
                        <h3>{{loanprot.loan_name}}</h3>
                        <p>可贷金额：
                            <span>{{loanprot.loan_small}}-{{loanprot.loan_big}}</span>
                        </p>
                        <p>参考日利率：
                            <span>{{loanprot.loan_interest}}%</span>
                        </p>
                    </div>
                    <div class="loanContDivTopapply">
                        <span>{{loanprot.applyfornum}}成功申请</span>
                        <div class="loanContApply" @click.stop="gothreeProduct(loanprot)">立即申请</div>
                    </div>
                </div>
                <div class="loanContDivBottom">{{loanprot.loan_introduction}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        listLoading: false,
        loanprots: [],
        loanMoney: this.$route.query.loanMoney,
        score: this.$route.query.score,
        recommendList:[],
        assessmentIconImg:require("../../assets/img/assessment-icon-img2.png")
      }
    },
    created () {
      this.$store.state.showBottomNav = false
      this.getTuijian(1)
    },

    mounted(){
      if(this.score <= 200){
        this.assessmentIconImg = require("../../assets/img/assessment-icon-img1.png")
      }else if(this.score <= 400){
        this.assessmentIconImg = require("../../assets/img/assessment-icon-img2.png")
      }else if(this.score <= 600){
        this.assessmentIconImg = require("../../assets/img/assessment-icon-img3.png")
      }else if(this.score <= 800){
        this.assessmentIconImg = require("../../assets/img/assessment-icon-img4.png")
      }else if(this.score <= 1000){
        this.assessmentIconImg = require("../../assets/img/assessment-icon-img5.png")
      }else if(this.score <= 1200){
        this.assessmentIconImg = require("../../assets/img/assessment-icon-img6.png")
      }
    },
    methods:{
        borrowMoney () {
          this.$router.push({path: '/accurateRecom'})
        }
    }
  }
</script>


<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/loan.scss";
</style>
