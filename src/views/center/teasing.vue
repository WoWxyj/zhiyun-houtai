<template>
    <div class="teasing" v-loading="listLoading">
        <div class="loanTopTitle">我要吐槽<span @click="$router.back(-1)" class="loanTopTitleLeft"><img
                src="../../assets/img/return-go-icon.png" alt=""></span></div>
        <div class="textarea">
            <textarea v-bind:maxlength="200" @input="descArea" name="abstract" id="abstract" v-model="areaText"
                      placeholder="请留下你的留言（大于10个字）"></textarea>
            <span>{{Surplus}}/200</span>
        </div>
        <div class="submit" @click="submit">提交</div>
    </div>
</template>


<script>
  import {feedBack, paramData} from '../../api/api'

  export default {
    data () {
      return {
        listLoading: false,
        areaText: '',
        Surplus: 200,
      }
    },
    created () {
      this.$store.state.showBottomNav = false
    },
    methods: {
      descArea () {
        var textVal = this.areaText.length
        this.Surplus = 200 - textVal
      },
      submit: function () {
        if (this.areaText == '' || this.areaText.length < 10) {
          alert('留言需大于10个字')
          return
        } else {
          let _this = this
          let param = {
            content: _this.areaText, //建议内容
          }
          paramData['data'] = param
          feedBack(paramData).then(res => {
            if (res.code == 200) {
                alert("提交成功");
              _this.$router.push({path: '/'})
            } else {
              alert(res.message)
            }
          })
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/common.scss";
    @import "../../assets/scss/index.scss";
</style>
