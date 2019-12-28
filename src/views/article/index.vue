<template>
  <el-card class="box-card">
    <div slot="header">
      <!--      面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--    表单区域-->
    <el-form label-width="80px" size="small">
      <el-form-item label="状态：">
        <el-radio-group v-model="filterParams.status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="1">草稿</el-radio>
          <el-radio :label="2">待审核</el-radio>
          <el-radio :label="3">审核通过</el-radio>
          <el-radio :label="4">审核失败</el-radio>
          <el-radio :label="5">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道：">
        <el-select v-model="filterParams.channel_id" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期：">
        <el-date-picker
          v-model="dateArr"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
    </div>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        //状态
        filterParams: {
          // 如果不传当值为null  默认查询全部状态
          status: null,
          channel_id: null,
          begin_pubdate: null,
          end_pubdate: null
        },
        //频道
        options: [{
          value: '选项1',
          label: '黄金糕'
        },
          {
            value: '选项2',
            label: '双皮奶'
          }],
        dateArr:[]
      };
    }
  }
</script>

<style scoped>

</style>
