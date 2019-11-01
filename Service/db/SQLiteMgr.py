# -*- coding:utf-8 -*-

"""
 SQLite操作
"""


import sqlite3


class SQLiteMgr:
    """"""

    def __init__(self, dbname):
        """
        数据库文件名称
        :param dbname:
        """
        self.dbName = dbname
        self.mConnect = None
        self.mCursor = None

    def connect(self):
        """ 连接数据库 """
        try:
            self.mConnect = sqlite3.connect(self.dbName)
            self.mCursor = self.mConnect.cursor()
            return True
        except:
            return False

    def CheckConnected(self):
        """ 检查连接 """
        if self.mConnect is None:
            return self.connect()
        # self.mConnect.ping()

    def execute(self, sql, *args):
        """ 执行sql语句 """
        try:
            self.CheckConnected()
            self.mCursor.execute(sql, *args)
            return True
        except Exception as e:
            print("[SQL]", e)
        return False

    def commit(self):
        """ 提交 """
        try:
            self.mConnect.commit()
        except Exception as e:
            print("[SQL]", e)

    def fetchall(self):
        """ 返回全部查询结果 """
        try:
            return self.mCursor.fetchall()
        except Exception as e:
            print("[SQL]", e)
        return []

    def fetchone(self):
        """ 返回一条查询结果 """
        try:
            return self.mCursor.fetchone()
        except Exception as e:
            print("[SQL]", e)