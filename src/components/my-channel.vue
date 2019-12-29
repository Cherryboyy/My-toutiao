<template>
  <el-form-item label="频道：">
    <el-select v-model="channelId"
               @change="changeChannel"
               clearable
               placeholder="请选择">
      <el-option
        v-for="item in channelOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  export default {
    // props:['value'],
    name: "my-channel",
    data() {
      return {
        //选择后频道id
        channelId: null,
        //频道选项
        channelOptions: []
      }

    },
    created() {
      this.getChannelOptions()
    },
    methods: {
      //获取下拉分类的数据
      async getChannelOptions() {
        const {data: {data}} = await this.$http.get('channels')
        this.channelOptions = data.channels
        // console.log(data)
      },
      // 频道选择处理函数
      changeChannel (channelId) {
        // if (this.channelId === '') this.channelId = null
        if (channelId === '') channelId = null
        // 把选择的频道传递给父组件  父组件去修改数据
        this.$emit('input', channelId)
      }

    }
  }
</script>

<style scoped>

</style>
