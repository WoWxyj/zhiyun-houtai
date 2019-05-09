<template>
  <div class="searchHtml" v-loading="listLoading">
    <!-- 搜索栏 -->
    <div v-show="searchShowSer">
      <div class="browsing searchBrowing">
        <img src="../../assets/img/no-search-icon.png" alt="">
        <p class="introduce">没有任何搜索结果哟~</p>
      </div>

      <div class="recommend recommendListForMe">
        <h3 class="recommendTitle">为我推荐</h3>
        <ul>
          <li v-for="searchindex in recommendList" @click="goProduct(searchindex.id)">
            <img :src="searchindex.loan_logo">
            <h3>{{ searchindex.loan_name }}</h3>
            <p>可借
              <span>{{ searchindex.loan_small/10000 }} - {{ searchindex.loan_big/10000 }}万</span>
            </p>
            <div class="qujie" @click.stop="gothreeProduct(searchindex)">去借款</div>
          </li>
        </ul>
      </div>
    </div>

    <div v-show="searchShow">
      <div class="searchBox"></div>
      <ul class="loanContDiv searchloanCont" style="position: relative; z-index: 999;">
        <li v-for="loanprot in loanprots" @click="goProduct(loanprot.id)">
          <div class="loanContDivTop">
            <div class="loanContDivTopImg">
              <img :src="loanprot.loan_logo" alt="">
            </div>
            <div class="loanContDivTopTitlt">
              <h3>{{loanprot.loan_name}}</h3>
              <p>可贷金额：<span>{{loanprot.loan_small/10000}} - {{loanprot.loan_big/10000}}万</span></p>
              <p>参考日利率：<span>{{loanprot.loan_interest}}</span></p>
            </div>
            <div class="loanContDivTopapply">
              <span>{{loanprot.applyfornum}}成功申请</span>
              <div class="loanContApply" @click.stop="gothreeProduct(loanprot)">立即申请</div>
            </div>
          </div>
          <div class="loanContDivBottom">凭芝麻信用分，最高可借1000元，最快5分钟下款</div>
        </li>
      </ul>
    </div>

    <div class="searchHtmlTop">
      <div class="searchDiv">
        <form action="javascript:return true;">
          <input v-model.trim="serachText" @keyup.enter="searchEnterFun(2)" ref="serachText" class="inpSearch"
                 type="search" placeholder="质子贷">
          <span class="searchIcon"></span>
        </form>
      </div>
      <div class="nosearch" @click="nosearch">取消</div>
    </div>

    <div v-show="searchAll">
      <div class="searchRecord">
        <div class="searchRecordOne">
          <h3>搜索记录</h3>
          <div class="RecordText">
            <span v-for="searchDivHtml in searchDiv" @click="clickHist(searchDivHtml)" v-model="clickHistHtml">{{searchDivHtml}}</span>
          </div>
        </div>
        <div class="hotRecord">
          <h3>最近热搜</h3>
          <div class="RecordText">
            <span v-for="searchText in searchHot" @click.stop="hotSearch(searchText.id, searchText.module_name)">{{searchText.module_name}}</span>
          </div>
        </div>
      </div>
      <!--<bowerHistory></bowerHistory>-->
      <div class="recommend">
        <h3 class="recommendTitle">为我推荐</h3>
        <ul>
          <li v-for="searchindex in recommendList" @click="goProduct(searchindex.id)">
            <img :src="searchindex.loan_logo">
            <h3>{{ searchindex.loan_name }}</h3>
            <p>可借
              <span>{{ searchindex.loan_small/10000 }} - {{ searchindex.loan_big/10000 }}万</span>
            </p>
            <div class="qujie" @click.stop="gothreeProduct(searchindex)">去借款</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {getsearch, paramData, getdetails, getData} from '../../api/api'
  import bowerHistory from '../../components/bowerHistory.vue'

  export default {
    data () {
      return {
        listLoading: false,
        serachText: '',
        searchHot: [],
        searchDiv: [],
        recommendList: [],
        loanprots: [],
        searchAll: true,
        searchShow: false,
        searchShowSer: false,
        clickHistHtml: ''
      }
    },
    components: {
      bowerHistory
    },
    created () {
      this.$store.state.showBottomNav = false
    },
    mounted () {
      this.getSearchHtml()
      this.getTuijian(1)
      if (localStorage.getItem('searchDiv') == null) {
        const searchDiv = []
        localStorage.setItem('searchDiv', JSON.stringify(searchDiv))
      } else {
        this.searchDiv = JSON.parse(localStorage.getItem('searchDiv'))
      }
    },
    methods: {
      //点击历史记录
      clickHist (eevt) {
        console.log(eevt)
        this.serachText = eevt
        this.searchEnterFun(eevt)
      },
      // 点击取消
      nosearch () {
        this.$router.push({path: '/'})
      },
      //点击最近热搜
      hotSearch (eve, name) {
        this.serachText = name
        let that = this
        that.listLoading = true
        let param = {
          module_id: eve
        }
        paramData['data'] = param
        getdetails(paramData).then(res => {
          that.listLoading = false
          if (res.code == 200) {
            if (res.data.loanlist == '') {
              this.searchAll = false
              this.searchShowSer = true
            } else {
              this.searchShowSer = false
              this.searchShow = true
              this.loanprots = res.data.loanlist
            }
          } else {
            // alert(res.msg)
          }
        })
      },
      searchEnterFun () {
        let that = this
        that.listLoading = true
        let param = {
          search_name: that.serachText
        }
        paramData['data'] = param
        getdetails(paramData).then(res => {
          that.listLoading = false
          if (res.code == 200) {
            if (res.data.loanlist == '') {
              this.searchAll = false
              this.searchShowSer = true
            } else {
              this.searchShowSer = false
              this.searchShow = true
              this.loanprots = res.data.loanlist
            }
            let a = localStorage.getItem('searchDiv')
            if (a.split(',').length >= 5) {
              localStorage.removeItem('searchDiv')
              var searchDiv = [that.serachText]
              localStorage.setItem(
                'searchDiv',
                JSON.stringify(searchDiv)
              )
              that.searchDiv = JSON.parse(
                localStorage.getItem('searchDiv')
              )
              return
            }
            var arrayObjectLocal = JSON.parse(
              localStorage.getItem('searchDiv')
            )
            if (that.serachText != '') {
              arrayObjectLocal.push(that.serachText)
              localStorage.setItem(
                'searchDiv',
                JSON.stringify(arrayObjectLocal)
              )
              that.searchDiv = JSON.parse(
                localStorage.getItem('searchDiv')
              )
            }
          } else {
            alert('code: ' + res.code)
          }
        })
      },

      // 最近热搜
      getSearchHtml () {
        let that = this
        let param = {
          param_type: ['0012']
        }
        paramData['data'] = param
        getsearch(paramData).then(res => {
          that.listLoading = false
          if (res.code == 200) {
            that.searchHot = res.data
          } else {
            alert('code: ' + res.code)
          }
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "../../assets/scss/common.scss";
  @import "../../assets/scss/search.scss";
  @import "../../assets/scss/noline.scss";
</style>
