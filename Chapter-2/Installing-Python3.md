# 安装 Python3

本书使用的 Python 版本为 `3.6.5`
如果已经安装了该版本的 Python 或已经熟悉使用 pyenv，可以跳过这一章节

## 使用 pyenv 安装 Python3

开始安装 Odoo 依赖之前，考虑到每个人的 Python 环境不一致，所以就讲解一下如何利用 pyenv 安装不同版本的 Python。

在命令行直接输入：

```shell
$ sudo curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
```

执行完成后会提示需要将以下内容加入命令行配置文件：

```shell
export PATH="/root/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"

export LC_ALL=C.UTF-8
export LANG=C.UTF-8
```

使用 bash 命令行则加入到 `~/.bashrc` 文件末尾，并执行 `source ~/.bashrc`。
使用 zsh 命令行则加入到 `~/.zshrc` 文件末尾，并执行 `source ~/.zshrc`。

配置生效后，即可通过执行以下命令来安装 Python：

```shell
$ pyenv install 3.6.5
```

Python 安装成功后，可以使用以下命令来切换全局的 Python 版本：

```shell
$ pyenv global 3.6.5
```

⚠️ 若使用 Ubuntu 请确保系统中有 Python 依赖，命令来自[Common build problems](https://github.com/pyenv/pyenv/wiki/Common-build-problems)

```shell
$ sudo apt-get install -y gcc make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev libffi-dev liblzma-dev libldap2-dev libsasl2-dev
```

💡 若使用 `pyenv install 3.6.5` 安装速度过慢，可以先在搜狐的镜像下载源码包，放到 pyenv 的 cache 目录后在执行安装指定版本，例如：

```shell
$ v=3.6.5;wget https://npm.taobao.org/mirrors/python/$v/Python-$v.tar.xz -P ~/.pyenv/cache/;pyenv install $v
```
