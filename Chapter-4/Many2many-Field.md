# Many2Many 多对多字段

为了能给 Bangumi 打标签，我们还需要一个 `Tag` 模型，同样的在 models 下新建 `tag.py`，并且定义 `Tag` 模型。  

```python
class Tag(models.Model):
    _name = 'bangumi.tag'
    _description = 'Bangumi tag'

    name = fields.Char(string='Name', required=True)
    user_id = fields.Many2one(
        'res.users', string='User', required=True,
        default=lambda self: self.env.uid
    )
```

别忘了将在 `models/__init__.py` 中加入 `from . import tag`。  

这次的 `user_id` 的默认值我们使用 `lambda` 函数来简化我们的代码。  

由于 `Bangumi` (番剧) 与 `Tag` (标签) 是多对多的关系，所以需要用到 Many2many 字段。  

我们分别在两个模型上都加上，Many2many (多对多) 字段。  

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

    tag_ids = fields.Many2many(
        'bangumi.tag', 'bangumi_bangumi_tag_rel',
        'bangumi_id', 'tag_id',
        string='Bangumi Tags'
    )
```  
  
```python
class Tag(models.Model):
    _name = 'bangumi.tag'
    _description = 'Bangumi tag'

    name = fields.Char(string='Name', required=True)
    user_id = fields.Many2one(
        'res.users', string='User', required=True,
        default=lambda self: self.env.uid
    )

    bangumi_ids = fields.Many2many(
        'bangumi.bangumi', 'bangumi_bangumi_tag_rel',
        'tag_id', 'bangumi_id',
        string='Tag Bangumi Set'
    )
```

⚠️ Many2many 的字段命名规则与 One2many 命名规则相同，名称都是以 `_ids`结尾。  

Many2many 主要由以下几个属性组成：
    
* **目标模型**
    
    建立多对多关系的目标模型。

* **多对多关系名称**
    
    与目标模型建立的多对多关系名称，这个名称会在数据库中生成对应的表，所以命名时要注意以`模块名称` + `_`下划线开头。
    
* **关系中自身代表的字段**

    这个字段名称会在关系数据表中生成，代表当前模型数据的 id。

* **关系中代表目标的字段**

    这个字段名称会在关系数据表中生成，代表目标模型数据的 id。


接下来还是进入到命令行中验证我们定义的 Many2many 字段，首先创建一些数据：

```python
In [2]: tags = env['bangumi.tag'].create([{'name': 'warm blood'}, {'name': 'science fiction'}, {'name': 'fight'}])
In [3]: tags                                                                    
Out[3]: bangumi.tag(1, 2, 3)
```

接下来我们将数据写入：

```python
In [2]: tags = env['bangumi.tag'].create([{'name': 'warm blood'}, {'name': 'science fiction'}, {'name': 'fight'}])
In [3]: tags             
Out[3]: bangumi.tag(1, 2, 3)
In [4]: bangumi_set = env['bangumi.bangumi'].search([])
In [5]: bangumi_set                                                             
Out[5]: bangumi.bangumi(1, 2)
In [6]: bangumi_set.write({'tag_ids': tags.ids})                                  
Out[6]: True
In [7]: bangumi_set.ids                                                          
Out[7]: [1, 2]
In [8]: env.cr.commit()
In [9]: bangumi_set[0].tag_ids                                                 
Out[9]: bangumi.tag()
In [10]: bangumi_set[0].tag_ids.mapped(lambda r: r.name)                         
Out[10]: []
```

⚠️ 注意这种写法在 Odoo 10 会直接报错，Odoo 12 并没有抛出异常，但是数据依然无法写入。

可以发现数据根本没有写进去，这是为什么呢？查看以下官方对 Many2many 字段的描述：  

> One2many and Many2many use a special “commands” format to manipulate the set of records stored in/associated with the field.  
> 
> This format is a list of triplets executed sequentially, where each triplet is a command to execute on the set of records. Not all commands apply in all situations. Possible commands are:  
> 
> **(0, _, values)**
> adds a new record created from the provided value dict.  
> **(1, id, values)**  
> updates an existing record of id id with the values in values. Can not be used in create().  
> **(2, id, _)**  
> removes the record of id id from the set, then deletes it (from the database). Can not be used in create().  
> **(3, id, _)**  
> removes the record of id id from the set, but does not delete it. Can not be used on One2many. Can not be used in create().  
> **(4, id, _)**  
> adds an existing record of id id to the set. Can not be used on One2many.  
> **(5, _, _)**  
> removes all records from the set, equivalent to using the command 3 on every record explicitly. Can not be used on One2many. Can not be used in create().  
> **(6, _, ids)**  
> replaces all existing records in the set by the ids list, equivalent to using the command 5 followed by a command 4 for each id in ids.  
> Values marked as _ in the list above are ignored and can be anything, generally 0 or False.  

从文档中的描述中可以看出，不止是 Many2many 字段，包括 One2many 字段在写入操作时都比较特殊。总的来说一共有`7`总格式：

* `(0, _, values)`
    
    增加一条未创建的数据到 X2many 字段中，并且以 value 字典中的值作为这个新数据的值。其中下划线的值可以为 0 或 False。

    ```python
    In [11]: bangumi_set[0].write({'tag_ids': [(0, 0, {'name': 'magic'})]})           
    Out[11]: True
    In [12]: bangumi_set[0].tag_ids.mapped(lambda r: r.name)
    Out[12]: ['magic']
    ```

* `(1, id, values)`
    
    更新一个已经存在的并且关联的值的数据，不能用在 create 方法中。
    
    ```python
    In [13]:bangumi_set[0].tag_ids.id                                               
    Out[13]: 4
    In [14]: bangumi_set[0].write({'tag_ids': [(1, 4, {'name': 'Magic'})]})           
    Out[14]: True
    In [15]: bangumi_set[0].tag_ids.mapped(lambda r: r.name)
    Out[15]: ['Magic']
    ```

* `(2, id, _)`
    
    移除一个已经关联的数据，并且将这条数据从数据库中删除，不能用在 create 方法中。 
    
    ```python
    In [16]:  bangumi_set[0].write({'tag_ids': [(2, 4, 0)]})                         
    2019-01-14 16:27:30,601 62971 INFO odoo odoo.models.unlink: User #1 deleted bangumi.tag records with IDs: [4]
    Out[16]: True
    In [17]: bangumi_set[0].tag_ids.mapped(lambda r: r.name)                          
    Out[17]: []
    ```

* `(3, id, _)`

    移除一个已经关联的数据，但不将这条数据从数据库中删除，不能用在 create 方法中。
    
    ```python
    In [18]: bangumi_set[0].write({'tag_ids': [(0, 0, {'name': 'magic'})]})           
    Out[18]: True
    In [19]: bangumi_set[0].tag_ids.id                                                
    Out[19]: 5
    In [20]: bangumi_set[0].write({'tag_ids': [(3, 5, 0)]})                           
    Out[20]: True
    In [21]: bangumi_set[0].tag_ids.mapped(lambda r: r.name)                          
    Out[21]: []
    ```
    
* `(4, id, _)`

    增加一个已经创建的数据到 Many2many 字段中，One2Many 不可用。
    
    ```python
    In [22]: tags = env['bangumi.tag'].search([])
    In [23]: tags[0]                                                                  
    Out[23]: bangumi.tag(1,)
    In [24]: bangumi_set[0].write({'tag_ids': [(4, 1, 0)]})                           
    Out[24]: True
    In [25]: bangumi_set[0].tag_ids.mapped(lambda r: r.name)                          
    Out[25]: ['warm blood']
    ``` 
    
* `(5, _, _)`

    移除 Many2many 中的所有关联字段，但是并不从数据库中删除它们，不能用于 One2many 中。
    
    ```python
    In [26]: tags = env['bangumi.tag'].search([])
    In [27]: for tag in tags: 
        ...:     bangumi_set[0].write({'tag_ids': [(4, tag.id, 0)]}) 
        ...:
    In [28]: bangumi_set[0].tag_ids.mapped(lambda r: r.name)                          
    Out[28]: ['warm blood', 'science fiction', 'fight', 'magic']
    In [29]: bangumi_set[0].write({'tag_ids': [(5, 0, 0)]})                           
    Out[29]: True
    In [30]: bangumi_set[0].tag_ids.mapped(lambda r: r.name)                          
    Out[30]: []
    ```
    
* `(6, 0, ids)`
    
    用新的集合替换已经关联的 Many2many 集合，但不删除旧的数据。
    
    ```python
    In [31]: bangumi_set[0].write({'tag_ids': [(4, 1, tags[0].id)]})                   
    Out[31]: True
    In [32]: bangumi_set[0].tag_ids.mapped(lambda r: r.name)                           
    Out[32]: ['warm blood']
    In [33]: bangumi_set[0].write({'tag_ids': [(6, 0, tags[1:].ids)]})                 
    Out[33]: True
    In [34]: bangumi_set[0].tag_ids.mapped(lambda r: r.name)                          
    Out[34]: ['science fiction', 'fight']
    ```

Odoo 的 X2many 字段的写入设计的比较奇特，但是正是这样的设计，使得一对多和多对多字段能够批量进行修改，并且非常的灵活。
