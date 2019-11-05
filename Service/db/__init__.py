# -*- coding:utf-8 -*-

"""
 获取Mysql处理对象
"""

from db.SQLiteMgr import SQLiteMgr
from db.MySQLDBMgr import  MySQLDBMgr


class _SQLInstance:
    instance = None

def CreateSQLiteObject(dbname):
    """
    创建SQLite
    :param dbname:
    :return:
    """
    if _SQLInstance.instance:
        _SQLInstance.instance.close()
    _SQLInstance.instance = SQLiteMgr(dbname)
    return _SQLInstance.instance

def CreateMysqlDBObject(host,user,passwd,dbname,port):
    """
    创建mysqldb对象
    :param host:
    :param user:
    :param passwd:
    :param dbname:
    :param port:
    :return:
    """
    if _SQLInstance.instance:
        _SQLInstance.instance.close()
    _SQLInstance.instance = MySQLDBMgr()
    _SQLInstance.instance.SetConnection(host,user,passwd,dbname,port)
    return _SQLInstance.instance

def GetDBObject():
    """
    获取db对象
    :return:
    """
    return _SQLInstance.instance

