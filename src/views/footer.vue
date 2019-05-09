<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <div class="grid-content" @click="switchTo('/')">
                <img :src="'/' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="首页">
                <span :class="{on: '/' === $route.path}">首页</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content" @click="switchTo('/loan')">
                <img :src="'/loan' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="贷款大全">
                <span :class="{on: '/loan' === $route.path}">贷款大全</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content" @click="switchTo('/card')">
                <img :src="'/card' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" alt="信用卡">
                <span :class="{on: '/card' === $route.path}">信用卡</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content" @click="switchTo('/center')">
                <img :src="'/center' === $route.path ? tabBarImgArr[3].selected : tabBarImgArr[3].normal" alt="个人中心">
                <span :class="{on: '/center' === $route.path}">个人中心</span>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data(){
        return{
            // 导航图片
        tabBarImgArr:[   //图片切换
            {normal: require('../assets/img/foot-icon1.png'), selected: require('../assets/changeImg/foot-icon11.png')},
            {normal: require('../assets/img/foot-icon2.png'), selected: require('../assets/changeImg/foot-icon22.png')},
            {normal: require('../assets/img/foot-icon3.png'), selected: require('../assets/changeImg/foot-icon33.png')},
            {normal: require('../assets/img/foot-icon4.png'), selected: require('../assets/changeImg/foot-icon44.png')}
        ],
        //   menuIndex : this.$route.matched[1].path,
            routes: [{
                path: "/",
                component: '首页',
                },{
                path: "/loan",
                component: 'loan'
                },{
                path: "/card",
                component: 'card'
                },{
                path: "/center",
                component: 'center'
            }]
        }
    },
  methods:{
    switchTo(path){
      // console.log(this.$router)
      this.$router.replace(path)
    }
  }
}
</script>


<style lang="scss">
    
</style>


