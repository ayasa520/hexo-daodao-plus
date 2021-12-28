# hexo-daodao-plus

适用于 hexo 框架的插件, 添加了首页说说和页面说说. 参考了[NPM插件的开发 | Akilarの糖果屋](https://akilar.top/posts/e44fb560/), JavaScript 和 CSS 代码参考了 [Rock-Candy-Tea/daodao (github.com)](https://github.com/Rock-Candy-Tea/daodao) , 非常感谢 [Akilarの糖果屋 - Akilar.top](https://akilar.top/) 和 [小冰博客 - 做个有梦想的人！ (zfe.space)](https://zfe.space/) 

## 安装

在 hexo 博客根目录运行 npm 命令

```bash
npm install hexo-daodao-plus --save
```

## 配置

在主题文件夹下 (或者根目录) 的 `_config.yml` 中添加下面的配置项

```yml
daodao_plus:
  enable: 
    page: true
    card: true
  priority: 0
  filter: 
  url: https://daodao-kai.vercel.app/
  path: daodaoplus 
  front_matter: 
    title: 闲话板砖
    comments: true
  CDN: 
    dd_js: https://cdn.jsdelivr.net/npm/daodaoplus@1.1.1/static/js/index.min.js # daodao-kai 避免单纯的改动也要使 hexo-daodao-plus 重新发布
    dd_css: https://cdn.jsdelivr.net/npm/daodaoplus@1.1.1/static/css/index.min.css
    js: https://cdn.jsdelivr.net/npm/hexo-daodao-plus@2.1.1/dist/js/main.js
    css: https://cdn.jsdelivr.net/npm/hexo-daodao-plus@2.1.1/dist/css/main.css
```

配置项说明

| 配置项       | 默认                      | 说明                                            |
| ------------ | ------------------------- | ----------------------------------------------- |
| enable.page  | **必填**                  | 单独叨叨页面的开关                              |
| enable.card  | **必填**                  | 首页叨叨 swiper 的开关                          |
| url          | **必填**                  | 叨叨后端的 api                                  |
| CDN          | **必填**                  | 引入的 CSS 和 JavaScript 文件的链接             |
| priority     | 0                         | 过滤器优先级, priority 值越低, 过滤器会越早执行 |
| filter       | ['iframe','img','script'] | 设置叨叨不在首页显示的标签类型                  |
| path         | daodaoplus                | 路径名称, 生成的页面为 [path]/index.html        |
| front_matter | 非必填                    | 页面自定义 front_matter                         |

## 截图

![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/0469b9627d2384e678b0a72872f0e0f0.png)

![image-20210721175549888](https://cdn.jsdelivr.net/gh/ayasa520/img@main/3c049c61ec20f85ec6b29ba9275b5161.png)

 ![Snipaste_2021-08-13_13-37-13.png](https://bu.dusays.com/2021/08/13/3cdb9fe9b2eb5.png)

  ![Snipaste_2021-08-13_13-41-28.png](https://bu.dusays.com/2021/08/13/219eb7c49b0e7.png)

![Snipaste_2021-08-13_13-39-51.png](https://bu.dusays.com/2021/08/13/ec36a8295d64d.png)

