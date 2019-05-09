<template>
    <div class="applyLoan" v-loading="listLoading">
        <div class="loanTopTitle">信用卡浏览
            <span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../../assets/img/return-go-icon.png"
                                                                          alt=""></span></div>

        <div class="browcard browcarding" v-show="browsingShow">
            <img src="../../assets/img/no-browsing-icon.png" alt="">
            <p class="introduce">您还没有浏览记录哟~</p>
            <div class="btnno" @click="goIndex">点击去浏览</div>
        </div>

        <div class="card_list cardListBower" v-show="applyListDiv">
            <ul>
                <li class="detail" v-for="credit in creditlist" @click="cardUrl(credit)">
                    <div class="de-left de-card-left">
                        <img :src="credit.credit_logo">
                    </div>
                    <div class="de-right de-card-right">
                        <h3>{{credit.credit_name}}</h3>
                        <p class="apply-for">{{credit.create_date}}</p>
                        <p class="show">{{credit.credit_remark}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <bowerHistory></bowerHistory>
    </div>
</template>

<script>
  import {applyrecord, paramData} from '../../api/api'
  import bowerHistory from '../../components/bowerHistory.vue'

  export default {
    data () {
      return {
        listLoading: false,
        creditlist: [],
        applyListDiv: true,
        browsingShow: false
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
    },
    methods: {
      getData (indexdata) {
        let that = this
        that.listLoading = true
        let param = {
          operation_type: '0701'
        }
        indexdata['data'] = param
        applyrecord(indexdata).then(res => {
          that.listLoading = false
          if (res.code == 200) {
            if (res.data == "") {
              this.browsingShow = true
              this.applyListDiv = false
            } else {
              this.creditlist = res.data
            }
          } else {
            alert(res.message)
          }
        })
      },

      cardUrl(item){
        location.href = item.credit_url
      },

      goIndex () {
        this.$router.push({path: '/card'})
      },
    }
  }
</script>


<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/search.scss";
    @import "../../assets/scss/noline.scss";
</style>
