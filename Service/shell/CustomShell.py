# -*- coding:utf-8 -*-

"""
 命令行执行
"""
import os
import subprocess
from subprocess import PIPE


class ProcessShell:
    """
    命令行执行工具
    采用 subprocess.Popen方式
    """
    def __init__(self):
        """"""
        pass

    def shell_command(self, *args, **kwargs):
        """
        执行命令
        :param args:
        :param kwargs:
        :return:
        """
        process = subprocess.Popen(args, shell=kwargs.get("shell", False), stdout=PIPE, stdin=PIPE, stderr=PIPE)
        if not process:
            return None
        if not process.stdout:
            return None
        return process.stdout.read()


class OsShell:
    """
    采用os.popen 方式
    """
    def __init__(self):
        """"""
        pass

    def shell_command(self, *args):
        """
        执行命令
        :param args:
        :return:
        """
        cmd = " ".join(args)
        pf = os.popen(cmd)
        if not pf:
            return None
        return pf.read()