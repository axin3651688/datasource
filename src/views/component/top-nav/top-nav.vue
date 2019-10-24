<template>
  <div class="top-nav">
    <span class="img_wrapp">
      <img src="@a/logoN.png" />
    </span>
    <router-link v-for="item in list"
                 :key="item.value"
                 :to="{path:item.path,query:{type:item.type}}"
                 :class="classStyle(item)"
                 class="topbar-item">{{item.label}}</router-link>
    <span class="username">
      <!-- 消息提醒 -->
      <el-badge :value="topValue">
        <i class="ico-quanju xiaoxitubiao-x iconclass"
           @click="getNewsList"></i>
        <el-collapse-transition>
          <div v-if="show"
               class="newList">
            <ul>
              <li v-for="item in listDown"
                  :key="item.id">
                <span v-if="item.state === 1"
                      class="firstChild">{{item.content}}</span>
                <span v-else>{{item.content}}</span>
              </li>
            </ul>
          </div>
        </el-collapse-transition>
      </el-badge>
      <!-- 下啦箭头 -->
      <el-dropdown trigger="click"
                   @command="setDialogInfo">
        <span class="dropdown"
              v-if="user.user">
          <img :src="user.user.avatar"
               alt
               class="avatar" />
          <span class="name">{{user.user.trueName}}</span>
          <i style="font-size:14px;color:#fff; margin-left:8px;"
             class="ico-quanju jiantoutubiao-3"></i>
        </span>
        <el-dropdown-menu slot="dropdown"
                          class="headlistUp">
          <el-dropdown-item command="info">
            <i class="ico-quanju gerenxinxi-x"></i>
            <span @sayhidden="sayhidden">个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item command="info">
            <i class="ico-quanju guanlihudong-x"></i>
            <span>管理互动</span>
          </el-dropdown-item>
          <el-dropdown-item command="info">
            <i class="ico-quanju guanyuruanjian-x"></i>
            <span>关于软件</span>
          </el-dropdown-item>
          <el-dropdown-item command="info"
                            class="icon-bottom">
            <i class="ico-quanju bangzhu-x"></i>
            <span>帮助</span>
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <i class="ico-quanju tuichu-x"></i>
            <span>退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
    <el-dialog custom-class="info-dialog"
               :visible.sync="isShow"
               v-if="isShow"
               :modal-append-to-body="false">
      <div class="img-box"></div>
      <el-row class="row-bg">
        <div class="user">
          <img :src="user.user.avatar"
               class="avatar" />
        </div>
        <div class="user-item">
          <div class="item">
            <i>姓名:</i>
            <span>{{user.user.trueName}}</span>
          </div>
          <div class="item">
            <i>邮箱:</i>
            <span>{{user.user.email}}</span>
          </div>
          <div class="item">
            <i>电话:</i>
            <span>{{user.user.phone}}</span>
          </div>
        </div>
      </el-row>
      <el-button @click="isShow = false"
                 class="btn-primary">关闭</el-button>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import * as store from '@u/user';
import { FIND_WARN_MSG_LIST, FIND_WARN_UNREAD_COUNT } from '@p/interface.js';
import router from '@/router';
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      user: JSON.parse(localStorage.user).cubeInfo,
      isShow: false,
      show: false,
      list: [
        { path: '/text-model', label: '文字模型' },
        { path: '/data-set', label: '报告管理' }
        // { path: '/data-source', label: '资源区' },
        // { path: '/data-dash', label: '仪表盘' },
        // { path: '/publish', label: '发布区' }
      ],
      activeClass: 0,
      topValue: '',
      listDown: []
    };
  },
  created () {
    // this.getNews();
    // this.getNewsList();
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.show = false;
      }
    });
  },

  methods: {
    classStyle (item) {
      let flag;
      if (this.$route.meta.title === item.label) {
        flag = true;
      }
      return { 'router-link-exact-active': flag };
    },
    // 点击nav 给当前nav添加状态
    changeBgc (index) {
      this.activeClass = index;
    },
    setDialogInfo (cmdItem) {
      switch (cmdItem) {
        case 'info':
          this.isShow = true;
          break;
        case 'logout':
          this.logout();
          break;
      }
    },
    sayhidden () {
      this.isShow = true;
    },
    logout () {
      store.Logout().then(function () {
        router.push('/login');
      });
    },

    // 消息数量
    async getNews () {
      // Todu 接口每个页面都报错,发布前没整好,不要放出来  mj
      let res = await FIND_WARN_UNREAD_COUNT();
      if (res.code === 200) {
        // console.log(res.data);
        this.topValue = res.data;
      }
    },
    // 获取列表
    async  getNewsList () {
      let res = await FIND_WARN_MSG_LIST();
      if (res.code === 200 && res.data.length > 0) {
        this.show = !this.show;
        console.log(res.data);
        this.listDown = res.data;
      } else {
        this.$message({
          message: res.msg,
          duration: 1000
        });
      }
    }
  }
};
</script>
