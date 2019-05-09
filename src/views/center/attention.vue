<template>
    <div class="blackList guanzhu">
        <div class="newCutTitle">关注公众号
            <span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../../assets/img/return-icon.png" alt=""></span>
        </div>
        <div class="blackListAl">
            <img class="one" src="../../assets/img/guanzhu-zhuangshi2.png" alt="">
            <img class="two" src="../../assets/img/guanzhu-zhuangshi3.png" alt="">
            <img class="three" src="../../assets/img/guanzhu-zhuangshi4.png" alt="">
            <img class="blackListBan" src="../../assets/img/guanzhu-gong-zhong-hao.png" alt="">
            <div class="guanzhuContent">
                <img class="four" src="../../assets/img/guanzhu-zhuangshi.png" alt="">
                <img class="five" src="../../assets/img/guanzhu-erweima-bg-icon.png" alt="">
                <div class="guanzhuTitle">
                    <p>添加公众号的小伙伴都贷到款了</p>
                    <p>你也赶快加一下吧~</p>
                </div>
                <div class="guanzhuImg">
                    <img src="../../assets/img/erweima-icon.png" alt="">
                </div>
                <div class="guanzhuTitle guanzhuTwo">
                    <p>用微信搜索"<span id="foo">质云金服</span>"或"<span>zhizidai</span>"</p>
                    <p>即可找到公众号~</p>
                </div>
                <!--<div class="fuzhiBtn">-->
                    <!--<div class="fuzhiBtnOne">质云金服</div>-->
                    <!--<div class="fuzhiBtnTwo" data-clipboard-target="#foo">复制</div>-->
                <!--</div>-->
            </div>
        </div>
        <!--<div class="guanzhuBtn">到微信去搜索</div>-->
    </div>
</template>

<script>
    export default{
      created () {
        this.$store.state.showBottomNav = false
      },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/blackList.scss";
</style>