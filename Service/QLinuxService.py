# -*- coding:utf-8 -*-

"""
  放到服务器上的监控服务，需要使用Py2.7支持
"""

SQL_TABEL = """CREATE TABLE IF NOT EXISTS `{0}` (
  `timestamp` INT NOT NULL,
  `process_name` VARCHAR(255) NOT NULL,
  `cpu` FLOAT NULL DEFAULT 0,
  `mem` FLOAT NULL DEFAULT 0,
  `network` INT NULL DEFAULT 0,
  PRIMARY KEY (`timestamp`));
"""

import re
import os
import time
import json
import db

from shell.LinuxShell import LinuxShell

class Service:
    """监控服务"""
    def __init__(self):
        """"""
        self.mConfig = None
        self.mShell = LinuxShell()

    def LoadConfig(self, json_config):
        """
        加载json配置
        :param json_config:
        :return:
        """
        if not os.path.exists(json_config):
            print("{0} not exist!".format(json_config))
            return False
        try:
            with open(json_config, "rb") as pf:
                config = json.load(pf)
            self.mConfig = config
        except Exception as e:
            print(e)
            return False

        return True


    def RunService(self):
        """
        启动服务
        :return:
        """
        if self.mConfig is None or self.mShell is None:
            print("Config is None")
            return

        dbObject = None
        if self.mConfig['dbType'] == "sqlite":
            dbObject = db.CreateSQLiteObject(self.mConfig['dbname'])
        else:
            dbObject = db.CreateMysqlDBObject(self.mConfig['dbhost'], self.mConfig['dbuser'],
                                              self.mConfig['dbpasswd'], self.mConfig['dbname'],
                                              self.mConfig['dbport'])

        if dbObject is None:
            print("DB not create sucess!!")
            return

        # 进程列表
        pids = []
        for processName, user in self.mConfig["process"]:
            pid = self.mShell.GetProcessID(processName, user)
            if pid <= 0:
                print("GetProcessID Error: process:{0} user:{1}".format(processName, user))
            else:
                table_name = "{0}_{1}".format(processName, user)
                pids.append((processName, pid, user, table_name))
                dbObject.execute(SQL_TABEL.format(table_name))

        if len(pids) <= 0:
            print("No Process!!!!")
            return

        while True:
            time_stamp = int(time.time())
            for processName, pid, user, table_name in pids:
                cpu = self.mShell.GetProcessCpu(pid)
                mem = self.mShell.GetProcessMem(pid)
                if self.mConfig['dbType'] == "sqlite":
                    sql_cmd = "insert into {0} (timestamp,process_name,cpu,mem,network) values(?,?,?,?,?)"
                else:
                    sql_cmd = "insert into {0} (timestamp,process_name,cpu,mem,network) values(%s,%s,%s,%s,%s)"
                dbObject.execute(sql_cmd.format(table_name), (time_stamp, processName, round(cpu, 2), round(mem, 2), 0))
                dbObject.commit()
                time.sleep(self.mConfig['delay'])

def Main():
    """"""
    server = Service()
    server.LoadConfig("config.json")
    server.RunService()

if __name__ == "__main__":
    Main()
