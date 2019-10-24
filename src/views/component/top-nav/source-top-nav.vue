<template>
  <div class="source-top-nav">
    <div class="left"
         @click="$emit('goBack')">
      <i class="iconfont iconfanhui"
         style="font-size: 23px;margin-right: 10px;"></i>
      <span>返回数据源</span>
    </div>
    <div :class="['intermediate', {'can-edit':titleCanEdit}]">
      <span v-show="!titleEditState"
            @click="editTitle('edit')">{{title}}</span>
      <el-input class="bottom-line"
                placeholder="标题 2~32个字符"
                v-show="titleEditState"
                maxlength="32"
                @blur="editTitle('save')"
                @keyup.enter.native="editTitle('save')"
                ref="titleInput"
                v-model="thisTitle"></el-input>
      <i class="el-icon-edit-outline"
         @click="editTitle('edit')"
         v-if="titleCanEdit && !titleEditState"></i>
    </div>
    <div class="right">
      <span @click="$emit('confirmUpload')">确认上传</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'source-top-nav',
  props: {
    title: {          // 标题
      type: String, default: '未命名数据源'
    },
    titleCanEdit: {   // 标题是否可以编辑
      type: Boolean, default: false
    },
    titleMaxLength: { // 标题最大长度
      type: Number, default: 32
    },
    titleMinLength: { // 标题最小长度
      type: Number, default: 2
    }
  },
  data () {
    return {
      thisTitle: this.title,          // 定义组件内部的标题，不要直接编辑props中的title
      titleEditState: false           // 是否正在编辑标题
    };
  },
  methods: {
    /**
     * 当标题编辑和保存
     * @param fun {string} 'edit'=编辑 'save'=保存
     * by：jhb
     */
    editTitle (fun) {
      if (this.titleCanEdit && fun) { // 只有 edit=true时标题才可以编辑
        switch (fun.toLowerCase()) {
          case 'edit':              // 编辑
            this.titleEditState = true;
            this.$nextTick(() => {  // 输入框聚焦
              let titleInput = this.$refs.titleInput;
              titleInput.focus();
            });
            break;
          case 'save':              // 保存
            if (this._validateTitle()) {
              this.$emit('update:title', this.thisTitle);
              this.titleEditState = false;
            }
            break;
        }
      }
    },

    /**
     * 标题验证
     * @returns {boolean}
     * by：jhb
     */
    _validateTitle () {
      let titleLength = this.thisTitle.trim().length;
      let msg = '';
      if (titleLength < this.titleMinLength || titleLength > this.titleMaxLength) {
        msg = `标题长度在 ${this.titleMinLength} 到 ${this.titleMaxLength} 个字符`;
        if (!titleLength) this.thisTitle = this.text;
      }
      if (msg) {
        this.$message({type: 'warning', message: msg, showClose: true});
      }
      return !msg;
    }
  }
};
</script>

<style lang="scss" scoped>
.source-top-nav {
  display: flex;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  padding: 0 20px;
  background-color: #4d6593;
  color: #fff;
  font-size: 16px;

  .left {
    flex-shrink: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .intermediate {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .el-icon-edit-outline {
      margin-left: 10px;
      font-size: 24px;
    }
  }
  .intermediate.can-edit {
    cursor: pointer;
  }

  .right {
    flex-shrink: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  /deep/ .bottom-line .el-input__inner {
    background-color: transparent;
    color: #ffffff;
  }
}
</style>
