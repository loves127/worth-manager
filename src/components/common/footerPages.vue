<template>
  <div class="footer-pages">
    <div class="btn-groups">
      <el-button type="success" @click="$emit('selectAll')">全选</el-button>
      <el-button type="warning" @click="$emit('canselAll')">取消全选</el-button>
      <el-button type="danger" @click="$emit('deleteMany')">批量删除</el-button>
    </div>
    <el-pagination @current-change="handleCurrentChange"
                   :current-page="pagination.curPage"
                   layout="total, prev, pager, next, jumper"
                   :total="pagination.total"
                   :page-size="pagination.rows"/>

  </div>
</template>

<script>
  import {Pagination, Button} from 'element-ui'

  export default {
    name: "footerPages",
    components: {
      ElPagination: Pagination,
      ElButton: Button
    },
    props: ['pagination', 'multipleSelection'],
    data() {
      return {}
    },
    methods: {
      // 点击当前行
      handleCurrentChange(v) {
        this.$emit('handleCurrentChange', v)
      }
    }
  }
</script>

<style lang="less">
  .el-pagination {
    text-align: right;
    margin-top: 10px;
  }

  .organization {
    padding: 0 10px;
    overflow-y: auto;
  }

  .footer-pages {
    display: flex;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    z-index: 1000;
    /*line-height: 50px;*/
    background-color: #909399;
    webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    padding: 0 20px;
    box-sizing: border-box;
    .el-pagination {
      /*position: absolute;*/
      /*right: 30px;*/
      color: #fff;
    }
    .el-pager li {
      color: #000;
      &.active {
        color: #fff;
      }
    }
    .btn-groups {
      align-self: center;
    }
  }
</style>
