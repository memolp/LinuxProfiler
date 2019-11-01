# -*- coding:utf-8 -*-

"""

"""

import json
from smale import Smale


@Smale.Route(r"/")
class IndexHandler(Smale.RequestHandler):
    """"""
    def get(self):
        """"""
        return self.render("index.html")


@Smale.Route(r"/process_data")
class AjaxProcessDataHandler(Smale.RequestHandler):
    """"""
    def get(self):
        """"""
        process = self.get_argument("process")
        if not process:
            return self.error()

        return self.write()

