# web设计大赛文件说明

1. 数据库：mongodb（未上传，网上下载并配置即用）
   1. 作用：用户管理
2. 后台：node（入口文件为node目录下的index.js）
   1. 作用：文件管理
   2. 在package.json文件当前目录输入npm i安装所需模块
   3. 启动服务：node index.js
3. 前端：react
   1. 作用：页面渲染
   2. 生产环境：入口文件为webserver/build下的html文件
      1. 需要在服务器环境下启动，并且放在服务器的根目录下，不要使用文件夹进行包裹
   3. 开发环境：文件源码在另外两个文件夹内
      1. 在package.json文件当前目录输入npm i安装所需模块