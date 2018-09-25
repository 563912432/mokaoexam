<template>
  <div class="index">
    <chuji v-if="mokaoType === 'chujikuaiji'"></chuji>
    <zhongji v-if="mokaoType === 'zhongjikuaiji'"></zhongji>
  </div>
</template>

<script>
import zhongji from './zhongji'
import chuji from './chuji'
export default {
  name: 'index',
  components: {
    'zhongji': zhongji,
    'chuji': chuji
  },
  computed: {
    mokaoType () {
      return window.tag
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    z-index: 1;
  }
</style>
