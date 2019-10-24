/**
 *================================================
 *  @date : 2019/09/05
 *  @author : gxb
 *  @desc : 设计器V2.0管理数据集、资源区、仪表盘左侧列表选中节点信息（包含id和text）
 *
 *================================================
 */
export const nowModulesNodeInfo = {
  state: {
    now_cube_node_info: {
      now_cube_node_id: '',
      now_cube_node_text: ''
    },
    now_source_node_info: {
      now_source_node_id: '',
      now_source_node_text: ''
    },
    now_dash_node_info: {
      now_dash_node_id: '',
      now_dash_node_text: ''
    }
  },
  getters: {
    getNowCubeNodeId: state => state.now_cube_node_id,
    getNowCubeNodeText: state => state.now_cube_node_text,
    getNowCubeNodeInfo: state => state.now_cube_node_info,
    getNowSourceNodeId: state => state.now_source_node_id,
    getNowSourceNodeText: state => state.now_source_node_text,
    getNowSourceNodeInfo: state => state.now_source_node_info,
    getNowDashNodeId: state => state.now_dash_node_id,
    getNowDashNodeText: state => state.now_dash_node_text,
    getNowDashNodeInfo: state => state.now_dash_node_info
  },
  mutations: {
    updateNowCubeNodeId (state, nowCubeNodeId) {
      state.now_cube_node_info.now_cube_node_id = nowCubeNodeId;
    },
    updateNowCubeNodeText (state, nowCubeNodeText) {
      state.now_cube_node_info.now_cube_node_text = nowCubeNodeText;
    },
    updateNowCubeNodeInfo (state, nowCubeNodeInfo) {debugger
      state.now_cube_node_info = nowCubeNodeInfo;
    },
    updateNowSourceNodeId (state, nowSourceNodeId) {
      state.now_source_node_info.now_source_node_id = nowSourceNodeId;
    },
    updateNowSourceNodeText (state, nowSourceNodeText) {
      state.now_source_node_info.now_source_node_text = nowSourceNodeText;
    },
    updateNowSourceNodeInfo (state, nowSourceNodeInfo) {
      state.now_source_node_info = nowSourceNodeInfo;
    },
    updateNowDashNodeId (state, nowDashNodeId) {
      state.now_dash_node_info.now_dash_node_id = nowDashNodeId;
    },
    updateNowDashNodeText (state, nowDashNodeText) {
      state.now_dash_node_info.now_dash_node_text = nowDashNodeText;
    },
    updateNowDashNodeInfo (state, nowDashNodeInfo) {
      state.now_dash_node_info = nowDashNodeInfo;
    }
  },
  actions: {
    updateNowCubeNodeId ({
      commit
    }, nowCubeNodeId) {
      commit('updateNowCubeNodeId', nowCubeNodeId);
    },
    updateNowCubeNodeText ({
      commit
    }, nowCubeNodeText) {
      commit('updateNowCubeNodeText', nowCubeNodeText);
    },
    updateNowCubeNodeInfo ({
      commit
    }, nowCubeNodeInfo) {debugger
      commit('updateNowCubeNodeInfo', nowCubeNodeInfo);
    },
    updateNowSourceNodeId ({
      commit
    }, nowSourceNodeId) {
      commit('updateNowSourceNodeId', nowSourceNodeId);
    },
    updateNowSourceNodeText ({
      commit
    }, nowSourceNodeText) {
      commit('updateNowSourceNodeText', nowSourceNodeText);
    },
    updateNowSourceNodeInfo ({
      commit
    }, nowSourceNodeInfo) {
      commit('updateNowSourceNodeInfo', nowSourceNodeInfo);
    },
    updateNowDashNodeId ({
      commit
    }, nowDashNodeId) {
      commit('updateNowDashNodeId', nowDashNodeId);
    },
    updateNowDashNodeText ({
      commit
    }, nowDashNodeText) {
      commit('updateNowDashNodeText', nowDashNodeText);
    },
    updateNowDashNodeInfo ({
      commit
    }, nowDashNodeInfo) {
      commit('updateNowDashNodeInfo', nowDashNodeInfo);
    }
  }
};
