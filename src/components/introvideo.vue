<template>
  <div class="introvideo">
    <div v-if="videos && videos.length > 0">
      <!--切换按钮-->
      <!--<div class="introvideo-btn-wrap">-->
        <!--<el-tabs v-model="activeName" @tab-click="playTabClick">-->
          <!--<el-tab-pane v-for="(video,index) in this.videos" :key="index" :label="video.title" :name="video.vid"></el-tab-pane>-->
        <!--</el-tabs>-->
      <!--</div>-->
      <!--播放窗口-->
      <div class="introvideo-wrap">
        <div id="showVideo" class="video-wrap"></div>
        <div class="list-wrap">
          <div class="list-wrap-title"><i class="el-icon-menu"></i> 课程试听视频列表</div>
          <div class="list-wrap-rows">
            <div v-for="(video,index) in this.videos" :key="index" @click="activeIndex=index" class="list-item">
              <div class="list-item-img">
                <img :src="video.thumb" />
                <!--<span class="list-item-duration">15:10</span>-->
              </div>
              <div class="list-item-title">
                <span v-if="activeIndex==index" class="active">{{video.title}}</span>
                <span v-else class="list-item-wait">{{video.title}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      activeIndex: null,
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
      // let vid = this.videos[this.activeIndex].vid
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
    activeIndex (value) {
      if (this.videos[value]) {
        this.playVideo(this.videos[value].vid)
      }
    },
    videos (value) {
      if (value && value[0]) {
        // this.activeName = value[0]['vid']
        this.activeIndex = 0
      }
    }
  }
}
</script>
<style>
  .introvideo{
    width: 100%;
    padding-top: 30px;
  }
  .introvideo-wrap{
    margin: 0 auto;
    width: 1280px;
    height:700px;
    background-color: #000;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .video-wrap{
    flex: 0 0 980px;
    height: 100%;
    overflow: hidden;
  }
  .list-wrap{
    flex: 0 0 300px;
    height: 100%;
    color: #e1e1e1;
    border-left:1px solid #444;
    background-color: #39383d;  /*#39383d #222*/
  }
  .list-wrap-title{
    padding: 15px;
    border-bottom: 1px solid #000;
    font-size: 16px;
  }
  .list-wrap-rows{
    padding:10px;
  }
  .list-item{
    font-size: 14px;
    padding: 10px 0;
    cursor: pointer;
    display: flex;
    flex-direction: row;
  }
  .list-item-title{padding-left:10px;padding-top:2px;font-size: 16px;}
  .list-item-img{
    flex: 0 0 150px;
    position: relative;
  }
  .list-item-img img{width:100%;}
  .list-item-duration{
    position: absolute;
    background: rgba(10,10,10,0.8);
    color:#fff;
    width:auto;
    height:16px;
    line-height: 16px;
    padding:2px 4px;
    left:5px;
    bottom: 10px;
    font-size: 12px;
  }
  .active{
    color:#ff6428;
  }
</style>
