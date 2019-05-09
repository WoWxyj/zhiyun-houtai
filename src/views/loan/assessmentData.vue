<template>
    <div class="assessmentData" v-loading="listLoading">
        <div class="loanTopTitle" style="margin-bottom: 88px;">完善资料额度测评
            <span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../../assets/img/return-go-icon.png"
                                                                          alt=""></span>
        </div>
        <p class="assessmentDataNotice">标*表示必填项，信息填写越完整，贷款成功率越高</p>
        <div class="assessmentBasicInfo">
            <div class="assessmentBasicInfoTitle">
                <h3><img class="BasicInfoIcon" src="../../assets/img/BasicInfo-icon.png" alt="">基本信息</h3>
            </div>
            <div class="basicInfoDetail" style="border-bottom: 16px #f3f3f3 solid;">
                <p class="accuratPhone">
                    <span>
                        <strong>*</strong>姓名</span>
                    <input class="accuratPhone-input" v-model="username" type="text" name="" placeholder="请填写姓名">
                </p>
                <p class="accuratPhone">
                    <span>
                        <strong>*</strong>身份证号</span>
                    <input class="accuratPhone-input" v-model="IDcard" type="text" name="" placeholder="请填写身份证号">
                </p>
                <p class="accuratPhone">
                    <span>
                        <strong>*</strong>月收入</span>
                    <input class="accuratPhone-input" v-model="MonthlyIncome" type="text" name="" value="请填写月收入"
                           onfocus="if (value =='请填写月收入'){value =''}" onblur="if (value ==''){value='请填写月收入'}"
                           onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                           onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
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

            <div class="basicInfoDetail">
                <ul class="accurat-redio">
                    <li class="big-small-show">
                        <div class="accurat-redio-div">是否有房
                            <span>仅作为财产证明</span>
                        </div>
                        <div class="accurat-redio-right">
                            <label v-for="(item,index) in housecheckList">
                                <input name="house" type="radio" :value="item.value" v-model="housechecked">
                                <span>{{item.name}}</span>
                            </label>
                        </div>
                    </li>
                    <li class="big-small-show">
                        <div class="accurat-redio-div">是否有车
                            <span>仅作为财产证明</span>
                        </div>
                        <div class="accurat-redio-right">
                            <label v-for="(item,index) in carcheckList">
                                <input name="car" type="radio" :value="item.value" v-model="carchecked">
                                <span>{{item.name}}</span>
                            </label>
                        </div>
                    </li>
                    <li class="normal-show">
                        <div class="accurat-redio-div">是否有社保</div>
                        <div class="accurat-redio-right">
                            <label v-for="(item,index) in insuracheckList">
                                <input name="insura" type="radio" :value="item.value" v-model="insurachecked">
                                <span>{{item.name}}</span>
                            </label>
                        </div>
                    </li>
                    <li class="normal-show">
                        <div class="accurat-redio-div">是否有信用卡</div>
                        <div class="accurat-redio-right">
                            <label v-for="(item,index) in cardcheckList">
                                <input name="card" type="radio" :value="item.value" v-model="cardchecked">
                                <span>{{item.name}}</span>
                            </label>
                        </div>
                    </li>
                    <li class="normal-show">
                        <div class="accurat-redio-div">是否有公积金</div>
                        <div class="accurat-redio-right">
                            <label v-for="(item,index) in accumulcheckList">
                                <input name="accumulationFund" type="radio" :value="item.value" v-model="accumulchecked">
                                <span>{{item.name}}</span>
                            </label>
                        </div>
                    </li>
                    <li class="normal-show">
                        <div class="accurat-redio-div">是否有寿险保单</div>
                        <div class="accurat-redio-right">
                            <label v-for="(item,index) in insurancecheckList">
                                <input name="insurance" type="radio" :value="item.value" v-model="insurancechecked">
                                <span>{{item.name}}</span>
                            </label>
                        </div>
                    </li>
                    <li class="big-small-show" style="border-top: 16px #F3F3F3 solid;">
                        <div class="accurat-redio-div">是否接受7-14天贷款
                            <span>选择“是”，您的申请通过率可大幅提升哦</span>
                        </div>
                        <div class="accurat-redio-right">
                            <label v-for="(item,index) in acceptyescheckList">
                                <input name="acceptyes" type="radio" :value="item.value" v-model="acceptychecked">
                                <span>{{item.name}}</span>
                            </label>
                        </div>
                    </li>
                </ul>
                <!-- <p class="accuratPhone">
                    <span>
                        <strong>*</strong>社保缴费年限</span>
                    <input class="accuratPhone-input" value="2018-09-21" v-model="mobile" type="text" name=""  placeholder="请填写联系方式">
                </p> -->
                <div class="salaryStyle">
                    <span>工资发放形式</span>
                    <ul>
                        <li v-for="(salary, index) in salaries" v-model="index" v-bind:id="index"
                            :class="{'active':sala === index}"
                            :key="index"
                            @click="getItme($event,index)">{{ salary.data }}
                        </li>
                    </ul>
                </div>
                <div class="applyStyle">
                    <span>近6个月贷款申请情况</span>
                    <ul>
                        <li v-for="(apply, index) in applies" v-model="index" v-bind:id="index" :class="{'active':appl === index}"
                            :key="index"
                            @click="getItme1($event,index)">{{ apply.data }}
                        </li>
                    </ul>
                </div>


            </div>

        </div>
        <div class="accurat-checkbox">
            <input type="checkbox" id="myCheck" v-model="checkboxSure">
            <label for="myCheck"></label>
            <span>我已阅读并同意
                        <strong @click="goService">《借贷用户协议》</strong>
                    </span>
        </div>
        <p class="accurat-introduce">平台郑重承诺所有贷款申请在未成功放款前不收取任何费用，为保障您的资金安全，请不要相信任何要求您支付费用的信息、邮件、电话等不实信息。</p>
        <div class="cooperAgency cooperBot">
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
            <div class="accurat-btn" @click="accurat_btn">立即测试</div>
        </div>
    </div>
</template>

<script>
  import {paramData, systemTesting, userRecommend} from '../../api/api'
  import axios from 'axios'
  export default {
    data () {
      return {
        listLoading: false,
        checkboxSure: true,
        applyMoney: '',
        loanPeriod: '',
        sala: 0,
        appl: 0,
        housechecked: '1',  //房
        carchecked: '1',    //车
        insurachecked: '1',  //社保
        cardchecked: '1',  //信用卡
        accumulchecked: '1',  //公积金
        insurancechecked: '1',  //寿险保单
        acceptychecked: '0',  //是否接受14天贷款
        activeClass: -1,
        entryTime: '',
        IDcard: '',
        username: '',
        MonthlyIncome: '',
        mobile: '',
        salaries: [
          {id: 0, data: '银行代发'},
          {id: 1, data: '转账工资'},
          {id: 2, data: '现金发放'}
        ],
        applies: [{data: '申请少与3个'}, {data: '申请多与3个'}, {data: '没有申请'}],
        mapJson: '../../../static/json/map.json',
        province: '',
        sheng: '',
        shi: '',
        shi1: [],
        city: '',
        // 是否有房
        housecheckList: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],
        // 是否有车
        carcheckList: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],
        // 是否有社保
        insuracheckList: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],
        // 是否有信用卡
        cardcheckList: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],
        // 是否有公积金
        accumulcheckList: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],
        // 是否有寿险保单
        insurancecheckList: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],

        // 是否接受7-14天贷款
        acceptyescheckList: [
          {value: 0, name: '是'},
          {value: 1, name: '否'}
        ],
      }
    },
    mounted () {
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      this.systemTestingData(paramData)
    },
    methods: {
      //借贷用户协议
      goService(){
        location.href = "https://www.bestdaikuan.com/site/service"
      },

      // 判断是否登录
      systemTestingData: function () {
        let _this = this
        userRecommend(paramData).then(res => {
          if (res.code == 200) {
            _this.username = res.data.customer_infor.u_name  //姓名
            _this.IDcard = res.data.customer_infor.u_no  //身份证
            _this.MonthlyIncome = res.data.customer_infor.u_income //月收入
            _this.sheng = res.data.customer_infor.u_province   //城市
            _this.shi = res.data.customer_infor.u_city   //城市
            _this.housechecked = res.data.customer_infor.u_house  //房
            _this.carchecked = res.data.customer_infor.u_car    //车
            _this.insurachecked = res.data.customer_infor.u_security  //社保
            _this.cardchecked = res.data.customer_infor.u_card   //信用卡
            _this.accumulchecked = res.data.customer_infor.u_fund  //公积金
            _this.insurancechecked = res.data.customer_infor.u_policy  //寿险保单
            _this.acceptychecked = res.data.customer_infor.server_fourteen_loan==null?0:res.data.customer_infor.server_fourteen_loan //是否接受7-14天贷款
            _this.sala = parseInt(res.data.customer_infor.u_paystatus)  //工资发放方式
            _this.appl = parseInt(res.data.customer_infor.apply_situation)  //申请情况

          } else {
            alert(res.msg)
          }
        })
      },

      //点击立即测评
      accurat_btn () {
        let idcard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
        if (this.username == '' || this.username.length < 2) {
          alert('请填写真实姓名')
        } else if (this.IDcard == '' || !idcard.test(this.IDcard)) {
          alert('请填写真实身份证号码')
        } else if (this.MonthlyIncome == '' || this.MonthlyIncome < 1) {
          alert('请填写月收入')
        } else if (this.sheng == '' || this.sheng < 1) {
          alert('请选择城市')
        } else if (this.checkboxSure == false) {
          alert('请同意借贷用户协议')
        } else {
          let _this = this
          let param = {
            u_no: _this.IDcard,  //身份证
            u_income: _this.MonthlyIncome, //月收入
            u_house: _this.housechecked,  //房
            u_car: _this.carchecked,    //车
            u_card: _this.cardchecked,   //信用卡
            u_fund: _this.accumulchecked,  //公积金
            u_policy: _this.insurancechecked,  //寿险保单
            u_security: _this.insurachecked,  //社保
            server_fourteen_loan: _this.acceptychecked,  //是否接受7-14天贷款
            u_paystatus: _this.sala,  //工资发放方式
            apply_situation: _this.appl,  //申请情况
            u_province : _this.sheng,
            u_city : _this.shi,
            u_name: _this.username
          }
          paramData['data'] = param
          systemTesting(paramData).then(res => {
            if (res.code == 200) {
              _this.$router.push({
                path: '/assessment',
                query: {
                  loanMoney: res.data.loan_money,
                  score: res.data.score
                }
              })
            } else {
              alert(res.message)
            }
          })
        }
      },

      getItme ($event, index) {
        console.log(index)
        this.sala = index
      },
      getItme1 ($event, index) {
        console.log(index)
        this.appl = index
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
    created () {
      this.$store.state.showBottomNav = false
      this.getCityData()
    }
  }
</script>


<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/loan.scss";
</style>
