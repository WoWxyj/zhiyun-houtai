<template>
    <div class="settingDiv">
        <div class="loanTopTitle">设置
            <span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../../assets/img/return-go-icon.png"
                                                                          alt=""></span>
        </div>
        <ul class="setli">
            <li>当前版本<span>3.0</span></li>
        </ul>

        <div class="lagout" @click="lagout" v-show="logoutShow">退出登录</div>
    </div>
</template>

<style lang="scss">
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/index.scss";
</style>

<script>
import {logout, paramData} from '../../api/api'

export default {
  data () {
    return {
      logoutShow: true
    }
  },
  created () {
    this.$store.state.showBottomNav = false
    if (sessionStorage.getItem('token')) {
      this.logoutShow = true
    } else {
      this.logoutShow = false
    }
  },
  methods: {
    lagout () {
      logout(paramData).then(res => {
        if (res.code == 200) {
          this.$router.push({path: '/center'})
        } else {
          alert(res.data.content)
        }
      })
    }
  }
}
</script>
