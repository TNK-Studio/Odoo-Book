# 链接动作

接下来介绍`链接动作`。顾名思义，就是通过一个动作，跳转到一个链接。  

## 定义

主要是通过两个字段来自定义：  
`url` -- 激活action时所打开的链接。  
`target` -- 可选值`new`、`self`，默认`new`。new：在新窗口打开；self：替换当前页面内容。  

## 用法

### 视图中使用
在`xml`视图中，定义一个`act_url`类型的的action。  
再此基础上，继续定义一个`menu`，将`action`内容指向定义的`act_url`。  
如下所示：  
定义了一个菜单`百度搜索`。点击此菜单时，会跳转到百度页面。
注意：还可以将url使用相对路径指向到其他模块的某页面或者controllers。  

```xml
<record id="url_action_baidu" model="ir.actions.act_url">
    <field name="name">百度搜索</field>
    <field name="url">http://www.baidu.com</field>
    <field name="target">self</field>
</record>

<menuitem 
    action="url_action_baidu" 
    id="baidu" 
    name="百度搜索" 
    parent="menu_hr_employee_payroll" 
    sequence="8"/>

```
效果如下：

![actions-url-1](../assets/images/actions-url-1.gif)  

### 模型中使用

可以作为按钮的点击函数，在函数中return一个链接action，打开链接。

```python
{
    "type": "ir.actions.act_url",
    "url": "https://odoo.com",
    "target": "self",
}
```

