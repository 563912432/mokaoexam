<template>
  <div class="introvideo">
    <div v-if="videos && videos.length > 0">
      <!--切换按钮-->
      <div class="introvideo-btn-wrap">
        <el-tabs v-model="activeName" @tab-click="playTabClick">
          <el-tab-pane v-for="(video,index) in this.videos" :key="index" :label="video.title" :name="video.vid"></el-tab-pane>
        </el-tabs>
        <!--<el-button  v-for="(video,index) in this.videos" :key="index" @click="playVideo(video.vid)" type="primary">{{video.title}}</el-button>-->
      </div>
      <!--播放窗口-->
      <div id="showVideo" class="introvideo-wrap"></div>
    </div>
  </div>
</template>

<script>
import polyvObject from 'polyvObject'
export default {
  name: 'introvideo',
  props: ['videos'],
  data () {
    return {
      show: false,
      activeName: ''
    }
  },
  computed: {

  },
  methods: {
    playTabClick (tab, event) {
      this.playVideo(tab.name)
    },
    playVideo (vid) {
      window.axios.post('api/mokao/videoH5 ', {vid: vid}).then(res => {
        if (res.data.status === 1) {
          this.videoPlayer = polyvObject('#showVideo').videoPlayer({
            'width': '100%',
            'height': '100%',
            'forceH5': true,
            'playsafe': res.data.resultData,
            'vid': vid
          })
        } else {
          this.videoPlayer = polyvObject('#showVideo').videoPlayer({
            'width': '100%',
            'height': '100%',
            'vid': vid
          })
        }
      }).catch(() => {
        this.videoPlayer = polyvObject('#showVideo').videoPlayer({
          'width': '100%',
          'height': '100%',
          'vid': vid
        })
      })
      // player.j2s_resumeVideo()
    }
  },
  watch: {
    videos (value) {
      if (value && value[0]) {
        this.activeName = value[0]['vid']
        this.playVideo(value[0]['vid'])
      }
    }
  }
}
</script>
<style>
  .introvideo{
    width: 100%;
  }
  .introvideo-wrap{
    margin: 0 auto;
    width: 1280px;
    height:800px;
    background-color: #000;
  }
  .introvideo-btn-wrap{

  }
  .introvideo-btn-wrap .el-tabs__item{
    color:#fff!important;
    font-size: 16px!important;
  }
  .introvideo-btn-wrap .el-tabs__item.is-active {color: #409eff!important;}
</style>
