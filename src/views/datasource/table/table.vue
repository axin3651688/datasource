<template>
  <div class="table">
<el-table class="table"
              :data="tableData"
              border
              style="width: 100%;height:100%"
              highlight-current-row>
      <el-table-column sortable
                       v-for="item in columns"
                       :prop="item.id"
                       :label="item.text"
                       :min-width="columnsWidth(item)"
                       :align="aligner(item)"
                       header-align="center"
                       :key="item.id">
      </el-table-column>
  </div>
</template>
<script>
export default {
  name:'table'
  props:{
    columns:Array,
    tableData:Array
  },
    methods: {
    aligner (item) {
      if (item.aligner) {
        return item.aligner;
      }
      switch (item.type) {
        case 'index':
          return 'center';
        case 'string':
          return 'left';
        case 'number':
          return 'right';
        case 'date':
          return 'center';
        case 'normal':
          return 'center';
        default:
          break;
      }
    },
    columnsWidth (item) {
      if (item.width) {
        return item.width;
      }
      switch (item.type) {
        case 'index':
          return 80;
        case 'string':
          return 150;
        case 'number':
          return 120;
        case 'decimal':
          return 140;
        case 'date':
          return 120;
        case 'normal':
          return 120;
        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
</style>