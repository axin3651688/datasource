<!--一些内容页面的头部，包含logo，title，简单描述，操作按钮等11-->
<!--数据集合资源区有用到-->
<template>
  <div class="view ModuleHead">
    <div class="module-head__left">
      <img src="@a/data-area-top.svg"
           style="margin-right:8px;" />
      <div class="module-head__detail">
        <h3 class="detail__title">{{cubeObject&&cubeObject.text}}</h3>
        <div class="detail__desc"
             v-if="cubeObject&&cubeObject.text">
          <div class="desc__item">
            显示最新数据共
            <span class="text-important">{{cubeObject.datas?cubeObject.datas.length:0}}</span>
            条
          </div>
          <div class="desc__item">最近更新时间: {{cubeObject.updateTime}}</div>
        </div>
      </div>
    </div>
    <div class="module-head__right">
      <slot name="left"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'module-head',
  props: {
    // cubeObject: { type: Object, default: () => { } }
    cubeObject: Object
  }

};
</script>

<style lang="scss" scoped>
.ModuleHead {
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: #ffffff;
  box-shadow: 1px 0px 10px rgba(81, 130, 228, 0.2);

  .module-head__left {
    display: flex;
    align-items: center;
    min-width: 450px;

    .module-head__icon-box {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 8px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      background-color: green;
    }

    .module-head__detail {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    .detail__title {
      font-size: 16px;
      line-height: 24px;
      // font-weight: bold;
      margin: -6px 0 4px 0;
      color: #2a2f38;
    }

    .detail__desc {
      display: flex;
      color: rgba(98, 108, 127, 1);
      font-size: 14px;
      line-height: 20px;
    }

    .desc__item + .desc__item {
      margin-left: 8px;
    }
  }

  .module-head__right {
    display: flex;
    align-items: center;
    height: 32px;
  }

  .iconIcon-wenjianleixing-Excel {
    color: #ffffff;
    font-size: 30px;
  }
}
</style>
