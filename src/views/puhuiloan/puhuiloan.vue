<template>
    <div class="loanAll" v-loading="listLoading">
        <mark-div v-show="screening_show" @hidden="hiddenShow"></mark-div>
        <div class="loanTopTitle">贷款大全<span class="rightSpan" @click="eduPosFix">额度测评</span></div>
        <div class="browsing loanbrowsing" v-show="searchShow">
            <img src="../../assets/img/no-search-icon.png" alt="">
            <p class="introduce">没有任何搜索结果哟~</p>
        </div>
        <div class="eduPosFix" id="moveDiv" @touchmove.prevent>
            <img src="../../assets/img/you-edu-float-icon.png" alt="" @click="accurateRecom" @mousedown="down"
                 @touchstart="down"
                 @mousemove="move" @touchmove="move"
                 @mouseup="end" @touchend="end">
        </div>
        <div class="loanTop">
            <div class="loanCont">
                <ul class="loanContType">
                    <li v-for="(loanactive, index) in loanactives" :class="activeClass == index ? 'active':''"
                        :key="index"
                        @click="getActive(index, loanactive.id)">{{ loanactive.module_name }}
                    </li>
                    <li v-on:click='screening_show_Toggle()' :class="filterActive == 1 ? 'active':''">筛选</li>
                </ul>
                <p class="loanContNote" v-show="closeShow"><i></i>同时申请5个以上产品，可大幅提高贷款成功率!<img
                        @click="closeTop"
                        src="../../assets/img/loan-close-icon.png"
                        alt=""></p>
                <div>
                    <my-scroll ref="myScroll" :on-refresh="onRefresh" :on-pull="onPull" :get-scroll-top="getTop"
                               :scroll-state="scrollState">
                        <ul class="loanContDiv loanBot" slot="scrollList">
                            <li v-for="loanprot in loanprots" @click="gothreeProduct(loanprot)">
                                <div class="loanposiLabel">
                                    <div v-if=" typeof loanprot.is_review != 'undefined'">
                                        <div style="position: relative;" v-if="loanprot.is_review.havedate == 1">
                                            <span class="loanIconSpan">{{loanprot.is_review.datetime}}</span><img
                                                src="@/assets/img/read-already-big.png" alt="">
                                        </div>
                                        <div v-else-if="loanprot.is_review.havedate == 2">
                                            <span class="loanIconSpan">{{loanprot.is_review.datetime}}</span><img
                                                src="@/assets/img/apply-already-big.png" alt="">
                                        </div>
                                    </div>
                                </div>
                                <div class="loanContDivTop">
                                    <div class="loanContDivTopImg">
                                        <img :src="loanprot.loan_logo" alt="">
                                    </div>
                                    <div class="loanContDivTopTitlt">
                                        <h3>{{loanprot.loan_name}}</h3>
                                        <p>
                                            可贷金额：<span>{{loanprot.loan_small}} - {{loanprot.loan_big}}</span>
                                        </p>
                                        <p v-if="loanprot.loantime_type == 1">
                                            参考月利率：<span>{{loanprot.loan_interest}}%</span>
                                        </p>
                                        <p v-else>参考日利率：<span>{{loanprot.loan_interest}}%</span></p>
                                    </div>
                                    <div class="loanContDivTopapply">
                                        <span>{{loanprot.applyfornum}}成功申请</span>
                                        <div class="loanContApply" @click.stop="gothreeProduct(loanprot)">立即申请</div>
                                    </div>
                                </div>
                                <div class="loanContDivBottom">{{loanprot.product_brief}}</div>
                            </li>
                        </ul>
                    </my-scroll>
                </div>
            </div>
        </div>

        <div class="downapp" v-show="showdownapp">
            <div class="downappLogo"><img src="../../assets/img/downappLogo.png" alt=""></div>
            <div class="downapptext">
                <span>借钱就上{{zhizi}}</span>
                <span>2分钟审批,10分钟放款</span>
            </div>
            <div class="downappopen" @click="openapp">打开</div>
            <span class="downappclose" @click="closedownapp">+</span>
        </div>

    </div>
</template>

<script>
  import {getsearch, paramData, getdetails, down_url, visiterOperation, channelStop} from '../../api/api'
  import markDiv from '../../components/markDiv.vue'
  import myScroll from '../../components/myScroll.vue'
  import qs from 'qs'

  export default {
    name: 'infinite-scroll',
    components: {
      myScroll,
      markDiv
    },
    data () {
      return {
        zhizi: '质子贷',
        listLoading: false,
        activeClass: -1,
        screening_show: false,
        loanactives: [],
        loanprots: [],
        searchShow: false,
        closeShow: true,
        filterActive: -1,
        page: 1,
        all_page_size: 0,
        scrollState: true, //是否可以滑动
        indexScrollTop: 0,
        module_id_str: '',
        showdownapp: false,
        flags: false,
        position: {x: 0, y: 0},
        nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
      }
    },
    created () {
      this.$store.state.showBottomNav = true
      const phzj = sessionStorage.getItem('channel_name')
      if( phzj.indexOf('phzj') != -1 ) {
        this.showdownapp = true
        this.zhizi = '普惠之家'
        document.title = '普惠之家'
      }
    },
    mounted () {
      if (sessionStorage.getItem('motion')) {
        this.showdownapp = true
        this.zhizi = '质子贷'
      }
      this.getNavHtml()
      this.onRefresh()
      //渠道停用
      this.getchannelStop()
    },

    methods: {
      //渠道停用
      getchannelStop () {
        channelStop(paramData).then(res => {
          if(res.code == 514){
            this.$router.push({path: '/none'})
          }else{
            //访问pv
            this.getVisiter()
          }
        })
      },

      //访问页面记录pv
      getVisiter () {
        paramData['protocol']['token'] = sessionStorage.getItem('token')
        let param = {
          'operation_type': '0101'
        }
        paramData['data'] = param
        visiterOperation(paramData).then(res => {
        })
      },


      down () {
        this.flags = true
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        this.position.x = touch.clientX
        this.position.y = touch.clientY
        this.dx = moveDiv.offsetLeft
        this.dy = moveDiv.offsetTop

      },
      move () {
        if (this.flags) {
          var touch
          if (event.touches) {
            touch = event.touches[0]
          } else {
            touch = event
          }
          this.nx = touch.clientX - this.position.x
          this.ny = touch.clientY - this.position.y
          this.xPum = this.dx + this.nx
          this.yPum = this.dy + this.ny
          moveDiv.style.left = this.xPum + 'px'
          moveDiv.style.top = this.yPum + 'px'
          //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
          // document.addEventListener('touchmove', function () {
          //   event.preventDefault()
          // }, { passive: true })
          document.addEventListener('touchmove', function (event) {
            // 判断默认行为是否可以被禁用
            if (event.cancelable) {
              // 判断默认行为是否已经被禁用
              if (!event.defaultPrevented) {
                event.preventDefault()
              }
            }
          }, {passive: true})
        }
      },
      //鼠标释放时候的函数
      end () {
        this.flags = false
      },
      //点击下载app
      openapp () {
        var u = navigator.userAgent, app = navigator.appVersion;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let operation_type
        if (isIOS) {
          operation_type = '0204'
        } else {
          operation_type = '0203'
        }
        let param = {
          operation_type: operation_type,
          mobile: sessionStorage.getItem('userphone')
        }
        paramData['data'] = param
        visiterOperation(paramData).then(res => {
        })
        let channel_name = sessionStorage.getItem('channel_name')
        let url = down_url + 'zhizidai-' + channel_name + '.apk'
        window.location.href = 'https://88.q15od2.cn?channelid=' + channel_name + '&phone=' + sessionStorage.getItem('userphone') + '&url=' + url
      },

      //点击关闭悬浮窗
      closedownapp () {
        this.showdownapp = false
      },

      closeTop () {
        this.closeShow = false
      },
      getActive (index, eid) {
        this.activeClass = index  // 把当前点击元素的index，赋值给activeClass
        this.filterActive = -1  // 把当前点击元素的index，赋值给activeClass
        let that = this
        paramData['protocol']['token'] = sessionStorage.getItem('token')
        that.module_id_str = eid
        let param = {
          module_id: [that.module_id_str],
          page: 1,
        }
        paramData['data'] = param
        getdetails(paramData).then(res => {
          if (res.code == 200) {
            if (res.data.loanlist.length <= 0) {
              that.searchShow = true
              that.loanprots = ''
            } else {
              that.searchShow = false
              that.loanprots = res.data.loanlist//push进去渲染
            }
          } else {
            alert('code: ' + res.code)
          }
        })
      },
      screening_show_Toggle () {
        this.activeClass = -1
        this.filterActive = 1
        this.screening_show = !this.screening_show
      },
      hiddenShow (type, data) {
        let that = this
        if (type == 2) {
          if (data.length <= 0) {
            that.searchShow = true
            that.loanprots = ''
          } else {
            that.searchShow = false
            that.loanprots = data
          }
        }
        that.screening_show = false
      },
      accurateRecom: function () {
        this.$router.push({path: '/accurateRecom'})
      },
      eduPosFix () {
        this.$router.push({path: '/assessmentData'})
      },
      getNavHtml () {
        let that = this
        let param = {
          param_type: ['0007']
        }
        paramData['data'] = param
        getsearch(paramData).then(res => {
          if (res.code == 200) {
            that.loanactives = res.data
          } else {
            alert('code: ' + res.code)
          }
        })
      },
      onRefresh (mun) { // 刷新
        let that = this
        that.page = 1
        that.listLoading = true
        let parmas = {
          page: that.page,
        }
        paramData['data'] = parmas
        paramData['protocol']['token'] = sessionStorage.getItem('token')
        getdetails(paramData).then(res => {
          if (res.code == 200) {
            that.listLoading = false
            that.page++
            that.loanprots = res.data.loanlist
            that.$refs.myScroll.setState(3)
          } else {
            that.$refs.myScroll.setState(3)
          }
        })
      },
      onPull (mun) { //加载
        let that = this
        that.listLoading = true
        let parmas = {
          page: that.page,
        }
        if (that.module_id_str != '') {
          parmas['module_id'] = [that.module_id_str]
        }
        paramData['data'] = parmas
        paramData['protocol']['token'] = sessionStorage.getItem('token')
        getdetails(paramData).then(res => {
          that.listLoading = false
          if (res.code == 200 && res.data.loanlist.length > 0) {
            that.page++
            that.loanprots = that.loanprots.concat(res.data.loanlist)
            that.$refs.myScroll.setState(5)
          } else {
            that.$refs.myScroll.setState(7)
          }
        })
      },
      getTop (y) {//滚动条位置
        this.indexScrollTop = y
      },
    }
  }
</script>

<style lang="scss">
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/loan.scss";
    @import "../../assets/scss/noline.scss";

    .loading-bar {
        height: 40px;
        text-align: center;
        line-height: 40px;
    }
</style>
