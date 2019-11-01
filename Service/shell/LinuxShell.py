# -*- coding:utf-8 -*-

"""
 执行linuxshell命令
"""

import re
from shell.CustomShell import *

class LinuxShell(OsShell):
    """
    """
    def __init__(self):
        """"""
        OsShell.__init__(self)
        self.cmdEOF = '\n'

    def GetProcessID(self, process_name, user_name):
        """
        获取进程pid ps aux | grep process_name | grep user_name
        :param process_name:
        :param user_name:
        :return:
        """
        value = self.shell_command("ps aux | grep {0} | grep {1}".format(process_name, user_name))
        if not value:
            return -1
        for line in value.split(self.cmdEOF):
            math_values = re.findall(r"\S+", line)
            if math_values and len(math_values) > 6:
                if math_values[0] != user_name:
                    continue
                if line.find("{0}".format(process_name)) >= 0 and line.find("grep {0}".format(process_name)) < 0:
                    return int(math_values[1])
        return -2

    def GetProcessCpu(self, pid):
        """
        获取进程pid的cpu top -b -d 1 -n 1 -p pid
        :param pid:
        :return:
        """
        value = self.shell_command("top -b -d 1 -n 1 -p {0}".format(pid))
        if not value:
            return -1
        value = value.rstrip(self.cmdEOF)
        cpu_info_lines = value.split(self.cmdEOF)
        # top的标题
        title = re.findall(r"\S+", cpu_info_lines[-2])
        index = title.index("%CPU")

        data = re.findall(r"\S+", cpu_info_lines[-1])
        if int(data[0]) != pid:
            return -2
        return float(data[index].replace("%", ""))

    def GetProcessMem(self, pid):
        """
        获取进程pid的内存 pmap -d pid | grep mapped
        :param pid:
        :return:
        """
        value = self.shell_command("pmap -d {0} | grep mapped".format(pid))
        if not value:
            return -1
        data = re.findall(r"\S+", value)
        if data[0].find("mapped") < 0:
            return -2
        mem = int(data[1].replace("K",""))
        return mem / 1024.0

    def GetProcessNetwork(self, pid):
        """
        获取进程的网络流量
        :param pid:
        :return:
        """
        pass