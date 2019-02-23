<template>
  <div class="kz-tree__wrapper">
    <div class="kz-tree__top">
      <el-button size="small" icon="plus" type="primary" @click="treeAdd({id: 0 })">菜单</el-button>
    </div>
    <el-tree
      ref="kzTree"
      :data="treeData"
      :props="data.defaultProps"
      :expand-on-click-node="false"
      lazy
      :load="loadTreeNode"
      @node-click="handleNodeClick"
      :render-content="nodeRender"
      class="kz-tree">
    </el-tree>
   <menu-dialog
     :dialog="dialog"
     @cancelSubmit="cancelSubmit"
     @submitForm="submitForm"
   />
  </div>
</template>

<script>
  import {Tree, Button} from 'element-ui';
  import MenuDialog from './menu-dialog'
  import menuApi from '@/api/menu';
  export default {
    components: {
      ElTree: Tree,
      ElButton: Button,
      MenuDialog
    },
    name: 'kz-tree',
    props: {
      data: {
        type: Object,
        required: true,
        default () {
          return {
            // 默认tree-node的字段名
            defaultProps: {
              children: 'children',
              label: 'name',
              isLeaf: 'isLeaf'
            }
          }
        }
      }
    },
    data () {
      return {
        __currentNode: null,
        treeData: [],
        menuDialogVisible: false,
        /* 弹框 */
        dialog: {
          title: '增加菜单',
          visible: false,
          submiting: false,
          form: {
            name: '',
            id: '',
            parentId: 0,
            url:'',
            sort:'',
            icon:'',
            visible:false,
            remark:''
          },
          rules: {
            name: {
              required: true,
              message: '请输入菜单名称',
              trigger: 'blur'
            }
          }
        }
      }
    },
    methods: {
      /* 加载子菜单 */
      loadTreeNode (treeItem, resolve) {
        let id = treeItem.data.length === 0? 0:treeItem.data.id
        menuApi.list({ id: id }).then(data=>{
          resolve(data.data)
        });
      },
      /* 点击响应时间 */
      handleNodeClick (...args) {
        this.$emit('node-click', ...args)
      },
      /* 构建菜单title及工具 */
      nodeRender (h, { _self, node, data }) {
        const childrenNodes = data.id === 0 ? [h('span', data.name)] : [
          h('span', data.name),
          h('span',
            {
              'class': 'kz-tree-bar'
            },
            [
              // 编辑
              h('i', {
                'class': 'el-icon-edit',
                on: {
                  click: function (event) {
                    event.stopPropagation()
                    typeof _self.treeEdit === 'function' && _self.treeEdit(data, event, node)
                  }
                }
              }),
              // 添加
              h('i', {
                'class': 'el-icon-plus',
                on: {
                  click: function (event) {
                    event.stopPropagation()
                    typeof _self.treeAdd === 'function' && _self.treeAdd(data, event, node)
                  }
                }
              }),
              // 删除
              h('i', {
                'class': 'el-icon-close',
                props: {
                  'v-popover': 'delTreeConfirm'
                },
                on: {
                  click: function (event) {
                    event.stopPropagation()
                    typeof _self.treeDelete === 'function' && _self.treeDelete(data, event, node)
                  }
                }
              })
            ]
          )
        ]
        return h(
          'div',
          {
            'class': 'el-tree-node__label',
            prop: {
              children: '-'
            }
          },
          childrenNodes
        )
      },
      /* 添加 */
      treeAdd (treeItem, event, node) {
        this.__currentNode = node
        Object.assign(this.dialog, {
          title: '增加菜单',
          visible: true,
          form: {
            name: '',
            id: '',
            parentId: treeItem.id,
            url:'',
            sort:'',
            icon:'',
            visible:false,
            remark:''
          }
        })
      },
      /* 编辑 */
      treeEdit (treeItem, event, node) {
        console.log(treeItem)
        this.__currentNode = node
        Object.assign(this.dialog, {
          title: '编辑菜单',
          visible: true,
          form: {
            name: node.data.name,
            id: node.data.id,
            parentId: node.data.id,
            url:node.data.url,
            sort:node.data.sort,
            icon:node.data.icon,
            visible:node.data.visible,
            remark:node.data.remark
          }
        })
      },
      /* 删除 */
      treeDelete (treeItem, event, node) {
        const fetchDelOk = () => {
          menuApi.delete({ id: treeItem.id }).then(data=>{
            console.log(data);
            if(data.state === '200'){
              node.parent.removeChild(node)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        };
        // 询问提示
        this.$confirm('是否删除此菜单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(fetchDelOk).catch(e => e)
      },
      /* 其他 */
      cancelSubmit () {
        this.dialog.visible = false;
        // this.$refs.dialogForm.resetFields()
      },
      // 提交表单
      submitForm () {
        // 增加表单验证
        this.fetchAddTreeNode();
        // this.$refs.dialogForm.validate((valid) => {
        //   if (valid) { // 验证通过
        //     this.fetchAddTreeNode()
        //   } else {
        //     return false
        //   }
        // })
      },
      fetchAddTreeNode () {
        let _self = this;
        const message = this.dialog.form.id ? '编辑成功' : '添加成功';
        console.log(this.dialog.form)
        console.log(this.dialog.form.id)
        if(this.dialog.form.id){
          this.dialog.submiting = true
          menuApi.update(this.dialog.form).then(data=>{
            this.dialog.submiting = false
            /* 隐藏dialog */
            Object.assign(this.dialog, {
              submiting: false,
              visible: false
            });
            console.log(data)
            if(data.state === '200'){
              this.$message({ message: message, type: 'success' })
              this.__currentNode && this.$set(this.__currentNode, 'data', data.data)
            }
          })
        }else{
          menuApi.add(this.dialog.form).then(data=>{
            //this.$refs.dialogForm.resetFields()
            this.$message({ message: message, type: 'success' })
            /* 隐藏dialog */
            Object.assign(this.dialog, {
              submiting: false,
              visible: false
            })
            if (_self.__currentNode) { // 子菜单添加子类
              this.__currentNode.doCreateChildren([data.data])
            } else if (data.data.parentId == 0) { // 顶级添加子类
              this.$refs.kzTree.root.doCreateChildren([data.data])
            }
          })
        }
      }
    }
  };
</script>

<style>
  .kz-tree__wrapper {
    min-width: 300px;
    text-align: left;
    border: 1px solid #f8f8f8;
  }
  .kz-tree__top {
    padding: 10px;
    text-align: right;
    border-bottom: 1px solid #f8f8f8;
  }
  .kz-tree{
    border: none;
  }
  .el-tree-node {
    position: relative;
  }
  .el-tree-node__content:hover .kz-tree-bar {
    display: block;
  }
  .kz-tree-bar {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 12px;
  }

  .kz-tree-bar > i {
    margin: 0 5px;
    color: #999;
  }
  .kz-tree-bar > i:hover {
    color: #20a0ff;
  }
</style>
