<template>
  <el-container>
    <el-header class="layout-top-nav"
               height>
      <top-nav></top-nav>
    </el-header>
    <el-container class="layout-main">
      <keep-alive include="datas_area">
        <router-view class="view containerMain"></router-view>
      </keep-alive>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'layout',
  components: {
    TopNav: () => import('@c/top-nav/top-nav')
  },
  props: {},
  data () {
    return {};
  },
  created () { },
  computed: {},
  methods: {}
};
</script>
