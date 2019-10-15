<style lang="less" scoped>
.mt-progress {
    height: 15px;
    line-height: 15px;
}
</style>
<style>
.vedioMenu .weui-cells {
    margin-top: 0;
}
</style>


<template>
    <div class="chapter vedioMenu">
      <group title="微生物和微生物学检验">
        <cell
          title="微生物和微生物学检验"
          is-link
          :border-intent="false"
          :arrow-direction="showContent001 ? 'up' : 'down'"
          @click.native="showContent001 = !showContent001">
          <span style="color: 00bfff;margin-right:.2rem;display:inline-block;">
            <p>1237题</p>
            <p>
              <mt-progress :value="20" :bar-height="5"></mt-progress>
            </p>
          </span>
        </cell>

        <template v-if="showContent001">
          <group >
            <cell :border-intent="false" class="sub-item" is-link  title="第一章" :link="{path:'/option'}">
              <span style="color: 00bfff;margin-right:.2rem;display:inline-block;">
                <p>627题</p>
                <p>
                  <mt-progress :value="20" :bar-height="5"></mt-progress>
                </p>
              </span>
            </cell>
            <cell :border-intent="false" class="sub-item" is-link  title="第二章" :link="{path:'/option'}">
              <span style="color: 00bfff;margin-right:.2rem;display:inline-block;">
                <p>610题</p>
                <p>
                  <mt-progress :value="10" :bar-height="5"></mt-progress>
                </p>
              </span>
            </cell>
          </group>
        </template>

        <cell
          title="临床免疫学和免疫学检验"
          is-link
          :border-intent="false"
          :arrow-direction="showContent002 ? 'up' : 'down'"
          @click.native="showContent002 = !showContent002">
          <span style="color: 00bfff;margin-right:.2rem;display:inline-block;">
            <p>458题</p>
            <p>
              <mt-progress :value="10" :bar-height="5"></mt-progress>
            </p>
          </span>
        </cell>
        <template v-if="showContent002">
          <group >
            <cell :border-intent="false" class="sub-item" is-link  title="第一章" :link="{path:'/option'}">
              <span style="color: 00bfff;margin-right:.2rem;display:inline-block;">
                <p>94题</p>
                <p>
                  <mt-progress :value="20" :bar-height="5"></mt-progress>
                </p>
              </span>
            </cell>
            <cell :border-intent="false" class="sub-item" is-link  title="第二章" :link="{path:'/option'}">
              <span style="color: 00bfff;margin-right:.2rem;display:inline-block;">
                <p>206题</p>
                <p>
                  <mt-progress :value="10" :bar-height="5"></mt-progress>
                </p>
              </span>
            </cell>
            <cell :border-intent="false" class="sub-item" is-link  title="第三章" :link="{path:'/option'}">
              <span style="color: 00bfff;margin-right:.2rem;display:inline-block;">
                <p>158题</p>
                <p>
                  <mt-progress :value="50" :bar-height="5"></mt-progress>
                </p>
              </span>
            </cell>
          </group>
        </template>      
      </group>
    </div>
</template>

<script>
    import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
    export default {
        name: "vedioMenu",
        components: {
          Group,
          Cell,
          CellFormPreview,
          CellBox,
          Badge
        },
        data(){
          return {
            showContent001:false,
            showContent002:false
          }
        }
    }
</script>

