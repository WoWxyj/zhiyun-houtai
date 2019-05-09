<template>
    <div class="payDiv">
        <div class="loanTopTitle">支付<span @click="$router.back(-1)" class="loanTopTitleLeft"><img
                src="../../assets/img/return-go-icon.png" alt=""></span></div>
        <div class="alipayIcon-zhifu">
            <img src="../../assets/img/alipayIcon-zhifu.png" alt="">
        </div>
        <p>1.如果未打开支付宝客户端或未完成付款，请点击“继续支付”；</p>
        <p>2.如果你已完成，请点击“已完成付款”；</p>
        <div @click="zhifuJiXu" class="zhifuJiXu">继续支付</div>
        <div @click="zhifuWanCheng" class="zhifuWanCheng">已完成付款</div>
    </div>
</template>

<script>
  import {detetionList, paramData, alipay} from '../../api/api'

  export default {
    data () {
      return {
        blackUsername: '',
        blackIdcard: '',
        orderNum: '',
        blackMobile:''
      }
    },
    created () {
      this.$store.state.showBottomNav = false
    },
    mounted () {
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      this.orderNum = this.$route.query.orderNum
      this.blackIdcard = this.$route.query.blackIdcard
      this.blackMobile = this.$route.query.blackMobile
      this.blackUsername = this.$route.query.blackUsername
    },

    methods: {
      //继续支付
      zhifuJiXu () {
        let _this = this
        let param = {
          u_no: _this.blackIdcard,
          u_name: _this.blackUsername
        }
        paramData['data'] = param
        detetionList(paramData).then(res => {
          if (res.code == 408) {
            alipay(paramData).then(res => {
              if(res.code == 200){
                location.href = res.data.url
                mqq.ui.openUrl({
                  target: 2,
                  url: res.data.url
                })
              }
            })
          } else {
            _this.$router.push({
              path: '/blackListReport',
              query: {
                blackIdcard:  _this.blackIdcard,
                blackUsername: _this.blackUsername,
                blackMobile: _this.blackMobile,
                orderNum: _this.orderNum
              }
            })
          }
        })
      },
      //已完成付款
      zhifuWanCheng () {
        let _this = this
        let param = {
          u_no: _this.blackIdcard,
          order_num: _this.orderNum,
          u_name: _this.blackUsername
        }
        paramData['data'] = param
        detetionList(paramData).then(res => {
          if (res.code == 408) {
            alert(res.message)
          } else {
            _this.$router.push({
              path: '/blackListReport',
              query: {
                blackIdcard:  _this.blackIdcard,
                blackUsername: _this.blackUsername,
                blackMobile: _this.blackMobile,
                orderNum: _this.orderNum
              }
            })
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