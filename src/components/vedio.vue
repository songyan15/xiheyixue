<template>
    <div class="container">
        <div class="player">
            <video-player class="video-player vjs-custom-skin needsclick"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
            >
            </video-player>
        </div>
        <tab :line-width="1" v-model="index">
            <tab-item
              class="vux-center"
              :selected="index==0"
              v-for="(item, index) in list"
              :key="index"
            >{{item}}</tab-item>
        </tab>
        <div class="tabContent">
            <div class="tab1"  v-if="index==0">
                <p class="tabInfo" v-for='(item,index) in this.vedio.Medias' :key="index">
                    <img :src="item.MediaPath" alt="" v-if='index>0'>
                </p>
            </div>
            <div class="tab2"  v-if="index==1">
                <div class="tabInfo" v-if="this.vedio.Teacher">
                    <p>讲师：{{this.vedio.Teacher.Name}}</p>
                    <p>来自大学：{{this.vedio.Teacher.Workplace}}</p>
                    <p>专长：{{this.vedio.Teacher.Brief}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Tab, TabItem} from "vux";
    import { videoPlayer } from 'vue-video-player';
    export default {
        data () {
            return {
                vedio:{},
                playerOptions: {
                },
                list: ["考点详情", "老师介绍"],
                index: 1
            }
        },
        components: {
            Tab,
            TabItem,
            videoPlayer
        },
        created() {
            this.$axios.get('/WebServices.ashx?action=CourseChildrenDetails&dataID='+this.$route.query.id,)
            .then((res) =>{
                //debugger
                if(res.data.data!=null){                    
                    this.vedio = res.data.data
                    //debugger
                    this.playerOptions = {                        
                        //  playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                        autoplay: false, //如果true,浏览器准备好时开始回放。
                        muted: false, // 默认情况下将会消除任何音频。
                        loop: false, // 导致视频一结束就重新开始。
                        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                        language: 'zh-CN',
                        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                        sources: [{
                            type: "",
                            src: this.vedio.Medias[0].MediaPath //你的m3u8地址（必填）
                        }],
                        poster: "", //你的封面地址
                        width: document.documentElement.clientWidth,
                        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                        //  controlBar: {
                        //   timeDivider: true,
                        //   durationDisplay: true,
                        //   remainingTimeDisplay: false,
                        //   fullscreenToggle: true //全屏按钮
                        //  }
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            }) 
        },
        methods: {
            onPlayerPlay(player) {
                //alert("play");
            },
            onPlayerPause(player){
                //alert("pause");
            }
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 .container {
    background-color: #efefef;
    min-height: 100%;
    .tabInfo{
        padding: .4rem;
        padding-bottom: 0;
        img{
            max-width: 100%;
        }
    }
 }
</style>
