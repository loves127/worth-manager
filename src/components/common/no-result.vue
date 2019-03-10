<template>
  <div class="no-result">
    <img src="../../assets/void.png" alt="">
    <span class="no-result_title">{{title}}</span>
  </div>
</template>

<script>

  export default{
    props: ['title'],
  }
</script>
<style lang="less">
  .no-result{
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    top: 50%;
  }
  .no-result_title{
    text-align: center;
    margin-top: 20px;
    margin-right: 30px;
    color: #9BA4A2
  }
</style>
