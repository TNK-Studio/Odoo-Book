# Odoo 应用创建脚手架 scaffold

> 「脚手架」是一种元编程的方法，用于构建基于数据库的应用。许多 MVC 框架都有运用这种思想。
> 程序员编写一份 specification「规格说明书」，来描述怎样去使用数据库；而由（脚手架的）
> 编译器来根据这份 specification 生成相应的代码，进行增、删、改、查数据库的操作。
> 我们把这种模式称为"脚手架"，在脚手架上面去更高效的建造出强大的应用。

用过 Django 的读者应该知道， Django 可以利用 manage.py startapp myapp 来生成一个 app 的目录结构，这就是一个脚手架。  

同样的 Odoo 也有自己的脚手架，我们可以在命令行运行：

```shell
$ mkdir Odoo-Book-Demo && cd Odoo-Book-Demo
$ ./odoo-bin scaffold bangumi
```

命令运行后，我们在 odoo-dev 目录下新建了一个 `Odoo-Book-Demo` 的文件夹，用于存放我们自己开发的 Odoo 应用。  

然后利用 Odoo 脚手架 `odoo-bin scaffold` 命令新建了我们的 `bangumi 追番剧`应用。  

我们进入 bangumi 这个目录查看一下目录结构。  

```shell
$ cd bangumi
$ tree
.
├── __init__.py
├── __manifest__.py
├── controllers
│   ├── __init__.py
│   └── controllers.py
├── demo
│   └── demo.xml
├── models
│   ├── __init__.py
│   └── models.py
├── security
│   └── ir.model.access.csv
└── views
    ├── templates.xml
    └── views.xml
```

