<template>
  <div class="dataSource">
    <LeftSide></LeftSide>
    <el-main class="right">
      <div class="top">
        <span class="top_datasource">数据源</span>
        <span class="add__wrapper">
          <i class="ico-shujuyuan tianjiashujuyuan-x add-data-sou"></i>
          <span class="add__datasource">添加数据源</span>
        </span>
      </div>
    </el-main>
  </div>
</template>

<script>
import LeftSide from "./aside/left-side";
import {
  DATA_SOURCE_FIND_PAGE,
  FIND_CHILD_CODE,
  FIND_CODE_DICT,
  SEARCH_DATA_SOURCE
} from "@/api/dataSource";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {
    LeftSide
  },
  created() {},
  computed: {},
  mounted() {
    debugger;
    this.getcode();
  },
  methods: {
    async getcode() {
      let data = {
        cubeType: "0",
        page: "1",
        size: "100"
      };
      let res = await FIND_CODE_DICT();
      debugger;
      console.log(res.data);
    }
  }
};
</script>
<style  scoped>
.top {
  display: flex;
  justify-content: space-between;
}
</style>
