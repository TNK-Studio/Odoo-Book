# Many2one 多对一字段

上一章介绍了 Odoo ORM 一些常用的方法，这一章节继续完善我们的模型。  

为给我们的番剧进行分类，我们需要定义一个 Category (类别) 的模型，同样的在 models 目录下新建 `category.py`文件，并定义 `Category` 模型。  

```python
from odoo import models, fields, api


class Category(models.Model):
    _name = 'bangumi.category'
    _description = 'Bangumi category'

    @api.model
    def _get_current_uid(self):
        return self.env.uid

    name = fields.Char(string='Name', required=True)
    user_id = fields.Many2one(
        'res.users', string='User', required=True,
        default=_get_current_uid
    )
```

首先这个 Category 模型拥有一个 name 字段，其次这个类是某个用户创建的，所以我们给他加个 user_id 字段。  

⚠️ 注意这里也有一个不成文的规定，所有 `Many2one` (多对一字段，也叫外键字段) 的字段命名后缀应为 `_id`，例如：`partner_id`, `message_id` 等。  

这里用了个 Many2one 字段关联到 Odoo 的用户模型 `res.users`，这是一个很常用的模型要牢记。定义 Many2one 字段除了需要指明关联的模型外，还有一个参数叫 `ondelete`，它指明了「当关联的用户删除后」当前的模型应该做什么操作。ondelete 主要有以下几个值：

* **set null**  

    当用关联用户删除后，user_id 字段设置为空。
    
* **restrict**  

    限制关联的用户删除，当用户被删除时会提示报错。

* **cascade**  
    
    级联删除，当用户删除时，将关联的 categroy数据删除。
    ⚠️ 使用这种模式时要严格考虑数据的重要性，最好不要随便使用。

## api.model 装饰器
    
除了上文提到的部分，我们还给 user_id 字段定义了一个 default 值，他对应到一个 `_get_current_uid` 的函数，这个函数的返回值是当前操作这个模型的用户 id。  

这里给 _get_current_uid 使用了一个 `api.model` 装饰器，它是 api 模块中最常见的三大装饰器之一。源码中给这个装饰器的注释是：

💡 常见的装饰器 `api.model`、`api.multi` 和 `api.one` 后文中会提到，感兴趣的可以阅读 Odoo 的 [odoo.api](https://github.com/odoo/odoo/blob/12.0/odoo/api.py) 源码。

> Decorate a record-style method where ``self`` is a recordset, but its
>    contents is not relevant, only the model is. Such a method::
>
>        @api.model
>        def method(self, args):
>            ...
>
>    may be called in both record and traditional styles, like::
>
>        # recs = model.browse(cr, uid, ids, context)
>        recs.method(args)
>
>        model.method(cr, uid, args, context=context)
>
>    Notice that no ``ids`` are passed to the method in the traditional style.

大致意思是这个装饰器装饰了一个方法，这个方法跟数据集 `self` 本身无关，跟这个模型有关。  
  
这里首先提到了 `self` 是个数据集，这个一定要弄明白。相当于我们在 ORM 类下定义的方法，它传入的 `self` 对象除了具有类的特点，他还是一个`数据集`。  

我们引入 logging 模块并在 _get_current_uid 输出 self 的内容：

```python
import logging

from odoo import models, fields, api

_logger = logging.getLogger(__name__)


class Category(models.Model):
    _name = 'bangumi.category'
    _description = 'Bangumi category'

    @api.model
    def _get_current_uid(self):
        _logger.info("Category model call _get_current_uid(%s)" % self)
        return self.env.uid
```

我们先在 `models/__init__.py` 加入 `import . from category` 来引入这个模型，然后进入 Odoo 命令行。  

⚠️ 注意此时进入命令行需要增加 `-u bangumi` 参数，这个参数的意义是在启动时升级 bangumi 模块，这样就不用进入到模块升级页面升级，这个参数非常的常用要牢记。  

```shell
$ ./odoo-bin shell -c odoorc.ini -u bangumi
```  

然后利用 env 调用 `bangumi.category` 模型的 _get_current_uid 函数：  

```python
In [1]: category_model = env['bangumi.category']
In [2]: category_model._get_current_uid()
2019-01-14 14:03:41,197 59965 INFO odoo odoo.addons.bangumi.models.category: Category model call _get_current_uid(bangumi.category()) 
Out[2]: 1
```

接下来创建分别两个类别，然后在调用 _get_current_uid 函数：  

```python
In [3]: movie = category_model.create({'name': 'Movie'})
                     
2019-01-14 14:07:40,491 59965 INFO odoo odoo.addons.bangumi.models.category: Category model call _get_current_uid(bangumi.category())
In [4]: anime = category_model.create({'name': 'Anime'})                         
2019-01-14 14:08:07,610 59965 INFO odoo odoo.addons.bangumi.models.category: Category model call _get_current_uid(bangumi.category())
 
In [5]: env.cr.commit()

In [6]: movie._get_current_uid()
2019-01-14 14:08:57,779 59965 INFO odoo odoo.addons.bangumi.models.category: Category model call _get_current_uid(bangumi.category(1,)) 
Out[6]: 1

In [7]: anime._get_current_uid()                                                 
2019-01-14 14:09:13,070 59965 INFO odoo odoo.addons.bangumi.models.category: Category model call _get_current_uid(bangumi.category(2,)) 
Out[7]: 1

In [8]: category_model.search([])._get_current_uid()
2019-01-14 14:09:44,073 59965 INFO odoo odoo.addons.bangumi.models.category: Category model call _get_current_uid(bangumi.category(1, 2,)) 
Out[8]: 1
```

可以看到 self 可以为 `单个记录` 也可以为 `多个记录`，这一点要注意。  

回到正题，`api.model` 这个装饰器到底什么时候该用呢，其实按照代码注释的意思很容易理解，你可以这么理解记忆，当你认为这段代码跟 self 中的数据无关时，就加上 `@api.model` 装饰器，是不是有点像类中的类方法。  

再来看看我们的函数返回值，这里调用了 `self.env.uid` 其中的 `env` 就是我们的数据库环境，你可以尝试在交互式命令行中直接调用 `env.uid` 或 `env.user`，他会返回当前的默认 `admin` 的 id 或 `admin` 用户对象，而在模型中则为当前操作这个数据或对象的用户。

```python
In [9]: env.uid                                                                  
Out[9]: 1

In [10]: env.user                                                               
Out[10]: res.users(1,)
```

定义完 Category 模型，我们就可以在 Bangumi 中增加分类字段进行外键关联了。  

```python
class Bangumi(models.Model):
    _name = 'bangumi.bangumi'
    _description = 'Bangumi'

    name = fields.Char(string='Name', required=True)
    total = fields.Integer(string='Total', required=True)
    already_seen = fields.Integer(string='Already seen', default=0)
    score = fields.Float(string='Score', required=True, default=0.0)
    
    category_id = fields.Many2one(
        'bangumi.category', string='Category', required=False
    )
```

