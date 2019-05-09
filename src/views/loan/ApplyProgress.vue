<template>
    <div class="applyProgressALL" v-loading="listLoading">
        <div class="loanTopTitle">申请进度
            <span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../../assets/img/return-go-icon.png" alt=""></span>
        </div>
        <div class="applyProgressALL" v-loading="listLoading">
            <div class="applyProgress">
                <div class="progressDiv">
                    <img src="../../assets/img/progress-icon.png" alt="">
                    <p>已为您匹配到{{loanAmountId}}</p>
                </div>
            </div>
        </div>

        <div class="applyProgress feedbackProgress" v-show="ProgressShow">
            <div class="progressDiv feedbackDiv">
                <h3>请反馈您的申请体验</h3>
                <p>质子贷会为您提供更好的服务</p>
                <div class="applyProgressBtn applyProgressAready" @click="applyProgressAready">完成申请，继续看看</div>
                <div class="applyProgressBtn applyProgressNo" @click="applyProgressNo">不满意，看看其他</div>
            </div>
        </div>
    </div>
</template>

<script>
  import {getsearch, paramData, applylook} from '../../api/api'
  export default {
    data () {
      return {
        listLoading: false,
        loanAmountId: '',
        ProgressShow: false
      }
    },
    created () {
      this.$store.state.showBottomNav = false
    },
    mounted () {
      this.loanAmountId = this.$route.query.loan_name
      let that = this
      setTimeout(function () {
        location.href = that.$route.query.loan_url
        paramData['protocol']['token'] = sessionStorage.getItem('token')
        let operation_type
        let ua = navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          operation_type = '0404'
        } else {
          operation_type = '0104'
        }
        let param = {
          operation_type: operation_type,
          loan_infor_id: that.$route.query.loan_id,
          product_type: '0001',
          product_operation_type: '0001',
          apply_amount: that.$route.query.loan_money
        }
        paramData['data'] = param
        applylook(paramData).then(res => {
        })
        that.ProgressShow = true;
      }, 500)
    },
    methods:{
      applyProgressAready(){
        this.$router.push({path: '/accurateRecomTwo'})
        // this.$router.push({path: '/accurateRecom'})
      },
      applyProgressNo(){
        paramData['protocol']['token'] = sessionStorage.getItem('token')
        let _this = this
        let param = {
          param_type: ['0017']
        }
        paramData['data'] = param
        getsearch(paramData).then(res => {
          if(res.code == 200){
            _this.$router.push({
              path: '/newcutloan',
              query: {
                id: res.data[0].id,
                moduleName: res.data[0].module_name,
                parambannerUrl: res.data[0].parambanner_url
              }
            })
          }
        })
        // this.$router.push({path: '/newcoutloan'})
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/loan.scss";
</style>
