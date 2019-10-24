<template>
  <div class="login-container">
    <div class="login-shadow"></div>
    <!-- <div class="login-company-name">
      <h1 class="left">设计器</h1>
      <span></span>
      <div class="right">
        数据基因
        <p>小邦让数据创造价值</p>
      </div>
    </div>-->
    <div class="login-border">
      <!-- banner -->
      <!-- <i class="bannerimg"></i> -->
      <!-- 表单 -->
      <div class="login-top">
        <img class="img_more"
             :src="logo"
             alt />
        <span>经邦大数据决策分析系统</span>
      </div>
      <el-form :model="loginUser"
               :rules="rules"
               ref="loginForm"
               class="login-form">
        <!-- <div class="title">智能财务设计器</div> -->
        <P>用户名</P>
        <el-form-item prop="usename">
          <el-input v-model="loginUser.username"
                    autofocus
                    @keyup.enter.native="submitForm('loginForm')"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <P>密码</P>
        <el-form-item prop="password">
          <!-- 绑定一个keyup事件,实现按回车能模拟点击按钮,触发登陆 -->
          <el-input :type="pwdType"
                    v-model="loginUser.password"
                    placeholder="请输入密码"
                    @keyup.enter.native="submitForm('loginForm')"></el-input>
          <i v-show="pwdType"
             class="iconfont icon-yanjing-bi show-pwd"
             @click="showPwd"></i>
          <i v-show="!pwdType"
             class="iconfont icon-yanjing show-pwd"
             @click="showPwd"></i>
        </el-form-item>
        <!-- <div class="verification-code">
          <P>验证码</P>
          <el-form-item prop
                        class="enter-code">
            <el-input v-model="loginUser.usename"
                      autofocus></el-input>
          </el-form-item>
          <div class="display-code">1111</div>
        </div>-->
        <div class="btn_wrapp">
          <el-button type="primary"
                     class="login_button"
                     @click="submitForm('loginForm')">登 录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';
import * as store from '@u/user';
import router from '@/router';
export default {
  name: 'login',
  created () {
    let $title = document.getElementsByTagName('title')[0];
    let title = $title.getAttribute('origin');
    if (title) {
      document.title = title;
    }
    // 每次打开获取一下原来的用户名
    this.loginUser.usename = localStorage.getItem('usename');
  },

  data () {
    return {
      logo: require('@a/new-add-logo.svg'),
      pwdType: 'password',
      loginUser: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            // 需要修改  todo
            min: 1,
            max: 30,
            message: '长度在6到30之间',
            trigger: 'blur'
          }
        ]
      },
      /**
       * 演示用户
       */
      demoDatas: {
        'majun': { 'cubeInfo': { 'datasource': '2c9180926b736509016b739c1f390008', 'cubeId': 273 }, 'user': { 'id': 397, 'birthday': null, 'avatar': '', 'email': '253495832@qq.com', 'phone': '17681010001', 'sign': '写点啥', 'trueName': '马军', 'username': 'majun', 'sex': 54, 'workState': 59, 'enable': 1 }, 'dept': { 'id': 48, 'note': '测试', 'code': '3724', 'pid': '1', 'text': '雨测试部', 'leaf': 0, 'level': 1, 'ownerId': 289, 'companyId': 1, 'ownerName': null, 'userCount': null, 'userContainChild': null, 'childDeptCount': null }, 'role': { 'id': 48, 'text': '体验用户', 'companyId': 53, 'admin': 0, 'note': '体验用户' }, 'company': { 'id': 53, 'text': '江苏农垦', 'avatar': '', 'note': '农垦项目演示与', 'enable': 1, 'licenseId': 7, 'createUser': 397, 'rangeId': 19, 'industryId': 1446, 'typeId': null, 'regionId': 530101, 'rangeText': null, 'industryText': null, 'regionText': null, 'typeText': null, 'customerId': '1', 'url': 'http://192.168.1.138:8082/', 'code': '1010', 'pid': '26', 'leaf': 0, 'primaryId': null, 'level': 1, 'authCompanyIds': null, 'children': null }, 'license': { 'id': 7, 'text': '集团用户', 'maxlevel': 5, 'single': 20, 'userCount': 20 }, 'authorization': 'bWFqdW4lN0UzOTclNDAyYzkxODA4YzZhZDlkMjBmMDE2YWUyYTM1MTM4MDA0Nk1vemlsbGE1MFdpbmRvd3NOVDYxV2luNjR4NjRBcHBsZVdlYktpdDUzNzM2S0hUTUxsaWtlR2Vja29DaHJvbWU3MzAzNjgzODZTYWZhcmk1MzczNiU0MDkyNDAlN0VtajEyMzQ1NiU3RTYwMDAwMA==', 'deviceVo': { 'brand': 'majun', 'device': '2c91808c6ad9d20f016ae2a351380046Mozilla50WindowsNT61Win64x64AppleWebKit53736KHTMLlikeGeckoChrome730368386Safari53736', 'platform': 'windows' } },
        'jhb': { 'cubeInfo': { 'datasource': '2c9180926b736509016b739c1f390008', 'cubeId': 273 }, 'user': { 'id': 539, 'birthday': null, 'avatar': '', 'email': 'jhb@cnbisoft.com', 'phone': '17681010000', 'sign': null, 'trueName': '姜海斌', 'username': 'jhb', 'sex': 56, 'workState': null, 'enable': 1 }, 'dept': { 'id': 48, 'note': '测试', 'code': '3724', 'pid': '1', 'text': '雨测试部', 'leaf': 0, 'level': 1, 'ownerId': 289, 'companyId': 1, 'ownerName': null, 'userCount': null, 'userContainChild': null, 'childDeptCount': null }, 'role': { 'id': 48, 'text': '体验用户', 'companyId': 53, 'admin': 0, 'note': '体验用户' }, 'company': { 'id': 53, 'text': '江苏农垦', 'avatar': '', 'note': '农垦项目演示与', 'enable': 3, 'licenseId': 7, 'createUser': 1, 'rangeId': 19, 'industryId': 1446, 'typeId': 12, 'regionId': 530101, 'rangeText': null, 'industryText': null, 'regionText': null, 'typeText': null, 'customerId': '1', 'url': 'http://192.168.1.138:8082/', 'code': '1010', 'pid': '26', 'leaf': 0, 'primaryId': null, 'level': 1, 'authCompanyIds': null, 'children': null }, 'license': { 'id': 7, 'text': '集团用户', 'maxlevel': 5, 'single': 20, 'userCount': 20 }, 'authorization': 'amhiJTdFNTM5JTQwMmM5MTgwODk2YjlkMjE0MzAxNmI5ZDM4NDgwNTAwMDVNb3ppbGxhNTBXaW5kb3dzTlQ2MVdpbjY0eDY0QXBwbGVXZWJLaXQ1MzczNktIVE1MbGlrZUdlY2tvQ2hyb21lNzQwMzcyOTE2OVNhZmFyaTUzNzM2JTQwOTc2OCU3RWpoYjEyMzQ1NiU3RTYwMDAwMA==', 'deviceVo': { 'brand': 'jhb', 'device': '2c9180896b9d2143016b9d3848050005Mozilla50WindowsNT61Win64x64AppleWebKit53736KHTMLlikeGeckoChrome7403729169Safari53736', 'platform': 'windows' } },
        'heting': { 'cubeInfo': { 'datasource': '2c9180926b736509016b739c1f390008', 'cubeId': 273 }, 'user': { 'id': 560, 'birthday': null, 'avatar': '', 'email': '123@qq.com', 'phone': '17681010002', 'sign': null, 'trueName': '何婷', 'username': 'heting', 'sex': 55, 'workState': 63, 'enable': 1 }, 'dept': { 'id': 48, 'note': '测试', 'code': '3724', 'pid': '1', 'text': '雨测试部', 'leaf': 0, 'level': 1, 'ownerId': 289, 'companyId': 1, 'ownerName': null, 'userCount': null, 'userContainChild': null, 'childDeptCount': null }, 'role': { 'id': 48, 'text': '体验用户', 'companyId': 53, 'admin': 0, 'note': '体验用户' }, 'company': { 'id': 53, 'text': '江苏农垦', 'avatar': '', 'note': '农垦项目演示与', 'enable': 3, 'licenseId': 7, 'createUser': 1, 'rangeId': 19, 'industryId': 1446, 'typeId': null, 'regionId': 530101, 'rangeText': null, 'industryText': null, 'regionText': null, 'typeText': null, 'customerId': '1', 'url': 'http://192.168.1.138:8082/', 'code': '1010', 'pid': '26', 'leaf': 0, 'primaryId': null, 'level': 1, 'authCompanyIds': null, 'children': null }, 'license': { 'id': 7, 'text': '集团用户', 'maxlevel': 5, 'single': 20, 'userCount': 20 }, 'authorization': 'aGV0aW5nJTdFNTYwJTQwMmM5MTgwOGU2YjZkNDA4NzAxNmI2ZDU1NjRkMTAwMDFNb3ppbGxhNTBXaW5kb3dzTlQ2MVdpbjY0eDY0QXBwbGVXZWJLaXQ1MzczNktIVE1MbGlrZUdlY2tvQ2hyb21lNzMwMzY4MzEwM1NhZmFyaTUzNzM2JTQwOTU3NCU3RWh0MTIzNDU2JTdFNjAwMDAw', 'deviceVo': { 'brand': 'heting', 'device': '2c91808e6b6d4087016b6d5564d10001Mozilla50WindowsNT61Win64x64AppleWebKit53736KHTMLlikeGeckoChrome7303683103Safari53736', 'platform': 'windows' } }
      }
    };
  },
  //

  methods: {
    // ...mapActions(['SetUser', 'Login']),
    showPwd () {
      this.pwdType = this.pwdType === 'password' ? '' : 'password';
    },
    loginAfter (data, msg) {debugger
      const token = data.authorization;
      if (!this.validatenull(token)) {
        localStorage.setItem('authorization', token);
        var obj = JSON.stringify(data); // 转化为JSON字符串
        localStorage.setItem('database', obj); // 返回{"a":1,"b":2}
        // this.SetUser(data);
        // router.push('/main');
        router.push('/datasource');
      } else {
        this.loginUser.usename = '';
        this.loginUser.password = '';
        // console.error(msg);
        this.$message({
          showClose: true,
          message: msg,
          type: 'error'
        });
      }
    },
    demoLogin (username) {
      let userData = this.demoDatas[username];
      if (userData) {
        console.warn('存在测试用户【' + username + '】非正常登录来的：' + username);
        this.loginAfter(userData);
        return 1;
      } else {
        console.warn('用户【' + username + '】未加入测试集合');
      }
    },
    submitForm (formName) {debugger
      this.$refs[formName].validate(valid => {
        if (valid) {
          store.Login(this.loginUser).then(function () {
            // router.push('/login');
            router.push('/datasource');
          }, function (error) {
            console.log(error.response.data.message);
          });
        }
      });
    }
  }
};
</script>
