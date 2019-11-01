# -*- coding:utf-8 -*-

"""
  放到服务器上的监控服务，需要使用Py2.7支持
"""

SQL_TABEL = """CREATE TABLE `profiler` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `timestamp` INT NOT NULL,
  `process_name` VARCHAR(255) NOT NULL,
  `cpu` FLOAT NULL DEFAULT 0,
  `mem` FLOAT NULL DEFAULT 0,
  `network` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`));
"""

import os
import time
import json
import argparse

from shell.LinuxShell import LinuxShell
from db.SQLiteMgr import SQLiteMgr

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
            dbObject = SQLiteMgr(self.mConfig['dbname'])
            if not os.path.exists(self.mConfig['dbname']):
                dbObject.execute(SQL_TABEL)
        else:
            #dbObject = MySQLMgr()
            pass

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
                pids.append((processName, pid))
        if len(pids) <= 0:
            print("No Process!!!!")
            return

        while True:
            time_stamp = int(time.time())
            for processName, pid in pids:
                cpu = self.mShell.GetProcessCpu(pid)
                mem = self.mShell.GetProcessMem(pid)
                sql_cmd = "insert into profiler (timestamp,process_name,cpu,mem,network) values(?,?,?,?,?)"
                dbObject.execute(sql_cmd, (time_stamp, processName, cpu, mem, 0))
                dbObject.commit()
                time.sleep(self.mConfig['delay'])

def Main():
    """"""
    server = Service()
    server.LoadConfig("config.json")
    server.RunService()

if __name__ == "__main__":
    Main()
