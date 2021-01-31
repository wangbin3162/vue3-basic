<!--suppress TypeScriptValidateTypes -->
<template>
  <div class="bin-ace-editor" ref="root" :style="wrapStyles"></div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ace = require('brace')

function px(n: string) {
  return /^\d*$/.test(n) ? `${n}px` : n
}

export default defineComponent({
  name: 'BinAceEditor',
  props: {
    modelValue: String,
    lang: {
      type: String,
      default: 'json',
    },
    theme: {
      type: String,
      default: 'chrome',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '350',
    },
    styles: {
      type: Object,
    },
    fontSize: {
      type: Number,
      default: 12,
    },
    options: Object,
    readonly: Boolean,
    wrap: {
      type: Boolean,
      default: false,
    },
    snippets: {
      type: Boolean,
      default: true,
    },
  },
  setup: function(props, { emit }) {
    const root = ref<null | HTMLElement>()
    const contentBackup = ref<string>('')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let editor: any = null
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { lang, theme, fontSize, readonly, wrap, snippets, width, height, styles } = props
    // 样式容器
    const wrapStyles = computed(() => {
      return {
        ...styles,
        width: width ? px(width) : '100%',
        height: height ? px(height) : '100%',
        border: '1px solid #e8e8e8',
      }
    })

    const getValue = () => {
      return editor.getValue()
    }
    const handleBlur = () => {
      emit('blur', props.modelValue)
    }
    const updateValue = (value: string) => {
      emit('update:modelValue', value)
    }
    // 监听器
    watch(() => props.modelValue, (val) => {
      if (editor && contentBackup.value !== val) {
        editor.session.setValue(val)
      }
    })
    watch(() => props.theme, (val) => {
      editor.setTheme('ace/theme/' + val)
    })
    watch(() => props.lang, (val) => {
      editor.getSession().setMode('ace/mode/' + val)
    })
    watch(() => props.options, (val) => {
      editor.setOptions(val)
    })
    watch(() => props.fontSize, (val) => {
      editor.setFontSize(val) // 设置文字大小
    })
    watch(() => props.readonly, (val) => {
      editor.setReadOnly(val) // 设置文字大小
    })
    watch(() => [props.width, props.height], () => {
      nextTick(() => {
        editor.resize()
      })
    })

    onMounted(() => {
      editor = ace.edit(root.value)
      editor.getSession().setMode('ace/mode/' + lang)
      editor.setTheme('ace/theme/' + theme)
      editor.$blockScrolling = Infinity
      editor.setFontSize(fontSize) // 设置文字大小
      editor.setReadOnly(readonly) // 设置只读
      editor.getSession().setUseWrapMode(wrap)
      editor.setShowPrintMargin(false)
      editor.getSession().setTabSize(2)
      editor.setOptions({
        enableBasicAutocompletion: snippets,
        enableSnippets: snippets,
        enableLiveAutocompletion: snippets,
      })
      emit('init', editor)
      if (props.modelValue) {
        editor.setValue(props.modelValue, 1)
        editor.gotoLine(0, 0, false)
        contentBackup.value = props.modelValue
      }
      editor.on('change', function() {
        const content = editor.getValue()
        updateValue(content)
        emit('change', content)
        contentBackup.value = content
      })
      editor.on('blur', handleBlur)
      if (props.options) {
        editor.setOptions(props.options)
      }
    })
    onUnmounted(() => {
      if (editor) {
        editor.destroy()
        editor.container.remove()
      }
    })
    return { root, contentBackup, wrapStyles, getValue }
  },
})
</script>
