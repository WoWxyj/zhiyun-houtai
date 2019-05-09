<template>
  <div class="blackList blackListPadding" v-loading="listLoading">
      <div class="newCutTitle">黑名单检测<span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../../assets/img/return-icon.png"
                                                                                                  alt=""></span></div>
      <div class="blackListAl">
        <img class="blackListBan" src="../../assets/img/blackListBan-icon.png" alt="">
        <div class="blackListText">
            <img class="blackListpos" src="../../assets/img/black-check-icon.png" alt="">
            <h3>
                <span>70%</span>的人借不到钱
                <span class="imgimg"></span>
            </h3>
            <p>是因为进了网贷黑名单</p>
            <p>是因为进了逾期记录共享名单</p>
            <p>是因为注册了过多贷款产品</p>
        </div>
        <div class="inspection" @click="inspection">马上查个清楚</div>
         
      </div>
  </div>
</template>

<script>
export default {
  data(){
      return{
          listLoading:false,
      }
  },
  created() {
      this.$store.state.showBottomNav = false
  },
  methods:{
      inspection(){
          this.$router.push({ path: "/blackListMobile" });
      }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/common.scss";
@import "../../assets/scss/blackList.scss";
</style>
