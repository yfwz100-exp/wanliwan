为方便测试，对在 Windows 平台上测试、运行也提供了支持。

## 安装 [Node.js][2]

直接到 [Node.js][2] 的官方网站下载 [Node.js][2] 的二进制版本即可: [http://www.nodejs.org/download/](http://www.nodejs.org/download/) 。选择32位或64位 Windows 版本即可。下载完毕后，按提示安装即可。

## 安装 [MongoDB][3]

安装 [MongoDB][3] 也很简单，在下载页（[http://www.mongodb.org/downloads](http://www.mongodb.org/downloads)）下载对应的 Windows 版本。[MongoDB][3] 不像 [Node.js][2] 那样打包了安装程序，下载到的是已经编译好的文件，把它解压到某一个目录下即可。

然后，在 `bin` 目录下新建一个 `data` 目录，然后编辑一段小脚本，可以命名为 `start-mongodb.bat`，内容如下：

```
@echo off
mongod --dbpath ./data
```

后面一个参数指定了 [MongoDB][3] 的数据目录，`./data` 即为当前目录下的 `data` 目录（可以另外指定别的目录）。

## 配置项目

转到 [项目主页][1]，点击下载 master 分支的代码，解压到某一个目录，运行 `boot.bat` 即自动配置依赖并运行项目（要先启动 MongoDB）。

最后输出

```
Express running at port 3000.
```

即说明成功运行。打开 [http://localhost:3000/](http://localhost:3000/) 即预览运行。

[1]:https://github.com/yfwz100/wanliwan "Wanliwan 项目页"
[2]:http://nodejs.org "Node.js 项目页"
[3]:http://mongodb.org "MongoDB 主页"