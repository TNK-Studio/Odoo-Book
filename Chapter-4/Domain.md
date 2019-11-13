# 过滤表达式 Domain

在[常用的 ORM 方法](/Chapter-4/Common-ORM-methods.md)章节中提到了 `search` 查询方法，这一章节就大概的讲解一下，Odoo 的 `Domain` 过滤表达式。  

`Domain` 是一个列表类型的参数，他的每一个元素可以是一个三个元素组成的元组 '(`字段名`, `运算符`, `值`)'，或者是 `|` (或)、 `&` 运算符, 例如：  

```python
[（'name' , '=' , 'ABC' ）, 
 （'language.code' , '！=' , 'en_US' ）, 
 '|' , （'country_id.code' , '=' , 'be' ）, 
     （'country_id.code' , '=' , 'de' ）]
```
也可以写成：


```python
[ '|' ,
    （'country_id.code' , '=' , 'be' ）, 
    （'country_id.code' , '=' , 'de' ）,
 '&',
    （'name' , '=' , 'ABC' ）, 
    （'language.code' , '！=' , 'en_US' ）, 
     ]
```

这个 Domain 的意思是，搜索一个名称为 `ABC`，并且语言不是英语，城市可以是比利时或德国的一条记录。  

⚠️ `|`、`&` 运算符需要放在两个条件之前，这点要注意。  
  
这种写法叫[波兰表示法](https://zh.wikipedia.org/wiki/%E6%B3%A2%E5%85%B0%E8%A1%A8%E7%A4%BA%E6%B3%95)有兴趣的可以去了解一下。  

运算符可以参考[官方文档](https://www.odoo.com/documentation/12.0/reference/orm.html#domains)，这里就不一一举例了。


