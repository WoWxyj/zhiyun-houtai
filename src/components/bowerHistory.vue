<template>
    <ul>
        <li v-for="recommend in recommendList">
            <img :src="recommend.loan_logo">
            <h3>{{recommend.loan_name}}</h3>
            <p>可借
                <span>{{ recommend.loan_small/10000 }} - {{ recommend.loan_big/10000 }}万</span>
            </p>
            <div class="qujie">去借款</div>
        </li>
    </ul>
</template>

<script>

  export default {
    name: "bowerHistory",
    data () {
      return {
        recommendList:[]
      }
    },
    created () {
      this.$store.state.showBottomNav = false
    }
  }
</script>