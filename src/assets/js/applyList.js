import {applylook, paramData, getdetails} from '../../api/api'

export default {
  install (Vue, options) {
    Vue.prototype.goProduct = function (id) {
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      this.$router.push({path: 'details', query: {id: id}})
    }

    // 点击产品跳转
    Vue.prototype.gothreeProduct = function (items) {
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      let operation_type
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        operation_type = '0404'
      } else {
        operation_type = '0104'
      }
      let param = {
        operation_type: operation_type,
        loan_infor_id: items.id,
        product_type: '0001',
        product_operation_type: '0001',
        apply_amount: items.loan_money
      }
      paramData['data'] = param
      applylook(paramData).then(res => {
        if (res.code == 200) {
          location.href = items.app_url
        } else {
          alert(res.message)
        }
      })
    }

    // 为我推荐
    Vue.prototype.getTuijian = function (type) {
      let that = this
      let module_id
      if (type == 1) {
        module_id = '73' //搜索推荐产品
      }else{
        module_id = '131' //申请记录推荐
      }
      let param = {
        module_id: [module_id]
      }
      paramData['data'] = param
      getdetails(paramData).then(res => {
        that.listLoading = false
        if (res.code == 200) {
          that.recommendList = res.data.loanlist
        } else {
          alert('code: ' + res.code)
        }
      })
    }

    Vue.prototype.wxShare = function(){
      let wx_share = new Array(4);

      wx_share[0] = window.location.href.split('#')[0] + "/loan";  // share_img 分享缩略图图片

      wx_share[1] = window.location.href.split('#')[0]; // share_link  分享页面的url地址，如果地址无效，则分享失败;

      wx_share[2] = "零元制作优质广告，一元收获“万+”流量，低投入，高回报，宣传无忧。";// share_desc

      wx_share[3] = "GGGO广告狗-推广好帮手，制作无忧，一元起投";// share_title
    }

  }
}