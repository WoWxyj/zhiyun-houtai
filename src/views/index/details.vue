<template>
    <div class="detail" v-loading="listLoading">
        <div class="topbg detailtopbg">
            <img src="../../assets/changeImg/topbg.png" alt="">
            <span @click="$router.back(-1)" class="loanTopTitleLeft detailloanTopTitleLeft"><img
                    src="../../assets/img/return-go-icon.png" alt=""></span>
        </div>

        <div class="detail-desc">
            <ul>
                <li class="detail-desc-one">
                    <img src="../../assets/img/float_line_icon.png" alt="">
                    <span class="detail-num">{{fomp}}元</span>
                    <span v-if="chuckList.loantime_type == 1">月还款</span>
                    <span v-else>日还款</span>
                </li>
                <li class="detail-desc-two">
                    <img src="../../assets/img/float_line_icon.png" alt="">
                    <span class="detail-num">{{lixi}}元</span>
                    <span>总利息</span>
                </li>
                <li class="detail-desc-thr">
                    <img src="../../assets/img/float_line_icon.png" alt="">
                    <span class="detail-num">{{chuckList.loan_interest}}%</span>
                    <span v-if="chuckList.loantime_type == 1">月利率</span>
                    <span v-else>日利率</span>
                </li>
            </ul>
        </div>
        <div class="detail-product-top">
            <div class="detail-product-img"><img :src="chuckList.loan_logo" alt=""></div>
            <h3>{{ chuckList.loan_name }}</h3>
        </div>
        <div class="detail-product">
            <ul class="detail-product-center">
                <li>
                    <span>申请人数：{{ chuckList.applyfornum }}人</span>
                    <span>贷款范围：{{chuckList.loan_small}}-{{chuckList.loan_big}}元</span>
                </li>
                <li>
                    <span v-model='lilv'>利率：{{chuckList.loan_interest}}%</span>
                    <span v-if="chuckList.loantime_type == 1">期限范围：{{chuckList.periods_small}}-{{chuckList.periods_big}}个月</span>
                    <span v-else>期限范围：{{chuckList.periods_small}}-{{chuckList.periods_big}}日</span>
                </li>
            </ul>
            <ul class="detail-product-bottom">
                <li class="jine">
                    <span>金额：</span>
                    <div>
                        <input type="text" :placeholder="chuckList.loan_money" v-model="inpMoney" ref="inputInp"
                               @input="inputFunc">
                        <span>元</span>
                    </div>

                </li>
                <li class="qixian">
                    <span>期限：</span>
                    <div class="ritXi">
                        <select name="" v-model="loantime_typeMonth" v-on:change.prevent="selectTimeOption()"
                                v-if="chuckList.loantime_type == 1">
                            <option :value="optVal" v-for="(optVal) in chuckList.periods_all">{{ optVal }}个月</option>
                        </select>
                        <select name="" v-else v-model="loantime_typeMonth" @change="selectTimeOption()">
                            <option :value="optVal" v-for="(optVal) in chuckList.periods_all">{{ optVal }} 日</option>
                        </select>
                        <span class="qixian_icon"><img src="../../assets/img/qixian_top_down_icon.png" alt=""></span>
                    </div>
                </li>
            </ul>
        </div>

        <div class="tetailApply">
            <!-- 申请流程 -->
            <div class="application applicationProcess">
                <h3>申请流程</h3>
                <ul>
                    <li v-for="application in chuckList.apply_process">
                        <img :src="application.url">
                        <span>{{ application.name }}</span>
                    </li>
                </ul>
            </div>

            <!-- 申请条件 -->
            <div class="application applicationRequirement">
                <h3>申请条件</h3>
                <div class="applicationtext">
                    <p v-for="(applicat, index) in chuckList.apply_requirements" :key="index">{{ index+1 }}.
                        {{applicat}}</p>
                </div>
            </div>

            <!-- 审核条件 -->
            <div class="application auditInstructions">
                <h3>审核说明</h3>
                <div class="applicationtext">
                    <p>{{chuckList.explanation}}</p>
                </div>
            </div>

            <!-- 产品介绍 -->
            <div class="application introducingProducts">
                <h3>产品介绍</h3>
                <div class="applicationtext">
                    <p>{{chuckList.loan_introduction}}</p>
                </div>
            </div>
            <div class="accurat-checkbox white-checkbox">
                <input type="checkbox" id="myCheck" v-model="checkboxSure">
                <label for="myCheck"></label>
                <span>我已阅读并同意
                    <strong @click="goService">《借贷用户协议》</strong>
                </span>
            </div>
        </div>

        <!--<div class="now_apply" @click="gothreeProduct(chuckList)">立即申请</div>-->
        <div class="now_apply" @click="gothreeProduct(chuckList)">立即申请</div>
    </div>
</template>

<script>
  import {applylook, paramData} from '../../api/api'

  export default {
    data () {
      return {
        lilv: '',
        listLoading: false,
        inpMoney: '',  //最大借款金額
        loantime_typeMonth: '', //最短借款时间
        loantime_typeDay: '',
        checkboxSure: true,
        form: {
          type: []
        },
        chuckList: [],
        appUrl: '',
        registerAgreement:''
      }
    },
    created () {
      this.$store.state.showBottomNav = false
      // this.loantime_typeMonth = this.chuckList.periods_all[this.chuckList.periods_all.length-1];
    },
    mounted () {
      this.getdetail(1)
      this.inpMoney = this.chuckList.loan_money
    },
    computed: {
      fomp: function () {
        return parseInt(this.inpMoney / this.loantime_typeMonth + this.inpMoney * this.lilv)
      },
      lixi: function () {
        return parseInt(this.inpMoney * this.loantime_typeMonth * this.lilv)
      }

    },
    watch: {},
    methods: {
      //点击用户借贷协议
      goService(){
        location.href = this.registerAgreement
      },
      inputFunc: function () {
        console.log(this.inpMoney)
      },

      getdetail (type) {
        let that = this
        this.listLoading = true
        paramData['protocol']['token'] = sessionStorage.getItem('token')
        let operation_type
        let ua = navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          operation_type = type == 1 ? '0406' : '0404'
        } else {
          operation_type = type == 1 ? '0106' : '0104'
        }
        let param = {
          operation_type: operation_type,
          loan_infor_id: this.$route.query.id,
          product_type: '0001',
          product_operation_type: type == 1 ? '0000' : '0001'
        }
        paramData['data'] = param
        applylook(paramData).then(res => {
          that.listLoading = false
          if (res.code == 200) {
            that.chuckList = res.data
            that.inpMoney = res.data.loan_money   //默认借款金額
            that.loantime_typeMonth = res.data.periods_all[res.data.periods_all.length - 1]  //最短借款时间
            that.lilv = res.data.loan_interest / 100
            that.registerAgreement = res.data.register_agreement
            localStorage.setItem('registerAgree', res.data.register_agreement)
          } else {
            alert(res.msg)
          }
        })
      },
      selectTimeOption: function () {
        console.log(this.loantime_typeMonth)
      },
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/detail.scss";
</style>
