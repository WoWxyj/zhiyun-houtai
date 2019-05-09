<template>
    <div class="index" v-loading="listLoading">

        <!--<div class="indexbrowsing browsing" v-show="onlineShow">-->
        <!--<div class="sportsShowmark">-->
        <!--<img src="../../assets/img/no-online-icon.png" alt="">-->
        <!--<p class="introduce">亲，网络请求超时~</p>-->
        <!--<div class="btnno" @click="reload">刷新重试</div>-->
        <!--&lt;!&ndash;<div class="btnno" @click="btnno">重新加载</div>&ndash;&gt;-->
        <!--</div>-->
        <!--</div>-->

        <div v-show="nolineshow">
            <div class="topbg">
                <img src="../../assets/img/topbg.png" alt="">
            </div>
            <!-- 搜索start -->
            <div class="indSearch">
                <div class="searchAll">
                    <!--<span class="address" @click="chooseCity"><img src="../../assets/img/top-address-icon.png" alt=""></span>-->
                    <div class="search" @click="searchGo">
                        <i><img src="../../assets/img/top-search-icon.png" alt=""></i>
                        <div class="swiper-container search-swiper">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="item in items">
                                    <ul>
                                        <li>{{ item }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="isread == 1">
                        <span class="sports" @click="messageGo"><img src="../../assets/changeImg/top-message-icon-no.png"
                                                                     alt=""></span>
                    </div>
                    <div v-else>
                        <span class="sports" @click="messageGo"><img style="padding-top: 4px;"
                                                                     src="../../assets/changeImg/top-message-icon.png" alt=""></span>
                    </div>
                </div>
            </div>
            <!-- 搜索END -->

            <!-- 免注册申请start -->
            <div class="plateOne">
                <ul>
                    <li v-for="lable in headLabel" @click="lableUrl(lable)">
                        <img :src="lable.param_url">
                        <span>{{ lable.module_name }}</span>
                    </li>
                </ul>
            </div>
            <!-- 免注册申请end -->

            <!-- 轮播icon start -->
            <!--<div class="sliderPlate">-->
            <!--<div class="swiper-container slider-icon">-->
            <!--<div class="swiper-wrapper">-->
            <!--<div class="swiper-slide" v-for="(items,index)  in categorysArr" :key="index">-->
            <!--<div v-for="(item, index) in items" :key="index" class="swiper-slide-item" @click="goLoan(item.id)">-->
            <!--<img :src="item.param_url">-->
            <!--<span>{{ item.module_name }}</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="swiper-pagination slider-icon-pagination" slot="pagination"></div>-->
            <!--</div>-->
            <!--</div>-->

            <div class="sliderPlate">
                <div class="sliderPlateDiv">
                    <div class="sliderDiv" v-for="(item, index) in sliders" :key="index" @click="goLoan(item)">
                        <img :src="item.param_url">
                        <span>{{ item.module_name }}</span>
                    </div>
                </div>
            </div>
            <!-- 轮播icon END -->

            <!-- 精品推荐 start -->
            <div class="ProductsRecommend" v-for="(items, index) in products" :key="index">
                <div class="title" :class="[`title-bg-${index}`]"
                     v-bind:style="{ 'background-image': 'url(' + items.parambanner_url + ')','background-repeat':'no-repeat','background-size':'100%' }">
                    <h3>— {{items.module_name}} —</h3>
                    <p>{{items.param_remark}}</p>
                </div>
                <swiper-slide :products="items.product" :index="index"></swiper-slide>
            </div>
            <div class="lookMore" @click="lookMore">查看更多贷款</div>
            <!-- 精品推荐 END -->
        </div>

        <!--活动弹窗-->
        <div class="shareDiv shareDivwech" v-show="shareDivWechat">
            <div class="popupImg">
                <img class="popimg" @click="popupUrlLink" :src="popupImg">
                <img class="close" @click="closeshare" src="../../assets/img/popup-close.png" alt="">
            </div>
        </div>


        <!--<div class="shareDiv shareDivwech" v-show="shareDivWechat" @click="closeshare">-->
        <!--<img class="sharehand sharehandWe" src="../../assets/img/share-icon-hand.png" alt="">-->
        <!--<div class="bowerOpen">-->
        <!--<p>点击右上角</p>-->
        <!--<p>到浏览器去下载</p>-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
  import {
    getrolling,
    usercenter,
    channelStop,
    paramData,
    messageListAllIsread,
    clickMenu,
    popupMessage,
    messageUpdateStatus,
    applylook
  } from '../../api/api'
  import swiperSlide from '../../components/swiperSlide.vue'
  import lookno from '../none/lookno.vue'
  import qs from 'qs'

  export default {
    data () {
      return {
        listLoading: false,
        // 搜索框循环滚动
        items: [],
        // 免注册申请 免下载申请
        headLabel: [],
        // 大额专区  小额专区
        sliders: [],
        products: [],
        isread: '',
        onlineShow: false,
        nolineshow: true,
        popupImg: require('../../assets/img/none-opcity.png'),
        shareDivWechat: false,
        popupType: '',
        popupid: '',
        messageId: '',
        linkAddress: ''
      }
    },
    created () {
      this.$store.state.showBottomNav = true
    },
    components: {
      swiperSlide,
      lookno
    },
    watch: {
      products (value) {
        this.$nextTick(() => {
          var products = new Swiper('.productone-swiper', {
            loop: false,
            pagination: '.productone-swiper-pagination'
          })
        })
      }
    },
    mounted () {
      var mySwiper = new Swiper('.search-swiper', {
        autoplay: 3000,
        loop: false,
        direction: 'vertical',
        observer: true //修改swiper自己或子元素时，自动初始化swiper
      })
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      this.getchannelStop()
    },

    methods: {
      //渠道停用
      getchannelStop () {
        channelStop(paramData).then(res => {
          if(res.code == 514){
            this.$router.push({path: '/none'})
          }else{
            this.getData(paramData)
            this.getpopupMessage()
            if (sessionStorage.getItem('motion')) {
              this.gettokenIndexMotion()
              let locationurl = location.href
              let parseUrl = qs.parse(locationurl.split('?')[1])
              if (typeof parseUrl.phone != 'undefined') {
                sessionStorage.setItem('userphone', parseUrl.phone)
              }
              if (window.location.href.indexOf('motion') > 0) {
                this.$router.push({path: '/loan'})
              }
            }
          }
        })
      },
      // 弹窗活动
      getpopupMessage () {
        paramData['protocol']['token'] = sessionStorage.getItem('token')
        let _this = this
        popupMessage(paramData).then(res => {
          if (res.code === 200) {
            _this.popupImg = res.data.link_img
            _this.popupType = res.data.type
            _this.popupid = res.data.id
            _this.messageId = res.data.message_id
            _this.linkAddress = res.data.link_address
            if (_this.popupType == 0) {
              return
            } else {
              if (sessionStorage.getItem('token')) {  //是否登录  登陆情况下一天弹出一次   未登录每次到首页都弹出
                let nowTime = new Date().toDateString()   //获取当前时间
                let oldTime = sessionStorage.getItem('oldTime')  //获取前一次本地session存储的时间
                if (oldTime == nowTime) { //弹窗一天弹出一次  判断两个时间戳是否为同一天  是：弹窗不显示 否：显示
                  _this.shareDivWechat = false
                  sessionStorage.setItem('oldTime', nowTime) //然后将当前的时间存储到session
                } else {
                  _this.shareDivWechat = true
                  sessionStorage.setItem('oldTime', nowTime)
                }
              } else {
                _this.shareDivWechat = true
              }
            }
          }
        })
      },
      //1=额度评测  2=黑名单检测  3=精准推荐  4=活动/产品 0=无
      popupUrlLink () {
        if (this.popupType === 1) {
          this.$router.push({path: '/assessmentData'})
        } else if (this.popupType === 2) {
          this.$router.push({path: '/blackList'})
        } else if (this.popupType === 3) {
          this.$router.push({path: '/accurateRecom'})
        } else if (this.popupType === 4) {
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
            loan_infor_id: this.popupid,
            product_type: '0001',
            product_operation_type: '0001',
            message_id: this.messageId,
            message_type: '0000'
          }
          paramData['data'] = param
          applylook(paramData).then(res => {
            if (res.code == 200) {
              location.href = this.linkAddress
            } else {
              alert(res.message)
            }
          })
          messageUpdateStatus(paramData).then(res => {
            if (res.code == 200) {

            }
          })
        }
      },

      // //弹窗关闭按钮
      closeshare () {
        this.shareDivWechat = false
      },

      gettokenIndexMotion () {
        let url = location.href
        let parseUrl = qs.parse(url.split('?')[1])
        if (typeof parseUrl.usernum != 'undefined') {
          sessionStorage.setItem('token', decodeURIComponent(parseUrl.usernum))
        }
      },

      reload () {
        location.reload()
      },
      lookMore () {
        this.$router.push({path: '/loan'})
      },
      //选择城市
      chooseCity () {
        this.$router.push({path: '/city'})
      },
      // 点击搜索跳转
      searchGo: function () {
        this.$router.push({path: '/search'})
      },
      // 大额专区
      goLoan: function (item) {
        let ua = navigator.userAgent.toLowerCase()
        let operation_type
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          operation_type = '0407'
        } else {
          operation_type = '0107'
        }
        let param = {
          token: sessionStorage.getItem('token'),
          menu_id: item.id,
          operation_type: operation_type
          // protocol:
        }
        paramData['data'] = param
        clickMenu(paramData).then(res => {
          if (res.code == 200) {
            if (item.param_module == '0001') {
              this.$router.push({
                path: '/newcutloan',
                query: {
                  id: item.id,
                  moduleName: item.module_name,
                  parambannerUrl: item.parambanner_url
                }
              })
            } else if (item.param_module == '0002') {
              this.$router.push({path: '/accurateRecom'})
            } else if (item.param_module == '0003') {
              this.$router.push({path: '/card'})
            } else if (item.param_module == '0004') {
              if (sessionStorage.getItem('token')) {
                paramData['protocol']['token'] = sessionStorage.getItem(
                  'token'
                )
                let parmas = {
                  login_type: sessionStorage.getItem('login_type')
                }
                paramData['data'] = parmas
                usercenter(paramData).then(res => {
                  if (res.code == 200) {
                    if (res.data.free == 2) {
                      this.$router.push({path: '/blackList'})
                    } else {
                      this.$router.push({
                        path: '/blackListReport',
                        query: {
                          blackUsername: res.data.customer_name,  //姓名
                          blackIdcard: res.data.u_no,  //身份证
                          blackMobile: res.data.mobile,  //手机号码
                          blackType: 3
                        }
                      })
                    }
                  } else {
                    alert(res.message)
                  }
                })
              } else {
                this.$router.push({path: '/usercenter'})
              }
            }
          }
        })
      }
      ,
      //第一模块 免注册申请  免下载申请
      lableUrl (lable) {
        let ua = navigator.userAgent.toLowerCase()
        let operation_type
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          operation_type = '0407'
        } else {
          operation_type = '0107'
        }
        let param = {
          token: sessionStorage.getItem('token'),
          menu_id: lable.id,
          operation_type: operation_type
          // protocol:
        }
        paramData['data'] = param
        clickMenu(paramData).then(res => {
          if (res.code == 200) {
            if (lable.param_module == '0001') {
              this.$router.push({
                path: '/newcutloan',
                query: {
                  id: lable.id,
                  moduleName: lable.module_name,
                  parambannerUrl: lable.parambanner_url
                }
              })
            }
          }
        })
      }
      ,
      // 顶部活动icon
      messageGo () {
        // 一键已读
        let that = this
        that.listLoading = true
        let param = {
          message_type: '0000'
        }
        paramData['data'] = param
        messageListAllIsread(paramData).then(res => {
          this.isread = 2
          this.$router.push({path: '/message'})
        })
        let paramlable = {
          message_type: '0001'
        }
        paramData['data'] = paramlable
        messageListAllIsread(paramData).then(res => {
          this.isread == 2
          this.$router.push({path: '/message'})
        })
        localStorage.setItem('readalread', this.isread)
      },

      getData (dateindex) {
        let that = this
        that.listLoading = true
        getrolling(dateindex)
          .then(res => {
            that.listLoading = false
            if (res.code == 200) {
              that.items = res.data.rolling
              that.headLabel = res.data.head_label
              that.sliders = res.data.sub_label
              that.products = res.data.chunk
              that.isread = res.data.isread
            }
            // else if (res.code == 401){
            //   alert("手机号或验证码错误")
            // }else if(res.code == 500){
            //   alert("系统错误")
            // }
            else {
              that.listLoading = false
              that.onlineShow = true
            }
          })
      },

    }
  }
</script>
<style lang="scss">
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/index.scss";
    @import "../../assets/scss/noline.scss";
</style>
