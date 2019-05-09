<template>
  <div id="app">
      <router-view></router-view>
      <el-footer v-if="$store.state.showBottomNav"></el-footer>
  </div>
</template>

<script>
import footer from './views/footer.vue'
// import index from './views/index/index.vue'
// import card from './views/card/card.vue'
// import loan from './views/loan/loan.vue'
// import center from './views/center/center.vue'
// import bigLoan from './views/index/bigloan.vue'
export default {
  name: 'App',
  created() {
      this.$store.state.showBottomNav = true
  },
  components:{
    'el-footer': footer,
  }
}
</script>

<style>


</style>
