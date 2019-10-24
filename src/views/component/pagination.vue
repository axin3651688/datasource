<template>
  <!-- 这是分页的组件 -->
  <div class="pagination__wrapper">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="50"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPages"
      class="pagination"
    ></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  components: {},
  props: {
    currentPage: { type: Number, default: 1 },
    totalPages: { type: Number, default: 1 }
  },
  data () {
    return {};
  },
  created () { },
  computed: {},
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.$emit('update:pageSize', val);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.$emit('update:currentPage', val);
    }
  }
};
</script>
