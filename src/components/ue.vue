<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
export default {
  name: 'UE',
  data () {
    return {
      editor: null
    }
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    }
  },
  mounted () {
    // const _this = this
    // eslint-disable-next-line
    this.editor = UE.getEditor('editor', this.config) // 初始化UE
    this.editor.addListener('ready', () => {
      this.editor.setContent(this.defaultMsg) // 确保UE加载完成后，放入内容。
    })
  },
  methods: {
    getUEContent () { // 获取内容方法
      return this.editor.getContent()
    },
    setUEContent (val) {
      this.editor.setContent(val)
    }
  },
  destroyed () {
    this.editor.destroy()
  }
}
</script>
