<template>
  <div id="gif">
  </div>
</template>

<script>
  export default {
    created() {
      this.$http.get('user/profile').then(res =>{
        console.log(res.data)
      })
    }
  }
</script>

<style scoped>
#gif {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/true.gif") no-repeat center/cover;
  }
</style>
