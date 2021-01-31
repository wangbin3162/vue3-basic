<template>
  <editor-demo></editor-demo>
  <div class="demo-button">
    <b-button>Default</b-button>
    <b-button type="dashed">Dashed</b-button>
    <b-button type="primary">Primary</b-button>
    <b-button type="success">Success</b-button>
    <b-button type="info">Info</b-button>
    <b-button type="warning">Warning</b-button>
    <b-button type="danger">Danger</b-button>

    <b-button @click="open1">render函数</b-button>
    <b-button @click="open2">notice</b-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditorDemo from '@/demo/EditorDemo.vue'
import { Notice, Message } from 'bin-ui-next'

export default defineComponent({
  name: 'App',
  components: { EditorDemo },
  setup() {
    const open2 = () => {
      Notice.info({ title: '标题', message: '我是内容我是内容我是内容' })
      Message.success('我是测试')
    }
    return { open2 }
  },
  methods: {
    open1() {
      Message.info('我是测试信息info')
      Message.success('我是测试信息success')
      Message.warning('我是测试信息warning')
      Message.error('我是测试信息error')
      this.$message({ message: '测试测试' })
    },
  },
})
</script>

<style lang="stylus">
.app {
}
</style>
