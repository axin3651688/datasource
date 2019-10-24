// 文字模型路由写这
export default [{
  path: '/',
  redirect: '/main'
},
{
  path: "/datasource",//数据源页面
  name: "datasource",
  component: () => import('@v/datasource/datasource')
},
{
  path: '/main',
  name: '数据源',
  component: () => import('@/layout')
},
{
  path: '/text-model',
  name: '数据源',
  component: () => import('@v/text-model/layout-text-model')
}
];
