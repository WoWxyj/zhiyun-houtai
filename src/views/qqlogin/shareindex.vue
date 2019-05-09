<template>
  <div class="qqTrans">
    <div class="imgBox">
      <img src="../../assets/img/translate.png" alt="">
      <p>跳转中，请耐心等待...</p>
    </div>
  </div>
</template>
<script>
  import {qqlogin, paramData, qqloginthree, local_baseurl} from '../../api/api'
  import jsonpurl from 'jsonp'

  export default {
    created () {
    },
    data () {
    },
    created () {
      this.$store.state.showBottomNav = false
    },
    mounted () {
      let channelid = this.$route.query.channelid
      let invite_code = this.$route.query.invite_code
      let flow_user_id = this.$route.query.invite_code
      location.href = local_baseurl + '/#/zhizipro?channelid=' + channelid + '&invite_code=' + invite_code + '&share_flow_user_id=' + flow_user_id
    }
  }
</script>

<style scoped>

  .imgBox {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.4);
    text-align: center;
  }

  .qqTrans p {
    font-size: 28px;
    color: #fff;
    padding-top: 20px;
  }

  .qqTrans img {
    width: 100px;
    height: 100px;
    margin: 500px auto 0;
    -webkit-transform: rotate(360deg);
    animation: rotation 3s linear infinite;
    -moz-animation: rotation 3s linear infinite;
    -webkit-animation: rotation 3s linear infinite;
    -o-animation: rotation 3s linear infinite;
  }

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
