<template>
    <div class="nonebrowsing">
        <div class="inin">
            <img src="../../assets/img/no-online-icon.png" alt="">
            <p class="introduce">哎哟~ 页面飞去外太空了</p>
        </div>
    </div>
</template>


<script>
    export default {
      data(){
        return{

        }
      },

      created () {
        this.$store.state.showBottomNav = false
      },


    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/noline.scss";
</style>