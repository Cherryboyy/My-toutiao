<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <!--      面包屑-->
        <my-bread>内容管理</my-bread>
      </div>
      <!--    表单区域-->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="filterParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
<!--        <el-form-item label="频道：">-->
<!--          <el-select v-model="filterParams.channel_id"-->
<!--                     @change="changeChannel"-->
<!--                     clearable-->
<!--                     placeholder="请选择">-->
<!--            <el-option-->
<!--              v-for="item in channelOptions"-->
<!--              :key="item.id"-->
<!--              :label="item.name"-->
<!--              :value="item.id">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <my-channel v-model="filterParams.channel_id"></my-channel>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            @change="changeDate"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card id="zz">
      <div slot="header">
        根据筛选条件共查询到{{total}}条结果：
      </div>
      <el-table
        :data="articles"
        style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- 图片组件 -->
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/images/error.gif" style="width:150px;height:100px">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title">

        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate">
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button plain type="primary" @click="toEdit(scope.row.id)" icon="el-icon-edit" circle></el-button>
            <el-button plain type="danger" @click="delArticle(scope.row.id)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px;text-align:right"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="changePager"
        :current-page="filterParams.page"
        :page-size="filterParams.per_page"
      ></el-pagination>
    </el-card>
  </div>

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
          end_pubdate: null,
          page: null,
          per_page: 10
        },
        //频道
        channelOptions: [],
        dateArr: [],
        //文章数据
        articles: [],
        // 总条数
        total: 0,
      };
    },
    created() {
      // this.getChannelOptions()
      this.getArticles()
    },
    //获取下拉分类的数据
    methods: {
      // async getChannelOptions() {
      //   const {data: {data}} = await this.$http.get('channels')
      //   this.channelOptions = data.channels
      //   // console.log(data)
      // },
      //获取文章数据
      async getArticles() {
        const {data: {data}} = await this.$http.get('articles',
          {params: this.filterParams})
        this.articles = data.results
        this.total = data.total_count
        // console.log(data)
      },
      //获取当前分页以及数据
      changePager(newPage) {
        this.filterParams.page = newPage
        this.getArticles()
      },
      //筛选
      search() {
        this.filterParams.page = 1
        this.getArticles()
      },
      // 日期选择处理函数
      changeDate(value) {
        // value  和  this.dateArr 的值一致的
        if (!value) value = [null, null]
        // if (value) {
        this.filterParams.begin_pubdate = value[0]
        this.filterParams.end_pubdate = value[1]
        // } else {
        //   this.filterParams.begin_pubdate = null
        //   this.filterParams.end_pubdate = null
        // }
      },
      // //频道处理函数
      // changeChannel() {
      //   if (this.filterParams.channel_id === '') this.filterParams.channel_id = null
      // },
      //删除文章
      async delArticle (articleId) {
        //发送删除请求
        try {
          await this.$http.delete(`articles/${articleId}`)
          this.$message.success('删除成功')
          //重新渲染页面
          this.getArticles()
        }catch (e) {
          console.log(e)
          this.$message.error('删除失败')
        }
      },
      //编辑文章跳转
      toEdit(articleId) {
        this.$router.push(`/publish?id=${articleId}`)
      }
    }
  }
</script>

<style scoped>
  el-card {
    margin-top: 20px;
  }

  #zz {
    margin-top: 20px;

  }
</style>
