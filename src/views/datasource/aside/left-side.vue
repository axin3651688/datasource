<template>
  <div class="aside">
    <p class="fist-left">
      数据源
      <i class></i>
    </p>
    <div class="input">
      <el-select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="搜索左侧数据源"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="left">
      <a>
        <i class="ico-shujuyuan left_icon quanbushujuyuantubiao-x1"></i>
        全部数据源
      </a>
      <a>
        <i class="ico-shujuyuan left_icon jingbangshujucangku-x"></i>
        系统源
      </a>
      <a>
        <i class="ico-shujuyuan left_icon xitongyuantubiao-x1"></i>
        数据库
      </a>
    </div>
  </div>
</template>
<script>
import { SEARCH_BY_CODE_KEYWORD } from "../../../api/dataSource";
export default {
  name: "",

  props: {},
  data() {
    return {
      tabPosition: "left"
    };
  },
  components: {},
  created() {},
  computed: {},
  mounted() {
    this.getcode();
  },
  methods: {
    async getcode() {
      let res = await SEARCH_BY_CODE_KEYWORD();
      //consloe.log(res.data.text);
    }
  }
};
</script>
<style scoped>
.aside {
  float: left;
  font-size: 14px;
  background: #fff;
  width: 256px;
  height: 887px;
  padding-left: 16px;
  box-shadow: 1px 0px 10px rgba(81, 130, 228, 0.2);
  z-index: 5;
}

.fist-left {
  padding: 16px 0;
}
a {
  display: block;
  padding: 16px 0;
}
i {
  margin-right: 20px;
}
</style>


