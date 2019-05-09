<template>
  <div class="accurateRecom" v-loading="listLoading">
    <div class="newCutTitle">精准推荐
      <span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../../assets/img/return-icon.png"
                                                                    alt=""></span>
    </div>
    <img class="accurateRecomBan" src="../../assets/img/loan_AccurateRecom_banner3.png" alt="">
    <p class="accurateRecomText">贷款资金由<img src="../../assets/img/bank-logo-icon.png" alt=""><span>平安银行</span>提供</p>
    <div class="accuratPhoneYzm">
      <p class="accuratPhone">
        <span>月收入</span>
        <input class="accuratPhone-input accuratIncome" v-model="MonthlyIncome" name="" value="请填写月收入" onfocus="if (value =='请填写月收入'){value =''}" onblur="if (value ==''){value='请填写月收入'}" type="text"
               maxlength="6" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
        <img class="accuratPhoneImg" src="../../assets/img/select-icon-bg.png" alt="">
      </p>
      <div class="accuratPhone">
        <span>所在省市</span>
        <div class="linkage">
          <el-select v-model="sheng" @change="choseProvince" placeholder="省级地区">
            <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="shi" @change="choseCity" placeholder="市级地区">
            <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
        </div>
        <img class="accuratPhoneImg" src="../../assets/img/select-icon-bg.png" alt="">
      </div>
    </div>
    <ul class="accurat-redio">
      <li class="big-small-show">
        <div class="accurat-redio-div">是否有房<span>仅作为财产证明</span></div>
        <div class="accurat-redio-right">
          <label v-for="(item,index) in houses"><input name="house" type="radio" :value="item.value"
                                                       v-model="housechecked"><span>{{item.name}}</span></label>
        </div>
      </li>
      <li class="big-small-show">
        <div class="accurat-redio-div">是否有车<span>仅作为财产证明</span></div>
        <div class="accurat-redio-right">
          <label v-for="(item,index) in cars"><input name="car" type="radio" :value="item.value"
                                                     v-model="carchecked"><span>{{item.name}}</span></label>
        </div>
      </li>
      <li class="normal-show">
        <div class="accurat-redio-div">是否有公积金</div>
        <div class="accurat-redio-right">
          <label v-for="(item,index) in accumula"><input name="accumulationFund" type="radio"
                                                         :value="item.value"
                                                         v-model="accumchecked"><span>{{item.name}}</span></label>
        </div>
      </li>
      <li class="normal-show">
        <div class="accurat-redio-div">是否有寿险保单</div>
        <div class="accurat-redio-right">
          <label v-for="(item,index) in insurances"><input name="insurance" type="radio" :value="item.value"
                                                           v-model="insurchecked"><span>{{item.name}}</span></label>
        </div>
      </li>
    </ul>
    <div class="salaryStyle">
      <span>工资发放形式</span>
      <ul>
        <li v-for="(salary, index) in salaries" v-bind:id="index" :class="{'active':sala === index}" :key="index"
            @click="getItme($event,index)">{{ salary.data }}
        </li>
      </ul>
    </div>
    <div class="applyStyle applynotop">
      <span>近6个月贷款申请情况</span>
      <ul>
        <li v-for="(apply, index) in applies" v-bind:id="index" :class="{'active':appl === index}" :key="index"
            @click="getItme1($event,index)">{{ apply.data }}
        </li>
      </ul>
    </div>

    <div class="accurat-checkbox accuratThree-checkbox">
      <input type="checkbox" id="myCheck" v-model="checkboxSure">
      <label for="myCheck"></label>
      <span>我已阅读并同意<strong @click="goService">《借贷用户协议》</strong></span>
    </div>
    <p class="accurat-introduce">平台郑重承诺所有贷款申请在未成功放款前不收取任何费用，为保障您的资金安全，请不要相信任何要求您支付费用的信息、邮件、电话等不实信息。</p>
    <div class="cooperAgency">
      <h3>
        <span class="cooperAgencyLeftLine"></span>
        合作金融机构
        <span class="cooperAgencyintro">正规、安全、低利率</span>
        <span class="cooperAgencyRightLine"></span>
      </h3>
      <img src="../../assets/img/loan_AccurateRecom_img.png" alt="">
    </div>
    <div class="accurat-position">
      <p>真实的资料信息可以提高您的贷款成功率</p>
      <div class="accurat-btn" @click="accuratApplyBtn">立即提交申请</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {paramData, userRecommend, recommendSecond} from '../../api/api'

  export default {
    data () {
      return {
        listLoading: false,
        MonthlyIncome: '',
        checkboxSure: true,
        mobile: '',
        sala: 0,
        appl: 0,
        salaries: [
          {id: 0, data: '银行代发'},
          {id: 1, data: '转账工资'},
          {id: 2, data: '现金发放'}
        ],
        applies: [
          {id: 0, data: '申请少与3个'},
          {id: 1, data: '申请多与3个'},
          {id: 2, data: '没有申请'}
        ],
        housechecked: '1',
        carchecked: '1',
        accumchecked: '0',
        insurchecked: '1',
        houses: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],
        cars: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],
        accumula: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],
        insurances: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],
        mapJson: '../../../static/json/map.json',
        province: '',
        sheng: '',
        shi: '',
        shi1: [],
        city: '',
        registerAgreement:''
      }
    },
    created () {
      this.$store.state.showBottomNav = false
    },
    mounted () {
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      this.userRecommendOne(paramData);
      this.registerAgreement = localStorage.getItem('registerAgree')
      console.log(this.registerAgreement)
    },

    methods: {

      //借贷用户协议
      goService(){
        location.href = this.registerAgreement
      },

      // 判断是否登录
      userRecommendOne: function () {
        let _this = this
        userRecommend(paramData).then(res => {
          if (res.code == 200) {
            _this.MonthlyIncome = res.data.customer_infor.u_income //月收入
            _this.sheng = res.data.customer_infor.u_province   //城市
            _this.shi = res.data.customer_infor.u_city   //城市
            _this.housechecked = res.data.customer_infor.u_house  //房
            _this.carchecked = res.data.customer_infor.u_car    //车
            _this.accumchecked = res.data.customer_infor.u_fund  //公积金
            _this.insurchecked = res.data.customer_infor.u_policy  //寿险保单
            _this.sala = parseInt(res.data.customer_infor.u_paystatus)  //工资发放方式
            _this.appl = parseInt(res.data.customer_infor.apply_situation)  //申请情况
            _this.mobile = res.data.customer_infor.mobile  //申请情况
            if(_this.appl == null){
              _this.appl = 0
            }
          } else {
            alert(res.msg)
          }
        })
      },
      accuratBtnLocal () {
        this.$router.push({path: '/accurateRecomTwo'})
      },
      getItme ($event, index) {
        console.log(index)
        this.sala = index
      },
      getItme1 ($event, index) {
        console.log(index)
        this.appl = index
      },
      accuratApplyBtn () {
        if (this.MonthlyIncome == '' || this.MonthlyIncome < 1) {
          alert('请填写月收入')
        } else if (this.sheng == '') {
          alert('请选择省份')
        } else if (this.shi == '') {
          alert('请选择城市')
        } else if (this.checkboxSure == false) {
          alert('请同意服务协议')
        } else {
          let _this = this
          let operation_type
          let ua = navigator.userAgent.toLowerCase()
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            operation_type = '0404'
          } else {
            operation_type = '0104'
          }
          let param = {
            'operation_type': '0105', //填写资料申请
            'u_income': _this.MonthlyIncome, //月收入
            'u_province': _this.sheng, //城市
            'u_city': _this.shi, //城市
            'u_house': _this.housechecked, //房
            'u_car': _this.carchecked, //车
            'u_fund': _this.accumchecked, //公积金
            'u_policy': _this.insurchecked, //寿险保单
            'u_paystatus': _this.sala, //工资发放方式
            'apply_situation': _this.appl //申请情况
          }
          paramData['data'] = param
          recommendSecond(paramData).then(res => {
            if (res.code == 200) {
              let str = JSON.stringify(res.data)
              _this.$router.push({path: '/applyResults',
                query: {
                  tuijiandata: str
                }
              })
            } else {
              alert(res.message)
            }
          })
        }

        // this.$router.push({path: '/applyResults'})
      },
      // 加载china地点数据，三级
      getCityData: function () {
        var that = this
        axios.get(this.mapJson).then(function (response) {
          if (response.status == 200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
          }
          else {
            console.log(response.status)
          }
        }).catch(function (error) {
          console.log(typeof+error)
        })
      },
      // 选省

      choseProvince: function (e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children
            this.sheng = this.province[index2].value
            this.shi = this.province[index2].children[0].value

          }

        }

      },
      // 选市
      choseCity: function (e) {
        console.log(e)
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
            this.shi = this.city[index3].value;
          }
        }
      }
    },
    created: function () {
      this.getCityData()
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/common.scss";
  @import "../../assets/scss/loan.scss";
</style>

