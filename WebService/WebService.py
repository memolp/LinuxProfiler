# -*- coding:utf-8 -*-


"""
 服务器启动入口
"""

import os
import json
import handlers

from smale import Smale


def Main(json_config):
    """"""
    if not os.path.exists(json_config):
        print("{0} config not exist!!".format(json_config))
        return

    try:
        with open(json_config, "rb") as pf:
            config = json.load(pf)
    except Exception as e:
        print(e)


    Smale.http_run(config['host'], config['port'], template_path='./template', static_path='./static')









