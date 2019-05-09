<template>
    <div class="containermain" v-loading="listLoading">
        <div class="loanTopTitle">信用卡中心
            <span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../../assets/img/return-go-icon.png"
                                                                          alt=""></span></div>
        <div class="park">
            <h2>银行中心</h2>
            <ul class="barkCenter">
                <li v-for="bank in banks" @click="banksUrl(bank)">
                    <img :src="bank.icon" alt="">
                    <span>{{bank.name}}</span>
                </li>
            </ul>
        </div>

        <div class="sliderCard">
            <div class="swiper-container slider-card-ban">
                <div class="swiper-wrapper ">
                    <div class="swiper-slide" v-for="(item,index)  in banner" :key="index" @click="bannerUrl(item)">
                        <img :src="item.img">
                    </div>
                </div>
                <div class="swiper-pagination slider-icon-pagination" slot="pagination"></div>
            </div>
        </div>

        <div class="hotcard">
            <h2>热卡推荐</h2>
            <div class="card_list">
                <ul>
                    <li class="detail" v-for="credit in creditlist" @click="cardUrl(credit)">
                        <div class="de-left de-card-left">
                            <img :src="credit.credit_logo">
                        </div>
                        <div class="de-right de-card-right">
                            <h3>{{credit.credit_name}}</h3>
                            <p class="apply-for"><span class="quick">{{credit.apply_num}}</span> 人申请</p>
                            <p class="show">{{credit.credit_remark}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import {creditlist, paramData, applylook} from '../../api/api'

  export default {
    data () {
      return {
        listLoading: false,
        creditlist: [],
        banner: [],
        banks: []
      }
    },
    watch:{
      //监视categorys变化数据时
      sliders (value) {
        this.$nextTick(() => {
          var bigloan = new Swiper('.slider-card-ban', {
            loop: false,
            pagination: '.slider-icon-pagination'
          })
        })
      },
    },
    created () {
      this.$store.state.showBottomNav = true
    },
    mounted () {
      var mySwiper = new Swiper('.slider-card-ban', {
        autoplay: false,
        loop: false,
        observer: true //修改swiper自己或子元素时，自动初始化swiper
      })
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      this.getcreditlist(paramData)
    },
    methods: {
      getcreditlist (indexdata) {
        let that = this
        that.listLoading = true
        creditlist(indexdata).then(res => {
          that.listLoading = false
          if (res.code == 200) {
            that.banks = res.data.banks,
              that.banner = res.data.banner,
              that.creditlist = res.data.creditlist
          } else {
            alert(res.message)
          }
        })
      },
      cardUrl(item){
        let that = this
        that.listLoading = true
        paramData['protocol']['token'] = sessionStorage.getItem('token')
        let param = {
          operation_type: '0701',  //操作类型
          loan_infor_id: item.id,  //产品编号
          product_operation_type: '0000',  //产品操作类型0000=浏览  0001=申请
          product_type: '0000'  //产品类型0000=信用卡  0001=贷超
        }
        paramData['data'] = param
        applylook(paramData).then(res => {
          that.listLoading = false
          if (res.code == 200) {
            location.href = item.credit_url
          } else {
            alert(res.msg)
          }
        })

      },
      banksUrl(item){
        location.href = item.url
      },
      bannerUrl(ban){
        location.href = ban.url
      },
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/card.scss";
</style>

