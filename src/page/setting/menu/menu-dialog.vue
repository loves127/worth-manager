<template>
  <el-dialog :title="dialog.title" v-model="dialog.visible" :close-on-click-modal="false">
    <el-form ref="form" :model="dialog.form" label-width="120px">
      <!--<el-form-item label="上级菜单">-->
        <!--<el-input placeholder="请输入上级菜单名称" v-model="dialog.form" class="input-with-select" style="width: 250px;">-->
          <!--<el-button slot="append" icon="el-icon-search" @click="visible=true">-->
            <!--<i class="el-icon-search"></i>-->
          <!--</el-button>-->
        <!--</el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="菜单名称">
        <el-input v-model="dialog.form.name" style="width: 250px;"/>
      </el-form-item>
      <el-form-item label="菜单链接">
        <el-input v-model="dialog.form.url" style="width: 250px;"/>
      </el-form-item>
      <el-form-item label="菜单排序(升序)">
        <el-input v-model="dialog.form.sort" style="width: 250px;"/>
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input placeholder="请选择图标" v-model="dialog.form.icon" class="input-with-select" style="width: 250px;">
          <el-button slot="append" icon="el-icon-search" @click="visible=true">
            <i class="el-icon-search"></i>
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="可见">
        <el-radio-group v-model="dialog.form.visible">
          <el-radio :label="true">可见</el-radio>
          <el-radio :label="false">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="5" v-model="dialog.form.remark"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$emit('submitForm')" :loading="dialog.submiting">立即创建</el-button>
        <el-button @click="$emit('cancelSubmit')">取消</el-button>
      </el-form-item>
    </el-form>
    <!--<el-form :model="dialog.form" ref="dialogForm" :rules="dialog.rules" class="el-col-offset-4">-->
    <!--<el-form-item label="菜单名称" prop="name" label-width="120" required>-->
    <!--<el-input v-model="dialog.form.name" auto-complete="off" class="el-col-12"/>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="cancelSubmit">取 消</el-button>-->
    <!--<el-button type="primary" @click="submitForm" :loading="dialog.submiting">确 定</el-button>-->
    <!--</div>-->
  </el-dialog >
</template>

<script>
  import { Button,Dialog,Form,FormItem,Input,RadioGroup,Radio} from 'element-ui'
  export default {
    name: "menu-dialog",
    components:{
      ElButton: Button,
      ElDialog:Dialog,
      ElForm:Form,
      ElFormItem: FormItem,
      ElInput:Input,
      ElRadioGroup:RadioGroup,
      ElRadio:Radio
    },
    props:['dialog'],
    data(){
      return{
      }
    },
    methods:{
      handleNodeClick(data){
        this.$emit('setMenuName',data.label);
      },
      onSubmit(){}
    }
  }
</script>

<style scoped>

</style>
