<template>
  <div class="markAll">
    <div class="mark" @click="Hidden()"></div>
    <div class="markDiv" ref="loanType">
      <ul class="markDivUl">
        <h3>贷款额度</h3>
        <li ref="loanlimit" v-for="(loanlimit, index) in loanlimits" :class="loanlimit.icCheck==true ? 'active':''"
            :key="index" @click="getItme(index)">
          {{loanlimit.module_name}}
        </li>
      </ul>
      <ul class="markDivUl">
        <h3>贷款期限</h3>
        <li v-for="(loanmaturity, index) in loanmaturitys" :class="loanmaturity.icCheck==true ? 'active':''"
            :key="index"
            @click="getItme1(index)">
          {{loanmaturity.module_name}}
        </li>
      </ul>
      <ul class="markDivUl">
        <h3>特色标签</h3>
        <li v-for="(speciallabel, index, id) in speciallabels"
            :class="speciallabel.icCheck==true ? 'active':''" :key="index"
            @click="getItme2(speciallabel.id,index)">{{speciallabel.module_name}}
        </li>
      </ul>
      <ul class="buttom-btn">
        <li @click="reset">重置</li>
        <li class="loanSure" @click="submit()">确定</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getsearch, paramData, getdetails} from '../api/api'

  export default {
    name: 'markDiv',
    data () {
      return {
        // ok:false,
        active: -1,
        loanlimits: [],
        loanmaturitys: [],
        speciallabels: [],
        loanThr: [],
      }
    },
    methods: {
      // 点击页面遮罩
      Hidden () {
        //通过$emit引用组件传过来的hidden()事件
        this.$emit('hidden', '1', '')
        // console.log($refs.loanlimit.className('active'))
      },
      // 点击确定按钮
      submit () {
        this.listLoading = true
        this.loanThr = []
        let param = {
          'module_id': this.loanThr,
          'page':1
        }
        this.loanlimits.map((v, i) => {
          if (v.icCheck) {
            this.loanThr.push(v.id)
          }
        })
        this.loanmaturitys.map((v, i) => {
          if (v.icCheck) {
            this.loanThr.push(v.id)
          }
        })
        this.speciallabels.map((v, i) => {
          if (v.icCheck) {
            this.loanThr.push(v.id)
          }
        })
        paramData['data'] = param
        paramData['protocol']['token'] = sessionStorage.getItem('token')
        getdetails(paramData).then(res => {
          this.listLoading = false
          this.$emit('hidden', '2', res.data.loanlist)

        })
      },
      getItme (index) {
        this.loanlimits.map((v, i) => {
          if (i == index) {
            v.icCheck = true
          } else {
            v.icCheck = false
          }
        })
      },
      getItme1 (index) {
        this.loanmaturitys.map((v, i) => {
          if (i == index) {
            v.icCheck = true
          } else {
            v.icCheck = false
          }
        })
      },
      getItme2 (id, index) {
        var icCheck = this.speciallabels[index].icCheck
        this.speciallabels[index].icCheck = icCheck === true ? false : true
      },

      //点击重置
      reset () {
        this.loanlimits.map((v, i) => {
          v.icCheck = false
        })
        this.loanmaturitys.map((v, i) => {
          v.icCheck = false
        })
        this.speciallabels.map((v, i) => {
          v.icCheck = false
        })
      },
      getSearchHtml () {
        let that = this
        let param = {
          param_type: ['0000', '0001', '0002']
        }
        paramData['data'] = param
        getsearch(paramData).then(res => {
          that.listLoading = false
          if (res.code == 200) {
            let loanType = res.data
            loanType.forEach((item, index) => {
              // console.log(item.module_name)
              if (item.param_type == '0000') {
                item.icCheck = false
                that.loanlimits.push(item)
              } else if (item.param_type == '0001') {
                item.icCheck = false
                that.loanmaturitys.push(item)
              } else {
                item.icCheck = false
                that.speciallabels.push(item)
              }
            })
          } else {
            alert('code: ' + res.code)
          }
        })
      }
    },
    mounted () {
      this.getSearchHtml()
    }
  }
</script>
