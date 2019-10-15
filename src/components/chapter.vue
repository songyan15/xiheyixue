<template>
    <div class="chapter">
      <!-- <group gutter="0">
        <cell title="微生物和微生物学检验" is-link></cell>
        <cell title="临床免疫学和免疫学检验" is-link></cell>
      </group> -->
      <group title="微生物和微生物学检验">
        <cell
          title="微生物和微生物学检验"
          is-link
          :border-intent="false"
          :arrow-direction="showContent001 ? 'up' : 'down'"
          @click.native="showContent001 = !showContent001"></cell>

        <template v-if="showContent001">
          <cell-box :border-intent="false" class="sub-item" is-link>第一章</cell-box>
          <cell-box class="sub-item" is-link>第二章</cell-box>
          <cell-box class="sub-item" is-link>第三章</cell-box>
        </template>

        <cell
          title="临床免疫学和免疫学检验"
          is-link
          :border-intent="false"
          :arrow-direction="showContent002 ? 'up' : 'down'"
          @click.native="showContent002 = !showContent002"></cell>

        <template v-if="showContent002">
          <!-- <cell-form-preview :border-intent="false" :list="list"></cell-form-preview> -->
          <cell-box :border-intent="false" class="sub-item" is-link>第一章</cell-box>
          <cell-box class="sub-item" is-link>第二章</cell-box>
          <cell-box class="sub-item" is-link>第三章</cell-box>
        </template>

        
      </group>
    </div>
</template>

<script>
    import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
    export default {
      name: "chapter",
      data () {
        return {
          list: [{
            label: '第一章',
            value: '3.29'
          }, {
            label: '第二章',
            value: '1.04'
          }, {
            label: '第三章',
            value: '8.00'
          }],
          showContent001: false,
          showContent002: false
        }
      },
      components: {
        Group,
        Cell,
        CellFormPreview,
        CellBox,
        Badge
      },
    }
</script>

<style scoped>

</style>
