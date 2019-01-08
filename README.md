# 🤓 Odoo 小书

[![Odoo 12](https://img.shields.io/badge/Odoo-12-blue.svg)](https://github.com/odoo/odoo/tree/12.0)
[![CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-brightgreen.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
[![](https://travis-ci.org/TNK-Studio/Odoo-Book.svg?branch=master)](https://travis-ci.org/TNK-Studio/Odoo-Book)
[![](http://progressed.io/bar/8?title=progress)](https://github.com/TNK-Studio/Odoo-Book)

## 这本书适合什么样的人群

如果你是一名 Python 开发人员并且有一定的 Web 开发经验，希望学习和入门 Odoo 框架来高效开发业务应用，这本书可以给予你一些参考及帮助。

## 为了更好的阅读这本书

由于本书的 Demo 都是在 Ubuntu / Mac OS 操作系统下开发，并且使用 PostgreSQL 数据库，为了充分学习 Odoo ，我们建议在学习过程中查找相关文章或补充读物。

如果你使用的是 Windows 操作系统，建议使用 Ubuntu 虚拟机作为开发环境。

## 下载源码文件

本书涉及的所有源码文件均在 Github 仓库 [Odoo-Book-Demo](https://github.com/TNK-Studio/Odoo-Book-Demo) 中可以找到。

## 这本书包含了什么内容

这本书包含十一章，主要包含以下部分：  

[第一章](#)，*Odoo 框架介绍* —— 简单介绍 Odoo 框架背景，以及简单演示使用 Odoo 开发的应用。

[第二章](#)，*Odoo 开发环境搭建* —— 从 Python 3 安装到 Odoo 源码获取一步一步搭建 Odoo 开发环境。

[第三章](#)，*创建第一个 Odoo 应用* —— 如何启动和配置 Odoo，并利用脚手架工具创建并安装我们的第一个应用程序。

[第四章](#)，*模型 Model* —— 构建应用程序数据，介绍框架的对象关系映射（ORM），以及 ORM API 和可用的不同类型的模型以及字段类型，
包括关系字段和计算字段。

[第五章](#), *菜单 Menu* —— 介绍 Odoo 组成应用的菜单部分，并且利用 XML 配置我们的第一个菜单。

[第六章](#)，*视图 View* —— 创建应用程序的视图部分，如最基本的列表、表单和搜索视图，以及看板视图。

[第七章](#)，*动作 Action* —— 利用动作关联菜单，实现进入到应用视图部分的功能，并利用最常见的几种动作实现相关的功能。  

[第八章](#)，*计划任务 Cron* —— 明白计划任务可以实现的功能，并利用计划任务实现定时消息通知。

[第九章](#)，*权限控制 Access Control* —— 了解 Odoo 的常用几种权限控制的粗细粒度，包括权限组、菜单权限、模型权限和数据集权限，
通过实际的应用场景将权限应用结合并且实现。

[第十章](#)，*Web 控制器 Web Controller* —— 作为一个 Web 框架，肯定包含请求 (Request) 和响应（Response）的处理，
利用 Odoo 的 Web 控制器实现简单的接口，并且结合 Jinja2 模版引擎渲染一个简单的非 Odoo 视图的 Web 页面。

[第十一章](#)，*模版引擎 QWeb* —— QWeb 是一个网页框架，在 Odoo 8 中被初次使用，XML 模板引擎是它的核心，这一章节我们将学习 QWeb 的基础语法，并替换 Jinja2 模版引擎渲染的 Web 页面。  

[第十二章](#), *国际化 i18n* ——  

## 文本约定

本书中使用了如下文本约定。

* 一段代码文本如下：

    ```xml
    <?xml version="1.0"?>  
    <odoo>  
      <!-- Content will go here... -->  
    </odoo>
    ```

* 当我们希望你重点注意的某个特定部分，或第一次出现的单词，相关的行或条目将标注显示，代码中则为注释：

    这里是`重点`部分。  
    这里是`第一次出现`的单词。  
  
    ```plain
      'data': [  
        'security/ir.model.access.csv',  
        'views/menu.xml',  // 这里是注释  
        'views/list_view.xml', // 这里是注释  
        ]”
    ```

* 菜单或对话框中出现的单词会加上直角引号如：  

    在 Web 客户端中，访问「应用程序」顶部菜单并选择「更新应用程序列表」菜单选项。  
  
* 其他说明
  
    ⚠️ 警告或重要说明起来像这样。  
  
    💡 提示和技巧看起来像这样。  
