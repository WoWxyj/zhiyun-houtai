<template>
    <div class="tabsBox" v-loading="listLoading">
        <div class="loanTopTitle">
            消息
            <!--<span @click="isread()">一键已读</span>-->
            <span @click="$router.back(-1)" class="loanTopTitleLeft"><img src="../../assets/img/return-go-icon.png"
                                                                          alt=""></span>
        </div>
        <div class="browsing browsingMess" v-show="introShow">
            <div class="sportsShowmark">
                <img :src="img" alt="">
                <p class="introduce">暂时没有任何{{messagetext}}哟~</p>
            </div>
        </div>

        <ul class="tabs clearfix">
            <li v-for="(tab,index) in tabsName" @click="tabsSwitch(index)">
                <a href="#" class="tab-link" v-bind:class="{active:tab.isActive}">{{tab.name}}</a>
            </li>
        </ul>
        <div class="cards">
            <!--通知-->
            <div class="tab-card" style="display: block;">
                <ul class="tab-card-div">
                    <li class="tab-card-intro" v-for="intro in intros">
                        <div class="bigLoanTop">
                            <div class="bigLoanIcon"><img :src="intro.link_img" alt=""></div>
                            <div class="bigLoanName">
                                <h3>{{intro.title}}</h3>
                                <p>{{intro.create_date}}</p>
                            </div>
                        </div>
                        <!--<div v-if="intro.isread==0">-->
                        <!--<img class="tab-intro-posit" src="../../assets/img/sport-icon-no-read.png" alt="">-->
                        <!--</div>-->
                        <div class="tab-card-bottom">
                            <p>{{intro.content}}</p>
                        </div>
                    </li>
                </ul>
            </div>

            <!--活动-->
            <div class="tab-card">
                <ul class="tab-card-sports">
                    <li v-for="sports in sportList">
                        <p class="sports-time">{{sports.create_date}}</p>
                        <div class="tab-card-sports-div">
                            <div class="imgDarkOver" v-if="sports.status == '0000'">
                                <div class="imgDark">未开始</div>
                                <img :src="sports.link_img" alt="">
                            </div>
                            <div class="imgDarkOver" v-else-if="sports.status == '0001'"
                                 @click="sportsUrl(sports.link_address)">
                                <!--<div class="imgDark">进行中</div>-->
                                <img :src="sports.link_img" alt="">
                            </div>
                            <div class="imgDarkOver" v-else>
                                <div class="imgDark">已结束</div>
                                <img :src="sports.link_img" alt="">
                            </div>
                            <h3>{{sports.title}}</h3>
                            <span>{{ sports.content }}</span>
                            <p>查看详情</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
  import {messageList, messageListAllIsread, paramData} from '../../api/api'

  export default {
    data () {
      return {
        listLoading: false,
        list: [],
        intros: [],
        sportList: [],
        tabsName: [
          {name: '通知', isActive: true},
          {name: '活动', isActive: false}
        ],
        active: false,
        introShow: false,
        introactivity: false,
        img: require("../../assets/img/no-inform-icon.png"),
        messagetext:'通知'
      }
    },
    mounted () {
      paramData['protocol']['token'] = sessionStorage.getItem('token')
      this.getData(paramData)

      if (this.intros.length <= 0) {
        this.introShow = true
        this.img = require("../../assets/img/no-inform-icon.png")
        this.messagetext = "通知"
      }else {
        this.introShow = false
      }
    },
    methods: {
      //点击活动跳转
      sportsUrl (linkrl) {
        // console.log(linkrl)
        location.href = linkrl
      },
      tabsSwitch: function (tabIndex) {
        var tabCardCollection = document.querySelectorAll('.tab-card'),
          len = tabCardCollection.length
        for (var i = 0; i < len; i++) {
          tabCardCollection[i].style.display = 'none'
          this.tabsName[i].isActive = false
        }
        this.tabsName[tabIndex].isActive = true
        tabCardCollection[tabIndex].style.display = 'block'
        if (tabIndex == 0) {
          this.introShow = false
          if (this.intros.length <= 0) {
            this.introShow = true
            this.img = require("../../assets/img/no-inform-icon.png")
            this.messagetext = "通知"
          }
        } else {
          this.introShow = false
          if (this.sportList.length <= 0) {
            this.introShow = true
            this.img = require("../../assets/img/no-sports-icon.png")
            this.messagetext = "活动"
          }
        }
      },

      // 获取数据
      getData (indexdata) {
        let that = this
        that.listLoading = true
        let param = {
          message_type: ['0000', '0001']   //0001=通知  0000=活动
        }
        indexdata['data'] = param
        messageList(indexdata).then(res => {
          that.listLoading = false
          let message = res.data
          if (res.code == 200) {
            for (let i = 0; i < message.length; i++) {
              if (message[i].message_type == '0001') {
                that.intros.push(message[i])
              } else {
                that.sportList.push(message[i])
              }
            }
          } else {
            alert(res.message)
          }
        })
      },
    },
    created () {
      this.$store.state.showBottomNav = false
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/index.scss";
    @import "../../assets/scss/noline.scss";
</style>
