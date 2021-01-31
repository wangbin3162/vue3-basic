import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import BinUI from 'bin-ui-next'
import 'bin-ui-next/lib/styles/index.css'
// import './assets/theme.styl'

// import Element from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'

require('brace/ext/emmet')
require('brace/ext/language_tools') // language extension
const language = [
  'json',
  'javascript',
  'markdown',
  'sql',
  'java',
  'elixir',
  'html',
  'css',
  'stylus',
]
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
const app = createApp(App)
app.use(Antd)
app.use(BinUI)
// app.use(Element)
app.mount('#app')
