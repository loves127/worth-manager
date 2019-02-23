<template>
   <div class="base-settiong">
     <income-item class="mt10"/>
     <expenditure-item class="mt10"/>
     <!--<pay-type class="mt10"/>-->
   </div>
</template>

<script>
  import IncomeItem from './income-item'
  import ExpenditureItem from './expenditure-item'
  import PayType from './pay-type'
  export default {
    name: "index",
    components:{
      IncomeItem,
      ExpenditureItem,
      PayType
    }
  }
</script>

<style lang="less">
 .base-settiong{
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   flex-wrap: wrap;
   .mt10{
     margin-top: 10px;
   }
   .income-item{
     width: 48%;
     border: 1px solid #f8f8f8;
   }
   .expenditure-item{
     width: 48%;
     border: 1px solid #f8f8f8;
   }
   .pay-type{
     width: 48%;
     border: 1px solid #f8f8f8;
   }
 }
</style>
