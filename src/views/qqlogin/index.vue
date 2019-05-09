<template>
  <div class="qqTrans">
    <div class="imgBox">
      <img src="../../assets/img/translate.png" alt="">
      <p>登录中，请耐心等待...</p>
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
      return {
        sendAuthCode: true /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
        nickname: '',
        head_icon: '',
        login_type: '',
        'aabtoken': ''
      }
    },
    created () {
      this.$store.state.showBottomNav = false
    },
    mounted () {
      let that = this
      if (window.location.hash.indexOf('code') > -1) {
        let code = this.GetQueryString('code')
        let param = {
          'code': code
        }
        paramData['data'] = param
        qqlogin(paramData).then(res => {
          if (res.code == 200) {
            if (res.data.error == 1) {
              let url = encodeURIComponent(local_baseurl + '/#/qqlogin')
              location.href = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101511608&redirect_uri=' + url + '&state=test'
            } else {
              const url = 'https://graph.qq.com/oauth2.0/me?access_token=' + res.data.access_token + '&unionid=1'
              that.aabtoken = res.data.access_token
              jsonpurl(url, null, null)
              window.callback = function (data) {
                let user = eval(data)
                if (user.openid != '') {
                  let params = {
                    'openid': user.openid,
                    'client_id': user.client_id,
                    'access_token': that.aabtoken,
                    'unionid': user.unionid
                  }
                  paramData['data'] = params
                  qqloginthree(paramData).then(rese => {
                    that.loginsuccess(rese)
                  })
                } else {

                }
              }
            }
          }
        })
      }
    },
    methods: {
      GetQueryString (variable) {
        let query = window.location.hash
        let vars = query.split('?')
        let verse = vars[1]
        let versee = verse.split('&')
        for (let i = 0; i < versee.length; i++) {
          let pair = versee[i].split('=')
          if (pair[0] === variable) {
            return pair[1]
          }
        }
        return (false)
      },
      loginsuccess (res) {
        let that = this
        if (res.code == 200) {
          sessionStorage.setItem('token', res.data.token)
          sessionStorage.setItem('login_type', '0000')
          if (res.data.isbind == 1) {
            that.$router.push({path: '/'})
          } else {
            that.$router.push({path: '/bindAccount'})
          }
        } else {
          alert('55')
        }
      }
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
