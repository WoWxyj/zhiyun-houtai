<template>
    <div class="unnion">
        <div class="loanTopTitle" style="z-index: 99999" v-show="bowerTit">{{bowerTitle}}<span @click="$router.back(-1)" class="loanTopTitleLeft"><img
                src="../../assets/img/return-go-icon.png" alt=""></span></div>
        <div class="browsing" v-show="browsingShow">
            <img src="../../assets/img/no-browsing-icon.png" alt="">
            <p class="introduce">您还没有浏览记录哟~</p>
            <div class="btnno" @click="goIndex">点击去浏览</div>
        </div>

        <div class="browsing" v-show="applyShow">
            <img src="../../assets/img/no-apply-icon.png" alt="">
            <p class="introduce">您还没有申请记录哟~</p>
            <div class="btnno" @click="goIndex">点击去申请</div>
        </div>

        <div class="browsing" v-show="searchShow">
            <img src="../../assets/img/no-search-icon.png" alt="">
            <p class="introduce">没有任何搜索结果哟~</p>
            <div class="btnno" @click="goSearch">重新搜索</div>
        </div>

        <div class="browsing browsingTop" v-show="sportsShow">
            <div class="sportsShowmark">
                <img src="../../assets/img/no-sports-icon.png" alt="">
                <p class="introduce">暂时没有任何活动哟~</p>
            </div>
        </div>

        <div class="browsing browsingTop" v-show="informShow">
            <img src="../../assets/img/no-inform-icon.png" alt="">
            <p class="introduce">您还没有任何通知哟~</p>
        </div>

        <div class="browsing browsingTop" v-show="onlineShow">
            <div class="sportsShowmark">
                <img src="../../assets/img/no-online-icon.png" alt="">
                <p class="introduce">亲，没有网络了~</p>
                <div class="btnno">重新加载</div>
            </div>
        </div>

        <div class="browsing browsingTop" v-show="cardShow">
            <div class="sportsShowmark">
                <img src="../../assets/img/no-online-icon.png" alt="">
                <p class="introduce">您还没有信用卡浏览记录哟~</p>
                <div class="btnno" @click="gocard">点击去浏览</div>
            </div>
        </div>
        <bowerHistory></bowerHistory>
    </div>
</template>

<script>
  import bowerHistory from '../../components/bowerHistory.vue'
  export default {
    name: "lookno",
    data () {
      return {
        browsingShow: false,
        applyShow: false,
        searchShow: false,
        sportsShow: false,
        informShow: false,
        onlineShow: false,
        cardShow: false,
        bowerTit:false,
        bowerTitle:''
      }
    },
    components: {
      bowerHistory
    },
    created () {
      this.$store.state.showBottomNav = true
      if(this.$route.query.id == 1001){
        this.applyShow = true
        this.bowerTit = true
          this.bowerTitle = '浏览记录'
      }else if(this.$route.query.id == 1002){
        this.browsingShow = true
        this.bowerTit = true
        this.bowerTitle = '申请记录'
      }else if(this.$route.query.id == 1003){
        this.cardShow = true
        this.bowerTitle = '浏览记录'
      }else if(this.$route.query.id == 1004) {
        this.searchShow = true
        this.bowerTitle = '浏览记录'
      }
    },
    methods:{
      goIndex(){
        this.$router.push({path: '/'})
      },
      goSearch(){
        this.$router.push({path: '/search'})
      },
      gocard(){
        this.$router.push({path: '/card'})
      }
    }

  }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/search.scss";
    @import "../../assets/scss/noline.scss";
</style>