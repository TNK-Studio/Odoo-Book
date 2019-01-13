# 🤓 Odoo 小书

[![Odoo 12](https://img.shields.io/badge/Odoo-12-blue.svg)](https://github.com/odoo/odoo/tree/12.0)
[![CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-brightgreen.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
[![](https://travis-ci.org/TNK-Studio/Odoo-Book.svg?branch=master)](https://travis-ci.org/TNK-Studio/Odoo-Book)
[![](http://progressed.io/bar/14?title=progress)](https://tnk-studio.github.io/Odoo-Book/)

## 这本书适合什么样的人群

如果你是一名 Python 开发人员并且有一定的 Web 开发经验，希望学习和入门 Odoo 框架来高效开发业务应用，这本书可以给予你一些参考及帮助。

## 为了更好的阅读这本书

由于本书的 Demo 都是在 Ubuntu / Mac OS 操作系统下开发，并且使用 PostgreSQL 数据库，为了充分学习 Odoo ，我们建议在学习过程中查找相关文章或补充读物。

如果你使用的是 Windows 操作系统，建议使用 Ubuntu 虚拟机作为开发环境。

## 下载源码文件

本书涉及的所有源码文件均在 Github 仓库 [Odoo-Book-Demo](https://github.com/TNK-Studio/Odoo-Book-Demo) 中可以找到。

## 这本书包含了什么内容

这本书包含十一章，主要包含以下部分：  

[第一章](/Chapter-1/Odoo-Introduction.md)，*Odoo 框架介绍* —— 简单介绍 Odoo 框架背景，以及简单演示使用 Odoo 开发的应用。

[第二章](/Chapter-2/Odoo-Development-Environment.md)，*Odoo 开发环境搭建* —— 从 Python 3 安装到 Odoo 源码获取一步一步搭建 Odoo 开发环境。

[第三章](/Chapter-3/Create-Your-First-addon.md)，*创建第一个 Odoo 应用* —— 如何启动和配置 Odoo，并利用脚手架工具创建并安装我们的第一个应用程序。

[第四章](/Chapter-4/Odoo-Model.md)，*模型 Model* —— 构建应用程序数据，介绍框架的对象关系映射（ORM），以及 ORM API 和可用的不同类型的模型以及字段类型，
包括关系字段和计算字段。

[第五章](/Chapter-5/Odoo-Menu.md)，*菜单 Menu* —— 介绍 Odoo 组成应用的菜单部分，并且利用 XML 配置我们的第一个菜单。

[第六章](/Chapter-6/Odoo-View.md)，*视图 View* —— 创建应用程序的视图部分，如最基本的列表、表单和搜索视图，以及看板视图。

[第七章](/Chapter-7/Odoo-Action.md)，*动作 Action* —— 利用动作关联菜单，实现进入到应用视图部分的功能，并利用最常见的几种动作实现相关的功能。  

[第八章](/Chapter-8/Odoo-Cron.md)，*计划任务 Cron* —— 明白计划任务可以实现的功能，并利用计划任务实现定时消息通知。

[第九章](/Chapter-9/Odoo-Access-Control.md)，*权限控制 Access Control* —— 了解 Odoo 的常用几种权限控制的粗细粒度，包括权限组、菜单权限、模型权限和数据集权限，
通过实际的应用场景将权限应用结合并且实现。

[第十章](/Chapter-10/Odoo-Web-Controller.md)，*Web 控制器 Web Controller* —— 作为一个 Web 框架，肯定包含请求 (Request) 和响应（Response）的处理，
利用 Odoo 的 Web 控制器实现简单的接口，并且结合 Jinja2 模版引擎渲染一个简单的非 Odoo 视图的 Web 页面。

[第十一章](/Chapter-11/Odoo-QWeb.md)，*模版引擎 QWeb* —— QWeb 是一个网页框架，在 Odoo 8 中被初次使用，XML 模板引擎是它的核心，这一章节我们将学习 QWeb 的基础语法，并替换 Jinja2 模版引擎渲染的 Web 页面。  

[第十二章](/Chapter-12/Odoo-i18n.md)，*国际化 i18n* ——  为了能让我们的应用支持多语言，Odoo 也提供了国际化的解决方案，这一章节我们将学习如何让自己的应用实现国际化。

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

## 声明

[![CC BY-NC-ND 4.0](https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

Odoo 小书由 [TNK Studio](https://github.com/TNK-Studio) 成员共同编写，采用 [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) 许可协议发布。

您可以在遵守以下条件的前提下，自由地以任何形式共享本书：

**署名** — 您必须给出适当的署名，提供指向本许可协议的链接，同时标明是否（对原始作品）作了修改。您可以用任何合理的方式来署名，但是不得以任何方式暗示许可人为您或您的使用背书。

**非商业性使用** — 您不得将本作品用于商业目的。

**禁止演绎** — 如果您再混合、转换、或者基于该作品创作，您不可以分发修改后的作品。

## 联系我们

本书为 Github 开源项目，项目地址 [TNK-Studio/Odoo-Book](https://github.com/TNK-Studio/Odoo-Book/) 📖  

如果你对本书有任何意见或建议，请在 [issues](https://github.com/TNK-Studio/Odoo-Book/issues/new) 中提交，欢迎批评和指正 👏

## 支持我们

如果这本小书对您有帮助，欢迎投喂咖啡 ☕️ 给我们，或者给我们点个 🌟，激励我们输出更多优质内容，感谢支持 🎉

<img src="/assets/images/donate.jpg" width="50%" alt="Donate" />
