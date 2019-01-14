# One2many 一对多字段

上一章定义了 Many2one 字段，将 Bangumi 与 Category 相关联。  

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

我们先进入交互式命令行将之前创建的数据于类别关联起来，同样的启动时别忘了 `-u bangumi` 参数，因为模型变更了。

```python
$ ./odoo-bin shell -c odoorc.ini -u bangumi
...
In [1]: anime = env['bangumi.category'].search([('name', '=', 'Anime')])        
In [2]: anime                                                                   
Out[2]: bangumi.category(2,)
In [3]: env['bangumi.bangumi'].search([]).write({'category_id': anime.id})      
Out[3]: True
In [4]: env.cr.commit() 
```

访问一下 bangumi 的 category_id 字段看看关联是否成功了。  

```python
In [8]: bangumi = env['bangumi.bangumi'].search([], limit=1)
In [9]: bangumi.category_id.name                                                
Out[9]: 'Anime'
```

可以看到 category_id 字段已经成功关联了，那么我们怎么从 `Anime` 这个类别访问到它底下的所有 `bangumi` 呢？    

这时候就需要在 Category 模型下定义一个 `One2Many` 字段来反向关联到 Bangumi模型。  

```python
class Category(models.Model):
    _name = 'bangumi.category'
    _description = 'Bangumi category'

    @api.model
    def _get_current_uid(self):
        _logger.info("Category model call _get_current_uid(%s)" % self)
        return self.env.uid

    name = fields.Char(string='Name', required=True)
    user_id = fields.Many2one(
        'res.users', string='User', required=True,
        default=_get_current_uid
    )

    bangumi_ids = fields.One2many(
        'bangumi.bangumi', 'category_id',
        string='Category Bangumi Set'
    )
```

这个字段的第一个属性是反向关联的模型，也就是 `bangumi.bangumi`。第二个字段是当前模型在反向关联的模型中定义为哪个字段，我们定义的是 `category_id` 字段。  

⚠️ 这里依然要注意字段的命名，Odoo 中的 One2many 字段名称请以 `_ids` 结尾。  

再次进入命令行：  

```python
$ ./odoo-bin shell -c odoorc.ini -u bangumi
...
In [1]: anime = env['bangumi.category'].search([('name', '=', 'Anime')])
In [2]: anime.bangumi_ids                                                       
Out[2]: bangumi.bangumi(1, 2)
```

