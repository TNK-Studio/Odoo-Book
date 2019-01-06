# 安装 Node.js 和 Less

> Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
>
> Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。

由于 Odoo 的样式文件使用 Less 语法编写，需要转译成 CSS，所以我们需要安装 Less 和 Node.js。

在搜索引擎上有非常多的 Node.js 安装教程，这里推荐一种简单且带版本控制的安装方法。

## 使用 Node 版本管理器 n 来安装 Node.js

安装方法非常简单，只需要运行：

```shell
$ curl -L http://git.io/n-install | bash
```

运行后将会在 home 目录生成一个名为 `n` 的文件夹，里面包含了 n 的文件和 使用 n 安装的不同版本的 Node.js。

安装完成后提示需要重新打开终端或重新载入命令行配置文件。  

若使用 `bash` 命令行，则运行：

```shell  
$ source ~/.bashrc
```

若使用 `zsh` 则运行：

```plain
$ source ~/.zshrc
```

n 安装完成后默认会安装当前 `lts` 版本的 Node.js，若需要安装指定版本的 Node.js，只需要输入 n 和版本号，例如：

```shell
$ n 10.15.0
```

安装完成后，输入 n 和利用上下光标进行切换：

```plain
    node/8.15.0
  ο node/10.15.0
```

本书中使用的 Node.js 版本为 10.15.0。

## 安装 Less

安装好 Node.js 之后接着安装 Less：

```shell
$ npm install -g less
```

💡 若 less 安装速度较慢，可以将 npm 源替换为淘宝的镜像源，[参考网址](https://npm.taobao.org/)。
