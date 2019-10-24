<template>
  <!-- 这个组件仪表盘和资源区处于编辑状态时顶部都要用, 资源区天生没有新建,只有编辑状态 -->
  <div class="view PanelHead">
    <div class="header-left header-btn"
         @click="leaveEditOrCreateState">
      <i class="ico-quanju fanhuitubiao-x"
         style="margin-right: 10px"></i>
      <span style="font-size:14px;">返回</span>
    </div>
    <div class="header-center"
         style="font-size:14px;">
      {{text ? title : '新建仪表盘'}}
      <i class="ico-quanju xinjianziyuantubiao-x"
         style="margin:0 8px 0 8px"></i>
    </div>
    <div class="header-right header-btn"
         @click="$emit('rightButtonClick')">
      <i class="ico-quanju fanhuitubiao-"
         style="margin:0"></i>
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'panel-head',
  props: {
    text: String
  },
  computed: {
    title () {
      return '编辑-' + this.text;
    }
  },

  methods: {
    /**
     *  @desc  :  返回
     *  @author:  gxb
     *  @date  :  2019/09/11
     *  @update  by
     */
    leaveEditOrCreateState () {
      this.$emit('leaveEditOrCreateState');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@s/variables.scss";

.PanelHead {
  height: 50px;
  line-height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #ffffff;
  background-color: $color-theme-main;
}

.header-icon {
  font-size: 24px;
  vertical-align: middle;
}

.header-btn {
  cursor: pointer;
  transition: all 0.2s;

  i {
    margin-right: 8px;
  }
  > div {
    display: inline-block;
  }
  &:hover {
    opacity: 0.75;
  }
}
</style>
