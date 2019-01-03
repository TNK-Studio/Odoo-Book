# 获取 Odoo 源码

Odoo 是一个开源项目，我们可以轻松的在 Github 上找到它的源码。   

本书中使用的是 `12.0` 版本的 Odoo，所以在拉取代码时选择 12.0 的分支。    

确保拉取的速度，使用`--depth`参数。  
```shell
git clone https://github.com/odoo/odoo.git -b 12.0 --depth=1 ./odoo_dev
```

为了熟悉和学习源码，我们直接将源码克隆到 `odoo_dev` 目录下，并且后续的 Demo 开发和知识点讲解都是直接在该目录下进行的。