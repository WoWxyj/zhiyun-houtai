<template>
  <div class="sharethree">
    <div class="newCutTitle">邀请好友<span @click="$router.back(-1)" class="loanTopTitleLeft"><img
      src="../../assets/img/return-icon.png" alt=""></span></div>
    <img src="../../assets/img/share-icon.png" alt="" class="shareIcon">
    <div class="sharetext">
      <p v-for="paramRe in paramRemark"><i></i>{{paramRe}}</p>
    </div>
    <div class="yaoqingBtn" @click="shareBtn">立即邀请</div>

    <div class="shareDiv" v-show="shareDiv">
      <div class="shareObj">
        <p>分享至</p>
        <ul>
          <li v-show="thrLoginShowfriend">
            <img src="../../assets/img/wechat-friend.png" alt="">
            <span>微信好友</span>
          </li>
          <li v-show="thrLoginShowquan">
            <img src="../../assets/img/wechat-qzone.png" alt="">
            <span>朋友圈</span>
          </li>

          <li @click="qqshare" v-show="thrLoginqqshare">
            <img src="../../assets/img/qq-friend.png" alt="">
            <span>QQ好友</span>
          </li>
          <li @click="qqqzone" v-show="thrLoginShowquanqqqzone">
            <img src="../../assets/img/qq-qzone.png" alt="">
            <span>QQ空间</span>
          </li>
        </ul>
        <div class="noshare" @click="noshare">取消</div>
      </div>
    </div>

    <div class="shareDiv shareDivwech" v-show="shareDivWechat" @click="closeshare">
      <img class="sharehand sharehandWe" src="../../assets/img/share-icon-hand.png" alt="">
      <div class="bowerOpen">
        <p>点击右上角</p>
        <p>发送给朋友或分享到朋友圈</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {wechatshare, paramData, getsearch} from '../../api/api'
  import wx from 'weixin-js-sdk'

  export default {
    data () {
      return {
        shareDiv: false,
        thrLoginShowfriend: false,
        thrLoginShowquan: false,
        thrLoginShowquanqqqzone: false,
        thrLoginqqshare: false,
        shareDivWechat: false,
        paramRemark: [],
        url: '',
        invite_code: '',
        channel_id: '',
        flow_user_id: ''
      }
    },
    mounted () {
      this.shareTo()
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.shareDiv = false
      } else {
        this.thrLoginShowquanqqqzone = true
        this.thrLoginqqshare = true
      }
      this.channel_id = sessionStorage.getItem('channel_name')
      this.invite_code = sessionStorage.getItem('invite_code')
      this.flow_user_id = sessionStorage.getItem('flow_user_id')
      this.url = window.location.href.split('#')[0] + '#/redirectshare?channelid=' + this.channel_id + '&invite_code=' + this.invite_code + '&flow_user_id=' + this.flow_user_id
      let urld = window.location.href.split('#')[0]
      let param = {
        'url': urld
      }
      paramData['data'] = param
      wechatshare(paramData).then(res => {
        let that = this
        wx.config({
          debug: false,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
        })
        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
          wx.onMenuShareAppMessage({
            title: '质子贷贷款平台', // 分享标题
            desc: '小额分期贷款，纯信用类推荐贷款平台', // 分享描述
            link: that.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://www.bestdaikuan.com/images/556223552627430050.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {

            }
          })
          wx.onMenuShareTimeline({
            title: '质子贷贷款平台', // 分享标题
            link: that.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://www.bestdaikuan.com/images/556223552627430050.png', // 分享图标
            success: function () {

            },
          })
          wx.onMenuShareQQ({
            title: '质子贷贷款平台', // 分享标题
            desc: '小额分期贷款，纯信用类推荐贷款平台', // 分享描述
            link: that.url, // 分享链接
            imgUrl: 'http://www.bestdaikuan.com/images/556223552627430050.png', // 分享图标
            success: function () {

            },
          })
          wx.onMenuShareQZone({
            title: '质子贷贷款平台', // 分享标题
            desc: '小额分期贷款，纯信用类推荐贷款平台', // 分享描述
            link: that.url, // 分享链接
            imgUrl: 'http://www.bestdaikuan.com/images/556223552627430050.png', // 分享图标
            success: function () {
            },
          })
        })
      })
    },
    methods: {
      //点击立即邀请
      shareBtn () {
        let ua = navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.shareDivWechat = true
        } else {
          this.shareDiv = true
        }
      },
      closeshare () {
        this.shareDivWechat = false
      },
      qqshare () {
        let that = this
        window.open('http://connect.qq.com/widget/shareqq/index.html?url= ' + encodeURIComponent(that.url) + '&title= 质子贷贷款平台&pics=https://www.bestdaikuan.com/images/556223552627430050.png&site= ', 'newwindow')
      },
      qqqzone () {
        let that = this
        window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(that.url) + '&title=质子贷贷款平台&desc=小额分期贷款，纯信用类推荐贷款平台&summary=&site=&pics=https://www.bestdaikuan.com/images/556223552627430050.png', 'newwindow')
      },
      //取消分享
      noshare () {
        this.shareDiv = false
      },
      shareTo () {
        paramData['protocol']['token'] = sessionStorage.getItem('token')
        let _this = this
        let param = {
          param_type: ['0019']
        }
        paramData['data'] = param
        getsearch(paramData).then(res => {
          if (res.code == 200) {
            this.paramRemark = res.data[0].param_remark.split('=')
          }
        })
      }
    },
    created () {
      this.$store.state.showBottomNav = false
    }
    ,
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common.scss";
  @import "../../assets/scss/blackList.scss";
</style>

