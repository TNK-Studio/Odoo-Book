# 使用 pipenv 安装依赖

> Pipenv 会自动帮你管理虚拟环境和相关依赖，并且提供了一系列命令和选项来帮助你实现各种依赖和环境管理相关的操作。  
>
> 简而言之，它更方便、完善和安全。
  
本书强烈建议使用 pipenv 来管理环境依赖来养成良好的环境管理习惯，当然你也可以跳过这一章节直接使用 pip 以及 `odoo_dev` 中的 `requirements.txt` 来安装依赖，若熟悉 pipenv 可以跳过这一章节。

安装之前需要删除 requirements.txt 中的最后一行 `pypiwin32 ; sys_platform == 'win32'` 并保存。

## 初始化 Pipfile

首先输入以下命令生成 `Pipfile`：

```shell
$ pipenv --python 3.6.5
Warning: Python 3.6.5 was not found on your system...
Would you like us to install CPython 3.6.5 with pyenv? [Y/n]:
```

若出现以上提示则可以参考[安装 Python3](安装 Python3.html)来安装对应的 Python 版本，当然你也可以直接输入 `Y` 使用 pyenv 来安装。

虚拟环境创建成功后会有类似的内容输出：

```
Creating a virtualenv for this project…
Pipfile: /root/odoo_dev/Pipfile
Using /root/.pyenv/versions/3.6.5/bin/python3.6m (3.6.5) to create virtualenv…
⠦ Creating virtual environment...Using base prefix '/root/.pyenv/versions/3.6.5'
New python executable in /root/.local/share/virtualenvs/odoo_dev-PjULxt24/bin/python3.6m
Also creating executable in /root/.local/share/virtualenvs/odoo_dev-PjULxt24/bin/python
Installing setuptools, pip, wheel...
done.
Running virtualenv with interpreter /root/.pyenv/versions/3.6.5/bin/python3.6m

✔ Successfully created virtual environment!
Virtualenv location: /root/.local/share/virtualenvs/odoo_dev-PjULxt24
requirements.txt found, instead of Pipfile! Converting…
✔ Success!
Warning: Your Pipfile now contains pinned versions, if your requirements.txt did.
We recommend updating your Pipfile to specify the "*" version, instead.
```

Pipenv 会自动在 `~/.local/share/virtualenvs` 目录下新建一个虚拟环境 `virtualenv` 目录，目录名一般为`odoo_dev-*`，若在当前目录下存在 `requirements.txt` 文件时，会自动安装里面的库及依赖，并写入到 `Pipfile` 中。   

可以使用 cat 查看一下 Pipfile 中的内容：

```
[[source]]
name = "pypi"
url = "https://pypi.org/simple"
verify_ssl = true

[dev-packages]

[packages]
babel = "==2.3.4"
chardet = "==3.0.4"
decorator = "==4.0.10"
docutils = "==0.12"
ebaysdk = "==2.1.5"
feedparser = "==5.2.1"
gevent = "==1.3.4"
greenlet = "==0.4.13"
html2text = "==2016.9.19"
libsass = "==0.12.3"
lxml = "==4.2.3"
mako = "==1.0.4"
mock = "==2.0.0"
num2words = "==0.5.6"
ofxparse = "==0.16"
passlib = "==1.6.5"
pillow = "==4.0.0"
psutil = "==4.3.1"
psycopg2 = "==2.7.3.1"
pydot = "==1.2.3"
pyldap = "==2.4.28"
pyparsing = "==2.1.10"
pypdf2 = "==1.26.0"
pyserial = "==3.1.1"
python-dateutil = "==2.5.3"
pytz = "==2016.7"
pyusb = "==1.0.0"
qrcode = "==5.3"
reportlab = "==3.3.0"
requests = "==2.20.0"
suds-jurko = "==0.6"
vatnumber = "==1.2"
vobject = "==0.9.3"
xlsxwriter = "==0.9.3"
xlwt = "==1.3.*"
xlrd = "==1.0.0"
pypiwin32 = "*"
Jinja2 = "==2.8.1"
MarkupSafe = "==0.23"
Werkzeug = "==0.11.15"

[requires]
python_version = "3.6"
```

## 安装依赖 激活虚拟环境

安装 Pipfile 中的依赖我们只需要执行

```
pipenv install
```

最后再执行以下命令就可以激活我们的虚拟环境了

```
pipenv shell
```

⚠️ 若使用 Ubuntu 系统且依赖中的 `pyldap` 安装失败显示 `fatal error: lber.h: No such file or directory`，则需要先安装以下库：

```shell
sudo apt-get install -y libldap2-dev libsasl2-dev
```

💡 若执行 `pipenv install` 速度过慢，可以将 Pipfile 中的 `source url` 修改为：

```
url = "http://mirrors.aliyun.com/pypi/simple"
```
