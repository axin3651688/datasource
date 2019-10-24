// 文字模型路由写这
export default [
  {
    path: '/report-manage',
    name: '数据源',
    component: () => import('@v/report-manage/layout-report-manage')
  }
];
