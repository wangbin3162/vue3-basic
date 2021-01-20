<template>
  <div class="editor-demo">
    <a-row>
      <a-col :span="12">
        <bin-ace-editor
          @init="handleInit"
          v-model="jsonStr"
          lang="json"
          width="100%"
          height="300"
          :theme="theme"
          :readonly="readonly"
          :font-size="fontSize" />
      </a-col>
      <a-col :span="12">
        <div style="padding: 20px;">
          <p>
            文字大小：
            <a-input-number v-model:value="fontSize" :min="12" :max="16" />
            只读：
            <a-switch v-model:checked="readonly" />
          </p>
          <p>皮肤：
            <a-radio-group v-model:value="theme">
              <a-radio v-for="item in themeList" :key="item" :value="item">{{ item }}</a-radio>
            </a-radio-group>
          </p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import BinAceEditor from '../components/editor'
import { defineComponent, ref, reactive } from 'vue'

require('brace/ext/emmet')
require('brace/ext/language_tools') // language extension
const language = ['json', 'javascript', 'markdown', 'sql', 'java', 'elixir', 'html', 'css', 'stylus']
const theme = [
  'chrome',
  'xcode',
  'clouds',
  'crimson_editor',
  'sqlserver',
  'github',
  'textmate',
  'tomorrow',
  'solarized_light',
  'cobalt',
  'dracula',
  'monokai',
  'solarized_dark',
  'terminal',
  'vibrant_ink',
]
language.forEach(lang => {
  require('brace/mode/' + lang)
  require('brace/snippets/' + lang)
})
theme.forEach(item => {
  require('brace/theme/' + item)
})

const jsonData = {
  title: '测试json数据',
  child: [
    {
      title: '子项名称1',
      desc: '子项描述1',
    },
    {
      title: '子项名称2',
      desc: '子项描述2',
    },
  ],
}
export default defineComponent({
  name: 'EditorDemo',
  components: { BinAceEditor },
  setup() {
    const jsonStr = ref(JSON.stringify(jsonData, null, 2))
    const modal = ref(false)
    const readonly = ref(false)
    const theme = ref('chrome')
    const fontSize = ref(12)
    const themeList = reactive([
      'chrome',
      'xcode',
      'clouds',
      'crimson_editor',
      'sqlserver',
      'github',
      'textmate',
      'tomorrow',
      'solarized_light',
      'cobalt',
      'dracula',
      'monokai',
      'solarized_dark',
      'terminal',
      'vibrant_ink',
    ])
    const handleZip = () => {
      jsonStr.value = JSON.stringify(JSON.parse(jsonStr.value), null, 0)
    }
    const handleFormat = () => {
      jsonStr.value = JSON.stringify(JSON.parse(jsonStr.value), null, 2)
    }
    const handleInit = () => {
      console.log('init editor success')
    }
    return {
      jsonStr,
      modal,
      readonly,
      theme,
      fontSize,
      themeList,
      handleInit,
      handleZip,
      handleFormat,
    }
  },
})
</script>

<style scoped lang="stylus">
.editor-demo {
  width: 1200px;
  margin: 40px auto;
}
</style>
