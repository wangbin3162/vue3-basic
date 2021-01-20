<template>
  <editor-demo></editor-demo>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import EditorDemo from '@/demo/EditorDemo.vue'

export default defineComponent({
  name: 'App',
  components: { EditorDemo },
})
</script>

<style lang='stylus'>
.app {

}
</style>
