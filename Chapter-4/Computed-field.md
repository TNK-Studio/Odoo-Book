# 计算字段

这一章节将介绍 Odoo 中的一个常用特殊的字段类型——`计算字段`。我们先给 Bangumi 模型增加`上映时间`和`更新周期`字段。  

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

    update_cycle = fields.Selection([
        ('weekly', 'Update weekly'),
        ('monthly', 'Update monthly'),
        ('quarterly', 'Update quarterly')
    ], string='Update cycle', required=True, default='weekly')

    release_date = fields.Date(string='Release date', default=fields.Date.today(), required=True)
```

其中 `update_cycle` 使用了一个选择字段，相当于这个字段的值只能是 `weekly`、`monthly` 或者 `quarterly`，并且值所在的元组的第二个元素则是他们具体显示的值。  

然后我们在增加一个 `current` 字段用于显示我们番剧当前已经播放到第几集了。  

```python
class Bangumi(models.Model):
    _name = 'bangumi.bangumi'
    _description = 'Bangumi'

    @api.multi
    @api.depends('release_date', 'update_cycle', 'total')
    def _compute_current(self):
        for record in self:
            today = fields.Date.today()
            dt = today - record.release_date
            if dt.days < 0:
                self.current = 0
                continue

            if record.update_cycle == 'weekly':
                current = round(dt.days / 7)
                self.current = current if current < record.total else record.total

            if record.update_cycle == 'monthly':
                month_dt = (today.year - record.release_date.year) * 12 + (today.month - record.release_date.month)
                self.current = month_dt if month_dt < record.total else record.total

            if record.update_cycle == 'quarterly':
                quarter_dt = (today.year - record.release_date.year) * 4 + (
                        math.ceil(today.month / 3) - math.ceil(record.release_date.month / 3))
                self.current = quarter_dt if quarter_dt < record.total else record.total

    name = fields.Char(string='Name', required=True)
    current = fields.Integer(string='Current', compute='_compute_current')
    total = fields.Integer(string='Total', required=True)
    ...
```

从代码可以看到，`current` 字段的设置了一个 `compute` 属性，并且这个属性指向 `_compute_current` 函数。  
  
因为当前剧集是通过 `release_date` (开播时间)，`update_cycle` (更新周期) 和 `total` (总集数) 计算而来的，所以在这个函数使用了 `api.depends` 装饰器，并且入参是前面提到的三个参数。  

除了 `api.depends` 装饰器以外还使用了 `api.multi` 装饰器，这里是显式的指明 `_compute_current` 传入的 `self` 可以为一个`记录集`，所以在处理时需要循环对 `self` 中的每一个记录进行处理。`api.multi` 也是常用的三个装饰器之一，除了 `api.multi` 还有 `api.model` 和 `api.one`，`api.model` 在前面的章节已经提到过了，这里说明一下 `api.one`。    

`api.one` 与 `api.multi` 装饰器类似，但是他将 `self` 处理成一条记录，也就是我们不需要对 `self` 进行循环处理。    

⚠️ 函数在不使用这些装饰器时，默认 `self` 都是记录集，所以要记得对 `self` 进行循环处理。  

回到 `compute_current` 函数，这个函数主要是  

```python
    @api.multi
    @api.depends('release_date', 'update_cycle', 'total')
    def _compute_current(self):
        for record in self:
            today = fields.Date.today()
            dt = today - record.release_date
            if dt.days < 0:
                self.current = 0
                continue

            if record.update_cycle == 'weekly':
                current = round(dt.days / 7)
                record.current = current if current < record.total else record.total

            if record.update_cycle == 'monthly':
                month_dt = (today.year - record.release_date.year) * 12 + (today.month - record.release_date.month)
                record.current = month_dt if month_dt < record.total else record.total

            if record.update_cycle == 'quarterly':
                quarter_dt = (today.year - record.release_date.year) * 4 + (
                        math.ceil(today.month / 3) - math.ceil(record.release_date.month / 3))
                record.current = quarter_dt if quarter_dt < record.total else record.total
```

根据依赖的三个字段计算出 `current` 当前在播的集数，函数只是个例子，计算的结果不一定准确，读者可以自行优化。  

我们进入到命令行中测试一下这个字段，别忘了在 python 虚拟环境中运行：

```shell
$ ./odoo-bin shell -c odoorc.ini -u bangumi
...
In [1]: Bangumi = self.env['bangumi.bangumi']
In [2]: bangumi = Bangumi.search([], limit=1)
In [3]: from datetime import datetime, timedelta
In [4]: bangumi.write({'release_date': datetime.today() - timedelta(days=14)})  
Out[4]: True
In [5]: bangumi.current                                                                
Out[5]: 2
In [6]: env.cr.commit()
```

计算字段还有一个特殊的属性 `store`，这个属性默认为 `False`。若设置为 `True` 则将会把计算出来的结果存入数据库中，但是他只会在依赖的数据发生变化时将重新计算的字段写入数据库中，但是必须通过 ORM 修改数据才有重新计算，使用 SQL 无效。
  
