# 安装 PostgreSQL

> PostgreSQL 是自由的对象-关系型数据库服务器（数据库管理系统），在灵活的 BSD 许可证下发行。
>  
> 它在其他开放源代码数据库系统（比如 MySQL 和 Firebird），和专有系统（比如 Oracle、Sybase、IBM 的 DB2 和 Microsoft SQL Server）之外，为用户又提供了一种选择。

## Ubuntu 安装 PostgreSQL

本书使用的 PostgreSQL 版本为 9.6

### Ubuntu 17.04 - 17.10

```shell
$ sudo apt-get install postgresql-9.6 -y
```

### Ubuntu 14.04 16.04

```shell
$ sudo apt-get update
$ sudo apt-get install lsb-release software-properties-common -y
$ sudo add-apt-repository "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -sc)-pgdg main"
$ wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
$ sudo apt-get update
$ sudo apt-get install postgresql-9.6 -y
```

### Mac OS

Mac 用户可以在下载官方 APP 来启动 PostgreSQL，带有版本管理，[下载地址](https://github.com/PostgresApp/PostgresApp/releases/download/v2.1.5/Postgres-Legacy-9.6.10.zip)。  
也可以通过 Homebrew 进行安装。

```shell
$ brew install postgresql@9.6
```

## 启动 PostgreSQL 服务

```shell
$ sudo service postgresql start
```

## 创建 PostgreSQL 用户和数据库

创建 odoo 用户

```shell
$ sudo -u postgres -i
$ createuser -P --superuser odoo
```

创建 odoo 数据库

```shell
$ createdb odoo -U odoo -W
```

⚠️ 若出现以下错误：

```plain
FATAL:  Peer authentication failed for user "odoo"
```

则需要将 `pg_hba.conf` 的配置：

```plain
# cat pg_hba.conf
...
# "local" is for Unix domain socket connections only
local   all             all                                     peer
# IPv4 local connections:
host    all             all             127.0.0.1/32            ident
# IPv6 local connections:
host    all             all             ::1/128                 ident
```

修改为：

```plain
# cat pg_hba.conf
...
# "local" is for Unix domain socket connections only
local   all             all                                     md5
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
```

Ubuntu 配置文件路径 `/etc/postgresql/9.6/main/pg_hba.conf`  

Mac 配置文件路径 `/Users/{username}/Library/Application Support/Postgres/var-9.6/pg_hba.conf`  
