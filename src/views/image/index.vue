<template>
  <div class="container-image">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>素材管理</my-bread>
      </div>
      <!--        按钮区域-->
      <div class="btn_box">
        <el-radio-group @change="changeCollect" v-model="filterParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float:right" type="success" size="small">添加素材</el-button>

      </div>
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt/>
          <div class="option" v-if="!filterParams.collect">
            <span @click="toggleStatus(item)" class="el-icon-star-off" :class="{red:item.is_collected}"></span>
            <span class="el-icon-delete" @click="delImage(item.id)"></span>
          </div>
        </div>
      </div>
      <!--      分页-->
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="filterParams.page"
        :page-size="filterParams.per_page"
        @current-change="changPager"
        :total="total">

      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        filterParams: {
          collect: false,
          //默认显示第一页
          page: 1,
          per_page: 10
        },
        total: 0,
        //图片数据
        images: []
      }
    },
    //页面初始化的时候加载，请求数据
    created() {
      this.getImages()
    },
    methods: {
      async getImages() {
        const {data: {data}} = await this.$http.get('user/images',
          {params: this.filterParams})
        this.images = data.results
        this.total = data.total_count
        console.log(this.images)
      },
      //处理页码改变
      changPager(newPage) {
        this.filterParams.page = newPage
        this.getImages()
      },
      //处理来回切换的数据
      changeCollect() {
        this.filterParams.page = 1,
          this.getImages()
      },
      //收藏图片处理函数
      async toggleStatus(item) {
        try {
          const {data: {data}} = await this.$http.put(`user/images/${item.id}`, {
            collect: !item.is_collected
          })
          this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
          //收藏成功修改星星样式
          item.is_collected = data.collect
        } catch (e) {
          this.$message.error('操作失败')
        }
      },
      //删除图片
      async delImage(id) {
        try {
          await this.$http.delete(`user/images/${id}`)
          this.$message.success('删除成功')
          this.getImages()
        } catch (e) {
          this.$message.error('删除图片失败')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .img_list {
    margin-top: 20px;

    .img_item {
      width: 262px;
      height: 250px;
      border: 1px dashed #ddd;
      position: relative;
      display: inline-block;
      margin: 0 30px 20px;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }

      .option {
        height: 30px;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
        position: absolute;
        left: 0;
        bottom: 0;
        text-align: center;
        line-height: 30px;

        span {
          color: #fff;
          margin: 0 20px;
        }

        .red {
          color: red;
        }
      }
    }
  }
</style>
