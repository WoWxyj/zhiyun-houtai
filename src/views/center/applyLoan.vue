<template>
    <div class="applyLoan" v-loading="listLoading">
        <div class="loanTopTitle">申请记录
            <span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../../assets/img/return-go-icon.png"
                                                                          alt=""></span></div>

        <div class="browcard" v-show="browsingShow">
            <img src="../../assets/img/no-apply-icon.png" alt="">
            <p class="introduce">您还没有申请记录哟~</p>
            <div class="btnno" @click="goIndex">点击去申请</div>
        </div>

        <div class="applyList" v-show="applyListDiv">
            <ul>
                <li v-for="apply in applyList" @click.stop="goProduct(apply.id)" :class="noclik">
                    <div class="applyImg">
                        <img :src="apply.loan_logo" alt="">
                    </div>
                    <div class="applyDesc">
                        <h3>{{ apply.loan_name }}
                            <span>{{apply.create_date}}</span>
                        </h3>
                        <p>预计可借
                            <span>{{ apply.loan_small/10000 }} - {{ apply.loan_big/10000 }}万</span>
                            <i></i>{{ apply.min_loan_time }}放款</p>
                    </div>
                </li>
            </ul>
        </div>
        <!--<bowerHistory></bowerHistory>-->
        <div class="recommend">
            <h3 class="applyListTitle">
                <span class="applyListLeft"><img src="../../assets/img/biaotizhuangshi_1.png" alt=""></span>
                试试这些通过率高的口子吧
                <span class="applyListRight"><img src="../../assets/img/biaotizhuangshi_2.png" alt=""></span>
            </h3>
            <!--<bowerHistory></bowerHistory>-->
            <ul>
                <li v-for="searchindex in recommendList" @click.stop="goProduct(searchindex.id)">
                    <img :src="searchindex.loan_logo">
                    <h3>{{ searchindex.loan_name }}</h3>
                    <p>可借
                        <span>{{ searchindex.loan_small/10000 }} - {{ searchindex.loan_big/10000 }}万</span>
                    </p>
                    <div class="qujie" @click.stop="goProduct(searchindex)">去借款</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {applyrecord, paramData} from '../../api/api'
import bowerHistory from '../../components/bowerHistory.vue'

export default {
  data () {
    return {
      listLoading: false,
      applyList: [],
      recommendList: [],
      browsingShow: false,
      applyListDiv: true,
      noclik: ''
    }
  },
  components: {
    bowerHistory
  },
  created () {
    this.$store.state.showBottomNav = false
  },
  mounted () {
    paramData['protocol']['token'] = sessionStorage.getItem('token')
    this.getData(paramData)
    this.getTuijian(1)
  },
  methods: {
    // 获取申请列表
    getData (indexdata) {
      let that = this
      that.listLoading = true
      let operation_type
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        operation_type = '0404'
      } else {
        operation_type = '0104'
      }
      let param = {
        operation_type: operation_type
      }
      indexdata['data'] = param
      applyrecord(indexdata).then(res => {
        that.listLoading = false
        if (res.code == 200) {
          if (res.data == '') {
            this.browsingShow = true
            this.applyListDiv = false
          } else {
            this.applyList = res.data
            for(var i=0; i< res.data.length; i++){
              if(res.data[i].is_show == 2){
                this.noclik = 'noclick'
              }
            }
          }
        } else {
          alert(res.message)
        }
      })
    },

    goIndex () {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/search.scss";
    @import "../../assets/scss/noline.scss";
</style>
