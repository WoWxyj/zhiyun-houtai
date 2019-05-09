<template>
    <div class="bigloan" v-loading="listLoading">
        <div class="newCutTitle">{{cutTitle}}
            <span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../../assets/img/return-icon.png" alt=""></span>
        </div>
        <div class="bigLoanBanner"><img :src="parambannerUrl"></div>
        <div class="bigLoanContent">
            <ul class="tab-card-div">
                <li v-for="item in items" @click="goProduct(item.id)">
                    <div class="bigLoanAllDev">
                        <div class="bigLoanTop">
                            <div class="bigLoanIcon"><img :src="item.loan_logo" alt=""></div>
                            <div class="bigLoanName">
                                <h3>{{item.loan_name}}</h3>
                                <p>{{item.product_brief}}</p>
                            </div>
                            <div class="bigLoanApply">
                                <span>{{item.applyfornum}}</span>成功申请
                            </div>
                        </div>
                        <div class="bigLoanBottom">
                            <div class="bigLoanBottomFirst">
                                <h4 class="bigLoanMoney">{{item.loan_small}}-{{item.loan_big}}</h4>
                                <span>可贷金额（元）</span>
                            </div>
                            <div class="bigLoanBottomSecond">
                                <h4>{{item.loan_interest}}%</h4>
                                <span v-if="item.loantime_type == 1">月利率（%）</span>
                                <span v-else>日利率（%）</span>
                            </div>
                            <div class="bigLoanBottomThird">
                                <h4>{{item.min_loan_time}}</h4>
                                <span>放款时间</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
  import {getdetails, paramData} from '../../api/api'

  export default {
    data () {
      return {
        listLoading: false,
        items: [],
        id: ''
      }
    },
    created () {
      this.$store.state.showBottomNav = false
      this.cutTitle = this.$route.query.moduleName
      this.parambannerUrl = this.$route.query.parambannerUrl
      this.id = this.$route.query.id
      console.log(this.id)
    },
    mounted () {
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      paramData['data']['module_id'] = [this.id]
      console.log(paramData)
      this.getData(paramData)
    },
    methods: {
      getData (dateindex) {
        let that = this
        that.listLoading = true
        getdetails(dateindex).then(res => {
          that.listLoading = false
          if (res.code == 200) {
            console.log(that.id)
            that.items = res.data.loanlist
          } else {
            // alert(res.msg)
          }
        })
      }
    },

  }
</script>


<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/bigLoan.scss";
</style>

