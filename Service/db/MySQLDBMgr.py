# -*- coding:utf-8 -*-
"""
  数据库操作
"""

import MySQLdb

class MySQLDBMgr:
    def __init__(self):
        """ """
        self.mConnect = None
        self.mCursor  = None
        self.mConnectInfo = None

    def SetConnection(self,host,user,passwd,dbname,port=3306):
        """ 设置连接信息 """
        if self.mConnectInfo == None :
            self.mConnectInfo = [host,user,passwd,dbname,port]
        else:
            self.mConnectInfo[0] = host
            self.mConnectInfo[1] = user
            self.mConnectInfo[2] = passwd
            self.mConnectInfo[3] = dbname
            self.mConnectInfo[4] = port

    def connect(self):
        """ 连接数据库 """
        try:
            self.mConnect = MySQLdb.connect(host=self.mConnectInfo[0],
                                            user=self.mConnectInfo[1],
                                            passwd=self.mConnectInfo[2],
                                            db=self.mConnectInfo[3],
                                            charset="utf8mb4")
            self.mCursor = self.mConnect.cursor()
            return True
        except:
            return False

    def CheckConnected(self):
        """ 检查连接 """
        if self.mConnect == None :
            return self.connect()
        self.mConnect.ping()

    def execute(self,sql,*args):
        """ 执行sql语句 """
        try:
            self.CheckConnected()
            self.mCursor.execute(sql,*args)
            return True
        except Exception as e:
            print("[SQL]",e)
        return False

    def commit(self):
        """ 提交 """
        try:
            self.mConnect.commit()
        except Exception as e:
            print("[SQL]",e)

    def fetchall(self):
        """ 返回全部查询结果 """
        try:
            return self.mCursor.fetchall()
        except Exception as e:
            print("[SQL]",e)
        return []

    def fetchone(self):
        """ 返回一条查询结果 """
        try:
            return self.mCursor.fetchone()
        except Exception as e:
            print("[SQL]",e)
        return None

    def lastrowid(self):
        """ 返回最后插入行的主键id """
        try:
            return self.mConnect.lastrowid()
        except Exception as e:
            print("[SQL]",e)
        return -1

    def insert_id(self):
        """ 返回最新插入行的主键id """
        try:
            return self.mConnect.insert_id()
        except Exception as e:
            print("[SQL]",e)
        return -1