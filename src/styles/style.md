# 本目录包含所有样式文件

![可爱的四系乃](https://p1.ssl.qhmsg.com/t0167955e5f22953246.jpg)
## style样式的命名原则
采用BEM规范进行命名，BEM 是 Block（块） Element（元素） Modifier（修饰器）的简称，使用此法方便组织HTML中选择器的结构，利于CSS代码的维护，使得代码结构更清晰
说明：
> 一个独立的（语义上或视觉上），可以复用而不依赖其它组件的部分，可作为一个块（Block）

> 属于块的某部分，可作为一个元素（Element）

> 用于修饰块或元素，体现出外形行为状态等特征的，可作为一个修饰器（Modifier）
## 规范：
1. 【强制】所有样式外层使用组件名作为 scss类的命名空间，这样可以避免全局污染
2. 【强制】为方便后续换肤，所有style样式全部写到全局的style中，样式名与文件名一一对应
3. 【强制】所有的样式命名都小写，词组中划线连接，块和元素间双下划线“__”连接如：“menu-item__left”，“search-form__content-left”元素和修饰器间用双中划线“--”连接如：button--primary，完整的命名为：“search-form__content--active”。
4. 【强制】variables 变量名 “$”+“核心词”+“相应样式效果描述的单词或缩写”+”属性名” 例：“ $logo_contener_left”、“ $Icon_font_size”,颜色变量统一‘$color’开头，如‘$color_theme’,‘$color_text_primary’,‘$color_text_regular’变量名最好是见其名，知其意，不用看其他代码，即可做到换肤的要求。
   
## 注意事项
======================
1. 所有样式文件以组件为模块，写到这个文件夹
2. 里面文件以名称的首写字母顺序排序
3. 所有文件名均同组件名一样
4. 文件在pages里面创建好后，要在其里面的index进行导入

相关资料
======================
> scss官网：
 [scss地址](https://www.sass.hk/docs/) 
 
>Element Git：
 [Git地址](https://github.com/ElemeFE/element/tree/dev/packages/theme-chalk/src)  *本项目样式结构场照Element结构制定，scss文件统一放置到一个文件夹*

>组织你的Sass文件：
 [W3C地址]
(https://www.w3cplus.com/preprocessor/organize-your-sass-files.html)

>管理Sass项目文件结构： [W3C地址]
(https://www.w3cplus.com/preprocessor/architecture-sass-project.html)

>编写模块化CSS：BEM： [W3C地址]
(https://www.w3cplus.com/css/css-architecture-1.html)


   
   
  
